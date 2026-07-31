/** Canonical founder portrait — same asset as Hall of Fame Network Leadership. */
export const FOUNDER_PHOTO = "/branding/team/brad-morris.png" as const;

export const FOUNDER = {
  name: "Brad Morris",
  alias: "CannaStreams",
  title: "Founder of Streamer Factory",
  tiktokHandle: "warrentonjunk",
  photo: FOUNDER_PHOTO,
} as const;

export const FOUNDER_STATS = [
  {
    id: "years",
    value: 6,
    suffix: "+",
    label: "Years Professional Live Streaming",
    display: "6+",
    numeric: true,
  },
  {
    id: "tiktok",
    value: 123000,
    suffix: "+",
    label: "TikTok Followers",
    display: "123,000+",
    numeric: true,
  },
  {
    id: "bigo",
    value: 55000,
    suffix: "+",
    label: "BIGO Followers",
    display: "55,000+",
    numeric: true,
  },
  {
    id: "multi",
    value: 30000,
    suffix: "+",
    label: "Followers on six different streaming apps",
    display: "30,000+",
    numeric: true,
  },
  {
    id: "earned",
    value: null,
    suffix: "",
    label: "Earned through live streaming",
    display: "Hundreds of thousands",
    numeric: false,
  },
  {
    id: "tt-pro",
    value: null,
    suffix: "",
    label: "TikTok LIVE credential",
    display: "TikTok LIVE Pro",
    numeric: false,
  },
  {
    id: "meetme",
    value: 22,
    suffix: "",
    label: "MeetMe Top Badge — earned in only 22 days",
    display: "22 days",
    numeric: true,
  },
  {
    id: "kik",
    value: null,
    suffix: "",
    label: "Former #1 All-Time Creator on Kik LIVE",
    display: "#1 All-Time",
    numeric: false,
  },
  {
    id: "kik-legacy",
    value: null,
    suffix: "",
    label: "Still #2 All-Time overall & #1 Male after 2+ years away",
    display: "#2 Overall",
    numeric: false,
  },
] as const;

export const FOUNDER_PLATFORMS = [
  {
    id: "meetme",
    name: "MeetMe",
    monogram: "M",
    accent: "from-[#FF6B9D] to-[#C44BFF]",
    followers: "Built a dedicated LIVE audience from scratch",
    achievements: [
      "Top Badge acquired in only 22 days",
      "Learned how retention and personality drive gifts",
    ],
    lesson:
      "The first platform taught me that consistency isn't optional — it's the whole game.",
  },
  {
    id: "tagged",
    name: "Tagged",
    monogram: "Tg",
    accent: "from-[#FF8A3D] to-[#FF2ED1]",
    followers: "Grew another LIVE audience in a new room",
    achievements: [
      "Carried the same retention habits into a different app",
      "Proved the craft wasn't tied to one community",
    ],
    lesson:
      "If you can hold a room on a new platform, you own the skill — not the app.",
  },
  {
    id: "kik",
    name: "Kik LIVE",
    monogram: "K",
    accent: "from-[#5B3BFF] to-[#00E5FF]",
    followers: "Rose to #1 All-Time Creator",
    achievements: [
      "Former #1 All-Time overall",
      "Still #2 All-Time & #1 Male after 2+ years away",
    ],
    lesson:
      "Systems compound. Leave the room for years and the work you put in still shows.",
  },
  {
    id: "bigo",
    name: "BIGO LIVE",
    monogram: "B",
    accent: "from-[#A020F0] to-[#5B3BFF]",
    followers: "55,000+ followers",
    achievements: [
      "Proved the playbook travels across apps",
      "Grew another account without starting from celebrity",
    ],
    lesson:
      "If your strategy only works on one algorithm, it isn't a strategy.",
  },
  {
    id: "tiktok",
    name: "TikTok LIVE",
    monogram: "T",
    accent: "from-[#00E5FF] to-[#FF2ED1]",
    followers: "123,000+ followers",
    achievements: [
      "TikTok LIVE Pro",
      "Scaled LIVE into a sustainable business",
    ],
    lesson:
      "Battles create discovery. Community creates longevity. Both matter.",
  },
  {
    id: "favorited",
    name: "Favorited",
    monogram: "F",
    accent: "from-[#F5C518] to-[#FF2ED1]",
    followers: "Over 30,000 followers",
    achievements: [
      "Over $100,000 in the first 3 months",
      "Over 30,000 followers",
    ],
    lesson:
      "When the system is right, momentum shows up fast — income and audience together.",
  },
  {
    id: "sf",
    name: "Streamer Factory",
    monogram: "SF",
    accent: "from-[#5B3BFF] via-[#A020F0] to-[#FF2ED1]",
    followers: "The system, documented",
    achievements: [
      "Training, battles, rankings, and network in one place",
      "Built so creators skip years of expensive mistakes",
    ],
    lesson:
      "Everything I learned the hard way now lives here — so you don't have to.",
  },
] as const;

