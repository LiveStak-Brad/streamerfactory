"use client";

import { useEffect } from "react";
import { ensureGrowthStateAction } from "@/lib/growth/actions";

/** Fires daily login + mission assignment + onboarding sync once per dashboard mount. */
export function MemberGrowthBootstrap() {
  useEffect(() => {
    void ensureGrowthStateAction();
  }, []);
  return null;
}
