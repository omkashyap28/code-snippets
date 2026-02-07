"use client";

import ShareSnippetDialog from "@/app/(root)/_components/share-snippet-dialog";
import { Share, Share2, ShareIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ShareButton() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsShareDialogOpen(true)}
        className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors relative"
      >
        <Share2 className="size-4 text-gray-400" />
        {/* <span className="text-sm font-medium text-white ">Share</span> */}
      </motion.button>
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </>
  );
}