export const FOUNDER_PRINCIPLES = [
  {
    title: "Consistency beats luck",
    body: "Showing up on the days you don't feel like it is what separates careers from hobbies.",
    icon: "consistency",
  },
  {
    title: "Community beats algorithms",
    body: "Algorithms change. People who care about your stream don't.",
    icon: "community",
  },
  {
    title: "Retention beats viral moments",
    body: "A clip can spike numbers. Relationships keep the room full next week.",
    icon: "retention",
  },
  {
    title: "Personality beats production",
    body: "Viewers don't need a studio. They need a reason to come back for you.",
    icon: "personality",
  },
  {
    title: "Networking accelerates growth",
    body: "The right battles, intros, and collaborations compress years into months.",
    icon: "network",
  },
  {
    title: "Battles create discovery",
    body: "Used right, battles aren't chaos — they're a growth engine with rules.",
    icon: "battles",
  },
  {
    title: "Viewers return because of YOU",
    body: "Gimmicks fade. Being someone worth spending an hour with doesn't.",
    icon: "you",
  },
] as const;

export const FOUNDER_TRUST = [
  {
    quote: "I've started over multiple times.",
    detail: "New apps. New accounts. Same discipline. Starting over is a skill.",
  },
  {
    quote: "I've succeeded on multiple platforms.",
    detail: "MeetMe, Tagged, Kik LIVE, BIGO, TikTok LIVE, Favorited — the principles traveled with me.",
  },
  {
    quote: "I've grown new accounts from scratch.",
    detail: "No borrowed fame. No shortcuts that only work once.",
  },
  {
    quote: "My strategies rely on people, not one algorithm.",
    detail: "When the app changes, your community is still yours.",
  },
] as const;

export const FOUNDER_JOURNEY_MILESTONES = [
  {
    id: "discover",
    title: "Discovering live streaming",
    body: "I found LIVE the way a lot of creators do — curiosity first, then obsession. What started as hanging out in livestream communities turned into studying viewer engagement, gifts, and why some rooms felt alive while others went quiet.",
  },
  {
    id: "communities",
    title: "Growing communities on multiple platforms",
    body: "MeetMe LIVE and Tagged taught me that audience retention is a skill. You don't keep people with filters. You keep them by making them feel seen, heard, and part of something.",
  },
  {
    id: "six-apps",
    title: "Building audiences across six streaming apps",
    body: "I didn't stay comfortable on one app. I rebuilt across MeetMe, Tagged, Kik LIVE, BIGO LIVE, TikTok LIVE, and Favorited — proving creator monetization and community habits can travel when the fundamentals are real.",
  },
  {
    id: "milestones",
    title: "Achieving major platform milestones",
    body: "Top Badge on MeetMe in only 22 days. #1 All-Time on Kik LIVE. Strong BIGO growth. Momentum that wasn't a fluke — it was the same system applied in different rooms.",
  },
  {
    id: "tiktok-pro",
    title: "Becoming TikTok LIVE Pro",
    body: "TikTok LIVE became the biggest stage. LIVE Pro wasn't a trophy for me — it was confirmation that livestream battles, creator networking, and consistent shows could scale into a real TikTok LIVE growth path.",
  },
  {
    id: "founded",
    title: "Founding Streamer Factory",
    body: "I built Streamer Factory so creators wouldn't have to learn every lesson the expensive way. It's a TikTok LIVE agency and creator education home — training, battles, rankings, and support in one creator network.",
  },
] as const;

