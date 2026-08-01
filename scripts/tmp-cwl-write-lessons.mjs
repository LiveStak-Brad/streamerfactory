/**
 * Writes Creator Wellness & Longevity Mastery lessons, quizzes, SEO, Program Final.
 * Run: node scripts/tmp-cwl-write-lessons.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_DIR = join(ROOT, "src/content/streameru/lessons");
const QUIZ_DIR = join(ROOT, "src/lib/assessments/quizzes/wellness");
const EXAM_FILE = join(ROOT, "src/lib/assessments/exams/program-wellness.ts");
const SEO_FILE = join(ROOT, "src/lib/resources/lesson-seo/packs/creator-wellness-longevity-mastery.ts");

const bullets = (xs) => xs.map((x) => `- ${x}`).join("\n");
const numbered = (xs) => xs.map((x, i) => `${i + 1}. ${x}`).join("\n");
const BRAD_TAIL =
  "Use this as a founder principle for Brad to approve; it is not an invented Brad story, result, or anecdote.";

const WELLNESS_STANDARD = `### Wellness standard: habits over heroics

Creator Wellness & Longevity Mastery teaches durable operating habits for a career that can last years. Prefer consistency over intensity. Prefer recovery over grinding. Prefer boundaries over always-on availability. Prefer one implementable change over a complete life overhaul.

This is general creator education, not medical diagnosis, therapy, financial advice, or legal advice. Persistent pain, vocal injury, sleep disorders, anxiety, depression, suicidal thoughts, or financial distress requiring personalized guidance belong with a licensed clinician, mental health professional, or qualified tax/financial professional. StreamerU never grades wellness work by hours streamed, gifts, viewers, or rank.

Professional Creator Mastery owns business accounting, contracts, and offer systems. This path owns personal financial wellness only: income variability, emergency buffers, tax set-asides, saving, diversification awareness, and slow-month planning.`;

const WELLNESS_REALITY = `### Wellness Reality — platforms and bodies both change

Schedules, audience expectations, income, household needs, and physical capacity change over a career. This material was **last reviewed July 2026.** Treat every worksheet as a living document with a review date. If a habit only works on your best week, it is not a longevity habit yet. Rebuild the floor before you raise the ceiling.`;

const sharedPractice = `### Shared practice: size the habit for an ordinary week

Design every wellness change for the week you usually have, not the week you advertise. Write the floor (what you can still do on a hard week), the ceiling (what you refuse to exceed without recovery), and the stop condition (what triggers an immediate pause). If the plan requires constant heroics, rewrite it until an average Tuesday can carry it.

### Shared practice: record implementation, not vibes

Complete one small implementation and preserve the artifact, the date, and one review note. A peer may inspect whether the workstation changed, the recovery day happened, the boundary was written, or the buffer rule was funded. They do not need hours streamed, gifts, viewers, or mood claims. Evidence is dated behavior change.`;

function pad(topic, a, b, c, d, e, f) {
  return [
    {
      h: `${topic}: define the durable system`,
      body: `${a} Longevity is not a motivational speech. It is a set of written rules that still work when energy, income, or motivation dips. Start by naming what "still creating in five years" means in concrete terms: weekly hours you can sustain, relationships you refuse to damage, body signals you will not ignore, and creative work you want to keep enjoying. Then separate ambition from capacity. Ambition can stay large. Capacity must stay honest. Creators who last decades in adjacent performance fields—athletes, musicians, broadcasters, radio hosts—treat recovery, sleep, voice or body care, and pacing as professional duties, not optional self-care. Your operating system should make the healthy choice the default choice on a busy day.`,
    },
    {
      h: "Install early warning signals before crisis",
      body: `${b} Build a dashboard you can score in under three minutes: dread before going LIVE, shrinking prep quality, rising irritability with chat, sleep debt, voice scratchiness, wrist or neck pain, comparison spirals, and skipped meals or movement. Assign a threshold and an action to each signal. Yellow means reduce load this week. Red means run the recovery protocol and cancel or shorten sessions without apology theater. Do not wait until quitting feels like the only option. Burnout research across creator surveys repeatedly points to financial instability, unpaid admin load, always-on pressure, and lack of recovery infrastructure—not a personal character flaw. Treat the system, not your worth.`,
    },
    {
      h: "Design the environment that makes the habit automatic",
      body: `${c} Willpower fails under fatigue. Environment wins. Place water at the desk before the stream starts. Set a standing or stretch cue at every segment change. Put the phone charger outside the bedroom if night scrolling destroys sleep. Keep a written decline script for extra collabs. Batch admin on one calendar block instead of dripping it through every evening. For voice work, warm up before high-energy hours and keep room-temperature water in reach. For posture, adjust chair height, monitor position, and camera height so your neck stays neutral. For mental load, delay analytics until after a short come-down routine. The point is not perfection. The point is removing friction from the protective habit and adding friction to the destructive one.`,
    },
    {
      h: "Protect recovery, sleep, and relationships as career assets",
      body: `${d} Recovery days are production infrastructure. Sleep is performance equipment. Family and friend agreements are retention systems for your actual life. Schedule at least one recovery day where creator work is off by default. Protect a sleep window, especially after late streams—write a wind-down sequence instead of hopping from bright screens to bed. Tell household members when you are unreachable and when you are present. Parasocial pressure can make chat feel like friendship obligations; rewrite that script: warmth on stream does not require therapy duties, private access, or constant DMs. Redirect crisis disclosures to professional resources. Privacy rules for children, partners, addresses, and off-camera life should be decided before a viral moment forces a scramble.`,
    },
    {
      h: "Use money and calendar buffers to reduce panic",
      body: `${e} Variable income creates emotional volatility when every slow week feels like career death. Build a personal baseline from a trailing median of income, not from your best month. Fund an emergency buffer measured in months of essential personal expenses. Automate a tax set-aside percentage into a separate account and confirm details with a qualified professional—this path does not replace Professional Creator accounting systems. Write a slow-month playbook with tiered cuts decided in advance so panic does not invent the plan. On the calendar, batch content, protect deep-prep blocks, and refuse unbounded multi-hour sessions that destroy the next day's voice and focus. Consistency that survives a slow month beats intensity that collapses after a spike.`,
    },
    {
      h: "Review, improve one dial, and file Capstone evidence",
      body: `${f} After implementation, inspect the dated artifact. What changed in the workstation, schedule, boundary, buffer, or recovery plan? What failed because the habit was oversized? Choose one dial to improve next: volume, intensity, density, recovery quality, sleep, voice care, or comparison inputs. Do not change everything at once. File the worksheet, checklist, or planner for the Personal Creator Longevity Plan Capstone. Optional Creator Wellness Lab / Honors never gates the certificate. Mastery is proven by reviewable habits you can still run ninety days from now—not by a heroic grind week.`,
    },
  ];
}

const SPECS = [
  {
    code: "CWL-01",
    slug: "building-a-career-that-lasts",
    title: "Building a Career That Lasts",
    excerpt: "Define a decade-minded creator career built on consistency, recovery, and sustainable ambition.",
    downloads: ["longevity-career-map", "decade-definition-worksheet", "consistency-over-intensity-card"],
    missionName: "Define Your Longevity Floor",
    brad: "A career that lasts is built on a weekly floor you can keep when life is ordinary, not on a peak week you can only survive once.",
    main: pad(
      "Career longevity",
      "Map the creator life you want in five, ten, and twenty years: craft, income stability, health, and relationships.",
      "Spot the early signs that your current pace only works on adrenaline.",
      "Design calendar, workspace, and identity rules that favor repeatable show days.",
      "Protect sleep, recovery days, and offline relationships as non-negotiable career assets.",
      "Use income and schedule buffers so a slow week does not become an identity crisis.",
      "Record a decade definition and one consistency-over-intensity rule you will follow this month.",
    ),
    focusQuiz: [
      ["A creator wants to stream twelve hours daily for months to 'catch up.' What protects longevity?", "Set a weekly floor and ceiling sized for ordinary weeks, then improve one dial.", "Protect the streak no matter the cost.", "Skip recovery until goals are hit.", "Grade success only by hours streamed."],
      ["What best defines a durable creator career?", "Systems you can still run in a hard month without destroying health or relationships.", "Maximum intensity every day.", "Never missing a trend.", "Comparing yourself to larger creators daily."],
      ["How should ambition and capacity relate?", "Keep ambition large while sizing capacity honestly for an average week.", "Let ambition erase recovery.", "Shrink ambition to zero.", "Ignore capacity until burnout."],
      ["What should a longevity map include?", "Sustainable hours, protected relationships, body signals, and craft you want to keep enjoying.", "Only follower targets.", "Only gift targets.", "Only gear purchases."],
      ["A creator says rest is lazy. What is the better frame?", "Recovery is professional infrastructure that protects future performance.", "Rest is only for injured creators.", "Sleep can be replaced by caffeine.", "Vacations prove you are not serious."],
      ["Which metric should NOT grade this lesson's mission?", "Hours streamed, gifts, or viewer counts.", "A completed longevity map.", "A written weekly floor.", "A dated consistency rule."],
      ["What do long-career performers usually protect?", "Recovery, sleep, body or voice care, and pacing.", "Only branding.", "Only virality.", "Only all-nighters."],
      ["What belongs in Capstone evidence from this lesson?", "Dated longevity map, decade worksheet, and consistency-over-intensity card.", "A screenshot of peak concurrent viewers.", "A promise to grind harder.", "An undated intention note."],
    ],
  },
  {
    code: "CWL-02",
    slug: "preventing-creator-burnout",
    title: "Preventing Creator Burnout",
    excerpt: "Detect burnout early, reduce load on purpose, and run a recovery week before quitting feels inevitable.",
    downloads: ["burnout-early-warning-dashboard", "recovery-week-plan", "streaming-fatigue-audit"],
    missionName: "Run a Burnout Early-Warning Audit",
    brad: "Burnout is usually a load-design failure. Catch the warning lights early and redesign the week before the only option left is quitting.",
    main: pad(
      "Burnout prevention",
      "Treat burnout as emotional exhaustion plus cynicism plus reduced efficacy—then build practical counters for each.",
      "Score dread, detachment, prep shrinkage, sleep change, and compassion fatigue weekly.",
      "Reduce volume, intensity, or density instead of pretending motivation will return by force.",
      "Schedule recovery weeks and sick-day protocols in advance so shame does not invent the plan.",
      "Separate financial panic from creative fatigue; buffers and admin batching reduce hidden load.",
      "File a dashboard, recovery week plan, and fatigue audit with clear yellow and red actions.",
    ),
    focusQuiz: [
      ["A creator streams twelve hours daily for weeks and feels numb. Best first move?", "Reduce load using a written recovery plan and early-warning thresholds.", "Add more caffeine and keep the streak.", "Ignore the numbness until a vacation.", "Compare output with larger creators."],
      ["What is a useful burnout early warning?", "Rising dread before LIVE plus shrinking prep quality.", "One slow income day.", "One critical comment.", "A single late night."],
      ["Compassion fatigue often shows up as what?", "Numbness toward chat needs you used to handle with care.", "Extra excitement for every collab.", "Perfect sleep.", "Unlimited empathy with no cost."],
      ["How should a recovery week work?", "Keep a smaller floor, drop optional load, and protect sleep and movement.", "Stop all human contact forever.", "Only sleep and never plan a return.", "Secretly keep the same schedule."],
      ["Decision fatigue is reduced by what?", "Pre-decided templates, batching, and fewer open loops.", "Making every choice live on stream.", "Checking analytics hourly.", "Taking every collab offer."],
      ["What should never be taught as burnout advice?", "Working through illness and skipping recovery to protect the streak.", "Reducing session length.", "Taking a recovery day.", "Using a sick-day announcement script."],
      ["Financial instability worsens burnout because?", "Money panic keeps the nervous system in constant emergency mode.", "Taxes are illegal.", "Buffers make creators lazy.", "Slow months prove failure."],
      ["Mission success here means what?", "Completed dashboard, recovery plan, and fatigue audit with actions.", "More hours than last week.", "Higher gifts.", "Zero emotions."],
    ],
  },
  {
    code: "CWL-03",
    slug: "physical-health-for-long-streaming-sessions",
    title: "Physical Health for Long Streaming Sessions",
    excerpt: "Build an ergonomic setup, voice care routine, movement breaks, and hydration habits for long LIVE days.",
    downloads: ["ergonomic-workstation-guide", "voice-care-checklist", "stretch-and-hydration-routine"],
    missionName: "Upgrade Your Streaming Body System",
    brad: "Your chair, mic distance, water bottle, and stretch breaks are performance gear. Treat the body like equipment you need next year.",
    main: pad(
      "Physical sustainability",
      "Set chair, desk, monitor, and camera for neutral neck, wrists, and shoulders using practical workstation principles.",
      "Watch for tingling, lasting pain, hoarseness, or eye strain—and route persistent issues to a licensed clinician.",
      "Warm up the voice, hydrate with room-temperature water, and avoid all-day 100% vocal effort.",
      "Insert movement, stretch, and 20-20-20 style eye breaks inside the show, not only after it.",
      "Standing desk intervals help when they are planned; random standing without posture still strains the body.",
      "Photograph the adjusted setup and file voice, stretch, and hydration checklists as Capstone evidence.",
    ),
    focusQuiz: [
      ["Wrist pain appears after long mouse use. Best response?", "Adjust for neutral wrists, reduce repetition, add breaks, and seek clinical care if pain persists.", "Ignore it and stream longer.", "Tape the wrist and increase intensity.", "Buy the most expensive chair without adjusting posture."],
      ["Where should the top of the monitor roughly sit?", "At or slightly below eye level, about an arm's length away.", "Far above the head to look cinematic.", "In your lap.", "Behind you."],
      ["Best voice care habit before a long LIVE?", "Warm up gently, hydrate, and plan mid-session vocal breaks.", "Scream cold to 'open up.'", "Skip water to avoid bathroom breaks.", "Whisper the whole show."],
      ["What helps eye strain during long sessions?", "Regular distance focus breaks and readable screen positioning.", "Bright unshaded glare all day.", "No blinks.", "Sitting six inches from the screen."],
      ["Hydration for voice work should prioritize?", "Steady room-temperature water across the day.", "Only iced drinks right before going LIVE.", "Only energy drinks.", "No fluids until the stream ends."],
      ["A standing desk is most useful when?", "Used in planned intervals with still-neutral posture.", "Used as punishment for low gifts.", "Used twelve hours without movement variety.", "Used instead of any chair forever."],
      ["This lesson's medical boundary is what?", "General education only; persistent pain or injury needs a licensed clinician.", "Diagnosing carpal tunnel on stream.", "Prescribing medication.", "Claiming stretches cure all injuries."],
      ["Mission evidence should include?", "Workstation adjustments, voice checklist, and stretch/hydration routine with dates.", "A viewer count screenshot.", "A gift total.", "A claim that you feel fine."],
    ],
  },
  {
    code: "CWL-04",
    slug: "mental-resilience-and-handling-online-pressure",
    title: "Mental Resilience & Handling Online Pressure",
    excerpt: "Install criticism triage, comparison rules, and post-LIVE emotional hygiene without turning into a therapist.",
    downloads: ["aftercare-routine-card", "comparison-rules-worksheet", "criticism-response-framework"],
    missionName: "Install Post-LIVE Emotional Hygiene",
    brad: "You can be warm on camera and still refuse to carry every comment, comparison, or crisis in chat as your personal job.",
    main: pad(
      "Mental resilience",
      "Separate actionable feedback, opinion, and attack so your nervous system is not grading every comment equally.",
      "Write comparison rules: who you study, for how long, and what skill you extract—then close the tab.",
      "Use a post-LIVE aftercare routine before analytics: water, food, short walk, notes, then metrics.",
      "Parasocial pressure is real; warmth is not a promise of private access, friendship, or therapy.",
      "Mute, report, and escalate tools are professional boundaries, not personality failures.",
      "File aftercare, comparison, and criticism frameworks; route clinical distress to licensed help.",
    ),
    focusQuiz: [
      ["A pile-on starts in chat. Best first move?", "Stabilize with moderation tools, avoid impulsive replies, then triage later with a framework.", "Argue every comment for three hours.", "Read every reply before sleeping.", "Promise personal friendship to critics."],
      ["Comparison becomes harmful when?", "It becomes identity scoring instead of brief skill study.", "You watch one educational clip.", "You celebrate a peer.", "You learn one technique."],
      ["What belongs in aftercare before analytics?", "A short come-down routine that restores body and mind first.", "Immediate rank checking.", "Reply-all to hate comments.", "Starting another four-hour stream."],
      ["A viewer treats you like their therapist. Best boundary?", "Redirect to professional resources and keep the creator role clear.", "Provide clinical advice LIVE.", "Share your private number.", "Ignore safety and dive deeper alone."],
      ["Criticism triage should ask?", "Is this actionable, opinion, or an attack—and what rule applies?", "Who has more followers?", "Did gifts drop?", "Can I win the argument?"],
      ["Online negativity is best handled by?", "Prepared rules for reply, log, mute, or report—not improvisation under adrenaline.", "Never moderating.", "Reading hate before bed daily.", "Deleting your craft entirely on day one."],
      ["This lesson must not become?", "Therapy or clinical mental health treatment.", "A criticism framework.", "An aftercare card.", "Comparison rules."],
      ["Mission success means?", "Written aftercare, comparison rules, and criticism framework used after a real session.", "Zero feelings.", "More arguing.", "Higher viewers."],
    ],
  },
  {
    code: "CWL-05",
    slug: "time-management-and-sustainable-schedules",
    title: "Time Management & Sustainable Schedules",
    excerpt: "Build an energy-based week with batching, recovery days, deep work, and protected sleep.",
    downloads: ["weekly-energy-calendar", "recovery-day-planner", "sleep-and-batching-planner"],
    missionName: "Rebuild One Sustainable Week",
    brad: "If your calendar only works when every star aligns, it is a wish list. Build the week you can keep when life is normal.",
    main: pad(
      "Sustainable scheduling",
      "Plan from energy, not guilt: place deep prep and LIVE on high-energy blocks when possible.",
      "Batch admin, editing, and outreach so open loops stop eating every evening.",
      "Protect a recovery day and a sleep window with a real wind-down sequence.",
      "Write a capacity check and decline script before collab season overloads you.",
      "Vacation and slow weeks need pre-written announcements and coverage rules.",
      "File the energy calendar, recovery day plan, and sleep/batching planner with dates.",
    ),
    focusQuiz: [
      ["A creator packs seven LIVEs, five collabs, and nightly editing. Best redesign?", "Set a floor and ceiling, batch work, and protect one recovery day.", "Sleep four hours to fit more.", "Accept every request.", "Delete recovery forever."],
      ["Deep work blocks are for?", "Prep and creative work that needs focus without chat interruptions.", "Checking analytics every minute.", "Scrolling competitors.", "Answering every DM instantly."],
      ["A recovery day should be?", "Creator-work off by default with a written re-entry plan.", "A secret half-work day.", "Punishment for low gifts.", "Optional only after burnout."],
      ["Sleep routines help longevity because?", "Sleep debt quietly destroys voice, mood, judgment, and consistency.", "Sleep is optional for serious creators.", "Late-night metrics are more important.", "Caffeine replaces sleep permanently."],
      ["Content batching helps by?", "Concentrating similar work so recovery windows get longer.", "Filming twenty formats with no plan.", "Never reviewing quality.", "Eliminating all LIVE."],
      ["Capacity check means?", "Asking whether a new yes requires a no somewhere else.", "Saying yes to everything.", "Ignoring household needs.", "Measuring only virality."],
      ["Mission grading should ignore?", "Hours streamed as a badge of honor.", "A completed weekly energy calendar.", "A real recovery day plan.", "A sleep window."],
      ["Best vacation planning habit?", "Pre-write audience expectations and protect real offline time.", "Stream from the hotel bathroom daily.", "Ghost with no plan.", "Promise daily posting while traveling sick."],
    ],
  },
  {
    code: "CWL-06",
    slug: "financial-wellness-for-variable-income",
    title: "Financial Wellness for Variable Income",
    excerpt: "Stabilize personal finances around variable creator income without turning this into business accounting class.",
    downloads: ["income-variability-buffer-plan", "slow-month-playbook", "personal-tax-savings-checklist"],
    missionName: "Build Your Personal Income Buffer Plan",
    brad: "Variable income feels like failure when you budget from your best month. Budget from a realistic baseline and decide slow-month moves in advance.",
    main: pad(
      "Personal financial wellness",
      "Compute a trailing median personal income baseline and pay yourself on that rhythm when possible.",
      "Fund an emergency buffer in months of essential personal expenses; automate transfers on strong weeks.",
      "Set aside taxes into a separate account and confirm personal requirements with a qualified professional.",
      "Write a slow-month playbook with tiered cuts so panic does not invent austerity theater.",
      "Diversify income awareness without pretending every creator needs five businesses tomorrow.",
      "Leave business books and contracts to Professional Creator Mastery; file personal buffer artifacts here.",
    ),
    focusQuiz: [
      ["Best personal baseline for variable income?", "A trailing median of recent months, not your best spike.", "Your highest month forever.", "Zero planning.", "Only gift goals."],
      ["An emergency fund here means?", "Months of essential personal expenses you can reach in a slow stretch.", "Money for more RGB lights only.", "Ignoring taxes.", "Spending every peak week."],
      ["Tax set-asides should be?", "Automated to a separate account and confirmed with a qualified professional.", "Skipped until audit day.", "Guessed from a viral tip.", "Handled by chat advice alone."],
      ["A slow-month playbook should include?", "Pre-decided tiered cuts and what stays funded.", "Panic deleting your channel.", "Shame posts daily.", "Maxing credit for lifestyle creep."],
      ["This path should NOT replace?", "Professional Creator Mastery business accounting and contracts.", "A personal buffer plan.", "A tax set-aside habit.", "A slow-month playbook."],
      ["Financial panic often worsens when?", "Creators treat every dip as career death without a buffer rule.", "They have a written baseline.", "They automate set-asides.", "They review quarterly."],
      ["Diversifying income wisely starts with?", "Stabilizing a baseline and adding one realistic lane without chaos.", "Launching five businesses in a weekend.", "Ignoring skills.", "Quitting LIVE immediately."],
      ["Mission evidence is?", "Buffer plan, slow-month playbook, and personal tax-savings checklist.", "A flex screenshot of one big night.", "Viewer rank.", "Gift leaderboard."],
    ],
  },
  {
    code: "CWL-07",
    slug: "healthy-relationships-and-personal-boundaries",
    title: "Healthy Relationships & Personal Boundaries",
    excerpt: "Write household agreements, parasocial boundaries, privacy rules, and expectations that protect real relationships.",
    downloads: ["boundary-worksheet", "partner-family-communication-card", "privacy-expectations-guide"],
    missionName: "Publish Your Boundary Package",
    brad: "The people in your house are not content extras. Write the agreements before the stream schedule writes them for you.",
    main: pad(
      "Relationships and boundaries",
      "Decide what is public, private, and never-on-camera before growth pressure tests those lines.",
      "Hold a household check-in on quiet hours, shared rooms, childcare, and on-camera consent.",
      "Write parasocial boundaries: DMs, meetups, crisis redirects, and what friendship on stream does not mean.",
      "Protect children and partners with privacy defaults and delayed posting rules.",
      "Healthy expectations include telling your audience when you are offline without over-explaining.",
      "File boundary, family communication, and privacy guides as Capstone evidence.",
    ),
    focusQuiz: [
      ["Streaming around children requires what first?", "Clear privacy and consent rules that protect the child over content needs.", "More cute moments for virality.", "No rules until something goes wrong.", "Open location sharing."],
      ["A partner feels ignored after late streams. Best move?", "Schedule a check-in and rewrite shared expectations and protected time.", "Say the algorithm requires it forever.", "Argue that fans come first.", "Hide the schedule."],
      ["Parasocial pressure is reduced by?", "Clear public boundaries and consistent redirects.", "Giving every viewer private access.", "Sharing your address for authenticity.", "Becoming on-call therapy."],
      ["Privacy expectations should cover?", "Background, audio bleed, household members, and account separation.", "Only fonts.", "Only overlays.", "Only gift goals."],
      ["A boundary is usable when?", "You can repeat it calmly on air without improvising under stress.", "It exists only in your head.", "It changes every comment.", "It requires anger to enforce."],
      ["Friends off-platform matter because?", "Offline relationships protect identity beyond the account.", "Friends reduce watch time.", "Isolation improves creativity forever.", "Only chat friendships count."],
      ["Mission success means?", "Written boundaries, household card, and privacy guide with a scheduled check-in.", "More secret streaming.", "No conversations at home.", "Public oversharing."],
      ["If a viewer demands constant access, you should?", "Restate the boundary and use moderation tools as needed.", "Share private numbers.", "Apologize for having a life.", "Stream twenty hours to compensate."],
    ],
  },
  {
    code: "CWL-08",
    slug: "maintaining-creativity-for-years",
    title: "Maintaining Creativity for Years",
    excerpt: "Protect creative capacity with recovery menus, input diets, format rotation, and anti-comparison practice.",
    downloads: ["creative-recovery-menu", "inspiration-input-diet", "creativity-capacity-scorecard"],
    missionName: "Install a Creative Recovery Menu",
    brad: "Creativity is a renewable resource only if you stop treating every empty day like a character failure.",
    main: pad(
      "Creative longevity",
      "Score creative capacity: backlog depth, novelty appetite, dread, and time-to-first-idea.",
      "Build a recovery menu of low-pressure inputs that refill taste without demanding output.",
      "Curate an input diet from outside your niche; starve doomscroll comparison.",
      "Rotate formats on purpose and retire formats that only run on self-punishment.",
      "Protect exploration slots from early metric judgment so play can return.",
      "File recovery menu, input diet, and capacity scorecard for the Capstone.",
    ),
    focusQuiz: [
      ["Creative fatigue often needs what?", "Lower-pressure inputs and recovery before forcing a new series.", "More all-nighters.", "Only competitor watching.", "Deleting every unfinished idea in shame."],
      ["An inspiration input diet should include?", "Scheduled inputs outside your niche plus limits on comparison scrolling.", "Unlimited hate-watching.", "Zero inputs forever.", "Only analytics."],
      ["A creativity capacity scorecard helps by?", "Making invisible drain measurable before you quit the craft.", "Proving you are talentless.", "Replacing all rest.", "Tracking only gifts."],
      ["Format rotation is useful when?", "It prevents stale obligation shows while protecting a stable core.", "You change identity daily with no core.", "You never repeat a segment.", "You copy every trend."],
      ["Exploration slots should be?", "Protected from early harsh metrics.", "Graded by gifts in the first ten minutes.", "Public punishments.", "Skipped when busy."],
      ["Comparison kills creativity when?", "It becomes constant identity scoring instead of brief study.", "You learn one technique.", "You credit a peer.", "You take a class."],
      ["Mission evidence includes?", "Recovery menu, input diet, and capacity scorecard with dates.", "A viral draft only.", "Viewer rank.", "A promise to be inspired."],
      ["Best response to a blank week?", "Run the recovery menu and reduce output pressure before forcing novelty.", "Stream twelve hours angry.", "Quit permanently same day.", "Shame yourself on LIVE."],
    ],
  },
  {
    code: "CWL-09",
    slug: "recovering-from-setbacks-without-quitting",
    title: "Recovering from Setbacks Without Quitting",
    excerpt: "Diagnose setbacks, stabilize for seventy-two hours, and run a staged comeback without panic quitting.",
    downloads: ["setback-diagnosis-worksheet", "comeback-14-day-plan", "anti-quit-decision-card"],
    missionName: "Write Your Comeback Protocol",
    brad: "Most quit decisions made in the first seventy-two hours are panic wearing a strategy costume. Stabilize first, then decide.",
    main: pad(
      "Setback recovery",
      "Label the setback: platform, personal, performance, social, or technical—then separate facts from fear.",
      "Stabilize seventy-two hours: sleep, food, movement, no permanent decisions, limited comment reading.",
      "Build a fourteen-day comeback with smaller scope, clear session length, and support contacts.",
      "Write pause conditions versus true stop conditions so rest is not confused with failure.",
      "Run an after-action review that names controllable lessons without magical thinking.",
      "File diagnosis, comeback plan, and anti-quit card; optional Honors never gates recovery dignity.",
    ),
    focusQuiz: [
      ["After a humiliating LIVE, best first seventy-two hours?", "Stabilize basics and delay permanent quit decisions.", "Delete the channel immediately.", "Argue in comments all night.", "Announce retirement for engagement."],
      ["Setback diagnosis should separate?", "Verified facts from assumed fears.", "Followers from non-followers only.", "Gifts from likes only.", "Friends from enemies only."],
      ["A 14-day comeback plan should?", "Use smaller scope and clear session lengths.", "Double hours to punish yourself.", "Avoid all structure.", "Require virality."],
      ["Pause versus quit means?", "A pause has return conditions; a quit is a true values-based stop.", "Pause equals failure.", "Quit equals laziness always.", "They are identical."],
      ["Anti-quit cards help by?", "Pre-committing who you call and what tiny next action you take.", "Forcing you to stream sick.", "Banning rest.", "Requiring public drama."],
      ["Performance setbacks are best reviewed by?", "Controllable execution notes, not identity attacks.", "Only viewer graphs.", "Only competitor envy.", "Only gift totals."],
      ["Mission success is?", "Diagnosis worksheet, 14-day plan, and anti-quit decision card.", "Immediate permanent quit.", "No emotions allowed.", "Higher rank tomorrow."],
      ["If the setback is clinical mental health crisis?", "Contact licensed professional or emergency resources; curriculum is not treatment.", "Self-treat on stream.", "Ask chat to diagnose you.", "Ignore safety."],
    ],
  },
  {
    code: "CWL-10",
    slug: "creator-wellness-capstone-personal-longevity-plan",
    title: "Creator Wellness Capstone: Personal Longevity Plan",
    excerpt: "Assemble workspace, schedule, recovery, boundaries, buffers, and habits into one reviewable longevity plan.",
    downloads: ["personal-creator-longevity-plan", "longevity-evidence-checklist", "ninety-day-wellness-improvement-plan"],
    missionName: "Assemble Your Personal Creator Longevity Plan",
    brad: "The Capstone is not a vibe journal. It is a binder of dated systems you can still run when motivation is average.",
    main: pad(
      "Longevity Capstone",
      "Assemble every CWL artifact into one Personal Creator Longevity Plan with dates and owners.",
      "Include workspace audit, weekly schedule, recovery strategy, health checklist, boundaries, and financial buffer.",
      "Add a ninety-day improvement plan with three dials max and review dates.",
      "Stress-test sick week, slow month, pile-on, and gear failure with pre-written responses.",
      "Confirm clinical and professional handoffs where personal advice ends.",
      "Submit reviewable evidence; optional Creator Wellness Lab / Honors never gates the certificate.",
    ),
    focusQuiz: [
      ["What is the Capstone graded on?", "Dated, reviewable longevity systems and a ninety-day improvement plan.", "Hours streamed during Capstone week.", "Gift totals.", "Viewer rank."],
      ["Which evidence belongs in the dossier?", "Workspace audit, schedule, recovery, boundaries, buffer, habits, reflection, 90-day plan.", "Only a motivational quote.", "Only a gear receipt.", "Only a viral clip."],
      ["Honors Lab relationship to certificate?", "Optional after certificate; never a gate.", "Required to graduate.", "Replaces Capstone.", "Replaces quizzes."],
      ["A stress test should include?", "Sick week, slow month, pile-on, and gear failure responses.", "Only best-case weeks.", "Only gift goals.", "Only trend chasing."],
      ["Ninety-day plan quality means?", "Three or fewer improvements with review dates.", "Forty infinite goals.", "No dates.", "Only vibes."],
      ["If a Capstone section is missing a dated artifact?", "Complete the missing lesson artifact before claiming Capstone done.", "Write 'TBD forever.'", "Replace it with viewers.", "Skip and hope."],
      ["Clinical boundary in Capstone?", "Name licensed handoffs; do not self-diagnose in the plan.", "Diagnose yourself for content.", "Ask chat for prescriptions.", "Ignore red-flag symptoms."],
      ["Career longevity success looks like?", "Systems that still run on ordinary weeks ninety days later.", "One heroic grind week.", "Sleep deprivation badges.", "No boundaries."],
    ],
  },
];

function renderLesson(l, i) {
  const [a, b, c] = l.downloads;
  const prev = i ? `${SPECS[i - 1].title} (${SPECS[i - 1].code})` : "Advanced Creator — professional operating habits";
  const next =
    i === 9
      ? "Program Final — demonstrate Creator Wellness systems and Capstone readiness"
      : `${SPECS[i + 1].title} (${SPECS[i + 1].code})`;
  const nextPreview =
    i === 9
      ? "Take the Program Final and keep the Personal Creator Longevity Plan on a quarterly review cycle."
      : `Next, **${SPECS[i + 1].code}** deepens ${SPECS[i + 1].title.toLowerCase()} as another longevity system.`;

  return `## Introduction

${l.title} turns long-term creator sustainability into a documented operating practice rather than a motivational speech. ${l.excerpt}

Every artifact in ${l.code} supports the Capstone: **Personal Creator Longevity Plan**. This path answers a simple career question: how do you still enjoy creating five, ten, or twenty years from now? The answer is not extreme grinding. The answer is consistency, recovery, boundaries, sleep, movement, voice care, mental hygiene, and long-game financial calm.

## Why This Lesson Matters

**Previous:** ${prev}
**This lesson:** ${l.title} (${l.code}) — ${l.excerpt}
**Next:** ${next}

Creators rarely quit only because they lack a hook or a lighting kit. They quit because the week becomes unsustainable, the body breaks down, the comments own their nervous system, money panic never turns off, or the people they love stop recognizing them. ${l.title} makes that failure mode teachable and fixable with habits you can implement this week. Professional growth still matters—Growth Mastery, Presence Mastery, and other craft paths remain valuable—but none of them replace a human who can keep showing up without self-erasure.

## Learning Objectives

- Explain the core longevity principle taught in ${l.code} using ordinary-week language.
- Build the three lesson downloads as dated, reviewable artifacts.
- Implement one LIVE Mission change without grading yourself by hours, gifts, or viewers.
- Identify when a issue requires a licensed medical, mental health, or financial professional.
- Connect this lesson's evidence to the Personal Creator Longevity Plan Capstone.

## Estimated Study Time

- **Study and planning:** about 38 minutes
- **LIVE Mission:** ${l.missionName}, using ${a}, ${b}, and ${c}
- **First full pass:** about 75–110 minutes with planning, implementation, and review

No hours-streamed, gift, viewer, or rank target is required. Completion is based on implementation and reviewable evidence.

## Prerequisites

Complete Core Certification and Advanced Creator before certificate award. Complete earlier Creator Wellness & Longevity Mastery lessons in sequence. Bring an honest picture of your current week, workspace, and limits. Bring willingness to reduce load when the evidence says the pace is unsafe.

## Main Lesson

${l.main.map((s) => `### ${s.h}\n\n${s.body}`).join("\n\n")}

${sharedPractice}

${WELLNESS_STANDARD}

[Callout: Consistency over intensity]
A career is a long game. One sustainable week repeated beats one heroic week that wrecks the next month.

${WELLNESS_REALITY}

### Capstone connection

${a}, ${b}, and ${c} form the ${l.code} evidence layer of the Personal Creator Longevity Plan. Completion evidence is the finished artifact, review notes, and one controlled improvement—not hours streamed, gifts, viewers, or rank. Optional Creator Wellness Lab / Honors never gates the certificate.

## Examples

- A creator cuts two optional collabs and protects a recovery day instead of "pushing through" a hoarse voice.
- A desk setup is adjusted so the camera and monitor stop forcing a forward neck posture for four-hour sessions.
- A slow month triggers a pre-written buffer and cut list instead of an identity spiral on LIVE.

## Real Creator Scenarios

- A creator compares themselves to a larger account every night and loses sleep: they install comparison rules and an aftercare routine before analytics.
- Wrist pain shows up during long chat interaction: they adjust input devices, add breaks, and contact a clinician if pain persists.
- A household conflict erupts over late streams: they schedule a partner check-in and rewrite quiet hours before the next growth push.

## Screenshots

[Screenshot: completed ${a} with non-sensitive personal notes]

[Screenshot: ${b} prepared for a real week]

[Screenshot: ${c} marked with evidence and one improvement]

[Screenshot: dated review note for the Personal Creator Longevity Plan; last reviewed July 2026]

## Diagrams

[Diagram: Warning signals → load reduction → recovery → return to floor]

[Diagram: Body / voice / mind / money / relationships as five longevity pillars]

[Diagram: Lesson artifact → implementation → review note → Capstone dossier]

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): ${l.brad} ${BRAD_TAIL}

## Pro Tips

- Write the floor before you write the highlight reel.
- Put recovery on the calendar with the same seriousness as a collab.
- Keep water, stretch cues, and a decline script inside the streaming environment.
- Delay analytics until after aftercare.
- Review habits quarterly; bodies and households change.

## Common Beginner Mistakes

- Treating burnout as a motivation problem instead of a load-design problem.
- Buying gear instead of adjusting the workstation you already have.
- Calling avoidance "boundaries" without writing the actual rule.
- Budgeting personal life from a best-case income month.
- Grading wellness by hours streamed.

## Reality Check

Wellness work is boring on purpose. The creators who last are usually the ones who look slightly under-scheduled from the outside and oddly consistent from the inside. Grade ${l.missionName} on completed artifacts, one implemented change, and a dated review note—never hours streamed, gifts, viewers, or rank.

## Summary

${l.title} installs a practical longevity system you can run on an ordinary week. You leave with dated tools, one implemented change, and Capstone-ready evidence. The goal is a creator career you can still respect—and physically continue—years from now.

## LIVE Mission

**Mission: ${l.missionName}**

${numbered([
  `Complete the ${a} for your real current week or workspace.`,
  `Use the ${b} to define the next protective habit or agreement.`,
  "Implement one change in a real session, recovery day, or household/finance workflow.",
  `Mark ${c} with what changed, what is still hard, and one improvement.`,
  "File the evidence for the Personal Creator Longevity Plan without attaching hours, gifts, or viewer targets.",
])}

## Downloads

- **${a}** — primary system map or checklist for this lesson
- **${b}** — planning worksheet that makes the habit concrete
- **${c}** — scorecard, routine, or decision card for reviewable evidence

## Quiz

Take the interactive lesson quiz on this page (70% to pass). Eight scenario questions assess sustainable decisions and reviewable evidence—not grind culture.

## Key Takeaways

- Consistency beats intensity for multi-year careers.
- Recovery, sleep, and boundaries are professional infrastructure.
- Physical and voice care protect the instrument you create with.
- Mental hygiene and comparison rules protect judgment.
- Personal financial buffers reduce panic during slow months.
- Capstone evidence is dated implementation, never vanity metrics.

## Before You Move On

- ☐ Finished the lesson and completed ${a}, ${b}, and ${c}.
- ☐ Implemented one real change sized for an ordinary week.
- ☐ Routed any clinical, mental health, or personalized financial question to a licensed professional when needed.
- ☐ Recorded one improvement and filed it for the Personal Creator Longevity Plan.
- ☐ Passed the eight-question lesson quiz at 70% or higher.

## Next Lesson Preview

${nextPreview}
`;
}

function renderLessonFile(l, i) {
  const content = renderLesson(l, i);
  return `import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "${l.slug}",
  excerpt: ${JSON.stringify(l.excerpt)},
  estimatedMinutes: 38,
  content: \`${content.replace(/`/g, "\\`")}\`,
};
`;
}

function renderQuiz(l) {
  const qs = l.focusQuiz
    .map(
      ([prompt, correct, w1, w2, w3], i) => `    question("q${i + 1}", ${JSON.stringify(prompt)}, [
      [${JSON.stringify(correct)}, true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      [${JSON.stringify(w1)}, false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      [${JSON.stringify(w2)}, false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      [${JSON.stringify(w3)}, false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),`,
    )
    .join("\n");
  return `import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "${l.slug}",
  programKey: "wellness",
  title: "Quiz: ${l.title}",
  questions: [
${qs}
  ],
});
`;
}

function renderExam() {
  const items = [
    ["cwl1", "What is the core longevity principle of this path?", "Consistency over intensity, with recovery built into the operating system.", "Stream through illness to protect the streak.", "Sleep is optional for serious creators.", "Grade wellness by hours streamed."],
    ["cwl2", "A creator feels dread and prep quality is collapsing. Best move?", "Use early-warning thresholds and reduce load with a recovery plan.", "Add more hours until motivation returns.", "Ignore it and compare with larger creators.", "Announce that rest is weakness."],
    ["cwl3", "Best ergonomic priority for long sessions?", "Neutral posture, monitor height, wrist alignment, and movement breaks.", "The most expensive chair with no adjustments.", "Camera above head forcing neck extension all day.", "No breaks until the stream ends."],
    ["cwl4", "Voice care for multi-hour LIVE should include?", "Warmups, hydration, effort management, and mid-session rests.", "Cold screaming with no water.", "Whispering all day as the only mode.", "Ignoring hoarseness for weeks."],
    ["cwl5", "Healthy criticism handling looks like?", "Triage into actionable, opinion, or attack, then apply a pre-written rule.", "Reply to every comment before sleeping.", "Treat all feedback as identity truth.", "Offer clinical therapy in chat."],
    ["cwl6", "A sustainable week includes what?", "A floor, a ceiling, batching, and a real recovery day.", "Seven maximum-intensity days.", "No sleep window.", "Unlimited collabs with no capacity check."],
    ["cwl7", "Personal financial wellness on this path means?", "Baseline income thinking, emergency buffer, tax set-aside, and slow-month plan.", "Full business accounting systems from Professional Creator Mastery.", "Spending every peak week.", "Ignoring taxes until forced."],
    ["cwl8", "Parasocial boundary quality means?", "Warmth on stream without promising private access or therapy duties.", "Sharing your address for authenticity.", "Being on-call in DMs twenty-four hours.", "Never moderating."],
    ["cwl9", "Creative longevity is protected by?", "Recovery menus, input diets, and capacity checks before forcing novelty.", "Shame and all-nighters.", "Only competitor watching.", "Retiring every format weekly with no core."],
    ["cwl10", "After a major setback, first seventy-two hours should?", "Stabilize basics and delay permanent quit decisions.", "Delete the channel immediately.", "Argue all night in comments.", "Double hours as punishment."],
    ["cwl11", "What is the Capstone artifact?", "Personal Creator Longevity Plan with dated evidence and a ninety-day improvement plan.", "A viewer leaderboard.", "A gift total.", "An undated motivational journal only."],
    ["cwl12", "Creator Wellness Lab / Honors relationship to the certificate?", "Optional after certificate; never a gate.", "Required to earn the certificate.", "Replaces the Capstone.", "Replaces the Program Final."],
    ["cwl13", "When should a creator seek licensed help?", "For persistent pain, vocal injury, clinical mental health concerns, or personalized financial advice.", "Never; the worksheets replace clinicians.", "Only after quitting.", "Only if gifts drop."],
  ];
  return `import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "wellness",
  programName: "Creator Wellness & Longevity Mastery",
  title: "Program Final: Creator Wellness & Longevity Mastery",
  questions: [
${items
  .map(
    ([id, p, c, ...w]) => `    question(${JSON.stringify(id)}, ${JSON.stringify(p)}, [
      [${JSON.stringify(c)}, true, "Correct — that answer protects long-term creator sustainability with reviewable habits."],
      [${JSON.stringify(w[0])}, false, "Wrong — grind culture and denial are not longevity skills."],
      [${JSON.stringify(w[1])}, false, "Wrong — wellness is graded on implementation evidence, not vanity metrics."],
      [${JSON.stringify(w[2])}, false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),`,
  )
  .join("\n")}
  ],
});
`;
}

function renderSeo() {
  const entries = SPECS.map((s, i) => {
    const prev = i
      ? `{ label: "Previous: ${SPECS[i - 1].title}", href: "/streameru/${SPECS[i - 1].slug}" }`
      : `{ label: "StreamerU hub", href: "/streameru" }`;
    const next =
      i === 9
        ? `{ label: "Creator Wellness Program Final", href: "/streameru/programs/wellness/final" }`
        : `{ label: "Next: ${SPECS[i + 1].title}", href: "/streameru/${SPECS[i + 1].slug}" }`;
    return `  {
    slug: "${s.slug}",
    primaryKeyword: "${s.title.toLowerCase()} for creators",
    secondaryKeywords: ["creator burnout", "streamer wellness", "healthy streaming habits", "Personal Creator Longevity Plan"],
    metaTitle: ${JSON.stringify(`${s.title} | StreamerU`)},
    metaDescription: ${JSON.stringify(s.excerpt)},
    faqs: [
      { question: "What does this Creator Wellness lesson teach?", answer: ${JSON.stringify(
        `${s.title} teaches practical longevity habits with dated artifacts and a LIVE Mission graded on implementation, not hours streamed.`,
      )} },
      { question: "Is this medical or therapy advice?", answer: "No. It is general creator education. Clinical, mental health, and personalized financial questions belong with licensed professionals." },
      { question: "Does this replace Professional Creator Mastery?", answer: "No. Professional Creator owns business accounting and contracts; this path owns personal financial wellness and broader longevity habits." },
      { question: "How is the mission graded?", answer: "By completed artifacts and one implemented change. Hours streamed, gifts, viewers, and rank are not grading targets." },
      { question: "What evidence do I leave with?", answer: ${JSON.stringify(
        `You leave with ${s.downloads.join(", ")} and evidence for the Personal Creator Longevity Plan.`,
      )} },
    ],
    relatedGuideSlugs: ["creator-support", "creator-community", "tiktok-live-tips"],
    internalLinks: [
      ${prev},
      ${next},
      { label: "Professional Creator Mastery", href: "/streameru/programs/professional" },
    ],
    suggestedGlossaryTerms: [
      { title: "Creator burnout", intent: "A load and recovery failure pattern that can include exhaustion, cynicism, and reduced efficacy." },
      { title: "Longevity floor", intent: "The weekly creator schedule and habits you can still keep on a hard ordinary week." },
    ],
    suggestedDownloads: [
      { title: "${s.downloads[0]}", intent: "Primary wellness system artifact." },
      { title: "${s.downloads[1]}", intent: "Planning artifact." },
      { title: "${s.downloads[2]}", intent: "Evidence and review artifact." },
    ],
    suggestedBlogSupport: [{ title: "Healthy streaming habits for long careers", intent: "Support creator sustainability without hustle culture." }],
  }`;
  }).join(",\n");

  return `import type { LessonSeoPack } from "@/lib/resources/lesson-seo/types";

export const CREATOR_WELLNESS_LONGEVITY_MASTERY_LESSON_SEO: LessonSeoPack[] = [
${entries}
];
`;
}

mkdirSync(LESSON_DIR, { recursive: true });
mkdirSync(QUIZ_DIR, { recursive: true });
mkdirSync(dirname(EXAM_FILE), { recursive: true });
mkdirSync(dirname(SEO_FILE), { recursive: true });

for (let i = 0; i < SPECS.length; i++) {
  const l = SPECS[i];
  const body = renderLesson(l, i);
  const words = body.trim().split(/\s+/).length;
  if (words < 1800 || words > 2600) throw new Error(`${l.code} word count invalid: ${words}`);
  if (l.focusQuiz.length !== 8) throw new Error(`${l.code} quiz count invalid`);
  writeFileSync(join(LESSON_DIR, `${l.slug}.ts`), renderLessonFile(l, i), "utf8");
  writeFileSync(join(QUIZ_DIR, `${l.slug}.ts`), renderQuiz(l), "utf8");
  console.log(`${l.code}: ${words} words`);
}
writeFileSync(EXAM_FILE, renderExam(), "utf8");
writeFileSync(SEO_FILE, renderSeo(), "utf8");
console.log("Wrote Program Final + SEO pack");
console.log("CWL write-lessons complete");
