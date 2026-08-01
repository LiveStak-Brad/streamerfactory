import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "mobile-gaming-live-workflows",
  excerpt:
    "Choose the right mobile gaming LIVE path — native, mirrored, or capture-into-OBS — and manage heat, battery, notifications, orientation, and audio routing without exposing anything private.",
  estimatedMinutes: 25,
  content: `## Introduction

Mobile gaming LIVE looks like the easy path — no OBS, no capture card, just a phone. It can be exactly that. It can also be the most fragile setup in Gaming LIVE Mastery if you skip the checks that PC and console creators are forced to think about on day one: heat, battery, notifications, and a mirror connection that quietly drops mid-session.

This lesson (GM-09) is not "phones are lesser gear." It is a decision framework: when native mobile LIVE is enough, when mirroring into a PC unlocks more control, and how to run either path without cooking your phone, draining your battery mid-show, or exposing a private notification to your whole room. This feeds your Capstone: **Signature Gaming LIVE Show**. Optional Gaming LIVE Lab / Honors may polish later; labs never gate your certificate.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** Console Capture and Party-Chat Routing (GM-08) — capture cards, HDMI passthrough, and party-chat audio for console setups
- **This lesson:** Mobile Gaming LIVE Workflows (GM-09) — native paths, mirroring, capture, heat/battery, notifications, orientation, audio routing, latency, internet reliability
- **Next:** Vertical Layouts, Alerts, Soundboards, and TikFinity (GM-10) — turning a working capture into a readable, well-mixed show

Every setup path in this Mastery Path assumes something is physically capturing a game feed reliably. Mobile asks that same question on the hardware most creators already own. Skip this lesson and you inherit overheating shutdowns, dead-air battery deaths, and leaked DMs on screen. Complete it and mobile becomes a legitimate primary or backup path for your Signature Gaming LIVE Show.

## Learning Objectives

By the end of this lesson, you will be able to:

- Choose between native mobile LIVE, screen mirroring, and capture-into-OBS based on your game and goals
- Set up USB or wireless mirroring into OBS or TikTok LIVE Studio without guessing at device settings
- Manage heat and battery so a session does not shut down mid-show
- Lock notification and privacy settings so nothing private appears on screen
- Set orientation and audio routing correctly for a vertical mobile gaming feed
- Recognize latency and internet-reliability risks specific to mobile capture paths

## Estimated Study Time

- **Study and setup pass:** about 25 minutes to read this lesson and configure one mobile path
- **LIVE Mission:** run the Mobile Mirror Test Sheet end to end before going LIVE for real
- **First full pass:** roughly 40–55 minutes including one full-length test session

If you only have study time today, complete the Notification Safety Card and lock your privacy settings — that single step prevents the most damaging mobile mistake.

## Prerequisites

Complete **Core Certification**. Review earlier Gaming LIVE setup-matrix concepts (GM-01 setup selection, GM-06/07 OBS and stream-key literacy) if you plan to mirror into OBS rather than go native.

You should already have:

- A mobile game or mobile-playable title you actually stream
- A phone or tablet with enough storage and a case/stand that will not block ports or vents
- Either a TikTok-eligible account for native mobile LIVE, or an OBS/LIVE Studio setup ready to receive a mirrored source

Tools: Mobile Gaming Checklist, Notification Safety Card, Mobile Mirror Test Sheet. No gifts required. No viral moment required.

## Main Lesson

### Three mobile paths — pick on purpose

1. **Native mobile LIVE (where supported).** Go LIVE directly from the app while playing on the same device. Simplest path, fewest failure points, least production control. Confirm current app support for your device and game before committing — do not assume every title or account has identical LIVE options.
2. **Screen mirroring into a PC.** Your phone's display mirrors — over USB or wirelessly — into a PC, where OBS or LIVE Studio treats it as a capture source. Unlocks overlays and multi-source scenes while gameplay stays on the phone.
3. **Direct capture via a dedicated tool.** Some workflows use a capture utility or virtual-camera-style bridge instead of a general mirror app. Treat this as a variant of path 2 — not a new category to master.

[Callout: Pick the simplest path that is reliable for your game]
Native mobile LIVE is not a downgrade. If your game and account support it and you do not need overlays, it is often the most stable choice — fewer devices, fewer cables, fewer things that can disconnect.

### USB vs wireless mirroring

- **USB mirroring** is generally more stable and lower-latency since it skips local Wi-Fi bandwidth. Trade-off: your phone is tethered, limiting movement near a device that already gets warm.
- **Wireless mirroring** frees you from a cable but depends entirely on a clean local network. Weak Wi-Fi or router congestion shows up as stutter or a frozen mirror — often at the worst moment.

Test both if possible, and verify whichever you choose survives a full-length session, not just two minutes of poking around.

### Capture into OBS or LIVE Studio

Once mirrored, treat the phone display like any other video source. In OBS, add it per your mirroring tool's instructions and confirm the correct device after any replug. In LIVE Studio, confirm whether your mirroring path is currently supported as a source — do not assume identical steps to OBS. Crop and scale so the game fills a usable vertical frame without letterboxing that shrinks the action to an unreadable strip.

### Heat and battery

Mobile devices throttle or shut down when they overheat, and a dead battery ends your LIVE regardless of how good the content was.

- Keep the device off heat-trapping surfaces and away from cases that block vents.
- Plug into power for any session longer than a few minutes — do not trust a starting battery percentage.
- Confirm a passthrough charging cable actually charges while mirroring; some configurations only pass data.
- Watch for throttling symptoms (frame drops, dimming, temperature warnings) and pause to cool down rather than pushing through them.

### Notifications and private exposure

This is the highest-stakes mobile-specific risk in Gaming LIVE Mastery: a private message, contact name, or account alert popping up live on stream.

- Enable Do Not Disturb or a focus mode before every session — not "usually," every time.
- Disable lock-screen previews for messaging and social apps at the OS level, not just per-notification.
- Clear pending notification badges before going LIVE; a queued preview can still flash on first unlock.
- If mirroring the full screen, remember *anything* on that device can appear — unrelated apps, browser tabs, or a stray call banner.

[Callout: Privacy setting, not a personality trait]
"I'll just remember to ignore my phone" is not a safety plan. Do Not Disturb and lock-screen preview settings are the plan.

### Orientation, audio routing, and mic options

Lock orientation before you start; an accidental rotation mid-session can flip or letterbox your feed. Choose your mic source deliberately — built-in phone mic, headset mic, or a PC-routed mic if mirroring — each has a different noise floor, so test rather than assume. If your PC setup also captures PC audio, confirm you are not doubling a path (phone game audio through the mirror *and* a separate desktop-audio capture of the same sound).

### Latency and internet reliability

Wireless mirroring and phone-based LIVE both add a network dependency on top of your streaming connection; a weak local network can desync audio and video before upload speed even becomes the bottleneck. Prefer a strong, stable connection over a technically faster but congested one. Keep a fallback ready — wired mirroring, a different network, or a native-LIVE fallback — if your primary mobile path becomes unreliable mid-testing.

### Decision table

| Situation | Likely best path |
| --- | --- |
| Mobile-only game, no overlay needs, simplicity matters most | Native mobile LIVE |
| Want overlays/alerts but game is mobile-exclusive | Mirror into OBS/LIVE Studio |
| Frequent disconnects on wireless mirror | Switch to USB mirroring or native |
| Device overheats within 15–20 minutes | Cooling fix first; shorten sessions until resolved |
| Notifications keep appearing on past test clips | Fix privacy settings before any further testing |

## Examples

**Example 1 — Native-first mobile creator.** Plays a mobile-exclusive title with no overlay needs. Runs native mobile LIVE with Do Not Disturb locked in on a fan-cooled stand — simple, stable, no mirroring layer to fail.

**Example 2 — Mirror-into-OBS creator.** Wants alert overlays and a webcam layer. Mirrors via USB into OBS as a standard video source, with a documented native-LIVE fallback in case the mirror drops.

**Example 3 — Wireless mirror with a network problem.** Mirroring stutters every ten minutes; diagnosis is router congestion from other household devices. Fix: switch to USB mirroring for the rest of testing rather than troubleshooting live on air.

## Real Creator Scenarios

**Scenario A — "My phone shut off mid-stream from heat."** Action: check for vent blockage, move off heat-trapping surfaces, add airflow, and plug into power for the full session going forward. Shorten sessions until the device proves it runs cool.

**Scenario B — "A DM preview flashed on screen."** Action: stop and lock Do Not Disturb and lock-screen previews before the next session, no exceptions — a hard stop, not a "hope it doesn't happen again."

**Scenario C — "Wireless mirror keeps freezing."** Action: test USB mirroring as a controlled variable. If USB is stable and wireless is not, the problem is local network, not your streaming setup.

## Screenshots

[Screenshot: mobile OS Do Not Disturb / focus mode settings screen with lock-screen preview disabled]

[Screenshot: OBS source list showing a mirrored mobile device as a capture source]

[Screenshot: Mobile Mirror Test Sheet with USB and wireless test rows filled in]

[Screenshot: phone mounted on a ventilated stand plugged into power during a test session]

## Diagrams

[Diagram: Mobile path decision — Game is mobile-only? → Need overlays/alerts? → Native LIVE vs Mirror into OBS/LIVE Studio → Test full-length session → Confirm heat/battery/privacy pass]

[Diagram: Mirror signal flow — Phone display → USB or wireless mirror tool → PC capture source → OBS/LIVE Studio scene → platform output]

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): mobile reliability is a systems problem, not a talent problem — heat management, locked privacy settings, and a tested mirror connection prevent nearly every mobile-specific failure this lesson covers. Prefer this verifiable operations principle over any invented Brad mobile-gaming anecdote. If a mobile-hardware-specific note is needed (device thermal behavior, mirroring app quirks), request a qualified contributor rather than inventing Brad-as-mobile-gamer credentials here.

## Pro Tips

- Run one full-length test session before any real mobile LIVE — heat and battery problems rarely show up in the first five minutes.
- Keep a native-LIVE fallback plan even if mirroring is your primary path.
- Lock Do Not Disturb and lock-screen previews as a pre-LIVE checklist item every time, not a "set once" setting.
- Prefer USB mirroring when stability matters more than cable-free movement.
- Flag airflow on your checklist — a vent-blocking case is a common silent cause of thermal shutdowns.
- Test your mic against real game audio levels before going LIVE, not after chat says they can't hear you.
- If wireless mirroring fails twice during testing, fix the network before a third attempt.

## Common Beginner Mistakes

- **Assuming every account has identical native LIVE options.** Fix: verify current support for your device and game first.
- **Trusting a starting battery percentage.** Fix: plug into power for any session longer than a few minutes.
- **Skipping privacy settings because "I'll remember."** Fix: Do Not Disturb and lock-screen previews are a checklist item, not a memory test.
- **Only testing mirroring for two minutes.** Fix: run one full-length session before trusting the path.
- **Blaming your ISP when the real problem is local Wi-Fi congestion.** Fix: isolate the variable — test USB vs wireless first.
- **Letting a case or stand block vents.** Fix: prioritize airflow over aesthetics.
- **Doubling audio paths after mirroring.** Fix: confirm each source is captured exactly once.

## Reality Check

Your first mobile session may reveal a heat problem, a privacy leak, or a mirror disconnect you did not expect. That is the test working as intended — better to find it during a private test session than live in front of chat. Mission success is a tested, reliable mobile path with privacy settings locked down — never viewer count, gifts, or whether a clip went anywhere.

## Summary

Mobile Gaming LIVE Workflows means choosing between native LIVE, mirroring, and capture-into-OBS on purpose, then proving the chosen path survives heat, battery, notifications, orientation, audio routing, latency, and a real network — before you rely on it for a real show. File your completed checklist and test sheet; mobile reliability now protects the Signature Gaming LIVE Show Capstone later.

## LIVE Mission

**Mission: Mobile Path Selection + Full Reliability Test**

1. Choose one primary mobile path (native, USB mirror, or wireless mirror) and state why it fits your game and goals.
2. Complete the Mobile Gaming Checklist for that path.
3. Lock Do Not Disturb and lock-screen preview settings; complete the Notification Safety Card.
4. Run one full-length test session using the Mobile Mirror Test Sheet, logging heat, battery, orientation, and audio results.
5. Document one fallback path in case your primary mobile path fails on show night.

Success is graded on **implementation** — a tested, reliable path and completed checklists — never on viewers, gifts, or whether the test clip looked exciting.

## Downloads

- **Mobile Gaming Checklist** — path selection, device prep, and pre-LIVE verification steps
- **Notification Safety Card** — Do Not Disturb and lock-screen preview settings to lock every session
- **Mobile Mirror Test Sheet** — full-length test log for heat, battery, orientation, and audio results

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It includes scenario questions on mobile path selection, heat/battery risk, and notification safety — not device brand rankings or viral clip advice.

## Key Takeaways

- Three mobile paths exist: native LIVE, mirroring into a PC, and capture tools that behave like mirroring
- Choose USB for stability, wireless for freedom — test both before trusting either
- Heat and battery failures are preventable with airflow and a power connection, not luck
- Do Not Disturb and lock-screen previews must be locked before every session
- Orientation, mic choice, and audio-path duplication all need deliberate checks
- Local network quality can break a mobile session even with fast internet
- Mission success is a tested, reliable path — never viewers, gifts, or virality

## Before You Move On

☐ Finished reading this lesson

☐ Chosen one primary mobile path with a stated reason

☐ Completed the Mobile Gaming Checklist

☐ Locked Do Not Disturb and lock-screen preview settings

☐ Run one full-length test session and logged results

☐ Documented a fallback path

☐ Passed the Lesson Quiz (70%+)

## Next Lesson Preview

Next up: **Vertical Layouts, Alerts, Soundboards, and TikFinity (GM-10).** Your capture path is reliable — now you make it readable and well-mixed. Vertical layout discipline, alert restraint, soundboard categories and safety limits, and TikFinity triggers where currently supported, without overloading your show.
`,
};
