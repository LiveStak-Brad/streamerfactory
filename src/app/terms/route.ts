import { NextResponse } from "next/server";
import { TIKTOK_SITE_VERIFICATION_LINE } from "@/lib/tiktok/site-verification";

/**
 * TikTok URL ownership: portal may require GET https://…/terms to return only
 * the verification line as plain text. Human-readable terms live at /legal/terms.
 */
export async function GET() {
  return new NextResponse(`${TIKTOK_SITE_VERIFICATION_LINE}\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
