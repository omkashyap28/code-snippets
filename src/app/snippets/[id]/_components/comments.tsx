"use client";

import { MessageSquare } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import CommentForm from "./comment-form";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Comment from "./comment";
import toast from "react-hot-toast";

export default function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deletinCommentId, setDeletingComment] = useState<string | null>(null);

  // fetch comments
  const comments =
    useQuery(api.snippets.getSnippetsComments, { snippetId }) || [];
  const deleteComment = useMutation(api.snippets.deleteComments);
  const addComments = useMutation(api.snippets.addComments);

  // functions
  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await addComments({
        snippetId,
        content,
      });
    } catch (error) {
      console.log("Error adding comment:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingComment(commentId);
    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.log("Error deleting comment:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingComment(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {user ? (
          <CommentForm
            onSubmit={handleSubmitComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4">
              Sign in to join the discussion
            </p>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletinCommentId === comment._id}
              currentUserId={user?.id || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
