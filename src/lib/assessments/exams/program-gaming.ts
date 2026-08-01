import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Gaming LIVE Mastery (programKey `gaming`).
 */
export const exam = programFinal({
  programKey: "gaming",
  programName: "Gaming LIVE Mastery",
  title: "Program Final: Gaming LIVE Mastery",
  questions: [
    question("gm1", "Gaming LIVE Mastery answers which core question?", [
      [
        "How do I build a reliable, entertaining gaming LIVE that lets me play well, communicate clearly, and keep viewers involved?",
        true,
        "Correct — technical + commentary + engagement + community.",
      ],
      ["How do I buy dual-PC gear first?", false, "Wrong — dual-PC is not required for most."],
      ["How do I stream for the first time?", false, "Wrong — Core already taught that."],
      ["How do I maximize gifts with guilt during ranked games?", false, "Wrong — unethical."],
    ]),
    question("gm2", "Stream-key access for OBS direct streaming…", [
      [
        "May be account-dependent, can change, and is not guaranteed — protect keys and use LIVE Studio or Virtual Camera workflows when unavailable",
        true,
        "Correct — GM-06 honesty.",
      ],
      ["Is guaranteed to every LIVE creator forever", false, "Wrong — not guaranteed."],
      ["Should be posted publicly for collabs", false, "Wrong — security failure."],
      ["Is required to use TikTok LIVE Studio", false, "Wrong — LIVE Studio uses platform login."],
    ]),
    question("gm3", "OBS Virtual Camera into TikTok LIVE Studio…", [
      [
        "Sends OBS program video into LIVE Studio as a camera source; audio must be routed separately because Virtual Camera is normally video-only",
        true,
        "Correct — GM-07.",
      ],
      ["Carries complete mixed OBS audio automatically with no setup", false, "Wrong — video only."],
      ["Is a prohibited circumvention of eligibility rules", false, "Wrong — legitimate production workflow."],
      ["Removes the need for a microphone", false, "Wrong — mic still required."],
    ]),
    question("gm4", "OBS vs TikTok LIVE Studio?", [
      [
        "They are distinct tools — OBS offers deeper sources/filters/routing; LIVE Studio is platform-native with different limits — do not assume feature parity",
        true,
        "Correct — version-aware distinction.",
      ],
      ["They have identical feature sets always", false, "Wrong."],
      ["LIVE Studio always requires a stream key", false, "Wrong."],
      ["OBS cannot capture games", false, "Wrong."],
    ]),
    question("gm5", "Prefer which OBS capture method first for most PC games?", [
      [
        "Game Capture first, then Window Capture, with Display Capture last because of privacy and efficiency risks",
        true,
        "Correct — OBS gaming discipline.",
      ],
      ["Display Capture only forever", false, "Wrong — privacy/efficiency."],
      ["Browser Source of the game store page", false, "Wrong."],
      ["No capture — webcam of the monitor", false, "Wrong."],
    ]),
    question("gm6", "Double Discord or double game audio usually means…", [
      [
        "The same sound is captured twice — remove the duplicate desktop/monitor/application path",
        true,
        "Correct — routing diagnosis.",
      ],
      ["You must buy a dual-PC rig immediately", false, "Wrong."],
      ["Viewers imagining it", false, "Wrong."],
      ["Always a platform ban", false, "Wrong."],
    ]),
    question("gm7", "Chat reading while gaming works best when…", [
      [
        "You read during low-focus moments and save questions for safe windows instead of mid-clutch",
        true,
        "Correct — GM-03.",
      ],
      ["You read every message instantly during fights", false, "Wrong — focus dies."],
      ["You ignore chat forever", false, "Wrong — inclusion fails."],
      ["You only acknowledge the biggest gifters", false, "Wrong — ethics/community."],
    ]),
    question("gm8", "TikFinity / alert discipline means…", [
      [
        "Use cooldowns, volume limits, testing mode, and emergency stop — verify current support; never overload quality for automation",
        true,
        "Correct — GM-10.",
      ],
      ["Trigger every gift with a 30-second video and max volume", false, "Wrong — overload."],
      ["Skip testing because it worked once", false, "Wrong."],
      ["Claim every feature works for every account without verification", false, "Wrong."],
    ]),
    question("gm9", "Console party chat missing from the stream usually means…", [
      [
        "Headset/party audio is not reaching the capture path — map chat-link or extractor-style routing instead of guessing",
        true,
        "Correct — GM-08.",
      ],
      ["Consoles cannot be streamed legally ever", false, "Wrong."],
      ["You should expose private friend lists to fix it", false, "Wrong — privacy."],
      ["OBS Virtual Camera will invent party chat", false, "Wrong."],
    ]),
    question("gm10", "Mobile gaming notification safety requires…", [
      [
        "Preventing private DMs, lock-screen previews, and sensitive alerts from appearing on stream",
        true,
        "Correct — GM-09.",
      ],
      ["Showing every notification for engagement", false, "Wrong — privacy."],
      ["Ignoring heat and battery", false, "Wrong."],
      ["Using wireless mirror only with no test", false, "Wrong."],
    ]),
    question("gm11", "First diagnostic step when something fails LIVE…", [
      [
        "Identify whether the failure is source, routing, device, software, performance, or network — change one variable; use a known-good fallback when available",
        true,
        "Correct — GM-11.",
      ],
      ["Change every setting at once while public", false, "Wrong."],
      ["Buy new gear before diagnosis", false, "Wrong."],
      ["Blame chat for encoder lag", false, "Wrong."],
    ]),
    question("gm12", "Which statement about certification is correct?", [
      [
        "Capstone is required for the certificate; Gaming LIVE Lab / Honors is optional and never a gate; Advanced Creator is required before the certificate is awarded; Gaming is an optional specialty",
        true,
        "Correct — Labs never gate; Advanced Creator gates certificate award.",
      ],
      ["Honors Lab is required before Capstone", false, "Wrong — never a gate."],
      ["Gaming is required for Career Creator Diploma", false, "Wrong — optional specialty."],
      ["Viewer count and rank prove Capstone mastery", false, "Wrong — execution graded."],
    ]),
  ],
});
