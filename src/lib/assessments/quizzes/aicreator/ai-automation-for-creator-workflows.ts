import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-automation-for-creator-workflows",
  programKey: "aicreator",
  title: "Quiz: AI Automation for Creator Workflows",
  questions: [
    question(
      "q1",
      "Which task is best to automate?",
      [
        ["Filing a published URL to a spreadsheet and notifying a teammate for review.", true, "Correct — low-risk chores with human visibility fit automation."],
        ["Auto-publishing unverified AI captions to all platforms.", false, "Wrong — unverified auto-publish removes the human gate."],
        ["Mass DMing strangers with AI pitches.", false, "Wrong — mass unsolicited DMs are spam territory."],
        ["Bot-liking hundreds of posts.", false, "Wrong — fake engagement is prohibited."],
      ],
    ),
    question(
      "q2",
      "What must a human-in-the-loop gate check before publish?",
      [
        ["Voice fit, facts, privacy, links, and brand safety as applicable.", true, "Correct — gates protect meaning and safety."],
        ["Only whether the zap ran.", false, "Wrong — execution alone is not quality."],
        ["Only character count.", false, "Wrong — length is insufficient."],
        ["Whether a bot could post faster.", false, "Wrong — speed is not the criterion."],
      ],
    ),
    question(
      "q3",
      "An automation can access private emails. Best practice?",
      [
        ["Minimize fields, restrict scopes, and avoid sending confidential content into public AI tools.", true, "Correct — minimize and protect confidential fields."],
        ["Sync everything for convenience.", false, "Wrong — convenience does not justify over-collection."],
        ["Post emails to a public channel via the zap.", false, "Wrong — public posting of private emails is a breach."],
        ["Sell the list.", false, "Wrong — selling lists is unethical and out of scope."],
      ],
    ),
    question(
      "q4",
      "Why dry-run automations?",
      [
        ["To confirm filters, failures, and approvals before real data and public actions.", true, "Correct — dry runs reveal failure modes safely."],
        ["To skip building gates.", false, "Wrong — tests do not replace gates."],
        ["To generate fake analytics.", false, "Wrong — fake analytics are prohibited."],
        ["To test spam throughput.", false, "Wrong — spam testing is not a goal."],
      ],
    ),
    question(
      "q5",
      "Zapier, Make, and n8n should be taught as…",
      [
        ["Conceptually similar automation platforms with triggers, actions, and approvals you verify in-product.", true, "Correct — shared concepts, verified implementations."],
        ["Identical forever with the same menus.", false, "Wrong — menus and features differ and change."],
        ["The only ethical way to grow is bots.", false, "Wrong — bots for deceptive growth are rejected."],
        ["Replacements for human creators.", false, "Wrong — humans remain accountable creators."],
      ],
    ),
    question(
      "q6",
      "A flow posts AI drafts publicly with no approval. First fix?",
      [
        ["Disable direct publish and add a human approval step.", true, "Correct — stop the risk and insert a gate."],
        ["Increase posting frequency.", false, "Wrong — more volume worsens the failure."],
        ["Add more AI models in parallel.", false, "Wrong — more models without gates multiply risk."],
        ["Hide the flow from the team.", false, "Wrong — hiding problems is not a fix."],
      ],
    ),
    question(
      "q7",
      "Which automation is out of bounds in this course?",
      [
        ["Comment bots and fake engagement systems.", true, "Correct — fake engagement automations are prohibited."],
        ["Internal draft notifications.", false, "Wrong — that is allowed chore automation."],
        ["Cloud backup of exported clips you own.", false, "Wrong — that is allowed chore automation."],
        ["Spreadsheet logging of public URLs.", false, "Wrong — that is allowed chore automation."],
      ],
    ),
    question(
      "q8",
      "What Capstone evidence matters here?",
      [
        ["Opportunity map, gate card with owner, safety checklist, and dry-run notes.", true, "Correct — owned, tested, gated flows are the evidence."],
        ["A screenshot of a vendor’s growth promises.", false, "Wrong — vendor hype is not evidence."],
        ["Unattended spam logs.", false, "Wrong — spam logs prove the wrong thing."],
        ["A claim that zaps increased gifts.", false, "Wrong — gift metrics are not the grade."],
      ],
    ),
  ],
});
