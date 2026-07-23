"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { isAuthenticated } from "@/services/auth.service";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null;
  }

  return children;
}
