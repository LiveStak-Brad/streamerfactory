/**
 * Premium StreamerU credential badge artwork (SVG).
 * Gradient IDs must be unique per mount — pass `uid` from CredentialBadge.
 */

type ArtProps = { uid: string };

/** Compact brand emblem — rings + stream nucleus (no letter placeholders). */
function BrandEmblem({ uid, cx = 64, cy = 58, scale = 1 }: ArtProps & { cx?: number; cy?: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(-64 -64)`}>
      <circle cx="64" cy="64" r="22" fill={`url(#${uid}-disc)`} />
      <circle
        cx="64"
        cy="64"
        r="20"
        fill="none"
        stroke={`url(#${uid}-ring)`}
        strokeWidth="2.2"
        opacity="0.95"
      />
      <circle
        cx="64"
        cy="64"
        r="15.5"
        fill="none"
        stroke={`url(#${uid}-ring)`}
        strokeWidth="1.1"
        opacity="0.55"
        strokeDasharray="42 8"
      />
      {/* Stream nucleus */}
      <path
        d="M52 70c6-10 10-16 12-22 2 6 6 12 12 22-5-2-9-3-12-3s-7 1-12 3z"
        fill={`url(#${uid}-chrome)`}
        opacity="0.95"
      />
      <circle cx="64" cy="56" r="3.2" fill="#00E5FF" />
      <circle cx="64" cy="56" r="5.5" fill="none" stroke="#A020F0" strokeWidth="1" opacity="0.7" />
    </g>
  );
}

function LaurelWreath({
  uid,
  gold = false,
}: ArtProps & { gold?: boolean }) {
  const stroke = gold ? `url(#${uid}-gold)` : `url(#${uid}-chrome)`;
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="2.2" opacity="0.88">
      <path d="M36 78 Q30 62 40 42" />
      <path d="M40 82 Q32 64 44 40" />
      <path d="M44 84 Q36 66 48 38" />
      <path d="M48 86 Q40 68 52 36" />
      <path d="M92 78 Q98 62 88 42" />
      <path d="M88 82 Q96 64 84 40" />
      <path d="M84 84 Q92 66 80 38" />
      <path d="M80 86 Q88 68 76 36" />
    </g>
  );
}

