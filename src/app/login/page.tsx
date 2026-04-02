"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense, useState } from "react";
import { Container } from "@/components/ui/Container";
import { safeNextPath } from "@/lib/auth/access";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");
  const afterAuthPath = safeNextPath(searchParams.get("next"));
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSuccess(null);
    const trimmed = email.trim();
    if (!trimmed || !password) {
      setMessage("Enter email and password.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const origin = window.location.origin;

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmed,
        password,
      });
      setLoading(false);
      if (error) {
        setMessage(error.message);
        return;
      }
      router.refresh();
      router.replace(afterAuthPath);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: trimmed,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    if (data.session) {
      router.refresh();
      router.replace(afterAuthPath);
      return;
    }
    setSuccess(
      "Account created. If email confirmation is on, check your inbox for a link before signing in.",
    );
    setPassword("");
  }

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Use your email and password. Enable Email under Authentication → Providers in
          Supabase if you have not already.
        </p>

        {callbackError === "callback" && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            That link could not complete sign-in. Try again, or confirm this app URL is
            listed under Redirect URLs in Supabase.
          </p>
        )}
        {message && (
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
            {message}
          </p>
        )}
        {success && (
          <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100">
            {success}
          </p>
        )}

        <div className="mt-8 flex rounded-xl border border-zinc-200 p-1 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMessage(null);
              setSuccess(null);
            }}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              mode === "signin"
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMessage(null);
              setSuccess(null);
            }}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              mode === "signup"
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="auth-email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none ring-accent/0 transition-[box-shadow] focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="auth-password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="auth-password"
              name="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-zinc-950 shadow-sm outline-none ring-accent/0 transition-[box-shadow] focus:border-accent/50 focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              minLength={6}
              required
            />
            <p className="mt-1 text-xs text-zinc-500">At least 6 characters (Supabase default).</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border border-accent/40 bg-accent/15 px-4 py-3 text-sm font-semibold text-accent shadow-sm transition-colors hover:border-accent/60 hover:bg-accent/25 disabled:opacity-60 dark:text-accent-muted"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
      </Container>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16 sm:py-24">
          <Container className="max-w-md">
            <p className="text-sm text-zinc-500">Loading…</p>
          </Container>
        </section>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
