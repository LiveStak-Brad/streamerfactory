/**
 * Writes Brand Partnerships Mastery lessons, quizzes, SEO, Program Final.
 * Run: node scripts/tmp-bp-write-lessons.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_DIR = join(ROOT, "src/content/streameru/lessons");
const QUIZ_DIR = join(ROOT, "src/lib/assessments/quizzes/partnerships");
const EXAM_FILE = join(ROOT, "src/lib/assessments/exams/program-partnerships.ts");
const SEO_FILE = join(ROOT, "src/lib/resources/lesson-seo/packs/brand-partnerships-mastery.ts");

const bullets = (xs) => xs.map((x) => `- ${x}`).join("\n");
const numbered = (xs) => xs.map((x, i) => `${i + 1}. ${x}`).join("\n");
const PARTNERSHIP_STANDARD = `### Partnership standard: professionalism over hype

Brand Partnerships Mastery teaches trust, preparation, reliability, communication, transparency, and long-term relationship building. Success is measured by the completion and quality of reviewable professional artifacts—not by securing a real sponsorship, gift totals, viewer rank, or purchased followers.

This is general creator education, not legal, tax, or contract advice. Exclusivity clauses, usage rights, payment terms, and FTC disclosure obligations vary by deal and jurisdiction. When a question requires binding interpretation, consult a qualified attorney or accountant. Never teach fake metrics, buying followers, misleading analytics, fake testimonials, unethical sponsorships, hidden advertising, or contract avoidance.

Selling & Influence Mastery owns ethical ask craft. TikTok Shop Mastery owns shop mechanics. Professional Creator Mastery owns full business accounting. This path owns brand partnership readiness, EPK building, outreach, negotiation awareness, campaign delivery, reporting, and portfolio assembly. Callbacks to those paths are welcome; duplication is not.`;

const PARTNERSHIP_REALITY = `### Partnership Reality — platforms and marketplaces change

Analytics dashboards, disclosure tools, sponsorship marketplaces, and brand contact paths update frequently. This material was **last reviewed July 2026.** Label every statistic with platform and timeframe. Re-check FTC and platform disclosure guidance when you publish sponsored content on a new format. Treat your EPK and rate card as living documents with a review date, not a one-time PDF you forget.`;

const EPK_FIELDS_BLOCK = `### EPK Builder field definitions (Streamer Factory EPK)

Every professional EPK should define these fields clearly—brands should never have to guess what you mean:

- **Creator biography** — professional summary written for brand readers; not fan hype.
- **Professional headshot** — current, well-lit, on-brand image for press and decks.
- **Platform statistics** — each stat labeled with platform name and measurement timeframe.
- **Audience overview / demographics** — who watches, why they show up, and honest context.
- **Content categories** — the themes and formats you reliably publish.
- **Previous collaborations** — real past brand work with outcomes where permitted.
- **Portfolio samples** — clips, posts, or case snapshots that prove fit.
- **Contact information** — business email or booking path; not a personal DM free-for-all.
- **Rate card (optional / private)** — package tiers shared only when appropriate.
- **Brand values / fit statement** — categories you will and will not promote.
- **Press photos** — high-resolution images approved for brand use.
- **Media gallery** — curated visuals and sample content links.
- **Downloadable PDF** — exportable one-sheet for agencies forwarding your file.
- **Public EPK page URL** — share link brands can open without requesting access twice.`;

const sharedPractice = `### Shared practice: build evidence before you pitch

Complete the lesson downloads as if a brand manager will review them tomorrow. Use honest metrics, dated screenshots where appropriate, and plain language. A peer should be able to grade your mission on artifact quality alone—they do not need proof that a deal closed, gifts arrived, or rank moved.

### Shared practice: one professional improvement per lesson

Implement one small change: tighten a bio sentence, add a timeframe to a stat, draft one outreach email, or mark one EPK field complete. Record the date and one review note. Optional Brand Partnerships Lab / Honors never gates the Brand Partnerships Mastery Certificate.`;

function pad(topic, a, b, c, d, e, f) {
  return [
    { h: `${topic}: define the professional system`, body: `${a} Brand partnerships reward creators who treat preparation like a job. Start by naming what professional readiness means for your channel: consistent publishing, audience clarity, disclosure discipline, and artifacts a stranger can evaluate in ten minutes. Separate ambition from evidence. You can aim at premium brands while honestly documenting where you are today. Creators who build durable partnership careers win on reliability and clear communication long before they win on fame. Your operating system should make the trustworthy choice the default on a busy week.` },
    { h: "Research and fit before outreach volume", body: `${b} Spray-and-pray outreach burns reputation faster than silence. Build a short list of brands whose products your audience already uses or would genuinely benefit from. Score fit across audience overlap, values alignment, category credibility, and realistic budget tier. Log research notes: recent campaigns, creator partners they hired, agency names, and realistic contact paths. Version-aware note: sponsorship marketplaces and brand inboxes change; confirm the current submission route rather than relying on a stale thread. Never pad a fit score because you want the logo.` },
    { h: "Communicate like someone easy to rebook", body: `${c} Professional communication is concise, specific, and respectful of time. Outreach emails state who you are, who your audience is, one proof point, and one clear ask—not a life story. Follow-up cadence is planned with a polite close-out. On calls, repeat deliverables in plain language and confirm timelines in writing afterward. Brands rebook creators who answer messages, hit dates, disclose properly, and report without drama.` },
    { h: "Scope, disclosure, and delivery discipline", body: `${d} Every campaign needs written scope: deliverables, dates, approval steps, revision limits, and disclosure placement. Plan FTC-compliant sponsorship labels for each platform format you will use. Deliver early when possible; never go LIVE with sponsored content while unclear on approval status. Capture proof screenshots and honest metrics with timeframe labels. Hidden advertising destroys trust and can create serious compliance risk; disclose clearly every time.` },
    { h: "Report honestly and plan renewals", body: `${e} Campaign reports recap objectives, delivery, honest metrics, audience response themes, and one idea for next time. Never inflate numbers, borrow another creator's results, or buy engagement to impress a client. Renewal conversations start with gratitude and proof of reliable execution—not desperation for another fee. Long-term partners emerge when you make their job easier: clear assets, on-time files, professional tone, and lessons learned they can share internally.` },
    { h: "File Capstone evidence and improve one dial", body: `${f} After implementation, inspect the dated artifact. What improved in your bio, EPK, target list, outreach log, negotiation notes, campaign plan, or report template? Choose one dial for the next ninety days: research quality, EPK completeness, outreach clarity, scope writing, reporting depth, or relationship maintenance. File worksheets for the Professional Brand Partnership Portfolio. Success is reviewable professionalism you can still defend ninety days later—not a screenshot of a brand reply you may never get.` },
  ];
}

const SPECS = [
  {
    code: "BP-01", slug: "understanding-brand-partnerships", title: "Understanding Brand Partnerships",
    excerpt: "Learn how brand partnerships work, what brands evaluate, and how to align deals with your values and audience.",
    downloads: ["brand-readiness-checklist", "partnership-types-map", "brand-safety-values-card"],
    missionName: "Complete Your Brand Readiness Audit",
    brad: "Brands do not sponsor potential—they sponsor proof they can trust. Readiness is documented professionalism long before the first yes.",
    learn: ["Define sponsorship, integration, affiliate, gifting, and ambassador models", "Score brand readiness without inflating metrics", "Write brand safety and values lines before pitching"],
    main: pad("Partnership foundations",
      "Map how money flows in creator-brand relationships: flat fees, affiliate commissions, product seeding, whitelisting, and ambassadorships.",
      "Study what brand managers scan first: audience fit, content quality, reliability signals, and past partnership behavior.",
      "Install a values card: categories you will promote, lines you will not cross, and disclosure non-negotiables.",
      "Separate this path from TikTok Shop mechanics and manipulative growth—partnerships require trust.",
      "Connect readiness artifacts to the Professional Brand Partnership Portfolio from lesson one.",
      "File the brand-readiness checklist, partnership-types map, and brand-safety values card with dates."),
    focusQuiz: [
      ["A creator buys followers before pitching brands. Professional response?", "Never—honest metrics and reviewable artifacts are the standard.", "Do it quietly if engagement looks low.", "Hide the purchase in a footnote.", "Brands never check audience quality."],
      ["BP-01 success should be graded on?", "Completed readiness artifacts with honest self-assessment.", "Landing a sponsorship this week.", "Gift totals on stream.", "Viewer rank versus peers."],
      ["Integrated sponsorship typically means?", "Brand message woven into content with clear disclosure.", "Secret advertising with no label.", "Only affiliate links with no creative work.", "Fake testimonials you did not experience."],
      ["Brand safety values card purpose?", "Pre-decide categories and lines you will not cross for any fee.", "Replace legal contract review.", "Guarantee every pitch succeeds.", "Eliminate disclosure requirements."],
      ["Which model is often lowest commitment?", "Gifting or seeding with clear expectations—not hidden ads.", "Exclusive multi-year ambassador with broad usage rights.", "Integrated campaign with reporting duties.", "Whitelisted ad spend requiring asset handoff."],
      ["This path must never teach?", "Fake metrics, hidden advertising, or buying followers.", "Disclosure planning.", "Professional outreach templates.", "Honest audience overviews."],
      ["Readiness before outreach means?", "Documented bio, audience context, portfolio samples, and values.", "Waiting until you are famous.", "Copying another creator's media kit.", "Avoiding all brand contact until viral."],
      ["Capstone connection for BP-01?", "Readiness checklist and values card filed in the portfolio.", "Screenshot of a rejected pitch.", "Purchased engagement proof.", "Empty promise to pitch someday."],
    ],
  },
  {
    code: "BP-02", slug: "building-your-professional-creator-profile", title: "Building Your Professional Creator Profile",
    excerpt: "Craft a professional creator identity—bio, audience overview, and portfolio samples—that brand teams can evaluate quickly.",
    downloads: ["creator-bio-worksheet", "audience-overview-worksheet", "portfolio-selection-guide"],
    missionName: "Publish Your Professional Creator Profile Draft",
    brad: "Your professional profile is the cover letter for every partnership conversation. Write it for the brand manager skimming fifty creators before lunch.",
    learn: ["Write a brand-facing bio without hype or slang overload", "Document audience overview with platform and timeframe labels", "Select portfolio samples that prove category fit"],
    main: pad("Professional profile",
      "Draft a biography stating niche, content promise, publishing rhythm, and partnership categories in under one minute of reading.",
      "Build an audience overview: primary platform, geography themes, interest clusters, and stats with timeframe labels.",
      "Choose three portfolio samples showing sponsored-ready quality—not only your loudest viral moment.",
      "Remove fan-facing inside jokes from brand materials; keep warmth without chaos.",
      "Cross-check stats against native analytics UI; note when dashboards redesign.",
      "File bio worksheet, audience overview, and portfolio selection guide for the Capstone."),
    focusQuiz: [
      ["Best bio tone for brand readers?", "Professional, specific, and scannable—not hype or slang soup.", "Inside jokes only day-one fans understand.", "Empty superlatives with no proof.", "Copied text from a larger creator."],
      ["Audience stats should always include?", "Platform name and measurement timeframe.", "Only lifetime totals with no context.", "Purchased follower counts.", "Rank versus other creators."],
      ["Portfolio selection should prove?", "Fit for brand categories you want—not random virality only.", "That you will work for free forever.", "That you never disclose sponsorships.", "That you have no past content."],
      ["A brand manager has two minutes. Your job?", "Make bio, audience, and samples legible that fast.", "Send a twenty-page life story.", "Require a call before sharing anything.", "Hide all metrics as secret."],
      ["Profile mission graded on?", "Completed worksheets and selected samples—not deal closure.", "Gifts this week.", "Viewer count alone.", "Number of blind pitches sent."],
      ["Inflated analytics in a profile?", "Violates trust—use honest numbers.", "Is fine if the brand does not check.", "Only matters for taxes.", "Replaces disclosure."],
      ["Third-person bio helps when?", "Agencies forward your file and need neutral language.", "You want to hide who you are.", "You refuse all partnerships.", "You skip audience overview."],
      ["BP-02 Capstone evidence?", "Dated bio, audience overview, and portfolio guide entries.", "A fake testimonial.", "Borrowed screenshots.", "Undated intentions."],
    ],
  },
  {
    code: "BP-03", slug: "creating-an-electronic-press-kit", title: "Creating an Electronic Press Kit (EPK)",
    excerpt: "Build a complete EPK with every field a brand team expects—bio, stats, demographics, samples, assets, and share link.",
    downloads: ["epk-field-worksheet", "media-kit-layout-checklist", "epk-assets-inventory"],
    missionName: "Complete Your EPK Field Worksheet",
    brad: "An EPK is not a fan page. It is a structured answer sheet brands forward internally—every field labeled, every stat dated.",
    learn: ["Define every Streamer Factory EPK Builder field", "Order media kit layout for brand skimming", "Inventory press photos, gallery items, and PDF export status"],
    main: pad("Electronic press kit",
      "Open the EPK field worksheet and define owner, status, and due date for biography, headshot, stats, demographics, categories, collabs, samples, and contact.",
      "Lay out the media kit in scan order: hook bio, proof stats, audience overview, portfolio samples, then contact and optional rate card.",
      "Inventory press photos and gallery assets at resolutions brands can actually use; mark missing items honestly.",
      "Mark rate card optional/private with a rule for when you share package tiers.",
      "Draft brand values/fit statement listing categories you will and will not promote.",
      "Record public EPK page URL or share link; file layout checklist and assets inventory for the Capstone."),
    focusQuiz: [
      ["Platform statistics in an EPK must include?", "Platform name and measurement timeframe for each stat.", "Only vanity totals with no labels.", "Purchased follower boosts.", "Rank screenshots only."],
      ["Rate card in EPK is typically?", "Optional and often private until appropriate.", "Required public list of every competitor's rates.", "Illegal to write.", "Replaced by hidden ads."],
      ["Public EPK page URL purpose?", "Let brands open your kit without repeated access requests.", "Hide all stats from everyone.", "Replace disclosure on sponsored posts.", "Host fake testimonials."],
      ["Press photos should be?", "High-resolution, current, and approved for brand use.", "Blurry screenshots from stream.", "Stolen from other creators.", "Optional if you have a logo only."],
      ["Previous collaborations field should list?", "Real past brand work with permitted outcomes—not fiction.", "Every brand you wish you worked with.", "Secret undeclared ads.", "Nothing until you are huge."],
      ["Media kit layout best practice?", "Lead with scannable bio and proof before dense paragraphs.", "Hide contact info to seem exclusive.", "Omit demographics entirely.", "Use only fan slang."],
      ["EPK mission success means?", "Field worksheet, layout checklist, and assets inventory completed.", "A brand signed you.", "Gifts increased.", "Rank improved."],
      ["When analytics UI changes?", "Re-label stats from the current dashboard with new timeframe notes.", "Keep old screenshots forever unlabeled.", "Inflate numbers to match.", "Delete the EPK."],
    ],
  },
  {
    code: "BP-04", slug: "finding-brands-that-fit-your-audience", title: "Finding Brands That Fit Your Audience",
    excerpt: "Research and score brands that genuinely match your audience, values, and content—not every logo with a budget.",
    downloads: ["brand-fit-scorecard", "sponsorship-tracker", "target-brand-research-sheet"],
    missionName: "Build Your Target Brand Short List",
    brad: "Fit beats fame in outreach lists. Five well-researched brands you actually match will outperform fifty generic pitches.",
    learn: ["Score brand fit across audience, values, and category", "Research recent campaigns and realistic contact paths", "Track outreach status with next-action dates"],
    main: pad("Brand fit research",
      "List categories your audience already buys or discusses authentically—gaming gear, wellness, food, finance tools, not random logos.",
      "Score at least five brands on fit scorecard: audience overlap, values alignment, creative credibility, and realistic tier.",
      "Document recent campaigns, creator partners, agencies, and submission routes from current brand sites.",
      "Reject brands that conflict with your safety values card even if the fee is tempting.",
      "Initialize sponsorship tracker columns: status, contact, next action, follow-up date.",
      "File scorecard, tracker, and research sheet dated for the Capstone."),
    focusQuiz: [
      ["Brand fit scorecard prevents?", "Spray-and-pray pitching to mismatched companies.", "All research.", "Any outreach ever.", "Disclosure requirements."],
      ["A high fit score requires?", "Honest audience overlap and values alignment—not wanting the logo.", "Purchased followers.", "Hidden ads.", "Fake case studies."],
      ["Target research sheet should capture?", "Recent campaigns, partners, and contact paths.", "Only CEO home addresses.", "Competitors' private contracts.", "Rumored budgets with no source."],
      ["Sponsorship tracker helps by?", "Making next actions and follow-ups visible—not hopeful memory.", "Guaranteeing replies.", "Replacing written scope.", "Hiding failed pitches."],
      ["Creator pitches energy drink to toddler-family channel. Fit?", "Poor—values and audience mismatch should block the pitch.", "Perfect if fee is high.", "Fine if disclosure is hidden.", "Required for growth."],
      ["Research before outreach means?", "Brand-specific notes in the first email—not generic praise.", "Copy-paste fifty identical emails.", "Buy followers first.", "Skip audience overview."],
      ["Mission graded on?", "Completed scorecard, tracker, and research sheet.", "One brand reply.", "Gift totals.", "Viewer rank."],
      ["Conflicting brand values?", "Decline or skip—even when budget looks attractive.", "Accept and hide sponsorship.", "Change values card secretly.", "Never document the decision."],
    ],
  },
  {
    code: "BP-05", slug: "professional-outreach-and-communication", title: "Professional Outreach & Communication",
    excerpt: "Write clear outreach, planned follow-ups, and professional intros that respect brand time and your reputation.",
    downloads: ["outreach-email-templates", "follow-up-cadence-card", "linkedin-intro-checklist"],
    missionName: "Send a Professional Outreach Draft",
    brad: "One specific, respectful email beats fifty desperate blasts. Say who you are, prove fit, and make the next step obvious.",
    learn: ["Customize outreach templates with proof and a clear ask", "Plan follow-up cadence with polite close-out rules", "Use professional intro checklists for agencies and LinkedIn"],
    main: pad("Outreach communication",
      "Customize outreach template: subject line, one-line hook, audience proof, one brand-specific observation, and single ask.",
      "Set follow-up cadence—day three, ten, twenty-one—with stop rules so you do not become spam.",
      "Run LinkedIn intro checklist: profile polish, mutual context, no wall-of-text DMs.",
      "Proofread for desperate tone, vague asks, and missing contact or EPK link.",
      "Log every touch in sponsorship tracker with date and outcome note.",
      "File templates, cadence card, checklist, and one dated draft for the Capstone."),
    focusQuiz: [
      ["Professional outreach should avoid?", "Desperate language and vague 'collab?' messages with no proof.", "Specific audience data.", "One clear ask.", "Proofread drafts."],
      ["Follow-up cadence should include?", "Planned touches and a polite final close-out.", "Daily messages until blocked.", "Threats about competitors.", "Never stopping."],
      ["Brand-specific observation means?", "Reference a real campaign or product fit—not generic flattery.", "Copy their mission statement only.", "Pretend you already work together.", "Offer hidden ads."],
      ["LinkedIn intro checklist ensures?", "Professional profile and concise context before asking.", "Immediate voice note spam.", "Fake mutual connections.", "Sharing private rates publicly."],
      ["After three follow-ups with no reply?", "Close the loop politely and move on—reputation matters.", "Create drama publicly.", "Send fifty more emails.", "Buy followers then retry."],
      ["Outreach mission success?", "Completed templates, cadence, checklist, and dated draft.", "Guaranteed brand contract.", "Higher gifts.", "Rank increase."],
      ["EPK link in outreach should?", "Go to a complete or honestly in-progress public kit.", "Hide all stats.", "Use broken links.", "Replace disclosure."],
      ["This lesson is NOT?", "Selling & Influence ask craft for viewers—that is a different path.", "Business email structure.", "Follow-up planning.", "Professional tone."],
    ],
  },
  {
    code: "BP-06", slug: "negotiating-sponsorships-professionally", title: "Negotiating Sponsorships Professionally",
    excerpt: "Define scope, rate packages, and high-level deal terms—with clear boundaries on legal advice.",
    downloads: ["negotiation-scope-worksheet", "rate-card-planner", "deal-terms-checklist"],
    missionName: "Draft Your Negotiation Scope Package",
    brad: "Negotiation is clarity, not combat. Write deliverables, dates, and must-haves before the call so neither side guesses.",
    learn: ["Write deliverable scope in plain language", "Draft private rate card tiers even before public sharing", "Use deal terms checklist and know when to call an attorney"],
    main: pad("Negotiation readiness",
      "Break deliverables into units: LIVE integrations, VOD mentions, clips, stories, usage windows, and revision rounds.",
      "Draft rate-card packages—bronze, silver, gold—even if you share them only after fit is confirmed.",
      "Walk deal-terms checklist: payment timing, exclusivity flags, usage rights, whitelisting, kill fees, disclosure duties.",
      "Separate must-haves from nice-to-haves before negotiation so you do not concede scope accidentally.",
      "Pause on exclusivity or perpetual usage language you do not understand; consult a qualified attorney.",
      "File scope worksheet, rate planner, and terms checklist with dated notes for the Capstone."),
    focusQuiz: [
      ["Negotiation scope worksheet should list?", "Deliverables, dates, approval steps, and revision limits in plain language.", "Only a dollar amount with no details.", "Verbal handshake promises.", "Hidden ad instructions."],
      ["Rate card purpose?", "Package tiers that help you know your floor—even if private.", "Public shaming of other creators' rates.", "Legal contract replacement.", "Fake metric guarantees."],
      ["Exclusivity clause you do not understand?", "Pause and consult a qualified attorney—not guess on stream.", "Sign immediately for speed.", "Ignore it.", "Ask chat to interpret."],
      ["Usage rights concern?", "How long and where a brand may use your likeness or clips.", "Only gift totals.", "Chat emoji choices.", "Stream title fonts."],
      ["Handshake deals risk?", "Scope drift, payment disputes, and missing disclosure clarity.", "Nothing—they are always best.", "Only for small creators.", "Required by FTC."],
      ["Must-haves versus nice-to-haves help?", "Prevent accidental concessions during live calls.", "Eliminate all negotiation.", "Replace written scope.", "Hide sponsorship."],
      ["Mission evidence?", "Scope worksheet, rate planner, and deal terms checklist.", "Signed contract without reading.", "Gift screenshot.", "Viewer rank."],
      ["This path teaches contracts as?", "High-level awareness—not legal advice.", "Attorney replacement.", "Optional jokes.", "Reason to avoid disclosure."],
    ],
  },
  {
    code: "BP-07", slug: "delivering-outstanding-campaigns", title: "Delivering Outstanding Campaigns",
    excerpt: "Plan campaigns, hit deliverables, disclose sponsorships clearly, and capture proof without cutting corners.",
    downloads: ["campaign-planner", "deliverables-checklist", "ftc-disclosure-reminder-card"],
    missionName: "Build a Campaign Delivery Plan",
    brad: "Brands remember the creator who hit dates, disclosed clearly, and sent proof before being asked. That is repeat business.",
    learn: ["Timeline from brief acceptance through reporting", "Checklist draft, approval, publish, and proof capture steps", "Plan FTC disclosure placement per platform format"],
    main: pad("Campaign delivery",
      "Translate brand brief into campaign planner: milestones, owners, asset needs, and buffer days before go-live.",
      "Run deliverables checklist for each unit: draft, brand approval, publish, disclosure placement, proof capture.",
      "Plan disclosure language and on-screen placement for LIVE, short video, and static formats separately.",
      "Never publish sponsored content while approval status is unclear; confirm in writing.",
      "Capture honest proof: screenshots, links, and timeframe-labeled metrics stubs—even for practice campaigns.",
      "File planner, checklist, and disclosure reminder card for the Capstone."),
    focusQuiz: [
      ["Before LIVE sponsored content goes out?", "Confirm approval status and disclosure placement in writing.", "Improvise disclosure if chat asks.", "Hide sponsorship for authenticity.", "Skip brief review."],
      ["Deliverables checklist includes?", "Draft, approval, publish, disclosure, and proof capture.", "Only going LIVE.", "Only invoice sending.", "Only gift counting."],
      ["FTC disclosure reminder card purpose?", "Pre-plan clear sponsorship labels per format.", "Eliminate all labels.", "Hide #ad in fine print off-screen.", "Replace attorney review."],
      ["Late delivery best handled by?", "Proactive brand notice with revised timeline—not ghosting.", "Silence until they forget.", "Blaming chat.", "Deleting evidence."],
      ["Campaign planner should include?", "Milestones, owners, buffers, and asset needs.", "Only vibes.", "Purchased engagement plan.", "Fake testimonial script."],
      ["Hidden advertising?", "Violates trust and program standards—always disclose.", "Fine for gifting.", "Required for renewals.", "Better for engagement."],
      ["Mission success?", "Completed planner, checklist, and disclosure card.", "Brand renewal guaranteed.", "Gift spike.", "Rank jump."],
      ["Proof capture means?", "Honest screenshots and links with timeframe labels.", "Inflated metrics.", "Borrowed results.", "Deleted posts."],
    ],
  },
  {
    code: "BP-08", slug: "reporting-results-and-building-repeat-business", title: "Reporting Results & Building Repeat Business",
    excerpt: "Write honest campaign reports, plan renewal conversations, and document proof metrics brands can trust.",
    downloads: ["campaign-report-template", "renewal-conversation-checklist", "proof-metrics-worksheet"],
    missionName: "Draft a Campaign Results Report",
    brad: "Reporting is where repeat deals are won. Honest numbers, clear learnings, and a thoughtful next idea beat a flashy deck full of air.",
    learn: ["Structure reports: objectives, execution, metrics, learnings, next steps", "Plan renewal timing and conversation prompts", "Label proof metrics with platform-native stats and timeframes"],
    main: pad("Reporting and renewal",
      "Open campaign report template: objectives recap, execution summary, honest metrics, qualitative themes, learnings, next steps.",
      "Use proof-metrics worksheet to pull platform-native stats with timeframe labels—no borrowed screenshots.",
      "Draft renewal conversation checklist: gratitude, results recap, audience insight, one future campaign idea.",
      "Never inflate numbers or buy engagement to impress; brands audit and creators lose careers over fraud.",
      "Send reports on time even when numbers are mixed; professionalism includes honest bad news early.",
      "File template, renewal checklist, and metrics worksheet—mock report allowed for Capstone evidence."),
    focusQuiz: [
      ["Campaign report should use?", "Honest metrics with timeframe labels and clear learnings.", "Purchased engagement boosts.", "Borrowed peer screenshots.", "Inflated numbers for renewal."],
      ["Renewal conversation starts with?", "Gratitude and reliable execution recap—not desperation.", "Threats to go to competitors.", "Hidden ad promises.", "Silence until they chase you."],
      ["Proof metrics worksheet prevents?", "Vague claims with no platform context.", "All reporting.", "Disclosure.", "Written scope."],
      ["Mixed campaign results?", "Report honestly with learnings and next-step ideas.", "Hide the report.", "Fabricate better numbers.", "Blame audience only."],
      ["Repeat business comes from?", "Reliability, communication, honest reporting, and fit—not hype.", "Ghosting after payment.", "Hidden sponsorship.", "Fake testimonials."],
      ["Report timing?", "On agreed schedule—even if results are still settling with labeled timeframes.", "Never send reports.", "Only send if numbers beat everyone.", "One year late."],
      ["Mission evidence?", "Report template, renewal checklist, metrics worksheet completed.", "Real brand payment.", "Gift total.", "Rank."],
      ["Qualitative themes in reports?", "Audience reactions and content notes brands can use internally.", "Insults toward the brand.", "Chat drama screenshots only.", "Purchased comments."],
    ],
  },
  {
    code: "BP-09", slug: "becoming-a-long-term-brand-partner", title: "Becoming a Long-Term Brand Partner",
    excerpt: "Maintain relationships between campaigns, protect reputation, and plan multi-month partnership roadmaps.",
    downloads: ["brand-relationship-planner", "reputation-scorecard", "partnership-renewal-roadmap"],
    missionName: "Write Your Partnership Renewal Roadmap",
    brad: "Long-term partners are easy to rebook: they communicate, deliver, disclose, and bring ideas—not drama or disappearing acts.",
    learn: ["Plan touchpoints between campaigns that add value", "Score reputation across reliability, communication, and disclosure", "Map twelve-month renewal roadmap for anchor relationships"],
    main: pad("Long-term partnerships",
      "Use brand relationship planner for between-campaign touchpoints: check-ins, sharing relevant wins, and thoughtful ideas.",
      "Score reputation on reliability, communication clarity, disclosure discipline, and fit—not fake wins.",
      "Build partnership renewal roadmap for twelve months with two anchor brands or mock anchor targets.",
      "Document prevention rules for late delivery, vague reporting, and disclosure slips before they become patterns.",
      "Describe why you are easy to rebook using evidence language, not bragging about gifts or rank.",
      "File relationship planner, reputation scorecard, and renewal roadmap for the Capstone."),
    focusQuiz: [
      ["Between-campaign touchpoints should?", "Add value without spam—check-ins and relevant ideas.", "Demand new contracts weekly.", "Send hidden ads.", "Buy followers before each ping."],
      ["Reputation scorecard tracks?", "Reliability, communication, disclosure, and fit.", "Only gift totals.", "Only viewer rank.", "Only gear spending."],
      ["Renewal roadmap includes?", "Twelve-month plan with anchor relationships and review dates.", "Hope without dates.", "Fake testimonials.", "Contract avoidance."],
      ["Late delivery pattern hurts because?", "Brands plan campaigns around trust and calendars.", "Only small creators care.", "Disclosure fixes it.", "Reports do not matter."],
      ["Easy to rebook means?", "Clear communication, on-time work, honest reporting—not hype.", "Always lowest price.", "Hidden sponsorship.", "Never saying no."],
      ["Anchor brand in roadmap can be?", "Real partner or well-researched mock target with honest fit notes.", "Only Fortune 500 fantasy.", "Random logo with no research.", "Competitor you secretly bash."],
      ["Mission success?", "Relationship planner, reputation scorecard, renewal roadmap dated.", "Guaranteed multi-year deal.", "Gift record.", "Rank one."],
      ["Optional Honors Lab?", "Never gates the Brand Partnerships Mastery Certificate.", "Required before BP-01.", "Replaces Capstone.", "Replaces quizzes."],
    ],
  },
  {
    code: "BP-10", slug: "brand-partnerships-capstone-professional-portfolio", title: "Brand Partnerships Capstone: Professional Portfolio",
    excerpt: "Assemble every partnership artifact and EPK field into one reviewable Professional Brand Partnership Portfolio.",
    downloads: ["professional-brand-partnership-portfolio", "epk-evidence-checklist", "ninety-day-partnership-improvement-plan"],
    missionName: "Assemble Your Professional Brand Partnership Portfolio",
    brad: "The Capstone is not a pitch fantasy. It is a binder of dated systems and EPK fields a brand manager can evaluate in one sitting.",
    learn: ["Map BP-01 through BP-09 artifacts into the portfolio with dates", "Verify every EPK field against the evidence checklist", "Write ninety-day improvement plan with three skills and review dates"],
    main: pad("Portfolio Capstone",
      "Open professional-brand-partnership-portfolio template and map each BP lesson artifact to a section with completion date.",
      "Run epk-evidence-checklist against every EPK Builder field: bio, headshot, stats, demographics, categories, collabs, samples, contact, rate card rule, values, photos, gallery, PDF, URL.",
      "Draft ninety-day-partnership-improvement-plan with three skills max—research, EPK, outreach, scope, reporting, or relationships.",
      "Stress-test scenarios: late brief, unclear disclosure, renewal timing, and metric dashboard redesign.",
      "Confirm optional Brand Partnerships Lab / Honors never gates the Brand Partnerships Mastery Certificate.",
      "Submit reviewable portfolio dossier; success is completeness and quality, not landing a live deal."),
    focusQuiz: [
      ["Capstone graded on?", "Dated portfolio artifacts, EPK checklist, and ninety-day plan.", "Securing a sponsorship during Capstone week.", "Gift totals.", "Viewer rank."],
      ["EPK evidence checklist verifies?", "Every defined field complete or honestly marked in progress.", "Only follower count.", "Only logo.", "Hidden ads."],
      ["Ninety-day plan quality means?", "Three or fewer improvements with review dates.", "Forty infinite goals.", "No dates.", "Only vibes."],
      ["Missing dated artifact in portfolio?", "Complete the lesson artifact before claiming Capstone done.", "Write TBD forever.", "Replace with rank screenshot.", "Skip and hope."],
      ["Public EPK page URL in Capstone?", "Required evidence that brands can open your kit.", "Optional if you never pitch.", "Replaces all disclosure.", "Hosts fake reviews."],
      ["Honors Lab relationship?", "Optional after certificate; never a gate.", "Required to graduate.", "Replaces Program Final.", "Replaces EPK."],
      ["Contract questions in Capstone?", "Note attorney handoff; do not pretend worksheets are legal advice.", "Sign anything quickly.", "Avoid all mention.", "Ask chat to review."],
      ["Career partnership success looks like?", "Reviewable professionalism still true ninety days later.", "One lucky reply.", "Purchased followers.", "Hidden sponsorship habit."],
    ],
  },
];

function renderLesson(l, i) {
  const [a, b, c] = l.downloads;
  const prev = i ? `${SPECS[i - 1].title} (${SPECS[i - 1].code})` : "Advanced Creator — professional operating habits";
  const next =
    i === 9
      ? "Program Final — demonstrate Brand Partnerships systems and Capstone readiness"
      : `${SPECS[i + 1].title} (${SPECS[i + 1].code})`;
  const nextPreview =
    i === 9
      ? "Take the Program Final and keep the Professional Brand Partnership Portfolio on a quarterly review cycle."
      : `Next, **${SPECS[i + 1].code}** deepens ${SPECS[i + 1].title.toLowerCase()} as another partnership system.`;
  const epkBlock =
    l.slug === "creating-an-electronic-press-kit" || l.slug === "brand-partnerships-capstone-professional-portfolio"
      ? `\n${EPK_FIELDS_BLOCK}\n`
      : "";
  const capstoneNote =
    l.slug === "brand-partnerships-capstone-professional-portfolio"
      ? `\n### Capstone assembly\n\nMap every BP-01 through BP-09 artifact into the **Professional Brand Partnership Portfolio**. Include EPK evidence against every field above, a ninety-day improvement plan with three skills max, and stress-test notes for late delivery, unclear briefs, and renewal timing. Optional **Brand Partnerships Lab / Honors** never gates the **Brand Partnerships Mastery Certificate**.\n`
      : "";

  return `## Introduction

${l.title} turns brand partnership readiness into documented professional practice—not wishful pitching. ${l.excerpt}

Every artifact in ${l.code} supports the Capstone: **Professional Brand Partnership Portfolio** and your Streamer Factory EPK. This path answers a practical question: how do you become the creator brands trust before and after the first deal? The answer is preparation, honest metrics, clear communication, reliable delivery, transparent disclosure, and relationships built on repeat quality—not hype, hidden ads, or purchased credibility.

## What You Will Learn

${bullets(l.learn)}

## Prerequisites

Complete Core Certification and Advanced Creator before certificate award. Complete earlier Brand Partnerships Mastery lessons in sequence. Bring honest analytics access, a draft bio, and willingness to build artifacts even if no deal is signed yet. Professional Creator Mastery helps with business accounting; this path focuses on partnership readiness and EPK evidence.

## Why This Matters

**Previous:** ${prev}
**This lesson:** ${l.title} (${l.code}) — ${l.excerpt}
**Next:** ${next}

Creators lose partnership opportunities for predictable reasons: unclear audience data, unprofessional outreach, missing EPK fields, late deliverables, vague reporting, or disclosure mistakes—not because they lack talent. ${l.title} makes those failure modes teachable and fixable with artifacts you can build this week. Growth and monetization craft still matters, but brands hire reliability they can verify.

## Learning Objectives

- Explain the core partnership principle in ${l.code} using professional, reviewable language.
- Build the three lesson downloads as dated artifacts for the Capstone portfolio.
- Implement one LIVE Mission improvement without grading yourself by deals closed, gifts, or rank.
- Identify when contract, tax, or compliance questions require a qualified professional.
- Connect this lesson's evidence to the Professional Brand Partnership Portfolio.

## Main Lesson

${l.main.map((s) => `### ${s.h}\n\n${s.body}`).join("\n\n")}
${epkBlock}${capstoneNote}
${sharedPractice}

${PARTNERSHIP_STANDARD}

[Callout: Preparation beats pitching empty air]
Brands sponsor proof they can trust. One complete EPK field beats ten desperate DMs.

${PARTNERSHIP_REALITY}

### Capstone connection

${a}, ${b}, and ${c} form the ${l.code} evidence layer of the Professional Brand Partnership Portfolio. Completion evidence is the finished artifact, review notes, and one controlled improvement—not securing a real sponsorship, gifts, viewers, or rank. Optional Brand Partnerships Lab / Honors never gates the Brand Partnerships Mastery Certificate.

## Examples

- A creator adds timeframe labels to every platform stat before sending a media kit.
- An outreach email names one specific campaign the brand ran and one audience overlap point—no generic praise.
- A campaign report includes honest metrics, disclosure screenshots, and a renewal idea for next quarter.

## Real Creator Scenarios

- A creator receives a vague gifting offer with no disclosure guidance: they clarify scope in writing or decline.
- A brand asks for exclusivity language the creator does not understand: they pause and consult a qualified attorney.
- A manager requests whitelisted ad assets: the creator confirms usage rights and delivery dates before filming.

## Screenshots

[Screenshot: completed ${a} with professional non-sensitive notes]

[Screenshot: ${b} prepared for outreach or campaign planning]

[Screenshot: ${c} marked with evidence and one improvement]

[Screenshot: dated review note for the Professional Brand Partnership Portfolio; last reviewed July 2026]

## Diagrams

[Diagram: Research → fit score → outreach → scope → delivery → report → renewal]

[Diagram: EPK fields → public page → brand review → campaign brief]

[Diagram: Lesson artifact → implementation → review note → Capstone portfolio]

## From Brad's Experience

[BradExperience]
${l.brad}

## Pro Tips

- Label every stat with platform and timeframe before it leaves your laptop.
- Write follow-up cadence before you send the first email.
- Keep rate cards private until appropriate, but still write them for yourself.
- Plan disclosure placement before you go LIVE with sponsored content.
- File artifacts weekly so the Capstone is assembly, not panic.

## Common Beginner Mistakes

- Pitching before bio, audience overview, and portfolio samples exist.
- Copy-pasting outreach templates without brand-specific research.
- Treating gifting as permission to hide advertising.
- Handshake deals with no written scope or dates.
- Grading partnership mastery by whether a brand replied this week.

## Reality Check

Partnership work is preparation-heavy on purpose. The creators brands rebook often look organized from the outside and boringly reliable on deliverables. Grade **${l.missionName}** on completed artifacts, one implemented improvement, and a dated review note—never deals closed, gifts, viewers, or rank.

## Summary

${l.title} installs a practical partnership system you can run before any deal exists. You leave with dated tools, one implemented improvement, and Capstone-ready evidence. The goal is professional brand partnership readiness you can demonstrate in a portfolio—not a lucky reply in your inbox.

## LIVE Mission

**Mission: ${l.missionName}**

${numbered([
  `Complete the ${a} for your real current channel and goals.`,
  `Use the ${b} to make the next partnership habit concrete and dated.`,
  "Implement one professional improvement: bio edit, EPK field, research row, outreach draft, scope note, or report section.",
  `Mark ${c} with what changed, what is still hard, and one next improvement.`,
  "File the evidence for the Professional Brand Partnership Portfolio without attaching deal closure, gifts, or viewer targets.",
])}

## Downloads

- **${a}** — primary checklist or map for this lesson
- **${b}** — worksheet or planner that makes the habit concrete
- **${c}** — scorecard, card, or template for reviewable evidence

## Quiz

Take the interactive lesson quiz on this page (70% to pass). Eight scenario questions assess professional partnership decisions and reviewable evidence—not hype or unethical shortcuts.

## Key Takeaways

- Trust and transparency beat hype in brand partnerships.
- EPK completeness and honest metrics are pre-outreach work.
- Written scope and disclosure protect both creator and brand.
- Reporting and renewals build repeat business over time.
- Capstone evidence is dated implementation, never vanity metrics or fake proof.

## Before You Move On

- ☐ Finished the lesson and completed ${a}, ${b}, and ${c}.
- ☐ Implemented one real professional improvement.
- ☐ Routed any contract, tax, or compliance question to a qualified professional when needed.
- ☐ Recorded one improvement and filed it for the Professional Brand Partnership Portfolio.
- ☐ Passed the eight-question lesson quiz at 70% or higher.

## Next Lesson Preview

${nextPreview}
`;
}

function renderLessonFile(l, i) {
  const content = renderLesson(l, i);
  const minutes = l.slug === "brand-partnerships-capstone-professional-portfolio" ? 45 : 38;
  return `import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "${l.slug}",
  excerpt: ${JSON.stringify(l.excerpt)},
  estimatedMinutes: ${minutes},
  content: \`${content.replace(/`/g, "\\`")}\`,
};
`;
}

function renderQuiz(l) {
  const qs = l.focusQuiz
    .map(
      ([prompt, correct, w1, w2, w3], qi) => `    question("q${qi + 1}", ${JSON.stringify(prompt)}, [
      [${JSON.stringify(correct)}, true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      [${JSON.stringify(w1)}, false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      [${JSON.stringify(w2)}, false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      [${JSON.stringify(w3)}, false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),`,
    )
    .join("\n");
  return `import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "${l.slug}",
  programKey: "partnerships",
  title: "Quiz: ${l.title}",
  questions: [
${qs}
  ],
});
`;
}

function renderExam() {
  const items = [
    ["bp1", "What is the core partnership principle of this path?", "Preparation and reviewable professional artifacts with honest metrics.", "Buy followers before pitching.", "Hide sponsored content for authenticity.", "Grade success only by landing a deal."],
    ["bp2", "Best audience stat practice for an EPK?", "Label platform and timeframe on every metric.", "Use lifetime totals only with no context.", "Borrow another creator's analytics.", "Omit demographics entirely."],
    ["bp3", "A vague gifting offer arrives with no disclosure guidance. Best move?", "Clarify scope and disclosure in writing or decline.", "Go LIVE immediately with no label.", "Assume gifting means no rules.", "Post fake testimonials instead."],
    ["bp4", "Professional outreach should include?", "Who you are, audience proof, one specific ask—not a generic blast.", "A twenty-page autobiography.", "Desperate language about needing money.", "Hidden rates and fake metrics."],
    ["bp5", "Negotiation scope worksheet purpose?", "Plain-language deliverables, dates, and must-haves before calls.", "Avoid all written confirmation.", "Skip disclosure planning.", "Copy contracts without reading."],
    ["bp6", "FTC disclosure on LIVE sponsored content should be?", "Clear, proximate, and planned before going LIVE.", "Hidden in tiny text off-screen.", "Skipped if chat already knows the brand.", "Improvised after the brand complains."],
    ["bp7", "Campaign reporting should use?", "Honest platform-native metrics with timeframe labels.", "Purchased engagement boosts.", "Inflated numbers to secure renewal.", "Borrowed screenshots from peers."],
    ["bp8", "Long-term brand partners are built by?", "Reliability, communication, transparent disclosure, and honest reporting.", "Ghosting after payment.", "Hidden ads to protect vibe.", "Never sending recap decks."],
    ["bp9", "When should a creator consult an attorney?", "For binding exclusivity, usage rights, or contract language they do not understand.", "Never; worksheets replace lawyers.", "Only after a public scandal.", "Only if gifts drop."],
    ["bp10", "What is the Capstone artifact?", "Professional Brand Partnership Portfolio with dated EPK evidence and ninety-day plan.", "A viewer leaderboard.", "A purchased follower receipt.", "An undated pitch wish list."],
    ["bp11", "Brand Partnerships Lab / Honors relationship to certificate?", "Optional after certificate; never a gate.", "Required to earn the certificate.", "Replaces the Capstone.", "Replaces the Program Final."],
    ["bp12", "This path must never teach?", "Fake metrics, hidden advertising, buying followers, or contract avoidance.", "EPK field definitions.", "Follow-up cadence.", "Renewal conversation checklists."],
    ["bp13", "Mission success in this program is graded on?", "Completed professional artifacts and implementation quality.", "Securing a real sponsorship.", "Gift totals.", "Viewer rank."],
  ];
  return `import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "partnerships",
  programName: "Brand Partnerships Mastery",
  title: "Program Final: Brand Partnerships Mastery",
  questions: [
${items
  .map(
    ([id, p, c, ...w]) => `    question(${JSON.stringify(id)}, ${JSON.stringify(p)}, [
      [${JSON.stringify(c)}, true, "Correct — that answer protects professional brand partnerships with reviewable evidence."],
      [${JSON.stringify(w[0])}, false, "Wrong — hype and unethical shortcuts are not partnership skills."],
      [${JSON.stringify(w[1])}, false, "Wrong — mastery is graded on artifacts, not vanity metrics."],
      [${JSON.stringify(w[2])}, false, "Wrong — protect transparency, preparation, and honest communication."],
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
        ? `{ label: "Brand Partnerships Program Final", href: "/streameru/programs/partnerships/final" }`
        : `{ label: "Next: ${SPECS[i + 1].title}", href: "/streameru/${SPECS[i + 1].slug}" }`;
    return `  {
    slug: "${s.slug}",
    primaryKeyword: "${s.title.toLowerCase()} for creators",
    secondaryKeywords: ["brand partnerships", "creator sponsorship", "EPK", "Professional Brand Partnership Portfolio"],
    metaTitle: ${JSON.stringify(`${s.title} | StreamerU`)},
    metaDescription: ${JSON.stringify(s.excerpt)},
    faqs: [
      { question: "What does this Brand Partnerships lesson teach?", answer: ${JSON.stringify(
        `${s.title} teaches practical partnership readiness with dated artifacts and a LIVE Mission graded on professional evidence, not deal closure.`,
      )} },
      { question: "Is this legal or contract advice?", answer: "No. It is general creator education. Binding contract, tax, and compliance questions belong with qualified professionals." },
      { question: "Does this replace TikTok Shop or Professional Creator Mastery?", answer: "No. TikTok Shop covers shop mechanics; Professional Creator covers business accounting; this path covers brand partnership readiness and EPK building." },
      { question: "How is the mission graded?", answer: "By completed artifacts and one implemented improvement. Deals closed, gifts, viewers, and rank are not grading targets." },
      { question: "What evidence do I leave with?", answer: ${JSON.stringify(
        `You leave with ${s.downloads.join(", ")} and evidence for the Professional Brand Partnership Portfolio.`,
      )} },
    ],
    relatedGuideSlugs: ["creator-support", "brand-deals", "monetization"],
    internalLinks: [
      ${prev},
      ${next},
      { label: "Professional Creator Mastery", href: "/streameru/programs/professional" },
    ],
    suggestedGlossaryTerms: [
      { title: "Electronic press kit (EPK)", intent: "A structured creator media kit brands use to evaluate fit, stats, and samples." },
      { title: "Brand fit", intent: "How well a brand's audience, values, and category match your content and community." },
    ],
    suggestedDownloads: [
      { title: "${s.downloads[0]}", intent: "Primary partnership artifact." },
      { title: "${s.downloads[1]}", intent: "Planning artifact." },
      { title: "${s.downloads[2]}", intent: "Evidence and review artifact." },
    ],
    suggestedBlogSupport: [{ title: "Professional brand partnerships for live creators", intent: "Support sponsorship readiness without hype or hidden ads." }],
  }`;
  }).join(",\n");

  return `import type { LessonSeoPack } from "@/lib/resources/lesson-seo/types";

export const BRAND_PARTNERSHIPS_MASTERY_LESSON_SEO: LessonSeoPack[] = [
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
console.log("BP write-lessons complete");
