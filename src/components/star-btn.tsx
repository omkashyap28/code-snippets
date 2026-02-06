"use client";

import { useMutation, useQuery } from "convex/react";
import { Star } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
export default function StarButton({
  snippetId,
}: {
  snippetId: Id<"snippets">;
}) {
  const { isSignedIn } = useAuth();
  const isStarred = useQuery(api.snippets.isStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStars, { snippetId });

  const starSnippet = useMutation(api.snippets.starSnippet);
  const handleStarClick = () => {
    if (!isSignedIn) {
      toast.error("Please login");
      return;
    }
    starSnippet({
      snippetId,
    });
  };
  return (
    <div className="z-10" onClick={(e) => e.preventDefault()}>
      <button
        className={`group flex items-center gap-1.5 py-1.5 px-2 rounded-lg 
    transition-all duration-200 ${
      isStarred
        ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
        : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
    }`}
        onClick={handleStarClick}
      >
        <Star
          className={`w-4 h-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}
        />
        <span
          className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}
        >
          {starCount}
        </span>
      </button>
    </div>
  );
}
