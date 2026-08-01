import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "troubleshooting-under-pressure",
  excerpt:
    "Build a tech triage tree for audio, video, network, app, and power — then recover a simulated failure in under two minutes without panic, illegal workarounds, or unsafe electrical risks.",
  estimatedMinutes: 25,
  content: `## Introduction

Every creator eventually meets the same moment: something breaks while people are watching. Audio drops. Camera freezes. The app reconnects in a loop. The room gets quiet in the wrong way — waiting to see whether you spiral or recover.

Troubleshooting under pressure is not a personality trait. It is a triage tree you can run with adrenaline up: audio, video, network, app, power — in that decision order — plus a recovery line that keeps the show human while your hands fix the real problem. This lesson is advanced on purpose. You will build redundancy habits, a phone-ready triage card, and proof you can recover a simulated failure in under two minutes.

You will not invent illegal workarounds, crack software, bypass platform security, or touch unsafe electrical "fixes." Professionals recover inside safe, legal, boring tools.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** Accessibility Basics for LIVE Viewers — usable production when systems work
- **This lesson:** Troubleshooting Under Pressure — recover when they do not
- **Next:** Production Capstone: Your Signature Look — lock a recreatable standard with fail-safes

PD-06 (OBS and Scene Discipline) and PD-07 (Mobile-First Production Excellence) already demanded backup thinking. This lesson turns that thinking into a speed-runnable tree. Capstone will expect a fail-safe you can actually execute — not a paragraph that says "I stay calm."

Brief callbacks only: **PR-08 (Handling Pressure Moments Live)** already taught acknowledge → stabilize → return for composure language. **MS-06 (Problem Solving Mid-Crisis)** trains a thinking sequence for crises. Use both as mental posture — do not reteach Presence scripts or Mindset frameworks here. Today is production triage and recovery ops.

## Learning Objectives

By the end of this lesson, you will be able to:

- Run a five-branch triage tree: audio, video, network, app, power
- Recover a simulated failure in under two minutes using a written card
- Name safe redundancy options (hotspot backup, second mic path, clean scene, charged spare power)
- Deliver a short recovery line to chat without narrating every debug step
- Complete a post-incident production review after the drill
- Explain hard stops: no illegal workarounds, no unsafe electrical improvisation

## Estimated Study Time

- **Study and card build:** about 25 minutes for triage tree, runbook, and phone card
- **LIVE Mission / drill:** simulate one failure and recover in under two minutes (can be private rehearsal or mid-LIVE labeled drill)
- **Post-incident review:** 10–15 minutes the same day
- **First full pass:** roughly 60–80 minutes including documentation

## Prerequisites

Complete **OBS and Scene Discipline (Without Overbuilding)** (\`obs-and-scene-discipline-without-overbuilding\` / PD-06) **or** **Mobile-First Production Excellence** (\`mobile-first-production-excellence\` / PD-07). Ideally both if your setup spans desktop and phone.

You should already have:

- A minimal scene map or mobile kit you can actually run
- At least one backup path thought through (clean scene, secondary device, or hotspot)
- PR-08 composure pattern available as a callback, not a rewrite

## Main Lesson

### Panic is a branching error

When something fails, amateurs randomize: unplug three things, reinstall mid-LIVE, blame the app in a rant, or keep talking into a dead mic. Professionals classify first, then act on one branch.

Use this order every time:

1. **Audio** — Can they hear you?
2. **Video** — Can they see a stable picture?
3. **Network** — Are you still connected with usable bitrate?
4. **App / software** — Is the LIVE tool or OBS the break point?
5. **Power** — Is a device, interface, or light dying?

Audio first because silent video loses rooms fastest. Power last in the decision tree does not mean power is unimportant — it means confirm the signal path before you assume the building failed you.

[Callout: One branch at a time]
If you chase two theories at once, you will not know what fixed it — and you will burn your two-minute window.

### Branch playbooks (safe moves only)

**Audio:** Confirm mute switches and OS/app mute. Switch to backup mic or phone mic path if primary fails. Disable filters that hard-gate noise. Duck or kill music bus. Tell chat one line: "Audio hiccup — swapping path, hang tight." Do not open a soldering story on stream.

**Video:** Freeze vs black vs wrong scene are different. Return to a clean scene. Toggle camera input once. If desktop capture ate the frame, cut to cam-only. On mobile, force-close camera conflict apps. Never "fix it" by disabling security software mid-LIVE.

**Network:** Hard numbers beat vibes. If bitrate collapses, drop resolution/fps preset you already tested. Switch to a prepared hotspot backup if primary ISP fails. Pause upload-heavy overlays. Do not run shady VPN cracks or stolen credential tricks — ever.

**App / software:** Restart the LIVE tool once if the tree says so — after you have a recovery line ready. OBS: swap to backup scene collection or clean profile you prepared in PD-06. Mobile: clear heat, free storage pressure, restart app once. No pirated plugins as "emergency recovery."

**Power:** Know battery floors before LIVE. Keep a charged power bank or laptop plugged with cable management that will not yank out. If a light or interface dies, switch to the fail-safe look (window light + phone mic) rather than jury-rigging electrical adapters you do not trust. **No unsafe electrical improvisation** — no overloaded strips daisy-chained mid-stream, no damaged cables "just for tonight."

### Redundancy that is worth practicing

Advanced production is boring backups you have already tested:

- Hotspot SSID and password written on the triage card
- Second mic path (phone headset, backup USB mic, or known-good phone LIVE)
- Clean scene with zero alerts
- Spare cable for the one cable that always fails
- Power bank above 50% before long sessions
- A "continue on phone" exit ramp if desktop dies

Redundancy is not buying a studio. It is having the next safe path labeled before you need it.

### The two-minute recovery contract

Your mission grades a simulated failure recovery in under two minutes. Timer starts when you declare the failure (or when the planted fault begins). Success looks like:

1. Classify the branch (say it out loud or check the card)
2. Execute the first safe fix for that branch
3. Confirm signal path restored or declare the backup path
4. Return to show energy with one stabilize line (PR-08 posture)

If you cannot restore primary in two minutes, winning still looks like a clean failover — phone LIVE, clean scene, or honest short break with a return time — not a ten-minute debug lecture.

### Composure and thinking (callbacks only)

PR-08: acknowledge → stabilize → return. One honest line, protect the room, go back to the plan.

MS-06: problem-solving mid-crisis is a thinking sequence — classify, choose one action, check result, escalate to backup. Do not paste the whole Mindset framework into your triage card. Borrow the discipline: decide, act, verify.

### Hard stops for this lesson

- No illegal workarounds, cracked software, credential sharing, or policy-violating "fixes"
- No unsafe electrical improvisation or damaged gear "temporary" wiring
- No blaming viewers or mods while you debug
- No turning the outage into rage content

### Capstone connection

Your laminated or phone **Tech Triage Card** plus a completed post-incident review become Capstone fail-safe evidence. Capstone will ask for a signature look you can recreate in ten minutes *and* survive a break — this card is that survival layer.

## Examples

**Example 1 — Audio branch under 90 seconds.** Mic mute was on at the interface. Creator hits the card: Audio → physical mute → backup path ready. Unmutes, confirms with "Audio check — you hear me?", returns to game. No OS reinstall theater.

**Example 2 — Network failover.** ISP blip. Card says Network → hotspot. Phone tether already tested. Swap, drop to known-good resolution, one line to chat, continue. Post-incident review logs time-to-failover: 75 seconds.

**Example 3 — Power honesty.** Light dies. Instead of sketchy adapter stacking, they switch to window-key fail-safe look listed on the card and keep audio primary. Capstone cares that the show stayed watchable and safe.

## Real Creator Scenarios

**Scenario A — "I freeze and narrate every click."** Action: card in hand. Say one recovery line, then go quiet while hands work. Chat prefers a fixed show over a tech podcast.

**Scenario B — "I want a clever illegal fix I saw online."** Action: stop. If it is cracked, stolen, or unsafe electrical, it is out of scope and out of professionalism. Use legal backups only.

**Scenario C — "Desktop is dead and I am embarrassed."** Action: failover to phone LIVE if prepared. Embarrassment ends faster than a twenty-minute corpse stream.

## Screenshots

[Screenshot: Tech Triage Card with five branches — audio, video, network, app, power — and first actions]

[Screenshot: Failure Recovery Runbook showing two-minute timer steps and failover paths]

[Screenshot: Post-Incident Production Review with classify / action / time-to-recover / prevention fields]

[Screenshot: phone home-screen widget or note with hotspot and backup mic path labeled]

## Diagrams

[Diagram: Triage tree — Symptom → Audio? → Video? → Network? → App? → Power? → Failover path]

[Diagram: Two-minute recovery loop — Classify → One safe action → Verify → Stabilize line → Return or failover]

## From Brad's Experience

[BradExperience]
Principle for approval: the creators who look unbreakable on LIVE are usually the ones who practiced boring failovers when nobody was watching — hotspot already tested, clean scene already built, recovery line already chosen. Speed comes from a written tree, not from bravado. Panic invents unsafe shortcuts; professionals stay inside legal tools and safe power. Prefer this operational principle over any invented founder war story or fabricated uptime statistic.

## Pro Tips

- Keep the triage card on your phone lock screen or a physical card in frame reach.
- Test hotspot before you need it, not during the outage.
- Pre-write one stabilize line so you do not improvise shame.
- Practice the drill once a month even if nothing is broken.
- Prefer failover over perfect primary restoration when the clock is burning.
- After every real incident, fill the post-incident review the same day.
- Heat and storage kill mobile LIVEs — check both before long sessions.
- Never troubleshoot with drinks near power strips.

## Common Beginner Mistakes

- **Random clicking without classifying.** Fix: name the branch first.
- **Narrating a full debug session.** Fix: one line, then quiet hands.
- **Skipping backups because primary "usually works."** Fix: Capstone grades fail-safes.
- **Illegal or gray-area "fixes."** Fix: legal tools only — always.
- **Unsafe electrical improvisation.** Fix: switch to fail-safe look or end safely.
- **Blaming the platform as content.** Fix: recover or failover; review later offline.
- **No post-incident notes.** Fix: prevention lives in the review, not in memory.

## Reality Check

Your first timed drill may blow past two minutes. That is data, not failure of identity. Shorten the card, pre-stage the backup, and drill again. Professionals are not people who never break — they are people whose break has a next step.

## Summary

Troubleshooting Under Pressure is a five-branch triage tree — audio, video, network, app, power — plus safe redundancy and a two-minute recovery contract. Use PR-08 and MS-06 as composure/thinking callbacks only. Build a phone or laminated Tech Triage Card, run a simulated failure, and document with a post-incident review. Never use illegal workarounds or unsafe electrical improvisation. Capstone will inherit this fail-safe.

## LIVE Mission

**Mission: Two-Minute Simulated Failure Recovery**

1. Build your **Tech Triage Card** with first actions for audio, video, network, app, and power.
2. Complete the **Failure Recovery Runbook** with your real backup paths (hotspot, clean scene, secondary mic/device, power floor).
3. Run a **simulated failure** (private rehearsal or clearly labeled mid-LIVE drill).
4. Recover primary **or** complete a clean failover in **under two minutes**.
5. Fill the **Post-Incident Production Review** the same day: branch, actions, time, prevention.

Success = **timed recovery + documentation** — not zero future incidents, not viewer applause, not unsafe shortcuts.

## Downloads

- **Tech Triage Card** — five-branch first actions for phone or laminate
- **Failure Recovery Runbook** — two-minute steps and failover paths
- **Post-Incident Production Review** — classify, time-to-recover, prevention note

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It checks triage judgment, safe failover choices, and composure under simulated failure — advanced production ops, not Presence script recitation.

## Key Takeaways

- Classify before you click: audio → video → network → app → power
- Two-minute contract: restore or failover, then return to the show
- Redundancy is tested backups, not wishful thinking
- PR-08 / MS-06 are composure and thinking callbacks — not reteach
- Illegal workarounds and unsafe electrical "fixes" are always out of scope
- One stabilize line beats a debug monologue
- Post-incident review turns luck into prevention
- Your triage card is Capstone fail-safe evidence

## Before You Move On

☐ Finished reading this lesson

☐ Built the Tech Triage Card for all five branches

☐ Completed the Failure Recovery Runbook with real backup paths

☐ Recovered a simulated failure (or clean failover) in under two minutes

☐ Filled the Post-Incident Production Review the same day

☐ Confirmed no illegal or unsafe electrical shortcuts were used

☐ Passed the Lesson Quiz (70%+)

☐ Filed triage card for Capstone

## Next Lesson Preview

Next up: **Production Capstone: Your Signature Look.** You will assemble light, audio, frame, scenes, accessibility, and this fail-safe into a one-page production bible — then demonstrate a look you can recreate in ten minutes. Certificate evidence, not vibes.
`,
};
