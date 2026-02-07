import Link from "next/link";
import { Home, Code2, Github } from "lucide-react";
import MobileNav from "./mobile-navbar";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center">
      <div className="hidden sm:flex items-center gap-6">
        <NavItem href="/" icon={<Home className="w-4 h-4" />} label="Home" />
        <NavItem
          href="/snippets"
          icon={<Code2 className="w-4 h-4" />}
          label="Snippets"
        />
        <NavItem
          href="https://github.com"
          icon={<Github className="w-4 h-4" />}
          label="Github"
        />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
