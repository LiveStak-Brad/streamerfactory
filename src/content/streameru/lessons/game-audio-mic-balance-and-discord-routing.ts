import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "game-audio-mic-balance-and-discord-routing",
  excerpt:
    "Balance mic, game, Discord/party chat, music, soundboard, and alerts with separate source control — simple first, with version-aware notes on Application Audio Capture and monitoring.",
  estimatedMinutes: 30,
  content: `## Introduction

A gaming stream can have a perfect setup (GM-01), a sharp commentary loop (GM-02), and disciplined chat timing (GM-03) — and still lose the room because nobody can hear the mic over the game, or Discord teammates are drowning out commentary, or an alert sound clips every few minutes. Gaming audio has more simultaneous sources than almost any other LIVE format: mic, game, Discord or party chat, music, soundboard, and alerts, all competing for the same pair of ears.

This lesson (GM-04) is the audio-balance core of Gaming LIVE Mastery. You will map every source, control each one separately instead of fighting one master volume knob, use Application Audio Capture where your OBS build supports it, avoid double audio and echo, gain-stage before filters, and keep your first setup simple on purpose. Outcome: Audio-Routing Map, Mic-vs-Game Balance Checklist, and Discord Routing Worksheet. This lesson applies gaming-specific audio; **Production Mastery (PD-04, Audio First)** teaches broad talk-audio standards and does not replace this lesson.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** Reading Chat Without Losing the Game (GM-03) — chat-reading plan and safe-moment timing
- **This lesson:** Game Audio, Mic Balance, and Discord Routing (GM-04) — separate source control, Application Audio Capture, monitoring, and simple-first routing
- **Next:** TikTok LIVE Studio for Gaming (GM-05) — platform-specific gaming workflow
- **Related, not duplicated:** Audio First: Clean Sound Wins Trust (PD-04) — general talk-audio standards; this lesson stays on gaming's multi-source routing problem specifically

Brief PD-04 callback only: clean mic fundamentals (gain, distance, plosive control) from Production Mastery still apply. This lesson does not reteach general mic technique — it teaches how to route and balance mic against game, Discord, music, soundboard, and alerts specifically.

Skip this lesson and every session risks a buried mic, a blown-out alert, or teammates louder than you on your own stream. Complete it and audio becomes a system you built once, not a fight you have every night.

## Learning Objectives

By the end of this lesson, you will be able to:

- Map every audio source in a typical gaming session and control each one independently
- Use Application Audio Capture where your OBS build supports it (OBS 28+ on Windows; Capture Audio on Game/Window Capture in OBS 30.1+) without assuming every build behaves the same way
- Identify and fix double audio, echo, clipping, and sync/latency issues by chain hop, not guesswork
- Apply gain staging before compressor, limiter, noise gate, and noise suppression — never filters first
- Route Discord or party chat so teammates are audible to you without drowning your mic or leaking into recordings inappropriately
- Keep a beginner-appropriate, simple audio setup and connect your checklist to the Signature Gaming LIVE Show Capstone

## Estimated Study Time

- **Study and mapping:** about 25 minutes to read and build your Audio-Routing Map
- **LIVE Mission:** complete the Mic-vs-Game Balance Checklist and Discord Routing Worksheet, then run one private sound check
- **First full pass:** roughly 60–90 minutes including one deliberate failure test (double audio, clipping) so you know what it sounds like

If your format has no Discord/party chat (solo play only), still complete the checklist for your real sources — empty Discord rows are fine when labeled N/A.

## Prerequisites

Complete **GM-01** through **GM-03**. **PD-04** is recommended if your general mic/gain fundamentals are still shaky; it does not replace this lesson's gaming-specific routing work.

You should already have:

- A working setup path and proven source flow from GM-01
- Your actual audio sources identified: mic, game audio, Discord/party chat (if used), music/soundboard (if used), alerts
- A computer path you can test privately (OBS and/or TikTok LIVE Studio)

Tools: Audio-Routing Map, Mic-vs-Game Balance Checklist, Discord Routing Worksheet. Ordinary safe cable and power practices — no unsafe electrical shortcuts.

## Main Lesson

### Map every source before you touch a single slider

A typical Gaming LIVE session can have six simultaneous audio sources: **mic, game audio, Discord/party chat, music, soundboard, and alerts.** Write each one down on the Audio-Routing Map before adjusting anything. If you cannot name a source, you cannot control it — you can only react to it.

### Separate source control — the core principle

Every source above should have its **own** volume control, not share one master fader with everything else. In OBS, this means each source appears in your Audio Mixer with its own slider and its own Advanced Audio Properties (volume, balance, sync offset, monitoring mode). In TikTok LIVE Studio, this means using the mixer's device-level and app-level controls rather than relying on one system volume for everything. If lowering "the volume" always lowers your mic and your game and your music at once, you do not have separate source control yet — fix that before anything else in this lesson.

### Application Audio Capture where supported

**Application Audio Capture — Last reviewed: July 2026; verify against your build.** Where supported, this OBS source type captures the audio of one specific application (your game, or Discord) instead of everything your desktop is playing at once. Availability depends on your OS and OBS version:

- **OBS 28+ on Windows** introduced Application Audio Capture broadly.
- **OBS 30.1+** added **Capture Audio on Game/Window Capture** — an option to pull an application's audio directly from its existing Game Capture or Window Capture source, without a separate audio source.

Do not assume these options exist on older builds, non-Windows platforms, or every install. Check your actual version before promising chat "I'll mute just the game" if your build cannot do that yet. Where Application Audio Capture is not available, use **Desktop Audio Capture** for overall system sound and accept the trade-off that it captures everything playing on the desktop together — or use a **virtual audio cable** to route specific applications into specific inputs when finer control is truly necessary.

### Desktop audio, virtual cables, and when you actually need them

**Desktop Audio Capture** grabs whatever the OS is playing as a whole — simple, but it cannot separate game from Discord from music if they all play through the same system output. **Virtual audio cables** (software that creates virtual input/output devices) let you route one application's audio to a specific virtual "microphone" that your streaming software then captures as its own source — useful when Application Audio Capture is unavailable and you truly need to separate two specific apps. Do not reach for a virtual cable as your first move; most beginner and intermediate setups can succeed with Application Audio Capture (where supported) or careful Desktop Audio Capture use. Add a virtual cable only after you have proven you actually need the separation it provides.

### Discord and party chat routing

The core Discord/party-chat problem: you need to **hear** your team, but you usually do **not** want their voices captured at full volume into your stream in a way that drowns your own commentary, and you want to avoid capturing your own voice twice (once from your mic, once from Discord's echo of you back through teammates' clients).

On the Discord Routing Worksheet, decide:

- **Do teammates get streamed at all?** Some creators stream teammate audio (with consent) for community value; others keep it monitor-only and voice their own reactions instead.
- **If streamed, at what relative level?** Discord/party chat should typically sit under your mic and under critical game audio cues, not compete with them.
- **Echo check:** confirm Discord is not capturing your own microphone input a second time through "stereo mix" style desktop capture — this is the single most common source of streamed echo.

Get teammate consent before streaming their voices, and label the choice in your Discord Routing Worksheet so it is documented for Capstone evidence.

### Capstone connection

Your Audio-Routing Map, Mic-vs-Game Balance Checklist, and Discord Routing Worksheet feed the Gaming Capstone: **Signature Gaming LIVE Show**. Reviewers (and you) should see a trail: setup (GM-01) → commentary (GM-02) → chat timing (GM-03) → audio that actually lets all of it be heard clearly (GM-04). Optional Gaming LIVE Lab / Honors never gates your certificate.

## Examples

**Example 1 — Solo shooter streamer, beginner tier.** Sources: mic + game audio only, separate sliders, no Discord streamed. Checked for clipping on loud in-game explosions; gain-staged mic before adding light noise suppression.

**Example 2 — Duo streamer with Discord, OBS 30.1+.** Used Capture Audio on Game/Window Capture for game audio, mic on its own input, Discord monitor-only for the creator but streamed for the teammate's voice at a reduced level with consent documented on the Discord Routing Worksheet.

**Example 3 — Streamer using an older OBS build without Application Audio Capture.** Used Desktop Audio Capture for game + music together (accepted trade-off), kept mic fully separate, and skipped a virtual cable since the simpler setup met the session's actual needs.

## Real Creator Scenarios

**Scenario A — "My teammates are louder than me on my own stream."** Action: check Discord's streamed level against your mic level on the Mic-vs-Game Balance Checklist; lower Discord's relative level or move it to monitor-only.

**Scenario B — "There's a weird echo of my own voice."** Action: check for double capture — commonly Discord or a "stereo mix" style desktop source re-capturing your mic. Disable the duplicate path.

**Scenario C — "My alert sound is way louder than everything else."** Action: normalize the alert's playback level against your already-balanced mic and game levels; do not judge it in isolation.

## Screenshots

[Screenshot: Audio-Routing Map listing mic, game, Discord/party chat, music, soundboard, and alerts with separate control notes]

[Screenshot: Mic-vs-Game Balance Checklist with pass/fail rows for clipping, buried mic, and alert loudness]

[Screenshot: Discord Routing Worksheet documenting streamed vs monitor-only decision and consent]

[Screenshot: OBS Audio Mixer showing Application Audio Capture / Capture Audio on Game Capture — labeled OBS, Last reviewed July 2026]

## Diagrams

[Diagram: Six-source map — Mic, Game, Discord/party chat, Music, Soundboard, Alerts, each with independent control]

[Diagram: Gain staging order — Input gain → Clean balance across sources → Compressor/gate/noise suppression → Limiter last]

[Diagram: Double-audio and echo trap — Mic path captured directly and again through Discord/desktop capture at the same time]

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): gaming audio is a routing problem before it is a mixing problem. Creators improve faster when they name every source (mic, game, Discord/party chat, music, soundboard, alerts), give each one independent control, and gain-stage before reaching for filters — rather than fighting one master volume knob and hoping. Application Audio Capture where supported is a real time-saver, but only after the creator understands what it is actually capturing. Keeping the first setup simple (mic + game only) is a legitimate, complete beginner standard, not a placeholder. Prefer this verifiable teaching principle over any invented founder gaming-audio war story. If deep Discord server-side audio engineering or platform-specific driver troubleshooting is needed, request a qualified audio/technical contributor rather than inventing Brad-as-audio-engineer anecdotes.

## Pro Tips

- Name all six possible sources before touching a single slider — you cannot control what you have not identified.
- Check your OBS version before promising a specific Application Audio Capture behavior on stream.
- Keep beginner setups at mic + game only; that is complete, not incomplete.
- Get teammate consent before streaming their Discord/party-chat audio, and document the decision.
- Gain-stage first; add compressor, gate, and noise suppression only after peaks stop clipping.
- Normalize alert sounds against your already-balanced mic and game levels, not in isolation.

## Common Beginner Mistakes

- **One master volume for everything.** Fix: give mic, game, Discord, music, soundboard, and alerts independent sliders.
- **Assuming Application Audio Capture exists on every OBS build.** Fix: check your version (OBS 28+ Windows; Capture Audio on Game/Window Capture in 30.1+) before relying on it.
- **Streaming Discord/party-chat audio without teammate consent.** Fix: ask first; document the decision on the Discord Routing Worksheet.
- **Filters on a clipping mic input.** Fix: lower input gain first; filters do not fix distortion.
- **Alert sounds blasting far louder than mic or game.** Fix: normalize against your existing balance, not in isolation.

## Reality Check

A simple, correctly balanced two-source setup (mic + game) beats a six-source mixer nobody can explain. Mission success is a completed Audio-Routing Map, Mic-vs-Game Balance Checklist, and Discord Routing Worksheet with a real private sound check behind them — never viewers, gifts, wins, or rank.

## Summary

Game Audio, Mic Balance, and Discord Routing means naming every source (mic, game, Discord/party chat, music, soundboard, alerts), giving each one independent control, using Application Audio Capture where your build supports it (OBS 28+ Windows; Capture Audio on Game/Window Capture in OBS 30.1+), avoiding double audio and echo, gain-staging before filters, and keeping your first setup simple on purpose. PD-04 teaches general talk-audio standards; this lesson applies gaming's multi-source routing specifically. File your Audio-Routing Map, checklist, and worksheet — they extend your Signature Gaming LIVE Show Capstone trail. Optional Gaming LIVE Lab / Honors never gates your certificate.

## LIVE Mission

**Mission: Audio-Routing Map + Balance Proof**

1. Complete the Audio-Routing Map listing your real sources (mic, game, Discord/party chat, music, soundboard, alerts — mark unused ones N/A).
2. Run the Mic-vs-Game Balance Checklist end to end, checking for clipping, buried mic, echo, and alert loudness.
3. Fill the Discord Routing Worksheet documenting streamed vs monitor-only decisions and teammate consent (if applicable).
4. Confirm your OBS or TikTok LIVE Studio build's actual Application Audio Capture support before relying on it.
5. Run a private sound check and log pass/fail notes.

Success is graded on **implementation and documentation** — never on viewers, gifts, wins, or rank.

## Downloads

- **Audio-Routing Map** — all six possible sources with independent-control notes
- **Mic-vs-Game Balance Checklist** — pass/fail rows for clipping, buried mic, echo, ducking, and alert loudness
- **Discord Routing Worksheet** — streamed vs monitor-only decisions and consent documentation

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It includes scenario questions on source separation, Application Audio Capture version awareness, double audio/echo, and Discord routing — not brand trivia or gift math.

## Key Takeaways

- Map all six possible sources — mic, game, Discord/party chat, music, soundboard, alerts — before adjusting anything
- Every source needs independent volume control, not one shared master fader
- Application Audio Capture availability depends on your build (OBS 28+ Windows; Capture Audio on Game/Window Capture in OBS 30.1+) — verify before relying on it
- Double audio and echo are usually a duplicate-capture problem, not a "bad mic" problem
- Gain-stage before compressor, gate, noise suppression, and limiter — always in that order
- Get teammate consent before streaming Discord/party-chat audio; document the decision

## Before You Move On

☐ Finished reading this lesson

☐ Completed the Audio-Routing Map for your real sources

☐ Ran the Mic-vs-Game Balance Checklist with pass/fail notes

☐ Filled the Discord Routing Worksheet (or marked N/A if not applicable)

☐ Verified your build's actual Application Audio Capture support

☐ Passed the Lesson Quiz (70%+)

☐ Filed routing map + checklist + worksheet for Capstone evidence

## Next Lesson Preview

Next up: **TikTok LIVE Studio for Gaming (GM-05).** Your audio now separates cleanly across every source — next you apply that inside TikTok's own broadcaster app specifically for gaming sessions: device selection, system/app audio behavior, scene basics, and common gaming-specific pitfalls inside LIVE Studio.
`,
};
