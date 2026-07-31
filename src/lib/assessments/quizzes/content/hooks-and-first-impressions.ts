import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "hooks-and-first-impressions",
  programKey: "content",
  title: "Quiz: Hooks and first impressions",
  questions: [
  question("q1", "A hook’s job is to…", [
    ["Reset attention and clarify why someone should stay", true, "Correct — hooks create a reason to keep watching now."],
    ["Apologize for low viewers", false, "Wrong — apologies as openers weaken first impressions."],
    ["Explain your entire life story in one breath", false, "Wrong — hooks are sharp, not autobiographies."],
    ["Demand gifts before you speak", false, "Wrong — value first; monetization later."],
  ]),
  question("q2", "Why rotate hooks mid-stream?", [
    ["Attention resets; mid-stream joiners need a fresh entry", true, "Correct — rooms turn over; one opener is not enough."],
    ["TikTok requires three hooks by law", false, "Wrong — not a platform law."],
    ["Hooks replace the need for segments", false, "Wrong — hooks introduce segments; they do not replace them."],
    ["Only the first second of a LIVE matters", false, "Wrong — mid-stream impressions matter too."],
  ]),
  question("q3", "A strong first impression usually includes…", [
    ["Who you are + what is happening now", true, "Correct — clarity beats mystery for LIVE discovery."],
    ["Ignoring new viewers so you look busy", false, "Wrong — recognition improves stickiness."],
    ["Starting with complaints about the algorithm", false, "Wrong — negativity is a weak open."],
    ["Reading terms of service aloud", false, "Wrong — not an engaging hook."],
  ]),
  question("q4", "For the mission, you should prepare…", [
    ["Three distinct hooks at planned times", true, "Correct — deliberate hook rotation is the practice."],
    ["One whisper and then silence", false, "Wrong — fails the hook skill."],
    ["Only a goodbye hook", false, "Wrong — closings matter, but this lesson centers opens/resets."],
    ["Hooks written in another language you do not speak", false, "Wrong — clarity requires you can deliver them."],
  ]),
  question("q5", "First impressions fail when…", [
    ["Newcomers cannot tell what the stream is about", true, "Correct — confusion causes quick exits."],
    ["You smile and greet people", false, "Wrong — warmth helps impressions."],
    ["You restate the topic after a transition", false, "Wrong — restating helps joiners."],
    ["You use a simple on-screen topic note", false, "Wrong — aids clarity."],
  ]),
  question("q6", "Hooks and structure work together because…", [
    ["Hooks open segments; structure gives them a place to land", true, "Correct — attention tools need a container."],
    ["Structure makes hooks illegal", false, "Wrong — nonsense."],
    ["Hooks delete the need for a close", false, "Wrong — closings still matter."],
    ["Only one can exist per career", false, "Wrong — you will use both forever."],
  ]),
  ],
});
