import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "obs-and-scene-discipline-without-overbuilding",
  excerpt:
    "Build a minimal three-scene OBS (or equivalent) system with clean transitions and a tech-fail backup — power without chaos, under real LIVE stress.",
  estimatedMinutes: 35,
  content: `## Introduction

OBS can make you look like a broadcast — or like someone fighting their own software while chat waits. The difference is rarely plugin count. It is scene discipline: a small set of scenes you can operate when your hands are shaking, the app stutters, and someone just asked a question you actually want to answer.

This is an advanced Production Mastery lesson. You already care about clean audio (PD-04). Now you build the switching system around that audio without turning your show into a graphics project. Whether you use OBS Studio, Streamlabs Desktop built on the same family, or another legal capture/scene tool, the architecture is the same: three scenes, predictable transitions, and a written backup when the stack fails.

You will leave with a scene map and a tech-fail backup plan — Capstone ingredients — plus one rehearsal that proves you can run the system under stress.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** Audio First: Clean Sound Wins Trust (PD-04) — clean sound before fancy video
- **This lesson:** OBS and Scene Discipline (Without Overbuilding) — minimal scenes you can run when things go wrong
- **Next:** Mobile-First Production Excellence — long sessions when the phone *is* the production stack

PD-05 cleaned the physical background. Overbuilt overlays put the clutter back on top of the pixels. PD-09 will deepen triage under pressure; this lesson gives you the map and the fail plan that triage assumes exists.

Brief callbacks only: battle production (BT-05 — Battle Production and On-Screen Clarity) will go deeper on fight-night overlays later — here the caution is simple: do not pre-build a battle HUD maze that you cannot operate in a normal solo LIVE. Presence, Content Creation, Growth, Community, and Professional Creator paths own delivery, showcraft, discovery, belonging, and career systems. This lesson owns scene architecture.

## Learning Objectives

By the end of this lesson, you will be able to:

- Define a minimal three-scene architecture for your primary LIVE show
- Map sources so audio stays stable when you switch scenes
- Choose transitions that signal change without chewing time or attention
- Write a tech-fail backup plan you can execute in under two minutes
- Rehearse the full scene system once under timed stress before trusting it live
- Explain why overbuilding overlays hurts clarity more than it helps "production value"

## Estimated Study Time

- **Study and scene build:** about 35 minutes to map, build, and document
- **LIVE Mission:** 45+ minutes using the three-scene system, after one timed rehearsal
- **First full pass:** roughly 90–110 minutes including the Tech Fail Backup Plan Card

## Prerequisites

Complete **Audio First: Clean Sound Wins Trust** (\`audio-first-clean-sound-wins-trust\` / PD-04). You should already pass a clean-audio test recording before you add scene complexity.

You should already have:

- A legal, official install of OBS Studio (or equivalent legal software) — never pirated plugins, cracked builds, or illegal capture tools
- A primary camera or phone video source and a working mic path from PD-04
- Willingness to delete scenes and overlays that exist only because a YouTube tutorial had them

## Main Lesson

### Discipline beats feature count

Advanced creators fail OBS by collecting features: alert docks, animated borders, three chat widgets, a "just in case" BRB with twelve sources, and a battle layout they never practiced. Under stress, every extra source is a place for silence, echo, or the wrong camera to win.

Scene discipline is a production decision: the smallest set of scenes that covers 95% of your real nights. Everything else waits until that set is boringly reliable.

[Callout: Legal software only]
Install OBS Studio (or your chosen equivalent) from official sources. Do not use pirated plugins, cracked overlay packs, or "free premium" forks that ask for sketchy permissions. Production Mastery never requires illegal software — and stolen tools are an account and security risk, not a shortcut.

### The minimal three-scene architecture

Name them for jobs, not vibes:

1. **LIVE / Main** — your default show: camera (or phone), mic, optional one low-distraction brand element, chat only if you truly use it on stream
2. **BRB / Hold** — a still or simple screen with mic muted or clearly "stepping away" audio policy you decided in advance
3. **Starting Soon / End** — one pre-roll or end card scene so you are never scrambling on a black void while titles load

That is the whole spine. Optional later scenes (guest, screen-share, battle) earn their slot only after these three are muscle memory. If you are mobile-primary, your "scenes" may be app layouts or a lighter capture tool — the jobs stay identical: main, hold, start/end.

### Source rules that prevent chaos

- **One audio path owns the mic.** Duplicate mic sources across scenes that both stay active are how echo is born.
- **Match framing.** Jumping from tight to wide on every switch feels like a mistake, not a cut.
- **Overlays earn rent.** If an overlay does not help a viewer act or understand (goal bar you actually use, readable title), delete it.
- **Battle overlay caution (BT-05 callback):** fight HUDs multiply on-screen noise. Do not import a full battle graphics stack into everyday scenes "for later." Keep battle layouts separate and untested layouts out of your default show.
- **Transitions under one second** for most switches — fancy stingers are optional entertainment, not required professionalism.

### Failure recovery before you need it

Write the Tech Fail Backup Plan Card *before* the first real LIVE with the new map:

1. **If OBS/scene tool dies** — what is the phone-only or native-app fallback, and where is it physically?
2. **If camera dies** — audio-only hold scene or phone camera swap — which first?
3. **If mic dies** — backup mic or phone mic path already tested in PD-04 terms
4. **If network dies** — end cleanly vs. wait on BRB; decide the line you will say
5. **Who switches** — you alone; no "chat tell me which scene" improvisation

PD-09 will expand triage trees. Your job here is a one-page plan you can glance at.

### Rehearse once under stress

Build is not done until you rehearse: five-minute timer, switch Main → BRB → Main → Start/End → Main while talking continuously. If you need notes for every switch, the map is still too complex. Simplify until the rehearsal is boring.

### Capstone connection

Your scene map and tech-fail backup plan feed **Production Capstone: Your Signature Look** and prepare PD-09 troubleshooting. Optional Production Lab or Honors may review scene restraint; labs never gate your certificate.

## Examples

**Example 1 — Three-scene map (talk / coaching).** Main: webcam + mic + subtle lower-third with show name. BRB: static card + mic muted. Starting Soon: same card with "starting in…" text. No alert zoo.

**Example 2 — Overbuild cut.** A creator had nine scenes and lost audio twice switching. They collapsed to three, moved alerts off-canvas, and the "production quality" chat complained about *improved* because the host stopped disappearing into settings.

**Example 3 — Fail plan used once.** Mid-LIVE, capture froze. Host switched to phone native LIVE within ninety seconds using the written backup line: "Tech blip — same show on mobile, give me one minute." Scene map still mattered: they knew Main was expendable; the show was not.

## Real Creator Scenarios

**Scenario A — "I need more scenes for segments."** Action: segments are Content Creation structure, not OBS scenes. Change energy and titles verbally; switch scenes only when the video source or privacy need truly changes.

**Scenario B — "My overlays look empty without animations."** Action: emptiness on the sides is clarity. If the room feels empty, improve PD-05 background and PD-02 light — do not compensate with GIFs.

**Scenario C — "A tutorial said install these six plugins."** Action: install nothing until the three-scene rehearsal passes. Plugins are debt; collect them after discipline, never before.

## Screenshots

[Screenshot: OBS (or equivalent) scene list showing exactly three named scenes — Main, BRB, Starting Soon/End]

[Screenshot: filled OBS Scene Map Worksheet with sources listed per scene and mic path marked once]

[Screenshot: Scene Startup Checklist with boxes for audio meter, camera, transition, and backup device]

[Screenshot: Tech Fail Backup Plan Card with five failure lines and one fallback sentence]

## Diagrams

[Diagram: Three-scene spine — Starting Soon → Main ⇄ BRB → End, with a single mic path feeding Main]

[Diagram: Overbuild trap — more overlays → more failure points → slower recovery; discipline reverses the arrow]

## From Brad's Experience

[BradExperience]
Principle for approval: the production stack you can operate while stressed is the only stack that counts — everything else is a demo that collapses the first night something breaks. Creators who win with "simple" scenes are not anti-tech; they are pro-reliability. Prefer this kind of verifiable teaching principle over any invented founder anecdote or statistic here.

## Pro Tips

- Name scenes by job ("Main," "BRB"), not by mood ("Fire," "Chill vibes").
- Keep a cold backup: phone charged, app logged in, stand ready.
- Disable unused devices in the software so random webcams cannot steal the shot.
- Lock the scene list during LIVE — edits belong in rehearsal, not mid-sentence.
- Record a local rehearsal file once to catch echo you will not hear in headphones.
- Put the backup plan on paper or a phone note — memory is optional under adrenaline.
- If you use vertical canvas for TikTok-style output, commit to one canvas size and stop resizing live.
- Delete any overlay you cannot explain in one sentence to a new viewer.

## Common Beginner Mistakes

- **Building twenty scenes before one reliable Main.** Fix: three scenes first; earn the fourth.
- **Duplicate mics across scenes.** Fix: one controlled audio path; verify meters on every switch.
- **Pirated plugins "because the pack was pretty."** Fix: official software only; redesign with legal assets.
- **Battle HUD on every solo LIVE.** Fix: separate battle layout; keep BT-05 complexity out of daily Main.
- **Skipping rehearsal because the preview looked fine.** Fix: timed switching while talking is the real test.
- **No fallback sentence when tech dies.** Fix: write one calm line on the backup card.
- **Equating motion graphics with professionalism.** Fix: professionalism is stability and readable priority — face and voice first.

## Reality Check

Your first OBS night may feel slower than native phone LIVE. That lag is learning cost, not proof you should quit the tool — or proof you need more widgets. If three scenes still overwhelm you, simplify sources inside Main before you add scenes. Advanced does not mean complicated; it means deliberate.

## Summary

Build a minimal three-scene system (Main, BRB, Starting Soon/End), protect a single clean audio path, keep transitions short, and write a tech-fail backup you can run cold. Use free, legal OBS or an equivalent — never pirated tools. Caution against overlay overbuild and unused battle HUDs. Rehearse once under a timer, then run LIVE against the map.

## LIVE Mission

**Mission: Three-Scene System Under Stress**

1. Complete the **OBS Scene Map Worksheet** for exactly three scenes (or equivalent tool with the same jobs).
2. Complete the **Scene Startup Checklist** and verify audio meters on every switch.
3. Write the **Tech Fail Backup Plan Card** with fallback device and one calm sentence.
4. **Rehearse once** under a five-minute timer: continuous talk while switching the full spine.
5. Run a **45+ minute** TikTok LIVE (or platform LIVE using that stack) on the three-scene system.
6. Afterward, note one friction point and whether the fix is delete, simplify, or practice — not "add more."

Success is graded on **map + backup plan + rehearsal + LIVE execution** — never on how animated the overlays looked.

## Downloads

- **OBS Scene Map Worksheet** — three scenes, sources per scene, single mic path marked
- **Scene Startup Checklist** — pre-LIVE verification for camera, audio, transitions, and backup device
- **Tech Fail Backup Plan Card** — failure lines, fallback path, and one calm recovery sentence

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It checks scene discipline, failure planning, and anti-overbuild judgment — not plugin trivia.

## Key Takeaways

- Advanced production is reliable minimal architecture, not feature collecting
- Three scenes cover nearly every solo night: Main, BRB, Starting Soon/End
- One mic path; short transitions; overlays must earn rent
- Legal OBS/equivalent only — never pirated plugins or cracked tools
- Brief BT-05 caution: keep battle overlay complexity out of daily scenes
- Backup plan is part of the build, not an afterthought
- Capstone uses scene map + fail plan; optional labs never gate certification
- Rehearse under a timer before you trust the stack live

## Before You Move On

☐ Finished reading this lesson

☐ Installed/confirmed legal OBS or equivalent from an official source

☐ Completed the OBS Scene Map Worksheet (three scenes)

☐ Completed the Scene Startup Checklist with clean meters on switches

☐ Wrote the Tech Fail Backup Plan Card

☐ Rehearsed once under a timed switching drill

☐ Completed the 45+ minute LIVE Mission on the three-scene system

☐ Passed the Lesson Quiz (70%+)

## Next Lesson Preview

Next up: **Mobile-First Production Excellence.** Many creators — and many backup plans — live on a phone. You will master stands, lens habits, connectivity, heat, and power so a ninety-minute mobile LIVE (or full rehearsal) survives without preventable tech failure.
`,
};
