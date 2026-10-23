"use client";

import { useMutation } from "convex/react";
import { Save } from "lucide-react";
import { motion } from "motion/react";
import { api } from "../../convex/_generated/api";
import { getExecutionResult, useEditorStore } from "@/store/useEditorStore";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

export default function SaveButton() {
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const { user } = useUser();
  const language = useEditorStore((state) => state.language);

  const handleSave = async () => {
    const result = getExecutionResult();
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (!result) {
      toast.error("Nothing to save");
      return;
    }

    try {
      await toast.promise(
        saveExecution({
          language,
          code: result.code,
          output: result.output,
          error: result.error || "Fail to save execution",
        }),
        {
          loading: "Saving execution...",
          success: "Execution saved successfully",
          error: "Failed to save execution",
        },
      );
    } catch (error) {
      console.log("Fail to save execution", error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSave}
      className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors relative"
    >
      <Save className="size-4 text-gray-400" />
    </motion.button>
  );
}
