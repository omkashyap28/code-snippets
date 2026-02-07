"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function ShareSnippetDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const language = useEditorStore((state) => state.language);
  const getCode = useEditorStore((state) => state.getCode);
  const saveSnippets = useMutation(api.snippets.saveSnippets);
  const handleShare = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSharing(true);
    try {
      const code = getCode();
      await saveSnippets({
        title,
        language,
        code,
      });
      onClose();
      setTitle("");
      toast.success("Snippet saved sucessfully", {
        duration: 4000,
      });
    } catch (error) {
      console.error("Error in snipet save ", error);
      toast.error("Error in saving snippet", {
        duration: 4000,
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center h-full w-full p-4 z-9009">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Share Snippet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={handleShare}>
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter snippet title"
              required
              autoFocus
            />
            <div className="flex gap-3 justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSharing}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isSharing ? "Sharing.." : "Share"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
