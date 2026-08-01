import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "performance-audio-for-musicians-on-live",
  excerpt:
    "Build musician-ready LIVE audio from signal flow through monitoring: mics, instruments, gain staging, OBS or TikTok LIVE Studio paths, and a checklist plus private test clip.",
  estimatedMinutes: 30,
  content: `## Introduction

Pretty lights will not save a harsh vocal, a clipping guitar, or a buried singer. Music LIVE audio is a performance system: source → connection → interface or mixer → monitoring → computer → streaming software → audience. If any stage is wrong, the room hears it before they see your branding.

This lesson (MU-02) is the technical core of Music LIVE Mastery. Map signal flow, choose connection methods by instrument, stage gain before filters, prefer hardware monitoring, and document either an **OBS** path or a **TikTok LIVE Studio** path — clearly labeled (**Last reviewed: July 2026**). Outcome: Music Audio Checklist + short private/test clip. Success is execution and documentation — never viewers, gifts, or virality.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** Music LIVE Formats That Work (MU-01) — primary/secondary format and sample run-of-show
- **This lesson:** Performance Audio for Musicians on LIVE (MU-02) — signal flow, instruments, monitoring, OBS or TikTok LIVE Studio, sound-check proof
- **Next:** Vocal Stamina and Performance Presence (MU-03) — warm-ups, set length, recovery
- **Recommended parallel:** Audio First: Clean Sound Wins Trust (PD-04) — talk/host speech standards; do not confuse it with this performance path

Brief PD-04 callback only: clean speech habits help talk between songs. This lesson does not reteach phone-mic talk standards — it teaches performance audio for instruments and vocals on LIVE.

Skip this and setlists become noise with lyrics. Complete it and later stamina, setlist, and request lessons ride on sound you can trust.

## Learning Objectives

By the end of this lesson, you will be able to:

- Draw your signal flow from source to audience in one clear map
- Choose mic and instrument connection methods using principles (not brand shopping)
- Gain-stage before adding filters; verify monitoring before going LIVE
- Configure a documented path in OBS *or* TikTok LIVE Studio without double audio
- Run a sound check that catches quiet/clipping, latency, hum, and sync problems
- File checklist + signal-flow map + test clip evidence toward the Signature Music LIVE Show Capstone

## Estimated Study Time

- **Study and mapping:** about 30 minutes to read and draft your signal-flow map
- **LIVE Mission:** full sound check, map, and short private/test clip with software path documented
- **First full pass:** roughly 90–120 minutes including one failed check (useful) and one clean take

If your format is instrumental-only or DJ-only, still complete the checklist for your real sources — empty vocal rows are fine when labeled N/A.

## Prerequisites

Complete **MU-01**. **PD-04** is recommended if your talk audio is still chaotic; it does not replace this lesson.

You should already have:

- A chosen primary music format from MU-01
- The instruments/mics/controllers you actually own (principles scale from simple to multi-input)
- A computer path you can test privately (OBS and/or TikTok LIVE Studio)

Tools: Music Audio Checklist, Signal-Flow Map Worksheet, Sound-Check Sheet. Ordinary safe power and cable practices — no unsafe electrical shortcuts.

## Main Lesson

### Signal flow (memorize the chain)

Every Music LIVE follows some version of:

**Source → cable/connection (XLR / USB / 1/4" / digital) → DI (when needed) → interface or mixer → monitoring (headphones/IEMs/wedges) → computer → OBS or TikTok LIVE Studio → audience**

Write *your* chain on the Signal-Flow Map Worksheet. If you cannot point to each hop, you cannot troubleshoot. "The interface shows up in Windows" is incomplete — you still need what feeds the stream mix.

[Callout: Clear audio before visual upgrades]
Fix gain, clipping, and monitoring before another light or camera. Ears first.

### Microphones — principles, not shopping lists

Capsule jobs (criteria, not brands):

- **Dynamic** — stage-tough, often feedback-resistant; common for loud vocals/instruments; usually no phantom power
- **Condenser** — more detail; often needs **phantom power** (+48V); watch room noise and feedback
- **USB** — simple all-in-one; weaker for multi-instrument blends; watch exclusive device locks
- **Lavalier** — talk/writing sessions; rarely ideal as primary singing mic on a loud stage
- **Instrument / vocal / drum mics** — placement and distance are the skill; vocal mics need plosive control; drum kits need phase/bleed discipline
- **Stereo pairs** — matched levels and intentional L/R

**Polar patterns** (cardioid, supercardioid, omni, figure-8): sensitive side at the source; nulls toward monitors/noise. **Distance:** closer usually beats noisy distance until proximity mud/plosives. **Feedback:** lower stage volume, angle monitors off-axis, prefer closed-back headphones/IEMs — fix placement/gain before random EQ.

**Gain staging:** set input gain so peaks do not clip and soft parts are not buried *before* compressors, gates, or noise suppression. Filters do not replace correct level.

### Instruments — connection methods

Use an internal setup-matrix mindset (source × method = tonight's cell), not a shopping aisle:

- **Electric guitar/bass:** amp mic, DI, amp+DI blend, or modeler USB/line — DI is clean; mic captures cab air; watch ground-loop hum
- **Acoustic / acoustic-electric:** body mic, clip/soundhole, and/or PU → DI/interface — test PU quack vs mic feedback; stabilize level before pedals hit the stream mix
- **Keys / digital piano / synth:** line outs → interface/mixer (often stereo) — prefer line level over miking a keyboard amp
- **E-drums:** module outs or USB audio — lock sample rate with the interface
- **Acoustic drums:** start simple (e.g., overhead + kick ideas); control bleed and phones volume
- **Brass / woodwind / strings:** instrument or careful vocal-mic technique; rehearse motion; watch SPL peaks and bow noise
- **DJ controllers / samplers:** master outs → mixer/interface (or USB interface mode) — stream must hear master, not cue-only mistakes
- **MIDI:** control data only — you still need an audio path from soft synth/module (MIDI ≠ sound)
- **Multiple instruments:** mixer or multi-input interface → one clean stereo (or controlled multi) to the PC — pre-mix, then present one device to the streaming app

**Direct vs mic vs DI vs mixer:** direct/USB is simple but can lack air; mic adds space and bleed risk; DI cleans instrument/line into the interface; mixers turn many sources into one feed.

**Stereo vs mono / latency:** map L/R or viewers hear one-sided music; center vocals on purpose. Prefer wired monitoring — Bluetooth delay wrecks timing. Software monitoring adds buffer; standardize **48 kHz** when possible. Sync offset only after the physical path is sane.

### Monitoring before going LIVE

Performers need themselves *in time*. Prefer **hardware direct monitoring** on the interface/mixer over software-only returns. OBS "Monitor and Output" can help producers check the stream mix, but for singers it often adds latency — label your choice on the Sound-Check Sheet and verify with a clap/count-in.

### OBS path (clearly labeled)

**OBS — Last reviewed: July 2026.** Features vary by OS/version; do not assume every build includes every capture type.

- **Audio Input Capture** for mics/interfaces; **Audio Output Capture** when needed (double-audio risk); **Application Audio Capture** where supported for backing tracks/DAW
- Mixer + **Advanced Audio Properties**: volume, balance, sync offset, monitoring mode
- Filters after gain staging: compressor, limiter, noise gate, noise suppression, EQ/VST where available
- Backing tracks via media source or app capture — keep them under the vocal
- Scene switching / multi-cam are secondary to a clean mix; local recording helps Capstone evidence
- **Double audio:** mic path + desktop/output path capturing the same sound — disable the duplicate

Prefer a clean interface mix into OBS over rebuilding a studio in filters on night one.

### TikTok LIVE Studio path (clearly labeled; separate from OBS)

**TikTok LIVE Studio — Last reviewed: July 2026** (TikTok FAQ/product behavior as of that review; verify labels on your build).

- Audio mixer + explicit **mic device selection**
- **System/application audio:** selecting an app can mute other sounds per TikTok FAQ — plan backing tracks accordingly
- Noise suppression exists; expect less EQ/filter granularity than OBS
- Cameras/media/sources available; audio still primary
- Common failure: mic + desktop both capturing the same path → echo/double audio
- Practical pattern: pre-mix on interface/mixer, present **one clean stereo device** to LIVE Studio

Do not claim OBS-only filters inside LIVE Studio. Document one path for the mission.

### Beginner vs intermediate + common failures

- **Beginner:** one USB vocal mic or interim phone path + one controlled backing-track app; wired headphones; single software path; checklist still required
- **Intermediate:** interface/mixer, vocal + instrument inputs, hardware direct monitor, optional DI, one stereo feed to OBS *or* LIVE Studio, written gain notes

Rehearse failures on purpose: interface visible but silent; quiet/clipping mic or guitar; backing louder than vocal; echo/double audio; latency; Bluetooth delay; wrong sample rate; ground-loop hum; mono on one side; meters move but viewers hear nothing; USB disconnect. For each, name the chain hop you check first.

### Capstone connection

Checklist + signal-flow map + test clip (and software path note) feed the **Signature Music LIVE Show**. Optional Music LIVE Lab / Honors never gates your certificate.

## Examples

**Example 1 — Solo vocal + acoustic-electric (OBS).** Vocal XLR + guitar PU→DI into interface; hardware direct monitor; OBS Audio Input Capture on the interface mix; backing via Application Audio Capture where supported; clap test for sync; vocal above track.

**Example 2 — Keys + vocal (TikTok LIVE Studio).** Keys L/R + vocal into mixer → one stereo device to the PC; LIVE Studio set to that device; avoid duplicate system audio; document "LIVE Studio path — July 2026."

**Example 3 — DJ.** Controller master → interface; cue in DJ headphones only; wired monitor; 48 kHz locked; catch cue-to-stream mistakes in rehearsal.

## Real Creator Scenarios

**Scenario A — Interface shows up, nobody hears you.** Trace the map: OS default device, OBS/LIVE Studio selection, muted bus, wrong scene. Wrong-app meters do not count.

**Scenario B — Fine in headphones, delayed on stream.** Separate hardware performer monitor from the stream mix; do not sing to a delayed software return.

**Scenario C — Guitar hums when you stand.** Check cables, ground-loop paths, DI ground-lift *as designed*, and power proximity — safely per equipment instructions.

## Screenshots

[Screenshot: Signal-Flow Map Worksheet filled from source through OBS or TikTok LIVE Studio to audience]

[Screenshot: Music Audio Checklist with mic, instrument, monitoring, and software-path sections]

[Screenshot: Sound-Check Sheet with pass/fail rows for clip, quiet, double audio, latency, sample rate]

[Screenshot: OBS audio mixer + Advanced Audio Properties — labeled OBS, Last reviewed July 2026]

[Screenshot: TikTok LIVE Studio audio mixer / device selection — labeled LIVE Studio, Last reviewed July 2026]

## Diagrams

[Diagram: Master signal-flow — Source → XLR/USB/1/4" → DI → Interface/Mixer → Hardware monitor + Computer → OBS or TikTok LIVE Studio → Audience]

[Diagram: Gain staging order — Input gain → Clean balance → Then compressor/gate/EQ/suppression → Limiter — never filters-first]

[Diagram: Double-audio trap — Same sound on Mic path and Desktop/Output path at once]

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): performance audio is a chain problem before it is a gear problem. Creators who map source → connection → interface/mixer → monitoring → computer → streaming software catch silent interfaces, double audio, and latency faster than creators who buy another plugin. Prefer hardware monitoring for performers and gain staging before filters. Do not invent Brad-as-tour-engineer war stories. If deep instrument-mic technique needs a specialist voice, request a qualified musician/audio-engineer contributor.

## Pro Tips

- Draw the signal-flow map before you open software.
- Standardize 48 kHz; wire monitors; treat Bluetooth as last resort.
- Pre-mix on hardware when LIVE Studio filter depth is limited.
- Label the path: OBS *or* TikTok LIVE Studio — not "the app."
- Keep backing tracks under the vocal; re-check USB after cable bumps.
- Record a private test clip even when you "already know" it is fine.

## Common Beginner Mistakes

- **Buying mics before fixing gain/distance.** Fix: checklist first.
- **Software-only monitoring while singing.** Fix: hardware direct monitor.
- **Mic + desktop double path.** Fix: remove the duplicate; retest.
- **Filters on a clipping input.** Fix: lower input gain first.
- **Expecting LIVE Studio = OBS filters.** Fix: pre-mix; document limits.
- **MIDI plugged in with no audio return.** Fix: MIDI ≠ sound.
- **One-sided stereo / skipped private clip.** Fix: balance L/R; file evidence.

## Reality Check

Simple and reliable beats complex and intermittent. Mission success is checklist + map + sound check + short test clip with the software path named — never gifts or virality.

## Summary

Own the chain: sources, connections, DI/interface/mixer, monitoring, and a labeled OBS or TikTok LIVE Studio path (Last reviewed: July 2026). Gain-stage before filters; monitor before LIVE; prove it with checklist and private test clip. PD-04 is talk audio; this is performance depth. File evidence for the Signature Music LIVE Show Capstone. Optional Music LIVE Lab / Honors never gates your certificate.

## LIVE Mission

**Mission: Sound Check + Signal Map + Test Clip**

1. Complete the Signal-Flow Map Worksheet for your real MU-01 primary format setup.
2. Run the Music Audio Checklist end to end (mics, instruments, monitoring, sample rate, double-audio check).
3. Fill the Sound-Check Sheet with pass/fail notes.
4. Record a short **private/test** clip (song excerpt, loop, or DJ phrase — whatever matches your format).
5. Document whether you used **OBS** or **TikTok LIVE Studio** (and note July 2026 review awareness / your build).

Success is graded on **implementation and documentation** — never on viewers, gifts, or virality.

## Downloads

- **Music Audio Checklist** — sources, connections, monitoring, software path, failure checks
- **Signal-Flow Map Worksheet** — source-to-audience hops for your real rig
- **Sound-Check Sheet** — pass/fail rows for level, clip, latency, hum, double audio, stereo balance

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It includes scenario questions on signal flow, double audio, monitoring, and OBS vs TikTok LIVE Studio boundaries — not brand trivia or gift math.

## Key Takeaways

- Map the full chain: source → connection → DI → interface/mixer → monitor → computer → OBS or LIVE Studio → audience
- Mic and instrument choices are principle-driven jobs, not shopping lists
- Gain staging before filters; hardware monitoring preferred for performers
- OBS and TikTok LIVE Studio are different tools — label your path (Last reviewed: July 2026)
- Common failures are usually routing and gain, not "bad talent"
- PD-04 is talk audio; MU-02 is performance audio — checklist + map + test clip feed Capstone
- Optional Music LIVE Lab / Honors never gates your certificate

## Before You Move On

☐ Finished reading this lesson

☐ Drew a complete signal-flow map for your real setup

☐ Completed the Music Audio Checklist

☐ Ran a sound check with written pass/fail notes

☐ Recorded a short private/test clip

☐ Documented OBS *or* TikTok LIVE Studio path used

☐ Passed the Lesson Quiz (70%+)

☐ Filed checklist + map + clip note for Capstone evidence

## Next Lesson Preview

Next up: **Vocal Stamina and Performance Presence (MU-03).** Clean audio means people can hear you — stamina means you can still deliver at minute sixty. Warm-ups, set-length planning for 60–90 minutes, talk between songs, recovery, and mistake handling. PR-02 (voice that holds a room) is recommended parallel context for talk presence; MU-03 stays on music-performance stamina.
`,
};
