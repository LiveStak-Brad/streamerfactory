export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideSection = {
  heading: string;
  body: string;
};

export type GuidePillar = {
  slug: string;
  /** SEO title (appears in <title> via template) */
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  /** Sitemap priority 0–1 */
  priority: number;
  /** Keyword research estimate */
  keyword: {
    primary: string;
    monthlyVolume: string;
    difficulty: "Low" | "Medium" | "High" | "Very High";
    intent: "Informational" | "Commercial" | "Transactional";
  };
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedSlugs: string[];
  ctaPrimary: { label: string; href: string; external?: boolean };
  ctaSecondary: { label: string; href: string };
  streameruLinks?: { label: string; href: string }[];
};

/**
 * Creator-ecosystem content hub — pillar + supporting pages for topical authority.
 * Volumes/difficulty are directional estimates for planning (not live SERP API data).
 */
export const GUIDE_PILLARS: GuidePillar[] = [
  {
    slug: "tiktok-live-agency",
    title: "TikTok LIVE Agency",
    h1: "TikTok LIVE Agency Built for Serious Creators",
    description:
      "Streamer Factory is a TikTok LIVE agency offering recruitment, training, battle scheduling, and creator management for streamers who treat LIVE like a business.",
    keywords: [
      "TikTok LIVE agency",
      "TikTok live streaming agency",
      "TikTok LIVE creator agency",
      "join TikTok LIVE agency",
    ],
    priority: 0.98,
    keyword: {
      primary: "TikTok LIVE agency",
      monthlyVolume: "1.5K–4K",
      difficulty: "High",
      intent: "Commercial",
    },
    intro:
      "A TikTok LIVE agency should do more than collect usernames. Streamer Factory recruits creators, onboards them into a real operating system, trains them in StreamerU, and gives approved members Battle Hub tools to schedule, compete, and grow.",
    sections: [
      {
        heading: "What a TikTok LIVE agency actually does",
        body: "The best TikTok LIVE agencies recruit for fit, set clear expectations, teach retention and monetization systems, coordinate battles and community ops, and protect account safety. We focus on creators who want structure — not vanity network logos.",
      },
      {
        heading: "How Streamer Factory works",
        body: "First you join our Creator Network on TikTok. Then you request website access for StreamerU training, Battle Finder, and the shared calendar. After verification, you unlock member tools designed for daily LIVE operations.",
      },
      {
        heading: "Who this agency is for",
        body: "We work with TikTok LIVE creators who go live consistently, want coaching and accountability, and care about long-term growth — not overnight gimmicks. If you treat streaming like a hobby forever, this probably isn’t the fit.",
      },
      {
        heading: "Why creators choose Streamer Factory",
        body: "One layered system: recruitment → onboarding → training → battles → rankings. You get a curriculum (StreamerU), ops tooling (Battle Hub), and a network of creators moving in the same direction.",
      },
    ],
    faqs: [
      {
        question: "What is a TikTok LIVE agency?",
        answer:
          "A TikTok LIVE agency recruits and supports creators who stream on TikTok LIVE — typically with onboarding, training, battle coordination, and growth systems. Streamer Factory combines all of those into one creator network.",
      },
      {
        question: "How do I join Streamer Factory?",
        answer:
          "Apply to the Streamer Factory Creator Network on TikTok first, then request website access on this site so we can verify you and unlock StreamerU and Battle Hub.",
      },
      {
        question: "Is Streamer Factory free to join?",
        answer:
          "Joining the Creator Network and using public StreamerU lessons is designed to be accessible. Member tooling unlocks after verification. Check the apply page for the current process.",
      },
      {
        question: "Do you only work with large creators?",
        answer:
          "No. Fit and consistency matter more than raw follower count. Rising creators who show up and execute often outperform bigger inactive accounts.",
      },
    ],
    relatedSlugs: [
      "tiktok-creator-network",
      "how-to-join-tiktok-live-agency",
      "best-tiktok-live-agency",
      "tiktok-creator-agency",
    ],
    ctaPrimary: {
      label: "Join Creator Network on TikTok",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Request website access", href: "/apply" },
    streameruLinks: [
      { label: "Start StreamerU training", href: "/streameru/start-here" },
      { label: "Full StreamerU curriculum", href: "/streameru" },
    ],
  },
  {
    slug: "tiktok-creator-network",
    title: "TikTok Creator Network",
    h1: "TikTok Creator Network for LIVE Streamers",
    description:
      "Join the Streamer Factory TikTok Creator Network — structured recruiting, training, and community ops for TikTok LIVE creators.",
    keywords: [
      "TikTok Creator Network",
      "TikTok creator network apply",
      "join TikTok creator network",
      "TikTok LIVE creator network",
    ],
    priority: 0.96,
    keyword: {
      primary: "TikTok Creator Network",
      monthlyVolume: "2K–6K",
      difficulty: "High",
      intent: "Transactional",
    },
    intro:
      "Streamer Factory runs a TikTok Creator Network for LIVE-focused creators. The network is where membership starts on TikTok; this website is where training, scheduling, and day-to-day ops live after you’re verified.",
    sections: [
      {
        heading: "Creator Network vs random Discord invites",
        body: "A real creator network has standards, onboarding, and tools. Ours connects TikTok membership with StreamerU lessons, Battle Hub scheduling, rankings, and coaching-oriented culture.",
      },
      {
        heading: "The two-step join path",
        body: "Step 1: Join Creator Network on TikTok. Step 2: Request website access here. That sequence keeps TikTok membership authoritative while unlocking our training and battle systems.",
      },
      {
        heading: "What members unlock",
        body: "Approved creators get StreamerU (24-lesson curriculum), Battle Finder, battle scheduling, calendar visibility, and factory rankings that reward real LIVE performance.",
      },
    ],
    faqs: [
      {
        question: "What is the Streamer Factory Creator Network?",
        answer:
          "It is our TikTok Creator Network for LIVE streamers, paired with website tools for training, battles, and growth after verification.",
      },
      {
        question: "Why do I need website access too?",
        answer:
          "TikTok handles network membership. Streamer Factory’s site powers StreamerU, Battle Hub, rankings, and member coordination that TikTok alone doesn’t provide.",
      },
      {
        question: "How long does verification take?",
        answer:
          "After you request website access, our team reviews applications. You’ll see status updates on the application status page once submitted.",
      },
    ],
    relatedSlugs: ["tiktok-live-agency", "how-to-join-tiktok-live-agency", "what-is-a-creator-network", "creator-community"],
    ctaPrimary: {
      label: "Join on TikTok",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Request website access", href: "/apply" },
  },
  {
    slug: "tiktok-creator-agency",
    title: "TikTok Creator Agency",
    h1: "TikTok Creator Agency Focused on LIVE Growth",
    description:
      "Streamer Factory is a TikTok creator agency specializing in LIVE streaming growth, monetization systems, and creator management.",
    keywords: ["TikTok creator agency", "TikTok agency for creators", "LIVE creator agency"],
    priority: 0.94,
    keyword: {
      primary: "TikTok creator agency",
      monthlyVolume: "3K–8K",
      difficulty: "Very High",
      intent: "Commercial",
    },
    intro:
      "Most “TikTok agencies” chase short-form virality. Streamer Factory is a TikTok creator agency built around LIVE: retention, battles, coaching, and sustainable income systems.",
    sections: [
      {
        heading: "Creator agency services that matter on LIVE",
        body: "Recruiting, onboarding documentation, StreamerU training, battle coordination, rankings, and ongoing management — the ops stack creators actually use every week.",
      },
      {
        heading: "Agency vs MCN noise",
        body: "We don’t sell empty badges. Members get a curriculum, shared calendar, battle matching, and performance visibility. If a feature doesn’t help creators go live better, it doesn’t belong.",
      },
    ],
    faqs: [
      {
        question: "Is Streamer Factory a TikTok MCN?",
        answer:
          "We’re a TikTok LIVE creator agency / creator network focused on training and operations. Labels vary by platform; our product is concrete member tools plus coaching culture.",
      },
      {
        question: "What makes a good TikTok creator agency?",
        answer:
          "Clear join path, real training, active community ops, measurable growth systems, and account-safety guidance — not just a logo on a landing page.",
      },
    ],
    relatedSlugs: ["tiktok-live-agency", "creator-agency", "tiktok-creator-management", "creator-monetization"],
    ctaPrimary: {
      label: "Join Creator Network",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "See how we work", href: "/about" },
  },
  {
    slug: "how-to-join-tiktok-live-agency",
    title: "How to Join a TikTok LIVE Agency",
    h1: "How to Join a TikTok LIVE Agency (Step by Step)",
    description:
      "Learn how to join a TikTok LIVE agency the right way — including Streamer Factory’s Creator Network apply path and website access steps.",
    keywords: [
      "how to join a TikTok LIVE agency",
      "join TikTok agency",
      "TikTok LIVE agency application",
    ],
    priority: 0.93,
    keyword: {
      primary: "how to join a TikTok LIVE agency",
      monthlyVolume: "500–1.5K",
      difficulty: "Medium",
      intent: "Transactional",
    },
    intro:
      "Joining a TikTok LIVE agency should be simple: apply → verify → train → operate. Here’s the Streamer Factory path from first click to member tools.",
    sections: [
      {
        heading: "Step 1 — Join Creator Network on TikTok",
        body: "Use the official Streamer Factory Creator Network link on TikTok. This is the membership source of truth for the network.",
      },
      {
        heading: "Step 2 — Request website access",
        body: "Create an account on thestreamerfactory.com and submit the access form with your TikTok username and LIVE details so we can match you to the network.",
      },
      {
        heading: "Step 3 — Get verified",
        body: "Our team reviews applications. Track progress on the application status page. Approved members unlock Battle Hub and member features.",
      },
      {
        heading: "Step 4 — Train and go live with the system",
        body: "Start StreamerU’s Start Here path, complete missions, then use Battle Finder and the calendar to coordinate with the network.",
      },
    ],
    faqs: [
      {
        question: "Can I skip the TikTok step?",
        answer:
          "No. Creator Network membership on TikTok comes first. Website access is the second step for tools and training.",
      },
      {
        question: "What if my application is rejected?",
        answer:
          "You can review feedback on the status page and, when eligible, resubmit. Fit and readiness matter.",
      },
    ],
    relatedSlugs: ["tiktok-creator-network", "tiktok-live-agency", "best-tiktok-live-agency", "creator-academy"],
    ctaPrimary: {
      label: "Start: Join on TikTok",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Then request access", href: "/apply" },
  },
  {
    slug: "best-tiktok-live-agency",
    title: "Best TikTok LIVE Agency",
    h1: "What Makes the Best TikTok LIVE Agency?",
    description:
      "Criteria for choosing the best TikTok LIVE agency — and how Streamer Factory compares with training, battles, rankings, and creator ops.",
    keywords: ["best TikTok LIVE agency", "best TikTok agency for live streamers", "top TikTok LIVE agency"],
    priority: 0.9,
    keyword: {
      primary: "best TikTok LIVE agency",
      monthlyVolume: "400–1.2K",
      difficulty: "High",
      intent: "Commercial",
    },
    intro:
      "“Best” isn’t a logo contest. The best TikTok LIVE agency is the one that improves how you go live every week — with training, coordination, and accountability.",
    sections: [
      {
        heading: "Evaluation checklist",
        body: "Look for: clear join process, published training, active battle/community ops, transparent expectations, safety guidance, and proof of member activity (rankings, calendar, community).",
      },
      {
        heading: "How Streamer Factory scores",
        body: "We publish StreamerU curriculum, run Battle Hub tooling, surface factory rankings, and require a real Creator Network + verification path — so membership isn’t a black box.",
      },
      {
        heading: "Red flags at other agencies",
        body: "Pay-to-play with no coaching, no curriculum, dead Discords, pressure to use unsafe growth hacks, or agencies that only recruit and never operate.",
      },
    ],
    faqs: [
      {
        question: "Is Streamer Factory the best TikTok LIVE agency?",
        answer:
          "We’re built for creators who want systems. Compare our StreamerU curriculum, Battle Hub, and rankings against any agency that only offers a chat invite — then decide with proof.",
      },
    ],
    relatedSlugs: ["tiktok-live-agency", "how-to-join-tiktok-live-agency", "tiktok-live-tips", "creator-support"],
    ctaPrimary: { label: "Compare our approach", href: "/about" },
    ctaSecondary: { label: "Join the network", href: "/apply" },
  },
  {
    slug: "what-is-a-creator-network",
    title: "What Is a Creator Network?",
    h1: "What Is a Creator Network?",
    description:
      "Learn what a creator network is, how TikTok Creator Networks work, and how Streamer Factory supports LIVE creators beyond a logo.",
    keywords: ["what is a creator network", "creator network meaning", "TikTok creator network explained"],
    priority: 0.88,
    keyword: {
      primary: "what is a creator network",
      monthlyVolume: "1K–3K",
      difficulty: "Medium",
      intent: "Informational",
    },
    intro:
      "A creator network is an organized group of creators under shared standards, support, and often shared tooling. On TikTok, Creator Networks formalize that relationship — but the best networks still need an operating layer.",
    sections: [
      {
        heading: "Creator network basics",
        body: "Networks recruit creators, set norms, and provide community leverage. Without training and ops, they become empty directories.",
      },
      {
        heading: "TikTok Creator Networks",
        body: "TikTok’s Creator Network product is where membership lives on-platform. Streamer Factory pairs that with StreamerU and Battle Hub for daily execution.",
      },
      {
        heading: "Network vs agency vs MCN",
        body: "Terms overlap. What matters: who recruits you, who trains you, who helps you schedule/compete, and who is accountable when growth stalls.",
      },
    ],
    faqs: [
      {
        question: "Is a creator network the same as an agency?",
        answer:
          "Often overlapping. Agencies emphasize management/services; networks emphasize membership/community. Streamer Factory operates as both: network membership plus agency systems.",
      },
    ],
    relatedSlugs: ["tiktok-creator-network", "tiktok-creator-agency", "creator-community", "creator-agency"],
    ctaPrimary: {
      label: "Join our Creator Network",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Explore StreamerU", href: "/streameru" },
  },
  {
    slug: "tiktok-live-tips",
    title: "TikTok LIVE Tips",
    h1: "TikTok LIVE Tips That Actually Improve Streams",
    description:
      "Practical TikTok LIVE tips for retention, consistency, battles, and growth — from Streamer Factory’s StreamerU curriculum.",
    keywords: ["TikTok LIVE tips", "TikTok live streaming tips", "how to grow on TikTok LIVE"],
    priority: 0.9,
    keyword: {
      primary: "TikTok LIVE tips",
      monthlyVolume: "5K–12K",
      difficulty: "Medium",
      intent: "Informational",
    },
    intro:
      "Tips only matter if they become habits. These TikTok LIVE tips come from the same systems we teach inside StreamerU — structure, retention, battles, and consistency.",
    sections: [
      {
        heading: "Structure your first 30 minutes",
        body: "Open with a clear hook, run repeatable segments, and give new viewers a reason to stay. Empty-room talk is a skill — train it on purpose.",
      },
      {
        heading: "Consistency beats random grinding",
        body: "A reliable weekly LIVE schedule compounds trust. Rankings and growth systems reward creators who show up, not creators who stream once for 8 hours.",
      },
      {
        heading: "Use battles as practice, not panic",
        body: "Battles amplify energy and discovery when scheduled with intent. Battle Hub exists so matchups aren’t last-minute chaos.",
      },
      {
        heading: "Protect the account",
        body: "Growth without safety is temporary. Learn platform norms, avoid shady shortcuts, and build durable habits.",
      },
    ],
    faqs: [
      {
        question: "Where can I learn TikTok LIVE tips in order?",
        answer:
          "Start with StreamerU Start Here — the first four lessons — then continue through the full 24-lesson curriculum.",
      },
    ],
    relatedSlugs: ["tiktok-monetization-guide", "tiktok-growth", "creator-academy", "streamer-resources"],
    ctaPrimary: { label: "Start StreamerU", href: "/streameru/start-here" },
    ctaSecondary: { label: "Join the agency", href: "/apply" },
    streameruLinks: [
      { label: "Understanding TikTok LIVE + Setup", href: "/streameru/start-strong-on-tiktok-live" },
      { label: "Your first live structure", href: "/streameru/your-first-live-structure" },
      { label: "Hooks and first impressions", href: "/streameru/hooks-and-first-impressions" },
    ],
  },
  {
    slug: "tiktok-monetization-guide",
    title: "TikTok Monetization Guide",
    h1: "TikTok Monetization Guide for LIVE Creators",
    description:
      "A practical TikTok monetization guide for LIVE streamers — gifts, retention, battles, and sustainable income systems from Streamer Factory.",
    keywords: [
      "TikTok monetization",
      "TikTok LIVE monetization",
      "how to make money on TikTok LIVE",
      "TikTok creator monetization",
    ],
    priority: 0.91,
    keyword: {
      primary: "TikTok monetization",
      monthlyVolume: "10K–30K",
      difficulty: "High",
      intent: "Informational",
    },
    intro:
      "Monetization on TikTok LIVE is a retention and trust problem first, a gift problem second. This guide covers how Streamer Factory creators think about sustainable income.",
    sections: [
      {
        heading: "Earn the watch before the gift",
        body: "Viewers tip when sessions feel valuable and familiar. Focus on structure, community recognition, and repeatable moments before chasing gift goals.",
      },
      {
        heading: "Build a LIVE business rhythm",
        body: "Schedule, segments, battles, and follow-up habits create predictable earnings more reliably than viral spikes.",
      },
      {
        heading: "Train the skill stack",
        body: "StreamerU covers retention, battles, growth, and safety — the monetization stack behind the scenes.",
      },
    ],
    faqs: [
      {
        question: "Can a TikTok LIVE agency help me earn more?",
        answer:
          "A good agency improves systems: better streams, better battles, better consistency. Earnings still depend on your execution and audience.",
      },
    ],
    relatedSlugs: ["creator-monetization", "tiktok-live-tips", "tiktok-growth", "creator-coaching"],
    ctaPrimary: { label: "Train in StreamerU", href: "/streameru" },
    ctaSecondary: { label: "Apply to join", href: "/apply" },
  },
  {
    slug: "creator-academy",
    title: "Creator Academy",
    h1: "Creator Academy for TikTok LIVE — StreamerU",
    description:
      "StreamerU is Streamer Factory’s creator academy: a 24-lesson TikTok LIVE curriculum covering foundations, retention, battles, growth, and safety.",
    keywords: ["creator academy", "TikTok LIVE academy", "streamer training", "TikTok creator training"],
    priority: 0.92,
    keyword: {
      primary: "creator academy",
      monthlyVolume: "2K–5K",
      difficulty: "Medium",
      intent: "Commercial",
    },
    intro:
      "StreamerU is our creator academy — one curriculum, 24 lessons, missions that push you into real LIVEs. Public lessons build skill; member tools connect training to network ops.",
    sections: [
      {
        heading: "What you’ll learn",
        body: "Beginner foundations, live streaming mastery, battle systems, growth systems, and long-term account safety — sequenced so you don’t skip the basics.",
      },
      {
        heading: "Start Here path",
        body: "New creators should begin with the Start Here track: the first four lessons designed to get you live with structure fast.",
      },
      {
        heading: "Missions, not just reading",
        body: "Each lesson pairs study with a practical mission so progress shows up on stream — not only in bookmarks.",
      },
    ],
    faqs: [
      {
        question: "Is StreamerU free?",
        answer:
          "StreamerU lessons are publicly accessible for learning. Member battle tools unlock after Creator Network join + website verification.",
      },
    ],
    relatedSlugs: ["streamer-resources", "tiktok-live-tips", "creator-coaching", "tiktok-live-agency"],
    ctaPrimary: { label: "Enter StreamerU", href: "/streameru" },
    ctaSecondary: { label: "Start Here", href: "/streameru/start-here" },
  },
  {
    slug: "streamer-resources",
    title: "Streamer Resources",
    h1: "Streamer Resources for TikTok LIVE Creators",
    description:
      "Curated streamer resources from Streamer Factory — StreamerU lessons, LIVE tips, monetization guides, and agency join paths.",
    keywords: ["streamer resources", "TikTok LIVE resources", "creator resources", "live streaming resources"],
    priority: 0.87,
    keyword: {
      primary: "streamer resources",
      monthlyVolume: "1K–3K",
      difficulty: "Low",
      intent: "Informational",
    },
    intro:
      "One hub for Streamer Factory resources: training, guides, rankings, and the join path. Bookmark this page when you need the next step.",
    sections: [
      {
        heading: "Training library",
        body: "StreamerU is the core library — 24 lessons with missions. Start Here if you’re new.",
      },
      {
        heading: "Growth & monetization guides",
        body: "Use our TikTok LIVE tips, monetization guide, and growth pages to deepen specific skills.",
      },
      {
        heading: "Network tools",
        body: "After verification: Battle Hub, rankings, and member dashboard connect resources to daily action.",
      },
    ],
    faqs: [
      {
        question: "Where should beginners start?",
        answer: "Start Here in StreamerU, then the How to Join guide if you’re ready for the Creator Network.",
      },
    ],
    relatedSlugs: ["creator-academy", "tiktok-live-tips", "tiktok-monetization-guide", "how-to-join-tiktok-live-agency"],
    ctaPrimary: { label: "Open StreamerU", href: "/streameru" },
    ctaSecondary: { label: "Browse all guides", href: "/guides" },
    streameruLinks: [
      { label: "StreamerU hub", href: "/streameru" },
      { label: "Start Here", href: "/streameru/start-here" },
      { label: "Factory rankings", href: "/rankings" },
    ],
  },
  {
    slug: "tiktok-agency",
    title: "TikTok Agency",
    h1: "TikTok Agency for LIVE Creators",
    description:
      "Streamer Factory is a TikTok agency for LIVE streamers — recruitment, creator management, training, and battle operations.",
    keywords: ["TikTok agency", "TikTok streaming agency", "TikTok LIVE agency"],
    priority: 0.95,
    keyword: {
      primary: "TikTok agency",
      monthlyVolume: "8K–20K",
      difficulty: "Very High",
      intent: "Commercial",
    },
    intro:
      "Searching for a TikTok agency usually means you want growth help. Streamer Factory specializes in TikTok LIVE — not generic influencer matchmaking.",
    sections: [
      {
        heading: "LIVE-first agency model",
        body: "We recruit, train, and operate around live streaming performance: sessions, battles, retention, and rankings.",
      },
      {
        heading: "From agency pitch to daily tools",
        body: "Most agencies end at Discord. We ship StreamerU + Battle Hub so the relationship continues after you join.",
      },
    ],
    faqs: [
      {
        question: "What does a TikTok agency do?",
        answer:
          "Depending on the agency: recruiting, management, brand deals, or LIVE ops. Streamer Factory focuses on LIVE creator growth systems.",
      },
    ],
    relatedSlugs: ["tiktok-live-agency", "tiktok-creator-agency", "tiktok-streaming-agency", "creator-agency"],
    ctaPrimary: {
      label: "Join Creator Network",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Request access", href: "/apply" },
  },
  {
    slug: "creator-agency",
    title: "Creator Agency",
    h1: "Creator Agency for Livestreamers",
    description:
      "Streamer Factory is a creator agency helping livestreamers grow with training, community, and professional management systems.",
    keywords: ["creator agency", "content creator agency", "livestream creator agency"],
    priority: 0.86,
    keyword: {
      primary: "creator agency",
      monthlyVolume: "5K–15K",
      difficulty: "Very High",
      intent: "Commercial",
    },
    intro:
      "A modern creator agency should improve output quality and business systems. For LIVE creators, that means coaching, scheduling, battles, and measurable progress.",
    sections: [
      {
        heading: "What we manage",
        body: "Onboarding, training paths, battle coordination, and performance visibility — so creators aren’t operating alone.",
      },
    ],
    faqs: [
      {
        question: "Do creator agencies take a cut?",
        answer:
          "Models vary by agency and platform. Streamer Factory’s join path starts with Creator Network membership and website verification — see apply for current terms and expectations.",
      },
    ],
    relatedSlugs: [
      "content-creator-agency",
      "tiktok-creator-agency",
      "tiktok-creator-management",
      "creator-support",
    ],
    ctaPrimary: { label: "Join Streamer Factory", href: "/apply" },
    ctaSecondary: { label: "About the agency", href: "/about" },
  },
  {
    slug: "livestream-agency",
    title: "Livestream Agency",
    h1: "Livestream Agency for TikTok Creators",
    description:
      "Looking for a livestream agency? Streamer Factory specializes in TikTok LIVE recruitment, coaching, battles, and creator operations.",
    keywords: ["livestream agency", "live streaming agency", "LIVE agency"],
    priority: 0.84,
    keyword: {
      primary: "livestream agency",
      monthlyVolume: "1K–3K",
      difficulty: "Medium",
      intent: "Commercial",
    },
    intro:
      "Livestream agencies exist because LIVE is an ops sport. Streamer Factory is built for TikTok LIVE creators who want a real operating partner.",
    sections: [
      {
        heading: "Ops over vibes",
        body: "Calendar, battles, curriculum, rankings — the unglamorous systems that make livestream careers durable.",
      },
    ],
    faqs: [
      {
        question: "Is a livestream agency worth it?",
        answer:
          "Yes if it gives you training and coordination you won’t build alone. No if it’s only a branding badge.",
      },
    ],
    relatedSlugs: ["tiktok-streaming-agency", "tiktok-live-agency", "creator-coaching", "tiktok-live-tips"],
    ctaPrimary: {
      label: "Join the network",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "See Battle Hub", href: "/battle-hub" },
  },
  {
    slug: "tiktok-streaming-agency",
    title: "TikTok Streaming Agency",
    h1: "TikTok Streaming Agency for LIVE Growth",
    description:
      "Streamer Factory is a TikTok streaming agency helping creators improve LIVE performance with training, battles, and network support.",
    keywords: ["TikTok streaming agency", "TikTok streamer agency", "TikTok LIVE streaming agency"],
    priority: 0.85,
    keyword: {
      primary: "TikTok streaming agency",
      monthlyVolume: "800–2K",
      difficulty: "Medium",
      intent: "Commercial",
    },
    intro:
      "If you stream on TikTok, you need a streaming agency that understands LIVE dynamics — pacing, battles, gifts, and retention — not just short-form posting calendars.",
    sections: [
      {
        heading: "Built for streamers",
        body: "Our tools assume you go live: Battle Hub, rankings, and StreamerU missions are LIVE-native.",
      },
    ],
    faqs: [
      {
        question: "Do you support non-TikTok platforms?",
        answer:
          "Our current focus is TikTok LIVE and the Streamer Factory Creator Network ecosystem.",
      },
    ],
    relatedSlugs: ["tiktok-live-agency", "livestream-agency", "tiktok-agency", "tiktok-growth"],
    ctaPrimary: { label: "Apply now", href: "/apply" },
    ctaSecondary: { label: "View rankings", href: "/rankings" },
  },
  {
    slug: "content-creator-agency",
    title: "Content Creator Agency",
    h1: "Content Creator Agency for LIVE Performers",
    description:
      "Streamer Factory is a content creator agency specializing in TikTok LIVE — recruiting creators and giving them training plus ops tools.",
    keywords: ["content creator agency", "creator management agency", "LIVE content creator agency"],
    priority: 0.8,
    keyword: {
      primary: "content creator agency",
      monthlyVolume: "4K–10K",
      difficulty: "High",
      intent: "Commercial",
    },
    intro:
      "Content creator agencies often optimize clips and brand deals. We optimize LIVE performance — the session itself — because that’s where Streamer Factory creators win.",
    sections: [
      {
        heading: "LIVE is the product",
        body: "Our content systems teach hooks, segments, retention loops, and battle energy inside real streams.",
      },
    ],
    faqs: [
      {
        question: "Do you help with short-form content too?",
        answer:
          "LIVE is the core. Short-form can support discovery, but our curriculum and tools prioritize live session excellence.",
      },
    ],
    relatedSlugs: ["creator-agency", "tiktok-creator-agency", "creator-monetization", "creator-academy"],
    ctaPrimary: { label: "Join", href: "/apply" },
    ctaSecondary: { label: "Creator academy", href: "/guides/creator-academy" },
  },
  {
    slug: "creator-coaching",
    title: "Creator Coaching",
    h1: "Creator Coaching for TikTok LIVE",
    description:
      "Creator coaching through Streamer Factory — structured StreamerU training, missions, and network accountability for TikTok LIVE growth.",
    keywords: ["creator coaching", "TikTok LIVE coaching", "streamer coaching"],
    priority: 0.83,
    keyword: {
      primary: "creator coaching",
      monthlyVolume: "2K–5K",
      difficulty: "Medium",
      intent: "Commercial",
    },
    intro:
      "Coaching without a curriculum becomes random advice. Streamer Factory pairs creator coaching culture with StreamerU lessons and missions so feedback has a system.",
    sections: [
      {
        heading: "Curriculum-backed coaching",
        body: "Creators progress through foundations → mastery → battles → growth → safety, with missions that force practice.",
      },
      {
        heading: "Network accountability",
        body: "Rankings and battle coordination add social pressure in the healthy direction: show up and improve.",
      },
    ],
    faqs: [
      {
        question: "Is coaching 1:1?",
        answer:
          "Support models evolve with the network. Everyone gets StreamerU structure; deeper support depends on membership stage and capacity.",
      },
    ],
    relatedSlugs: ["creator-academy", "creator-support", "tiktok-live-tips", "tiktok-growth"],
    ctaPrimary: { label: "Start training", href: "/streameru/start-here" },
    ctaSecondary: { label: "Join for full access", href: "/apply" },
  },
  {
    slug: "creator-community",
    title: "Creator Community",
    h1: "Creator Community Built Around LIVE Ops",
    description:
      "Join a TikTok LIVE creator community with real tools — Streamer Factory’s network, Battle Hub, rankings, and StreamerU.",
    keywords: ["creator community", "TikTok creator community", "streamer community"],
    priority: 0.82,
    keyword: {
      primary: "creator community",
      monthlyVolume: "3K–8K",
      difficulty: "High",
      intent: "Commercial",
    },
    intro:
      "Creator communities die when they’re chat-only. Ours is tied to battles, rankings, and training — so community activity maps to LIVE activity.",
    sections: [
      {
        heading: "Community with a job to do",
        body: "Find opponents, schedule sessions, learn together, compete on factory rankings — community as infrastructure.",
      },
    ],
    faqs: [
      {
        question: "Is the community public?",
        answer:
          "Public pages show members and rankings. Battle tools unlock after verification so coordination stays high-signal.",
      },
    ],
    relatedSlugs: ["tiktok-creator-network", "what-is-a-creator-network", "creator-support", "best-tiktok-live-agency"],
    ctaPrimary: {
      label: "Join Creator Network",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Meet members", href: "/members" },
  },
  {
    slug: "tiktok-recruiter",
    title: "TikTok Recruiter",
    h1: "TikTok Recruiter & Creator Recruitment",
    description:
      "Streamer Factory recruits TikTok LIVE creators into a structured Creator Network with training and ops — not cold spam.",
    keywords: ["TikTok recruiter", "TikTok creator recruiter", "recruit TikTok creators"],
    priority: 0.78,
    keyword: {
      primary: "TikTok recruiter",
      monthlyVolume: "300–900",
      difficulty: "Low",
      intent: "Commercial",
    },
    intro:
      "If a TikTok recruiter messages you, ask what happens after you join. Streamer Factory’s answer is StreamerU, Battle Hub, rankings, and a clear verification path.",
    sections: [
      {
        heading: "Recruiting with standards",
        body: "We recruit for consistency and fit. Creators should evaluate agencies the same way — demand systems, not slogans.",
      },
      {
        heading: "For creators being recruited",
        body: "Use our Best TikTok LIVE Agency checklist before accepting any network invite.",
      },
    ],
    faqs: [
      {
        question: "How does Streamer Factory recruit?",
        answer:
          "Through Creator Network applications and selective outreach. Website access requires verification after the TikTok join step.",
      },
    ],
    relatedSlugs: ["how-to-join-tiktok-live-agency", "best-tiktok-live-agency", "tiktok-creator-network", "tiktok-creator-management"],
    ctaPrimary: { label: "Apply to join", href: "/apply" },
    ctaSecondary: { label: "Read the checklist", href: "/guides/best-tiktok-live-agency" },
  },
  {
    slug: "creator-monetization",
    title: "Creator Monetization",
    h1: "Creator Monetization Systems for LIVE",
    description:
      "Creator monetization for TikTok LIVE — retention-first earning systems, battles, and training from Streamer Factory.",
    keywords: ["creator monetization", "LIVE creator monetization", "streamer income"],
    priority: 0.84,
    keyword: {
      primary: "creator monetization",
      monthlyVolume: "4K–9K",
      difficulty: "Medium",
      intent: "Informational",
    },
    intro:
      "Creator monetization on LIVE is a product of retention, trust, and consistency. Streamer Factory trains that stack — then connects creators to network ops that keep momentum.",
    sections: [
      {
        heading: "Monetization is a system",
        body: "Session quality → returning viewers → gift culture → battle spikes → schedule reliability. Skip a layer and income gets fragile.",
      },
    ],
    faqs: [
      {
        question: "Where should I start?",
        answer: "Read the TikTok Monetization Guide, then train the matching StreamerU lessons.",
      },
    ],
    relatedSlugs: ["tiktok-monetization-guide", "tiktok-growth", "creator-coaching", "tiktok-live-tips"],
    ctaPrimary: { label: "Monetization guide", href: "/guides/tiktok-monetization-guide" },
    ctaSecondary: { label: "Join Streamer Factory", href: "/apply" },
  },
  {
    slug: "tiktok-growth",
    title: "TikTok Growth",
    h1: "TikTok Growth for LIVE Creators",
    description:
      "TikTok growth strategies for LIVE streamers — retention, consistency, battles, and Streamer Factory systems that compound.",
    keywords: ["TikTok growth", "grow on TikTok LIVE", "TikTok LIVE growth"],
    priority: 0.88,
    keyword: {
      primary: "TikTok growth",
      monthlyVolume: "15K–40K",
      difficulty: "Very High",
      intent: "Informational",
    },
    intro:
      "TikTok growth advice is noisy. For LIVE creators, growth comes from watchable sessions, consistent schedules, smart battles, and staying on the right side of platform safety.",
    sections: [
      {
        heading: "Growth levers that matter",
        body: "Retention loops, hooks, weekly cadence, battle scheduling, and community recognition beat random hashtag myths.",
      },
      {
        heading: "Measure what you can control",
        body: "Factory rankings track coins, hours, activeness, and battles — useful mirrors for effort quality over vanity spikes.",
      },
    ],
    faqs: [
      {
        question: "How fast will I grow?",
        answer:
          "It depends on niche, consistency, and execution. Agencies accelerate systems; they don’t guarantee viral outcomes.",
      },
    ],
    relatedSlugs: ["tiktok-live-tips", "tiktok-monetization-guide", "creator-academy", "best-tiktok-live-agency"],
    ctaPrimary: { label: "Train growth systems", href: "/streameru" },
    ctaSecondary: { label: "See rankings", href: "/rankings" },
  },
  {
    slug: "creator-support",
    title: "Creator Support",
    h1: "Creator Support That Shows Up Weekly",
    description:
      "Creator support from Streamer Factory — training, battle coordination, onboarding clarity, and a network that doesn’t disappear after signup.",
    keywords: ["creator support", "TikTok creator support", "streamer support"],
    priority: 0.8,
    keyword: {
      primary: "creator support",
      monthlyVolume: "1K–3K",
      difficulty: "Low",
      intent: "Commercial",
    },
    intro:
      "Creator support should reduce confusion and increase LIVE quality. Streamer Factory supports creators with StreamerU, Battle Hub, clear join steps, and an active network.",
    sections: [
      {
        heading: "Support channels that matter",
        body: "Documentation, curriculum, scheduling tools, rankings feedback loops, and human review on applications — support as infrastructure.",
      },
    ],
    faqs: [
      {
        question: "How do I contact Streamer Factory?",
        answer: "Use the contact page or email team@thestreamerfactory.com for partnership and access questions.",
      },
    ],
    relatedSlugs: ["creator-coaching", "creator-community", "how-to-join-tiktok-live-agency", "tiktok-live-agency"],
    ctaPrimary: { label: "Contact us", href: "/contact" },
    ctaSecondary: { label: "Join the network", href: "/apply" },
  },
  {
    slug: "tiktok-creator-program",
    title: "TikTok Creator Program",
    h1: "TikTok Creator Program vs Creator Network",
    description:
      "Understand TikTok creator programs and networks — and how Streamer Factory’s Creator Network helps LIVE creators grow with training and ops.",
    keywords: ["TikTok Creator Program", "TikTok creator programs", "TikTok LIVE creator program"],
    priority: 0.81,
    keyword: {
      primary: "TikTok Creator Program",
      monthlyVolume: "2K–6K",
      difficulty: "High",
      intent: "Informational",
    },
    intro:
      "TikTok offers multiple creator programs and network products. Streamer Factory’s Creator Network is our membership layer for LIVE creators, paired with website training and battle tools.",
    sections: [
      {
        heading: "Don’t confuse program labels",
        body: "Platform programs change names and perks. Evaluate what you unlock: training, community, monetization tools, and operating support.",
      },
      {
        heading: "Our program in practice",
        body: "Join on TikTok → request site access → train in StreamerU → compete and coordinate in Battle Hub.",
      },
    ],
    faqs: [
      {
        question: "Is this TikTok’s official Creativity Program?",
        answer:
          "No. Streamer Factory is an independent TikTok LIVE creator agency/network. TikTok platform programs are separate; we help creators operate inside the LIVE ecosystem.",
      },
    ],
    relatedSlugs: ["tiktok-creator-network", "what-is-a-creator-network", "tiktok-creator-management", "how-to-join-tiktok-live-agency"],
    ctaPrimary: {
      label: "Join our Creator Network",
      href: "https://www.tiktok.com/t/ZTkvnxHmY/",
      external: true,
    },
    ctaSecondary: { label: "Learn the join steps", href: "/guides/how-to-join-tiktok-live-agency" },
  },
  {
    slug: "tiktok-creator-management",
    title: "TikTok Creator Management",
    h1: "TikTok Creator Management for LIVE Teams",
    description:
      "TikTok creator management with Streamer Factory — onboarding, training, battle ops, and performance systems for LIVE creators.",
    keywords: ["TikTok creator management", "creator management", "manage TikTok creators"],
    priority: 0.82,
    keyword: {
      primary: "TikTok creator management",
      monthlyVolume: "700–2K",
      difficulty: "Medium",
      intent: "Commercial",
    },
    intro:
      "Creator management shouldn’t mean micromanaging personalities. It means giving creators a clear operating system: training path, schedule tools, battle matching, and performance mirrors.",
    sections: [
      {
        heading: "Management as systems",
        body: "Streamer Factory manages through StreamerU progress, Battle Hub coordination, rankings, and application standards — scalable support without chaos.",
      },
    ],
    faqs: [
      {
        question: "Do you manage brand deals?",
        answer:
          "Our primary focus is LIVE performance systems. Brand and partnership conversations happen through the team when relevant — start via Contact.",
      },
    ],
    relatedSlugs: ["tiktok-creator-agency", "creator-agency", "creator-support", "tiktok-recruiter"],
    ctaPrimary: { label: "Talk to the team", href: "/contact" },
    ctaSecondary: { label: "Creator join path", href: "/apply" },
  },
];

const bySlug = new Map(GUIDE_PILLARS.map((g) => [g.slug, g]));

export function getGuideBySlug(slug: string): GuidePillar | undefined {
  return bySlug.get(slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDE_PILLARS.map((g) => g.slug);
}

export function getRelatedGuides(slug: string): GuidePillar[] {
  const guide = bySlug.get(slug);
  if (!guide) return [];
  return guide.relatedSlugs
    .map((related) => bySlug.get(related))
    .filter((g): g is GuidePillar => Boolean(g));
}
