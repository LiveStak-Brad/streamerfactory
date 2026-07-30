"use client";

import { useEffect } from "react";
import { recordGuideReadAction } from "@/lib/growth/actions";

/** Emits guide_read for signed-in members when a guide page mounts. */
export function RecordGuideRead({ slug }: { slug: string }) {
  useEffect(() => {
    void recordGuideReadAction(slug);
  }, [slug]);
  return null;
}