function SharedDefs({ uid }: ArtProps) {
  return (
    <defs>
      <linearGradient id={`${uid}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF2ED1" />
        <stop offset="45%" stopColor="#A020F0" />
        <stop offset="100%" stopColor="#5B3BFF" />
      </linearGradient>
      <linearGradient id={`${uid}-ring-cyan`} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5B3BFF" />
        <stop offset="55%" stopColor="#A020F0" />
        <stop offset="100%" stopColor="#00E5FF" />
      </linearGradient>
      <linearGradient id={`${uid}-chrome`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="35%" stopColor="#CBD5E1" />
        <stop offset="55%" stopColor="#94A3B8" />
        <stop offset="75%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id={`${uid}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF6C8" />
        <stop offset="30%" stopColor="#F5D76E" />
        <stop offset="55%" stopColor="#D4A017" />
        <stop offset="80%" stopColor="#F0E68C" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id={`${uid}-disc`} x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#1A1F2E" />
        <stop offset="100%" stopColor="#0B0F1A" />
      </linearGradient>
      <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#A020F0" stopOpacity="0.55" />
        <stop offset="45%" stopColor="#5B3BFF" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#0B0F1A" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-gold-glow`} cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#A020F0" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#0B0F1A" stopOpacity="0" />
      </radialGradient>
      <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${uid}-glow-f`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export function ProgramCertificateArt({ uid }: ArtProps) {
  return (
    <>
      <SharedDefs uid={uid} />
      <circle cx="64" cy="60" r="52" fill={`url(#${uid}-glow)`} />
      <circle
        cx="64"
        cy="60"
        r="48"
        fill={`url(#${uid}-disc)`}
        stroke={`url(#${uid}-chrome)`}
        strokeWidth="4.5"
        filter={`url(#${uid}-soft)`}
      />
      <circle
        cx="64"
        cy="60"
        r="42"
        fill="none"
        stroke={`url(#${uid}-ring-cyan)`}
        strokeWidth="2"
        opacity="0.85"
      />
      <circle cx="64" cy="60" r="38" fill="none" stroke={`url(#${uid}-chrome)`} strokeWidth="1" opacity="0.4" />
      <LaurelWreath uid={uid} />
      <BrandEmblem uid={uid} cx={64} cy={56} scale={0.92} />
      {/* Ribbon */}
      <path
        d="M40 102h48l-4 14-8-6-8 6-8-6-8 6-4-14z"
        fill={`url(#${uid}-ring)`}
        filter={`url(#${uid}-soft)`}
      />
      <path d="M44 102h40" stroke={`url(#${uid}-chrome)`} strokeWidth="1.2" opacity="0.7" />
      <circle cx="64" cy="107" r="2" fill={`url(#${uid}-chrome)`} />
    </>
  );
}

export function DiplomaArt({ uid }: ArtProps) {
  return (
    <>
      <SharedDefs uid={uid} />
      <circle cx="64" cy="58" r="54" fill={`url(#${uid}-gold-glow)`} />
      <circle
        cx="64"
        cy="58"
        r="50"
        fill={`url(#${uid}-disc)`}
        stroke={`url(#${uid}-gold)`}
        strokeWidth="5"
        filter={`url(#${uid}-glow-f)`}
      />
      <circle
        cx="64"
        cy="58"
        r="44"
        fill="none"
        stroke={`url(#${uid}-ring)`}
        strokeWidth="2.4"
        opacity="0.9"
      />
      <circle
        cx="64"
        cy="58"
        r="40"
        fill="none"
        stroke={`url(#${uid}-gold)`}
        strokeWidth="1.2"
        opacity="0.55"
        strokeDasharray="3 3"
      />
      <LaurelWreath uid={uid} gold />
      {/* Graduation seal / embossed scroll */}
      <g filter={`url(#${uid}-soft)`}>
        <rect
          x="46"
          y="44"
          width="36"
          height="28"
          rx="3"
          fill={`url(#${uid}-disc)`}
          stroke={`url(#${uid}-gold)`}
          strokeWidth="1.8"
        />
        <path
          d="M46 50h36M46 56h36M52 62h24"
          stroke={`url(#${uid}-chrome)`}
          strokeWidth="1.3"
          opacity="0.55"
        />
        <circle cx="64" cy="72" r="9" fill={`url(#${uid}-ring)`} stroke={`url(#${uid}-gold)`} strokeWidth="1.6" />
        <path
          d="M64 67v8M60 71h8"
          stroke="#FFF6C8"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Cap accent */}
        <path
          d="M50 42l14-8 14 8-14 5z"
          fill={`url(#${uid}-gold)`}
          opacity="0.95"
        />
        <path d="M64 34v6" stroke={`url(#${uid}-gold)`} strokeWidth="1.5" />
        <circle cx="64" cy="33" r="1.8" fill="#FFF6C8" />
      </g>
      <path
        d="M38 104h52c0 0-3 10-8 12-5-3-10 0-18 0s-13-3-18 0c-5-2-8-12-8-12z"
        fill={`url(#${uid}-gold)`}
        opacity="0.92"
      />
    </>
  );
}

export function ManagerCollegeArt({ uid }: ArtProps) {
  return (
    <>
      <SharedDefs uid={uid} />
      <ellipse cx="64" cy="68" rx="40" ry="12" fill={`url(#${uid}-gold)`} opacity="0.12" />
      {/* Shield */}
      <path
        d="M64 14 L104 30 L104 62 C104 88 84 108 64 118 C44 108 24 88 24 62 L24 30 Z"
        fill={`url(#${uid}-disc)`}
        stroke={`url(#${uid}-gold)`}
        strokeWidth="3.5"
        filter={`url(#${uid}-glow-f)`}
      />
      <path
        d="M64 22 L96 35 L96 60 C96 82 80 98 64 106 C48 98 32 82 32 60 L32 35 Z"
        fill="none"
        stroke={`url(#${uid}-chrome)`}
        strokeWidth="1.2"
        opacity="0.35"
      />
      {/* Crown */}
      <path
        d="M44 40 L50 52 L58 42 L64 52 L70 42 L78 52 L84 40 L80 56 H48 Z"
        fill={`url(#${uid}-gold)`}
        filter={`url(#${uid}-soft)`}
      />
      <circle cx="50" cy="39" r="2" fill="#FFF6C8" />
      <circle cx="64" cy="37" r="2.2" fill="#FFF6C8" />
      <circle cx="78" cy="39" r="2" fill="#FFF6C8" />
      {/* Leadership star */}
      <path
        d="M64 62l4.2 8.6 9.5 1.4-6.9 6.7 1.6 9.4L64 83.6l-8.4 4.5 1.6-9.4-6.9-6.7 9.5-1.4z"
        fill={`url(#${uid}-gold)`}
        stroke="#FFF6C8"
        strokeWidth="0.6"
        filter={`url(#${uid}-soft)`}
      />
      {/* Compass ticks */}
      <g stroke={`url(#${uid}-chrome)`} strokeWidth="1.2" opacity="0.55">
        <path d="M64 90v6M58 93h12" />
      </g>
      <circle cx="64" cy="93" r="3" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="1.2" />
    </>
  );
}

export function HallOfFameGraduateArt({ uid }: ArtProps) {
  return (
    <>
      <SharedDefs uid={uid} />
      <circle cx="64" cy="58" r="56" fill={`url(#${uid}-gold-glow)`} />
      <circle cx="64" cy="58" r="52" fill={`url(#${uid}-glow)`} opacity="0.85" />
      <circle
        cx="64"
        cy="58"
        r="50"
        fill={`url(#${uid}-disc)`}
        stroke={`url(#${uid}-gold)`}
        strokeWidth="3"
        filter={`url(#${uid}-glow-f)`}
      />
      <circle
        cx="64"
        cy="58"
        r="46"
        fill="none"
        stroke={`url(#${uid}-ring-cyan)`}
        strokeWidth="2.5"
        opacity="0.95"
      />
      <circle
        cx="64"
        cy="58"
        r="42"
        fill="none"
        stroke={`url(#${uid}-gold)`}
        strokeWidth="1.4"
        opacity="0.65"
      />
      <LaurelWreath uid={uid} gold />
      {/* Trophy crest */}
      <g filter={`url(#${uid}-soft)`}>
        <path
          d="M52 48h24v10c0 8-5 14-12 16-7-2-12-8-12-16V48z"
          fill={`url(#${uid}-gold)`}
          stroke="#FFF6C8"
          strokeWidth="1"
        />
        <path
          d="M48 50c-6 1-10 6-10 12 0 5 3 9 8 10"
          fill="none"
          stroke={`url(#${uid}-chrome)`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M80 50c6 1 10 6 10 12 0 5-3 9-8 10"
          fill="none"
          stroke={`url(#${uid}-chrome)`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="58" y="74" width="12" height="5" rx="1" fill={`url(#${uid}-gold)`} />
        <rect x="52" y="79" width="24" height="5" rx="1.5" fill={`url(#${uid}-gold)`} />
        <circle cx="64" cy="54" r="4" fill="#0B0F1A" opacity="0.35" />
        <path
          d="M64 50l1.6 3.2 3.5.5-2.5 2.5.6 3.5L64 58l-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z"
          fill="#FFF6C8"
        />
      </g>
      {/* Top crest jewel */}
      <circle cx="64" cy="22" r="4" fill={`url(#${uid}-ring)`} stroke={`url(#${uid}-gold)`} strokeWidth="1.2" />
      <path
        d="M34 108h60l-6 10H40z"
        fill={`url(#${uid}-ring)`}
        stroke={`url(#${uid}-gold)`}
        strokeWidth="1"
      />
    </>
  );
}
