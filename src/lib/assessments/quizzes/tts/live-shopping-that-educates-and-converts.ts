import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "live-shopping-that-educates-and-converts",
  programKey: "tts",
  title: "Quiz: LIVE Shopping That Educates and Converts",
  questions: [
    question("q1", "A creator wants to say a product \"guarantees\" a benefit they cannot verify. What best applies in TTS-05?", [
      ["Remove or qualify the claim and demonstrate only accurate, supportable information.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Keep it because dramatic hooks get clicks.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["Call it a personal review even without evidence.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["Hide the limitation in a comment.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q2", "A merchant asks you to feature a product with unclear safety or listing information. What should you do?", [
      ["Pause the activation, request verifiable information, and decline if the issue remains unresolved.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Promote it while hoping the merchant fixes it later.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["Ask followers to leave positive reviews first.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["Use a vague disclaimer and continue.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q3", "A viewer asks when an order will ship. What is the safest response?", [
      ["Give only the current verifiable fulfillment information and direct them to the seller or official order support path.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Invent a delivery date to keep enthusiasm high.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["Promise personal shipping control you do not have.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["Delete the question.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q4", "A customer reports that a product did not match the stated expectation. What should the creator document?", [
      ["The claim, current listing evidence, the appropriate Shop support/refund route, and any correction needed.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Only whether the customer changes their review.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["A counterargument to avoid a refund.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["The campaign's order total.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q5", "A product gets clicks but weak downstream results. What is the strongest next move?", [
      ["Inspect the product fit, demonstration clarity, listing accuracy, and one testable improvement.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Add false scarcity.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["Judge success by viewers alone.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["Repeat the same content without review.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q6", "You notice after posting that an affiliate relationship was not disclosed clearly. What should you do?", [
      ["Correct the disclosure promptly, review required platform controls, and update the workflow.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Leave it because the video is already live.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["Ask followers not to mention it.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["Call the commission irrelevant.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q7", "Which evidence most strongly completes LIVE Shopping That Educates and Converts Review?", [
      ["Completed live-shopping-run-sheet, product-pin-rotation-planner, live-offer-education-card, a rehearsal or review note, and one specific improvement.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["A GMV screenshot.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["A commission total.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["A claim that the campaign felt successful.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
    question("q8", "When should a LIVE product pin be changed?", [
      ["When the education and demonstration focus genuinely changes, after clear context for viewers.", true, "Correct — it protects accurate Shop execution, customer trust, and evidence a reviewer can inspect."],
      ["Every few seconds to create urgency.", false, "Wrong — that approach creates a compliance, product-trust, or operational risk."],
      ["Before explaining what the product is.", false, "Wrong — outcome metrics and shortcuts do not replace verification and a clear workflow."],
      ["Only after promising a deal that is not real.", false, "Wrong — Shop systems must remain truthful, current, and customer-safe."],
    ]),
  ],
});
