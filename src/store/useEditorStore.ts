import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { LANGUAGE_CONFIG } from "@/constants";
import { CodeEditorState } from "@/types";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      theme: "vs-dark",
      fontSize: 16,
    };
  }

  return {
    language: localStorage.getItem("editor-language") || "javascript",
    theme: localStorage.getItem("editor-theme") || "vs-dark",
    fontSize: Number(localStorage.getItem("editor-fontsize") || 16),
  };
};

export const useEditorStore = create<CodeEditorState>((set, get) => ({
  ...getInitialState(),
  output: "",
  error: null,
  isRunning: false,
  editor: null,
  executionResult: null,

  getCode: () => get().editor?.getValue(),

  setEditor: (editorInstance: Monaco) => {
    const savedCode = localStorage.getItem(`editor-code-${get().language}`);

    if (savedCode) editorInstance.setValue(savedCode);

    set({ editor: editorInstance });
  },

  setTheme: (theme) => {
    localStorage.setItem("editor-theme", theme);
    set({ theme });
  },

  setFontSize: (fontSize) => {
    localStorage.setItem("editor-fontsize", fontSize.toString());
    set({ fontSize });
  },

  setLanguage: (language) => {
    const currentCode = get().editor?.getValue();

    if (currentCode) {
      localStorage.setItem(`editor-code-${get().language}`, currentCode);
    }

    const newCode = localStorage.getItem(`editor-code-${language}`);

    if (newCode && get().editor) {
      get().editor!.setValue(newCode);
    }

    localStorage.setItem("editor-language", language);

    set({
      language,
      output: "",
      error: null,
    });
  },

  runCode: async () => {
    const { language, getCode } = get();
    const code = getCode();
    if (!code) {
      set({ error: "Please enter some code to execute!!!" });
      return;
    }
    set({ isRunning: true, error: null, output: "" });
    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [
            {
              content: code,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log(data);

      // handling errors
      if (data.message) {
        set({
          error: data.message,
          executionResult: { code, output: "", error: data.message },
        });
        return;
      }

      // compilation errors
      if (data.compile && data.compile.code !== 0) {
        const error = data.compile.stderr || data.compile.output;
        set({
          error,
          executionResult: {
            code,
            output: "",
            error,
          },
        });
        return;
      }

      // runtime errors
      if (data.run && data.run.code !== 0) {
        const error = data.run.stderr || data.run.output;
        set({
          error,
          executionResult: {
            code,
            output: "",
            error,
          },
        });
      }

      // sucessfull
      const output = data.run.output;
      set({
        output: output.trim(),
        error: null,
        executionResult: {
          code,
          output: output.trim(),
          error: null,
        },
      });
    } catch (error) {
      console.error("Error in runing code", error);
    } finally {
      set({
        isRunning: false,
      });
    }
  },
}));

export const getExecutionResult = () =>
  useEditorStore.getState().executionResult;
