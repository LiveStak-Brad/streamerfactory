import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function redirectHome(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/", request.url));
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirectHome(request);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirectHome(request);
}
