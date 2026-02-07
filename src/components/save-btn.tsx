"use client";

import { motion } from "motion/react";
import { Id } from "../../convex/_generated/dataModel";
import { Loader2, SaveIcon } from "lucide-react";
import { useState } from "react";

export default function SaveButton() {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
            group relative inline-flex items-center gap-2.5 py-2 px-2.5 sm:px-3.5 sm:py-2.5
            disabled:cursor-not-allowed
            focus:outline-none
          `}
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-500 rounded-lg opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="size-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="max-sm:hidden text-sm font-medium text-white/90">
              Executing...
            </span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <SaveIcon className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="max-sm:hidden text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}
