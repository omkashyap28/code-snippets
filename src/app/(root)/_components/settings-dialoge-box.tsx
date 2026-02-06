"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Settings, TypeIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

export default function SettingDialogueBox() {
  const fontSize = useEditorStore((state) => state.fontSize);
  const wordWrap = useEditorStore((state) => state.wordWrap);
  const setFontSize = useEditorStore((state) => state.setFontSize);
  const setWordWrap = useEditorStore((state) => state.setWordWrap);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleSettings = () => {
    setIsSettingsOpen((state) => !state);
  };
  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-fontsize", size.toString());
  };
  const handleWordWrap = () => {
    if (wordWrap === "on") {
      setWordWrap("off");
    } else {
      setWordWrap("on");
    }
  };

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);
  useEffect(() => {
    const savedWordWrap = localStorage.getItem("wordWrap");
    if (savedWordWrap === "on") setWordWrap("on");
    else setWordWrap("off");
  }, [setWordWrap]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="relative" ref={dropDownRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSettings}
        className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors relative"
        aria-label="Reset to default code"
      >
        <Settings className="size-4 text-gray-400" />
      </motion.button>
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 right-0 space-y-2 z-99 w-54 p-4 bg-[#1e1e2e] rounded-lg"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5"
            >
              <div className="flex items-center gap-3">
                <TypeIcon className="size-4 text-gray-400" />
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value))
                  }
                  className="w-24 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
              </div>
              <span className="text-sm font-medium text-gray-400 text-center">
                {fontSize}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5"
            >
              <label className="flex items-center justify-between w-full cursor-pointer select-none">
                <span className="text-[12px]">Word-wrap</span>
                <input
                  type="checkbox"
                  className=""
                  checked={wordWrap === "on" ? true : false}
                  onChange={handleWordWrap}
                />
              </label>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
