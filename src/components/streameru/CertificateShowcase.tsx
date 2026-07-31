import Link from "next/link";
import { CredentialBadge } from "@/components/credentials";
import type { CredentialType } from "@/components/credentials";

const CREDENTIALS: {
  id: CredentialType;
  title: string;
  detail: string;
  href: string;
}[] = [
  {
    id: "program_certificate",
    title: "Program Certificate",
    detail: "Earn after LIVE exams + Program Final",
    href: "/streameru#course-roadmap",
  },
  {
    id: "diploma",
    title: "StreamerU Diploma",
    detail: "Graduate after the Graduation Exam",
    href: "/streameru/graduation",
  },
  {
    id: "manager_college",
    title: "Manager College",
    detail: "Leadership pathway after the diploma",
    href: "/member/progress",
  },
  {
    id: "hall_of_fame_graduate",
    title: "Hall of Fame Graduate",
    detail: "Celebrated academy alumni recognition",
    href: "/hall-of-fame#streameru-graduates-heading",
  },
];

/**
 * Prestige credential mockups — collectible feel without inventing unlocks.
 */
export function CertificateShowcase() {
  return (
    <section
      className="rounded-2xl border border-border/80 bg-gradient-to-br from-[#0b0a12] via-[#12101c] to-[#0b0f1a] p-6 text-zinc-50 sm:p-8"
      aria-labelledby="su-certs-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent-muted">
        Credentials
      </p>
      <h2
        id="su-certs-heading"
        className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
      >
        Certificates worth collecting
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Real StreamerU credentials — Program Certificates, the Diploma, Manager College, and Hall of
        Fame Graduate recognition.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIALS.map((cred) => (
          <li key={cred.id}>
            <Link
              href={cred.href}
              className="group flex h-full flex-col items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-5 text-center transition-[transform,border-color] hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:transform-none"
            >
              <CredentialBadge type={cred.id} size="md" />
              <p className="mt-3 text-sm font-bold text-white">{cred.title}</p>
              <p className="mt-1 text-[11px] leading-snug text-zinc-400">{cred.detail}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
