import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for AI Creator Mastery (programKey `aicreator`).
 */
export const exam = programFinal({
  programKey: "aicreator",
  programName: "AI Creator Mastery",
  title: "Program Final: AI Creator Mastery",
  questions: [
    question("aic1", "AI Creator Mastery answers which core question?", [
      [
        "How do I use AI as a professional assistant that raises quality and consistency while I keep judgment, voice, and accountability?",
        true,
        "Correct — assistance with human standards, not replacement.",
      ],
      ["How do I let AI fully replace my creative decisions?", false, "Wrong — judgment stays human."],
      ["How do I stream for the first time?", false, "Wrong — Core already taught that."],
      ["How do I automate spam and engagement farming?", false, "Wrong — unethical."],
    ]),
    question("aic2", "Thinking like an AI-powered creator means…", [
      [
        "Using AI to increase quality and consistency while never substituting it for your judgment or voice",
        true,
        "Correct — AIC-01 mindset.",
      ],
      ["Publishing the first AI draft without review", false, "Wrong — verification required."],
      ["Hiding AI use in every workflow by default", false, "Wrong — disclose when responsible."],
      ["Measuring success only by output volume", false, "Wrong — quality and integrity matter."],
    ]),
    question("aic3", "Strong prompt engineering for creators includes…", [
      [
        "Context, role, examples, constraints, and a verification step — not magic phrases",
        true,
        "Correct — AIC-02.",
      ],
      ["One vague sentence and hoping for the best", false, "Wrong — prompts need structure."],
      ["Copying viral prompt lists without editing for your show", false, "Wrong — context matters."],
      ["Asking AI to invent unverifiable personal stories as facts", false, "Wrong — ethics failure."],
    ]),
    question("aic4", "AI content planning and brainstorming should…", [
      [
        "Help generate LIVE ideas, hooks, and weekly systems while you keep the creative decisions",
        true,
        "Correct — AIC-03.",
      ],
      ["Let AI pick every topic without your niche filter", false, "Wrong — you decide."],
      ["Replace audience research with invented trends", false, "Wrong — verify claims."],
      ["Ignore your energy and schedule limits", false, "Wrong — systems must be livable."],
    ]),
    question("aic5", "AI writing without losing your voice requires…", [
      [
        "Drafting faster with AI, then rewriting until the words sound like you and stay factually true",
        true,
        "Correct — AIC-04.",
      ],
      ["Publishing AI copy that sounds generic if it saves time", false, "Wrong — voice is required."],
      ["Skipping fact checks on AI claims", false, "Wrong — verification required."],
      ["Using AI to fabricate testimonials", false, "Wrong — deception."],
    ]),
    question("aic6", "AI images, graphics, and branding work is safest when…", [
      [
        "Prompts are clear, brand rules are written, copyright is respected, and accessibility is checked",
        true,
        "Correct — AIC-05.",
      ],
      ["You generate anything trending regardless of brand fit", false, "Wrong — brand rules matter."],
      ["You ignore likeness and copyright questions", false, "Wrong — legal/ethics risk."],
      ["You skip alt text and contrast because AI made it", false, "Wrong — accessibility still required."],
    ]),
    question("aic7", "AI video editing and repurposing should include…", [
      [
        "AI help for captions, clips, cleanup, and highlights — with human review before publish",
        true,
        "Correct — AIC-06.",
      ],
      ["Auto-publishing every clip without watching it", false, "Wrong — human review required."],
      ["Leaving inaccurate captions if they are fast", false, "Wrong — quality and trust."],
      ["Using AI to fabricate moments that never happened", false, "Wrong — deception."],
    ]),
    question("aic8", "Safe AI automation for creator workflows means…", [
      [
        "Automating repetitive steps with human gates — never spam, deception, or unattended brand risk",
        true,
        "Correct — AIC-07.",
      ],
      ["Letting bots message every follower without review", false, "Wrong — spam/brand risk."],
      ["Automating public replies with no human check", false, "Wrong — human gate required."],
      ["Hiding automation that could mislead your audience", false, "Wrong — disclosure/ethics."],
    ]),
    question("aic9", "AI research, analytics, and decision making stays trustworthy when…", [
      [
        "You verify sources and interpret metrics with checklists so decisions stay evidence-based",
        true,
        "Correct — AIC-08.",
      ],
      ["You trust every AI summary without checking the original numbers", false, "Wrong — verify."],
      ["You invent a causal story from one spike", false, "Wrong — evidence discipline."],
      ["You ignore contradictory data that is inconvenient", false, "Wrong — honesty required."],
    ]),
    question("aic10", "Ethics, privacy, and responsible AI require…", [
      [
        "Protecting privacy, disclosing responsibly, refusing harmful uses, and publishing only what you can stand behind",
        true,
        "Correct — AIC-09.",
      ],
      ["Uploading private chats or fan data into tools without consent", false, "Wrong — privacy failure."],
      ["Using AI for harassment or impersonation", false, "Wrong — harmful use."],
      ["Skipping disclosure whenever it is convenient", false, "Wrong — responsibility."],
    ]),
    question("aic11", "The AI Creator Operating System Capstone is graded on…", [
      [
        "A documented prompt library, workflows, verification steps, automation map, and improvement report — not tool count, output volume, or hype",
        true,
        "Correct — Capstone evidence standard.",
      ],
      ["How many AI tools you subscribe to", false, "Wrong — not the standard."],
      ["How many posts AI generated in a week", false, "Wrong — volume is not mastery."],
      ["Whether a viral claim mentions AI", false, "Wrong — craft evidence required."],
    ]),
    question("aic12", "Which statement about certification is correct?", [
      [
        "Capstone AI Creator Operating System and Program Final are required; Advanced Creator is required before the certificate is awarded; Honors never gates; AI Creator is an optional specialty",
        true,
        "Correct — Labs never gate; Advanced Creator gates certificate award.",
      ],
      ["Honors Lab is required before Capstone", false, "Wrong — never a gate."],
      ["AI Creator is required for Career Creator Diploma", false, "Wrong — optional specialty."],
      ["Tool subscriptions prove Capstone mastery", false, "Wrong — operating system evidence graded."],
    ]),
  ],
});
