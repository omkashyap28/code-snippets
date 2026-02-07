"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Code2, Github, X } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        className="flex items-center"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="relative flex gap-2 flex-col">
          <div className="h-px w-4 bg-white/70 rounded" />
          <div className="h-px w-4 bg-white/70 rounded" />
        </div>
      </button>
      <div
        className={`fixed top-0 -mt-4 -ml-5 ${open ? "left-0" : "-left-full"} z-9999 h-screen w-60 border border-white/10 bg-[#12121a] rounded-lg shadow-xl`}
      >
        <button
          className="absolute right-1 top-2 p-4"
          onClick={() => setOpen((open) => !open)}
        >
          <X className="size-5" />
        </button>

        <div className="h-full mt-24 flex flex-col gap-4 px-5 ">
          <NavItem
            href="/"
            icon={<Home className="w-4 h-4" />}
            onOpen={() => setOpen(false)}
            label="Home"
          />
          <NavItem
            href="/snippets"
            icon={<Code2 className="w-4 h-4" />}
            onOpen={() => setOpen(false)}
            label="Snippets"
          />
          <NavItem
            href="https://github.com"
            icon={<Github className="w-4 h-4" />}
            onOpen={() => setOpen(false)}
            label="Github"
          />
        </div>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed h-screen w-screen inset-0 bg-black/50"
        ></div>
      )}
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  onOpen,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onOpen: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onOpen}
      className="flex items-center gap-2 text-lg font-medium text-gray-400 hover:text-white transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
