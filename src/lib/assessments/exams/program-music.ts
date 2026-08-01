import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Music LIVE Mastery (programKey `music`).
 */
export const exam = programFinal({
  programKey: "music",
  programName: "Music LIVE Mastery",
  title: "Program Final: Music LIVE Mastery",
  questions: [
    question("mu1", "Music LIVE Mastery answers which core question?", [
      [
        "How do I create a professional, engaging, technically reliable music show on LIVE?",
        true,
        "Correct — performance + production + audience systems.",
      ],
      ["How do I buy the most expensive gear first?", false, "Wrong — diagnose before shopping."],
      ["How do I stream for the first time?", false, "Wrong — Core already taught that."],
      ["How do I maximize gifts with guilt during songs?", false, "Wrong — unethical."],
    ]),
    question("mu2", "Music LIVE formats (MU-01) start by…", [
      [
        "Choosing primary and secondary formats that match voice, stamina, and run-of-show",
        true,
        "Correct — MU-01.",
      ],
      ["Copying every format every night", false, "Wrong — stamina collapses."],
      ["Skipping format choice until Capstone", false, "Wrong — format drives everything."],
      ["Only doing request rooms forever", false, "Wrong — fit matters."],
    ]),
    question("mu3", "Signal flow means…", [
      [
        "Tracing audio from source through connections, interface/mixer, monitoring, and final LIVE output",
        true,
        "Correct — MU-02 principle.",
      ],
      ["Buying a new microphone whenever something sounds bad", false, "Wrong — diagnose first."],
      ["Only OBS settings with no hardware path", false, "Wrong — incomplete."],
      ["Ignoring monitoring until after you go LIVE", false, "Wrong — monitor first."],
    ]),
    question("mu4", "OBS vs TikTok LIVE Studio?", [
      [
        "OBS offers deeper per-source filters and routing; LIVE Studio is platform-native with simpler mixer/source controls — do not assume identical capabilities",
        true,
        "Correct — version-aware distinction.",
      ],
      ["They are identical in every audio feature", false, "Wrong — they differ."],
      ["LIVE Studio always has more VST filters than OBS", false, "Wrong — usually the opposite."],
      ["Musicians should never use either", false, "Wrong — both can work with clean pre-mix."],
    ]),
    question("mu5", "Gain staging priority is…", [
      [
        "Set clean source levels before stacking noise gates, compressors, or EQ",
        true,
        "Correct — gain before filters.",
      ],
      ["Max every slider then fix with plugins", false, "Wrong — causes clipping/artifacts."],
      ["Only use Bluetooth for monitoring", false, "Wrong — latency risk."],
      ["Skip sound check if you are late", false, "Wrong — reliability fails."],
    ]),
    question("mu6", "Double audio / echo usually means…", [
      [
        "The same sound is being captured twice (mic + desktop/speakers/monitor path) — remove the duplicate path",
        true,
        "Correct — common failure.",
      ],
      ["You need a more expensive interface immediately", false, "Wrong — routing first."],
      ["Viewers imagining it", false, "Wrong — diagnose."],
      ["Always a platform ban", false, "Wrong — usually routing."],
    ]),
    question("mu7", "Rights-safe practice means…", [
      [
        "Using decision literacy and safer defaults for originals, covers, and backing tracks — not legal advice",
        true,
        "Correct — MU-07.",
      ],
      ["Assuming TikTok Sounds library is cleared for LIVE", false, "Wrong — generally not for LIVE."],
      ["Playing any hit song because everyone else does", false, "Wrong — risk."],
      ["Ignoring muting and replay risk", false, "Wrong — document safer tiers."],
    ]),
    question("mu8", "Ethical music monetization means…", [
      [
        "Layering tips, goals, merch, and booking CTAs without guilt, pressure, or hard-sell concert ruin",
        true,
        "Correct — MU-09.",
      ],
      ["Stopping songs to demand gifts", false, "Wrong — unethical."],
      ["Shaming non-gifters publicly", false, "Wrong — forbidden."],
      ["Skipping value and only asking", false, "Wrong — soft CTAs need show quality."],
    ]),
    question("mu9", "The Capstone requires…", [
      [
        "A signature Music LIVE show dossier proving both performance and technical competence",
        true,
        "Correct — MU-10.",
      ],
      ["Gift screenshots only", false, "Wrong — not gift graded."],
      ["Optional Honors Lab before any certificate", false, "Wrong — Lab never gates."],
      ["Buying a full band PA system", false, "Wrong — not required."],
    ]),
    question("mu10", "Which statement about certification is correct?", [
      [
        "Capstone is required for the certificate; Music LIVE Lab / Honors is optional and never a gate; Advanced Creator is required before the certificate is awarded",
        true,
        "Correct — Labs never gate; Advanced Creator gates certificate award.",
      ],
      ["Honors Lab is required before Capstone", false, "Wrong — never a gate."],
      ["Program Final replaces the Capstone", false, "Wrong — both are in the chain."],
      ["Core is optional for music creators", false, "Wrong — Core is required."],
    ]),
    question("mu11", "When latency appears between voice and instrument…", [
      [
        "Check sample rates, buffer size, Bluetooth, and prefer hardware direct monitoring over software monitor loops",
        true,
        "Correct — latency diagnosis.",
      ],
      ["Add more OBS filters with high lookahead", false, "Wrong — can worsen delay."],
      ["Ignore it if meters move", false, "Wrong — performers need sync."],
      ["Switch to speakers for monitoring", false, "Wrong — feedback risk."],
    ]),
    question("mu12", "A fair request system should…", [
      [
        "Publish clear rules, windows, and fairness — then protect the show when requests would derail pacing or rights defaults",
        true,
        "Correct — MU-05.",
      ],
      ["Accept every request instantly no matter what", false, "Wrong — chaos."],
      ["Only serve the biggest tippers forever", false, "Wrong — fairness fails."],
      ["Hide the policy so you can change mid-stream unfairly", false, "Wrong — trust fails."],
    ]),
  ],
});
