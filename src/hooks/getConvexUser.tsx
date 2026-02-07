"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexUser() {
  const { user, isLoaded } = useUser();

  const convexUser = useQuery(
    api.users.getUser,
    user ? { userId: user.id } : "skip",
  );

  return {
    isLoaded,
    isPro: convexUser?.isPro ?? false,
    convexUser,
  };
}