export const FOUNDER_YEARS_TAUGHT = [
  {
    id: "retention",
    title: "Audience retention is the real growth metric",
    body: "Viral spikes feel good. Retention pays rent. Years of streaming taught me that TikTok LIVE growth and growth on every other app comes down to whether people come back tomorrow. If your chat feels like a revolving door, no battle schedule will save you. Teach people your energy, your pace, your inside jokes — then protect that room like it's the business, because it is.",
  },
  {
    id: "consistency",
    title: "Stream consistency compounds quietly",
    body: "Most creators overestimate what one perfect stream can do and underestimate what 90 ordinary ones can do. Consistency is how livestream communities form. Same windows. Same standards. Same follow-through. When viewers can predict you'll show up, they start planning their night around you — and that's when a hobby starts looking like a career.",
  },
  {
    id: "community",
    title: "Building communities beats chasing clips",
    body: "A clip can introduce you. A community keeps you. I learned to treat every regular like a co-builder of the room — shoutouts, callbacks, roles, rituals. Creator education that only talks about going viral misses the point. Sustainable TikTok LIVE creator careers are built on belonging.",
  },
  {
    id: "networking",
    title: "Networking with creators accelerates everything",
    body: "Creator networking isn't fake “collab for the algorithm” energy. It's relationships. The right intros, the right battles, the right people who raise your game — that compresses years of discovery into months. Inside Streamer Factory, Battle Hub exists for that reason: structured growth through other creators, not isolation.",
  },
  {
    id: "battles",
    title: "Why livestream battles matter",
    body: "Battles are discovery with a scoreboard. Used badly, they're chaos. Used well, they're a live streaming strategy for attention, energy, and new faces. The win isn't always the gift total — it's converting battle traffic into repeat viewers who stick after the timer ends.",
  },
  {
    id: "repeat",
    title: "Creating repeat viewers on purpose",
    body: "Repeat viewers don't happen by accident. They happen because you give people a reason to return: unfinished stories, scheduled shows, familiar faces in chat, and a host who remembers names. Viewer engagement is personal before it's technical. If you're only performing at the camera, you're missing half the craft.",
  },
  {
    id: "monetization",
    title: "Monetization follows trust",
    body: "Creator monetization works when people want to support the room — not when you beg louder. Gifting culture, offers, and timing all matter, but trust comes first. Across platforms I learned the same lesson: income is a lagging indicator of how valued people feel when they're with you live.",
  },
  {
    id: "mindset",
    title: "Creator mindset under pressure",
    body: "Empty rooms. Bad nights. Algorithm shifts. Starting over. A live streaming mentor who hasn't lived those moments is guessing. Mindset isn't toxic positivity — it's staying coachable, reviewing what failed, and getting back on when it would be easier to quit. That's the difference between a TikTok LIVE coach who teaches theory and someone who's still in the arena.",
  },
] as const;

export const FOUNDER_FAILURE_LESSONS = [
  {
    title: "Consistency beats viral moments",
    body: "I chased spikes early. They felt like progress until the next night was empty again. The creators who win treat consistency like the product. One viral moment is a spark. A schedule is a furnace.",
  },
  {
    title: "Community beats algorithms",
    body: "I wasted energy trying to “crack” apps instead of cracking hospitality. Algorithms change. People who love your stream don't. Build for them and the algorithm becomes weather — not your entire strategy.",
  },
  {
    title: "Mistakes new creators commonly make",
    body: "Going live with no plan. Battling everyone. Ignoring chat. Copying someone else's personality. Quitting after two quiet weeks. Waiting for perfect gear. Those mistakes cost me years. Streamer Factory's guides and StreamerU lessons exist so you don't pay the same tuition.",
  },
  {
    title: "Starting over made the strategy stronger",
    body: "Restarting on new platforms felt like losing everything — until I realized I was keeping the only asset that mattered: the playbook. Every rebuild sharpened LIVE coaching instincts around retention, networking, and monetization that didn't depend on one feed.",
  },
] as const;

export const FOUNDER_PHILOSOPHY = [
  {
    title: "Build sustainable communities",
    body: "Growth that disappears next month isn't growth. I coach creators to build livestream communities that can survive a bad week, a platform change, and a dry gift night — because that's real life on LIVE.",
  },
  {
    title: "Grow through relationships, not shortcuts",
    body: "Shortcuts create fragile numbers. Relationships create careers. Whether you're learning how to grow on TikTok LIVE or rebuilding on a new app, the path that lasts runs through people — your chat, your battle partners, your network.",
  },
  {
    title: "Long-term success over chasing trends",
    body: "Trends are useful. Dependency on trends is dangerous. A TikTok LIVE expert worth listening to will tell you to borrow momentum from trends without rebuilding your identity every week.",
  },
  {
    title: "Education and support over hype",
    body: "Streamer Factory focuses on creator education and support because hype doesn't show up when your room is quiet. Training, systems, accountability, and a creator network do.",
  },
] as const;

