import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "emotional-pacing-across-a-live",
  programKey: "presence",
  title: "Quiz: Emotional Pacing Across a LIVE",
  questions: [
    question("q1", "Emotional pacing across a LIVE should…", [
      ["Plan peaks, rests, and recovery beats so energy is intentional across the session", true, "Correct — arc design."],
      ["Stay at maximum intensity from open to close", false, "Wrong — burns the room and you."],
      ["Stay completely flat to seem calm", false, "Wrong — flat loses rooms."],
      ["Randomize energy every two minutes with no plan", false, "Wrong — chaos is not pacing."],
    ]),
    question("q2", "Why do rests matter?", [
      ["Contrast makes peaks feel like peaks — rest restores host and room", true, "Correct — rest is strategy."],
      ["Rests are wasted dead air you should delete", false, "Wrong — hosted soft content."],
      ["Rests only exist for ninety-minute Core lessons", false, "Wrong — Presence pacing uses them too."],
      ["Rests mean you stopped hosting", false, "Wrong — soft teach and names still host."],
    ]),
    question("q3", "Chat is hyped and wants constant Peak 5. You should…", [
      ["Lead the map — thank the hype, run the planned peak, protect the rest", true, "Correct — you own the show."],
      ["Match max volume until your voice dies", false, "Wrong — burnout pacing."],
      ["Cancel rests forever if anyone comments", false, "Wrong — abandons the arc."],
      ["Apologize for having a plan", false, "Wrong — leadership is pacing."],
    ]),
    question("q4", "A recovery beat is for…", [
      ["Resetting after chaos or a hot peak — acknowledge, stabilize, return to planned level", true, "Correct — protect the arc."],
      ["Replacing your entire run of show with ranting", false, "Wrong — not recovery."],
      ["Only Honors Lab performances", false, "Wrong — everyday craft."],
      ["Ending the LIVE without a close", false, "Wrong — still return and close."],
    ]),
    question("q5", "Mission success is…", [
      ["Annotated energy map + 45+ minute LIVE with planned peaks/rests/recovery + arc note", true, "Correct — map and proof."],
      ["Viewer spikes during every peak", false, "Wrong — not the grade."],
      ["Max energy with no map", false, "Wrong — contradicts the lesson."],
      ["Skipping the arc note if it felt fine", false, "Wrong — file keep/slip/fix."],
    ]),
    question("q6", "Bad placement pattern to avoid?", [
      ["Three peaks stacked with zero rest between them", true, "Correct — third peak becomes noise."],
      ["Open around energy 3, then earn Peak 1", false, "Wrong — that is good placement."],
      ["Close one level below your highest peak", false, "Wrong — good close."],
      ["Pre-drawing a recovery slot even on calm days", false, "Wrong — smart planning."],
    ]),
    question("q7", "Capstone connection?", [
      ["Today's map trains the vocal/pacing plan inside the signature 20-minute LIVE", true, "Correct — shrink the arc later."],
      ["Pacing replaces Capstone evidence", false, "Wrong — still need full package."],
      ["Only Core long-LIVE structure matters for Capstone", false, "Wrong — Capstone needs Presence pacing."],
      ["Honors Lab must approve your map first", false, "Wrong — labs never gate."],
    ]),
    question("q8", "How does this differ from Core long-LIVE structure?", [
      ["Core teaches block architecture; PR-06 teaches emotional weather — peaks, rests, recovery — inside the show", true, "Correct — complementary skills."],
      ["They are identical lessons", false, "Wrong — different layer."],
      ["PR-06 bans ninety-minute LIVEs", false, "Wrong — maps work across lengths."],
      ["Core pacing makes motives irrelevant", false, "Wrong — tag motives on the map."],
    ]),
  ],
});
