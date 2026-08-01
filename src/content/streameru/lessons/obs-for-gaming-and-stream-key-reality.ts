import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "obs-for-gaming-and-stream-key-reality",
  excerpt:
    "Build a real OBS gaming scene collection — captures, audio, encoder, and vertical canvas — and get an honest, non-circumventing account of stream-key access and single-PC performance.",
  estimatedMinutes: 35,
  content: `## Introduction

OBS is the deeper gaming tool: more capture types, real per-source audio control, a full encoder pipeline, Studio Mode, and a plugin ecosystem LIVE Studio does not attempt. It is also where creators get hurt fastest by two things — misunderstanding who actually has stream-key access, and asking a single PC to run a demanding game, an encoder, and a pile of browser-source overlays at once.

This lesson (GM-06) builds your OBS gaming scene collection from source selection through encoder and canvas settings, and gives you the honest version of stream-key reality: what access can depend on, why it is never guaranteed, how to protect a key you have, and what to do if you do not have one yet. It also covers single-PC performance discipline so your setup does not fight your game for frames. The output feeds your Capstone: **Signature Gaming LIVE Show**.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** TikTok LIVE Studio for Gaming (GM-05) — your no-stream-key baseline and honest LIVE Studio vs OBS boundary
- **This lesson:** OBS for Gaming and Stream-Key Reality (GM-06) — deeper OBS production, encoder/canvas decisions, and stream-key facts
- **Next:** OBS Virtual Camera into TikTok LIVE Studio (GM-07) — using OBS's visual program even without direct stream-key access

Brief GM-01/GM-04/GM-05 callback only: your setup, audio map, and LIVE Studio baseline still apply. This lesson teaches OBS gaming production and stream-key literacy, not commentary or chat timing.

Skip this lesson and you either chase stream-key access you may not be eligible for, or build an OBS scene collection that quietly drops frames every session. Complete it and you know exactly what OBS gaming production requires, what stream-key access depends on, and how to keep a single PC stable under real load.

## Learning Objectives

By the end of this lesson, you will be able to:

- Choose the correct capture source for a scenario (Game, Window, Display, Video Capture Device) with privacy awareness
- Route mic, desktop, and application audio in Advanced Audio Properties without double audio
- Set canvas/output resolution, framerate, and encoder correctly for a vertical gaming stream
- Explain honestly what stream-key access can depend on and how to protect a key without ever attempting circumvention
- Build backup scenes and a Replay Buffer / Recording habit that protects a session from a single point of failure
- Run a single-PC performance check that catches dropped frames and rendering/encoding lag
- Complete the OBS Gaming Scene Plan, Stream-Key Safety Card, and Single-PC Performance Checklist as Capstone evidence

## Estimated Study Time

- **Study and setup:** about 35 minutes to read and build your first OBS gaming scene collection
- **LIVE Mission:** complete the scene plan, safety card, and performance checklist
- **First full pass:** roughly 90 minutes including one dropped-frame diagnostic pass

If you do not currently have OBS stream-key access, complete this lesson using local recording as your test method — the skills transfer directly once access changes, and GM-07 uses this same scene collection.

## Prerequisites

Complete **GM-01**, **GM-04**, and **GM-05**. Production **PD-06** (OBS and scene discipline) is recommended parallel context. You should already have:

- A documented no-stream-key baseline from GM-05 as your working fallback regardless of what this lesson uncovers about key access
- Your GM-04 audio-routing map for mic, game, and Discord/party-chat sources
- A realistic sense of your PC's specs — this lesson teaches you to test your own machine, not a universal setting to copy

Tools: OBS Gaming Scene Plan, Stream-Key Safety Card, Single-PC Performance Checklist.

## Main Lesson

### Capture sources — try Game Capture first

Work through options in this order:

1. **Game Capture** — the gaming-specific mode; try this first for any game
2. **Window Capture** — a specific application window; useful when Game Capture misses a title, or for intentional non-game windows
3. **Display Capture** — an entire monitor; simplest but exposes notifications and everything else visible — treat as a real **privacy risk**, not just a fallback convenience
4. **Video Capture Device** — a webcam or capture-card feed (console or external device); your capture-card entry point for GM-08

Use Game Capture unless a game forces Window or Display Capture. Never leave Display Capture running "because it was easier" once a narrower option works.

### Audio sources and Advanced Audio Properties

Build your audio chain from distinct sources rather than one blended input:

- **Audio Input Capture** — your microphone or interface
- **Audio Output Capture** — desktop/system audio; real double-audio risk if it overlaps a source capturing the same sound
- **Application Audio Capture** — where supported, captures one application's audio only, often the cleanest way to isolate game or Discord audio
- **Browser Source** — alerts/overlays; a load cost, not a free add-on
- **Media Source** — local video/audio: intros, backing music, pre-recorded segments

Open **Advanced Audio Properties** and set per-source volume, balance, sync offset, and **monitoring mode** deliberately — this is the depth LIVE Studio does not offer. Use it to fix the double-audio and buried-commentary problems GM-04 mapped, not to build an elaborate filter chain on night one.

### Scenes, collections, and profiles

- **Scenes** — a main gameplay scene and a talk/break scene, the GM-05 pattern with OBS's deeper source control
- **Scene Collections** — separate per game or show format when layouts genuinely differ
- **Profiles** — separate output/encoder settings when games have very different performance demands
- **Source order** — later sources render on top; keep it intentional so a facecam or alert box never hides critical UI
- **Backup scenes** — a static "Be Right Back" scene ready for crashes so dead air is never your only option

### Hotkeys, Studio Mode, Replay Buffer, and Recording

Assign hotkeys for scene switching, mute/unmute, and Replay Buffer so you never alt-tab out of a game mid-play. **Studio Mode** previews a scene before it goes live — useful for checking a break scene before a fast transition, though many solo creators run direct-cut switching once layouts are stable. Enable the **Replay Buffer** to save a great or terrible moment after the fact, and local **Recording** for review and Capstone evidence regardless of your current stream-key status.

### Canvas, resolution, framerate, and encoder

Set your **canvas/output resolution** for vertical gaming — **1080×1920 is a common vertical target for TikTok** — and match **framerate** to what your game and PC can honestly sustain. Choose an **encoder** based on your GPU (hardware encoders reduce CPU load, since the game already demands resources) versus software if a hardware encoder is unavailable or busy.

**Bitrate has no single universal correct number.** It depends on resolution, framerate, motion, and upload bandwidth. Test a candidate bitrate on a short segment, check for blockiness in fast motion, and adjust — do not copy a number from a guide written for different content.

### Dropped frames vs rendering/encoding lag

- **Dropped frames** — usually a network/upload problem; check bitrate against real upload bandwidth
- **Rendering lag** — your GPU cannot keep up with game plus OBS render load; lower settings or source complexity
- **Encoding lag** — your CPU or encoder chip cannot keep up; switch encoders or lower resolution/framerate

Check OBS's stats panel to see which is actually happening before changing settings blindly.

### Capstone connection

Your Scene Plan, Safety Card, and Performance Checklist feed the Capstone: **Signature Gaming LIVE Show**. Optional Gaming LIVE Lab / Honors may polish later; labs never gate your certificate.

## Examples

**Example 1 — Confirmed stream-key access.** Game Capture + Window Capture for a launcher overlay. Advanced Audio Properties routes mic and Application Audio Capture separately; hardware encoder; 1080×1920 canvas; bitrate tested at three levels before locking one for a fast-motion shooter.

**Example 2 — No current access.** Same OBS scenes built and tested via local Recording only; documented on the Safety Card as "no access confirmed this session — using LIVE Studio (GM-05) as the live path, scenes ready for GM-07."

**Example 3 — Struggling single PC.** FPS cap applied five frames below monitor max, hardware encoder confirmed active, two unused overlays removed; dropped-frame count returns to zero on retest.

## Real Creator Scenarios

**Scenario A — "My stream drops frames when chat gets active."** Action: check the stats panel first — if rendering lag, a browser-source or overlay load is the likely cause, not chat itself.

**Scenario B — "I don't have a stream key yet — am I doing something wrong?"** Action: no. Confirm eligibility status honestly, keep building OBS scenes, and stream today through LIVE Studio or GM-07's Virtual Camera path.


## Screenshots

[Screenshot: OBS source list for a gaming scene — Game Capture, Window Capture, Video Capture Device — labeled with current OBS build/version]

[Screenshot: Advanced Audio Properties with mic, desktop, and Application Audio Capture routed separately]

[Screenshot: OBS Video settings showing 1080×1920 canvas/output resolution for vertical gaming]

[Screenshot: OBS stats panel showing dropped frames vs rendering lag vs encoding lag indicators]

## Diagrams

[Diagram: OBS gaming capture decision path — Game Capture (try first) → Window Capture → Display Capture (privacy risk) → Video Capture Device]

[Diagram: Single-PC load map — Game load + GPU encoder + FPS cap headroom + browser-source/alert load, sharing one machine]

[Diagram: No-stream-key decision — LIVE Studio (GM-05) or OBS Virtual Camera into LIVE Studio (GM-07) — never key circumvention]

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): stream-key access anxiety wastes more creator energy than almost any other single gaming-production issue, and it is almost always solved by honest documentation, not urgency. Creators who write down their current access status, build their OBS scenes regardless, and use LIVE Studio or Virtual Camera routing in the meantime keep shipping consistent gaming LIVEs while eligibility works itself out on TikTok's timeline, not theirs. Prefer this verifiable operational principle over any invented Brad gaming-stream story or claimed personal access history. If a gaming-specific technical note needs a specialist voice, request a qualified gaming-production contributor rather than inventing Brad-as-gamer anecdotes.

## Pro Tips

- Try Game Capture first for every new game before Window or Display Capture.
- Check the stats panel before changing any setting — know if it is dropped frames, rendering lag, or encoding lag.
- Cap in-game FPS slightly below monitor max to free real encoding headroom.
- Route mic, game, and Discord/party-chat audio as separate sources.
- Keep a backup/offline scene ready for capture failures or crashes.
- Document your current stream-key access status honestly — it changes, and your plan should account for that.

## Common Beginner Mistakes

- **Defaulting to Display Capture for convenience.** Fix: use Game or Window Capture; treat Display Capture as a privacy risk.
- **Copying a bitrate number from an unrelated guide.** Fix: test your own connection and content at a few candidate bitrates.
- **Assuming dropped frames and rendering lag are the same problem.** Fix: check the stats panel; fix the actual bottleneck.
- **Building a scene collection with no backup scene.** Fix: add one before your first real session.
- **Believing stream-key access is guaranteed once you "qualify."** Fix: document current status; build around LIVE Studio/Virtual Camera regardless.

## Reality Check

A technically deeper tool does not automatically make a better stream — a stable, tested scene collection does. Mission success is a working scene plan, an honest stream-key status, and a clean performance check — never viewer count, gifts, or match results. Stream-key access is TikTok's decision on TikTok's timeline; your job is readiness, not workaround-seeking.

## Summary

OBS gives gaming creators real capture depth, per-source audio control, an encoder/canvas pipeline, and safety nets like Replay Buffer and Recording — at the cost of more setup and real single-PC performance discipline. Stream-key access is account-dependent, tied to changing eligibility, and never guaranteed; protect any key you have and never seek to circumvent the requirement. File your scene plan, safety card, and performance checklist as Capstone evidence toward your **Signature Gaming LIVE Show**. Optional Gaming LIVE Lab / Honors never gates your certificate.

## LIVE Mission

**Mission: OBS Gaming Scenes + Stream-Key Status + Performance Check**

1. Build a gameplay scene and a talk/break scene using Game Capture (or the correct alternative) and properly routed audio via Advanced Audio Properties.
2. Set canvas/output resolution, framerate, and encoder for your real hardware; test at least two bitrate candidates and note the result.
3. Complete the OBS Gaming Scene Plan.
4. Document your current, honest stream-key access status on the Stream-Key Safety Card, including a protection/regeneration plan.
5. Run the Single-PC Performance Checklist and note any dropped-frame or lag findings and fixes.

Success is graded on **implementation and honest documentation** — never on viewers, gifts, or match outcomes, and never on whether you currently have stream-key access.

## Downloads

- **OBS Gaming Scene Plan** — capture sources, audio routing, scene/collection structure, backup scene
- **Stream-Key Safety Card** — access status, protection practices, regeneration steps
- **Single-PC Performance Checklist** — game load, encoder choice, FPS caps, browser-source/alert load review

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It includes scenario questions on capture-source selection, dropped frames vs rendering/encoding lag, and stream-key facts — not brand trivia or promises about guaranteed access.

## Key Takeaways

- Try Game Capture first; treat Display Capture as a privacy risk, not a default
- Route mic, game, and Discord/party-chat audio as separate sources through Advanced Audio Properties
- Canvas/output resolution, framerate, and encoder depend on your real hardware — bitrate has no single universal number
- Dropped frames, rendering lag, and encoding lag are different problems — check the stats panel first
- Stream-key access is account-dependent, tied to changing eligibility, and never guaranteed — protect any key you have and never seek circumvention
- No-stream-key creators have two legitimate paths: LIVE Studio (GM-05) and OBS Virtual Camera into LIVE Studio (GM-07)

## Before You Move On

☐ Finished reading this lesson

☐ Built a gameplay scene and a talk/break scene with correct capture and audio routing

☐ Set canvas/output resolution, framerate, and encoder; tested bitrate candidates

☐ Completed the OBS Gaming Scene Plan

☐ Documented honest stream-key access status on the Stream-Key Safety Card

☐ Ran the Single-PC Performance Checklist and resolved any findings

☐ Passed the Lesson Quiz (70%+)

☐ Filed scene plan, safety card, and performance checklist for Capstone evidence

## Next Lesson Preview

Next up: **OBS Virtual Camera into TikTok LIVE Studio (GM-07).** Whether or not you have stream-key access, this critical lesson shows you how to send your OBS visual program into LIVE Studio as a camera source — routing audio separately so you never get double audio, and recovering fast when Virtual Camera detection fails.
`,
};