export const FOUNDER_FAQS = [
  {
    question: "How long have you been live streaming?",
    answer:
      "I've been live streaming professionally for 6+ years across multiple platforms, including MeetMe LIVE, Tagged, Kik LIVE, BIGO LIVE, TikTok LIVE, and Favorited. That cross-platform experience is the foundation of Streamer Factory's training and coaching.",
  },
  {
    question: "Can anyone become successful on TikTok LIVE?",
    answer:
      "Anyone willing to treat TikTok LIVE like a craft can improve. Success isn't guaranteed overnight, but creators who commit to consistency, audience retention, community, and smart battles give themselves a real path. Streamer Factory exists to teach those live streaming strategies clearly.",
  },
  {
    question: "Do I need a large following before joining?",
    answer:
      "No. Many creators join Streamer Factory while still early. What matters more than follower count is willingness to learn, show up, and practice. Our creator network and StreamerU training are built to help you grow from where you are — not where you wish you already were.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "You can start with a reliable phone, stable internet, good lighting, and clear audio. Fancy studios help, but personality and viewer engagement matter more. As you grow, you can upgrade gear — Streamer Factory's guides cover practical setups without making gear the excuse to delay going live.",
  },
  {
    question: "Can beginners join Streamer Factory?",
    answer:
      "Yes. Beginners are welcome. Streamer Factory is a TikTok LIVE agency and education hub designed for creators at different stages — including people who are just learning how to grow on TikTok LIVE and want structure instead of guessing.",
  },
  {
    question: "Is Streamer Factory free?",
    answer:
      "Yes. Streamer Factory membership is completely free, and StreamerU education is included. Creators never pay us. TikTok compensates Streamer Factory through its LIVE Creator Network program — we do not charge membership fees and do not take a percentage of your TikTok LIVE earnings. Creators keep earning directly through TikTok's monetization systems according to TikTok's platform rules.",
  },
  {
    question: "How does Streamer Factory help creators grow?",
    answer:
      "We combine free creator education in StreamerU, livestream battles through Battle Hub, public Rankings for accountability, Members community, Hall of Fame recognition, coaching, and practical Guides. It's a full free creator network — not a paid course or a one-off tip thread.",
  },
  {
    question: "What makes your coaching different?",
    answer:
      "I've grown audiences and monetization across six streaming apps, restarted from scratch more than once, and still stream. That means LIVE coaching inside Streamer Factory comes from lived experience — retention, battles, creator networking, and mindset under pressure — not borrowed screenshots.",
  },
  {
    question: "Do I have to stream full time?",
    answer:
      "No. Plenty of creators start part-time. Full-time can be a goal, not an entrance requirement. Streamer Factory helps you build systems that fit your schedule while you work toward sustainable income and stronger livestream communities.",
  },
] as const;

export const FOUNDER_PERSON_DESCRIPTION =
  "Brad Morris (CannaStreams) is the founder of Streamer Factory, a TikTok LIVE agency and creator education network. With 6+ years of professional live streaming across MeetMe, Tagged, Kik LIVE, BIGO LIVE, TikTok LIVE, and Favorited, he helps creators grow audiences, improve retention, and build sustainable livestream careers." as const;

export const FOUNDER_LEARN = [
  {
    title: "Audience Growth",
    body: "How to turn cold traffic into warm regulars who stick around.",
    span: "md:col-span-2",
  },
  {
    title: "Battles",
    body: "Structure, matchups, and energy that convert discovery into fans.",
    span: "",
  },
  {
    title: "Monetization",
    body: "Gift culture, offers, and habits that create real income — not hope.",
    span: "",
  },
  {
    title: "Community",
    body: "Chat culture, loyalty loops, and making people feel seen.",
    span: "md:col-span-2",
  },
  {
    title: "Mindset",
    body: "How to stay in the game when growth slows and nights feel empty.",
    span: "",
  },
  {
    title: "Consistency",
    body: "Schedules and standards that compound week after week.",
    span: "",
  },
  {
    title: "Scheduling",
    body: "When to go live, how to batch energy, and protect your streak.",
    span: "",
  },
  {
    title: "Networking",
    body: "Who to battle, who to learn from, and how to open doors.",
    span: "",
  },
  {
    title: "Retention",
    body: "Why people leave — and the small moves that bring them back.",
    span: "md:col-span-2",
  },
  {
    title: "Creator Branding",
    body: "The name, look, and vibe that make you unforgettable on LIVE.",
    span: "",
  },
] as const;
