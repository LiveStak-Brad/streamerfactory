import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-images-graphics-and-branding",
  programKey: "aicreator",
  title: "Quiz: AI Images, Graphics, and Branding",
  questions: [
    question(
      "q1",
      "What should you write before heavy image prompting?",
      [
        ["Brand visual rules covering palette, motifs, bans, and tone.", true, "Correct — rules make visuals a system."],
        ["Only ‘make it viral.’", false, "Wrong — virality is not a visual brief."],
        ["A request to deepfake a guest.", false, "Wrong — deepfake misuse is prohibited."],
        ["A plan to fake analytics screenshots.", false, "Wrong — fake analytics graphics are deceptive."],
      ],
    ),
    question(
      "q2",
      "In-image text from a model is wrong. Best fix?",
      [
        ["Cover or replace it with correct text in your editor.", true, "Correct — human finishing fixes accuracy and readability."],
        ["Keep it to preserve the ‘AI look.’", false, "Wrong — aesthetics do not justify errors."],
        ["Post a correction in comments only.", false, "Wrong — comments are not a substitute for a correct thumbnail."],
        ["Generate ten more and hope.", false, "Wrong — hope is not a workflow."],
      ],
    ),
    question(
      "q3",
      "Why write alt text for informative images?",
      [
        ["So people using assistive tech get the meaning; it is part of professional accessibility.", true, "Correct — alt text serves access and clarity."],
        ["Because it boosts a secret algorithm every time.", false, "Wrong — do not treat alt text as an algorithm cheat code."],
        ["To hide that AI was used.", false, "Wrong — alt text is not a concealment tool."],
        ["It is optional if the image is pretty.", false, "Wrong — prettiness does not remove the need."],
      ],
    ),
    question(
      "q4",
      "Which thumbnail practice is prohibited here?",
      [
        ["Impersonation layouts or deepfake faces meant to confuse viewers.", true, "Correct — deceptive impersonation/deepfake tactics are banned."],
        ["Using brand colors and clear focal points.", false, "Wrong — that is good practice."],
        ["Leaving space for honest title text.", false, "Wrong — that is good practice."],
        ["Checking mobile crop.", false, "Wrong — that is good practice."],
      ],
    ),
    question(
      "q5",
      "How should Firefly/Midjourney/OpenAI/Canva/SD be treated?",
      [
        ["As example tools whose licenses and features you verify in your account.", true, "Correct — version-aware, license-aware examples."],
        ["As permanent endorsements that never change.", false, "Wrong — capabilities and terms change."],
        ["As proof you can ignore brand rules.", false, "Wrong — brand rules still apply."],
        ["As a way to copy trademarked characters safely always.", false, "Wrong — trademarked characters are not ‘always safe.’"],
      ],
    ),
    question(
      "q6",
      "What belongs in a thumbnail prompt bank entry?",
      [
        ["Content type, composition notes, brand constraints, and honesty/legibility checks.", true, "Correct — operable, ethical thumbnail specs."],
        ["Only a celebrity name to mimic.", false, "Wrong — celebrity mimicry often creates rights/ethics issues."],
        ["A fake chat screenshot brief.", false, "Wrong — fake chat evidence is deceptive."],
        ["A demand for guaranteed CTR numbers.", false, "Wrong — CTR guarantees are not honest specs."],
      ],
    ),
    question(
      "q7",
      "Human authorship records matter because…",
      [
        ["They show your creative choices and support responsible publishing under changing rules.", true, "Correct — records support accountability and process."],
        ["They let you skip editing.", false, "Wrong — editing remains required."],
        ["They replace alt text.", false, "Wrong — alt text remains required."],
        ["They prove spam is fine.", false, "Wrong — spam is never fine."],
      ],
    ),
    question(
      "q8",
      "A teammate wants AI to recreate another creator’s exact thumbnail system. Response?",
      [
        ["Refuse and design differentiated brand thumbnails instead.", true, "Correct — avoid confusing impersonation; build your system."],
        ["Do it for competitive growth.", false, "Wrong — growth does not justify impersonation."],
        ["Do it but change one color.", false, "Wrong — trivial changes can still confuse."],
        ["Post both and let viewers sort it out.", false, "Wrong — dumping confusion on viewers is unprofessional."],
      ],
    ),
  ],
});
