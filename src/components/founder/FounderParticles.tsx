"use client";

import { brandAssets } from "@/lib/brand/assets";

type FounderParticlesProps = {
  className?: string;
  density?: "hero" | "section";
};

/**
 * Subtle animated particle field — CSS motion only, respects reduced-motion.
 */
export function FounderParticles({ className = "", density = "hero" }: FounderParticlesProps) {
  const orbs =
    density === "hero"
      ? [
          { className: "left-[8%] top-[18%] h-1.5 w-1.5 bg-cyan-300/70", delay: "0s" },
          { className: "left-[22%] top-[62%] h-1 w-1 bg-fuchsia-400/60", delay: "0.8s" },
          { className: "left-[48%] top-[28%] h-2 w-2 bg-violet-300/50", delay: "1.4s" },
          { className: "left-[68%] top-[72%] h-1.5 w-1.5 bg-cyan-200/55", delay: "0.4s" },
          { className: "left-[82%] top-[22%] h-1 w-1 bg-pink-300/55", delay: "1.1s" },
          { className: "left-[90%] top-[55%] h-2 w-2 bg-indigo-300/40", delay: "1.8s" },
          { className: "left-[35%] top-[78%] h-1 w-1 bg-cyan-400/50", delay: "2.2s" },
          { className: "left-[12%] top-[40%] h-1.5 w-1.5 bg-purple-300/45", delay: "0.6s" },
        ]
      : [
          { className: "left-[15%] top-[30%] h-1 w-1 bg-cyan-300/50", delay: "0.3s" },
          { className: "left-[70%] top-[25%] h-1.5 w-1.5 bg-fuchsia-300/40", delay: "1s" },
          { className: "left-[55%] top-[70%] h-1 w-1 bg-violet-300/40", delay: "1.6s" },
        ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-screen"
        style={{
          backgroundImage: `url(${brandAssets.backgrounds.particles})`,
          backgroundSize: "720px 720px",
        }}
      />
      {orbs.map((orb, i) => (
        <span
          key={i}
          className={`founder-particle absolute rounded-full shadow-[0_0_12px_rgba(0,229,255,0.45)] ${orb.className}`}
          style={{ animationDelay: orb.delay }}
        />
      ))}
    </div>
  );
}
