import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import Link from "next/link";
import { Blocks, Sparkles } from "lucide-react";
import HeaderProfileBtn from "./header-profile-btn";
import { api } from "../../convex/_generated/api";
import Navbar from "./navbar";
import MobileNav from "./mobile-navbar";

export default async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative max-w-7xl mx-auto z-10 w-full">
      <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl py-3 mb-4 rounded-lg">
        <div className="flex items-center gap-3">
          <MobileNav />
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group relative">
              <div
                className="relative bg-linear-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
            ring-white/10 group-hover:ring-white/20 transition-all"
              >
                <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="flex flex-col">
                <span className="block text-lg font-semibold bg-linear-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  CodeSnippents
                </span>
                <span className="block text-xs text-blue-400/60 font-medium">
                  Share Code Snippets
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-end gap-8">
          <Navbar />

          {convexUser && !convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-linear-to-r from-amber-500/10 
              to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
              transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}
          <div className="flex gap-3 items-center pl-3">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
