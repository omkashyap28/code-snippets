import { Edit } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";

export default function EditBtn({ id }: { id: Id<"snippets"> }) {
  return (
    <Link
      href={id}
      className="flex items-center gap-1.5 p-2 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
      rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
    >
      <Edit className="size-4" />
    </Link>
  );
}
