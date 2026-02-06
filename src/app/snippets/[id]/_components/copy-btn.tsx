import { Copy } from "lucide-react";

export default function CopyBtn({ code }: { code: string }) {
  const copyText = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <button
      onClick={copyText}
      className="flex items-center gap-1.5 p-2 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
      rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
    >
      <Copy className="size-4" />
    </button>
  );
}
