import type { ExpandedLesson } from "@/content/streameru/types";

export const lesson: ExpandedLesson = {
  slug: "vertical-layouts-alerts-soundboards-and-tikfinity",
  excerpt:
    "Build a readable vertical gaming layout, run disciplined alerts and soundboards, and use TikFinity triggers where currently supported — without overloading your show.",
  estimatedMinutes: 35,
  content: `## Introduction

A reliable capture path is only half the job. If your game is unreadable in vertical, your alerts fire over every kill, and your soundboard clips loop three times before you notice, viewers leave for reasons that have nothing to do with your skill at the game.

This lesson (GM-10) covers three layers that stack on top of everything you built in GM-01 through GM-09: vertical layout discipline, alert and soundboard restraint, and TikFinity-style automation where it is currently supported. Each layer adds capability and a failure point — the craft is knowing how much to add before your show is harder to run than it is fun to watch. This feeds your Capstone: **Signature Gaming LIVE Show**. Optional Gaming LIVE Lab / Honors may polish later; labs never gate your certificate.

## Why This Lesson Matters

Sequence you are in:

- **Previous:** Mobile Gaming LIVE Workflows (GM-09) — native, mirrored, and captured mobile paths
- **This lesson:** Vertical Layouts, Alerts, Soundboards, and TikFinity (GM-10) — readable framing, alert discipline, soundboard safety, verified automation
- **Next:** Gaming Community, Moderation, Troubleshooting, and Growth (GM-11) — running the room and fixing it live

Whatever capture path you locked in GM-01–GM-09, viewers only see the layout you build on top of it. Skip this lesson and you risk a technically perfect signal feeding an unreadable, overloaded, sensory-chaotic scene. Complete it and your layout, alerts, and soundboard become deliberate tools instead of default settings you never revisited.

## Learning Objectives

By the end of this lesson, you will be able to:

- Build a vertical gaming layout where the game feed stays readable and chat/overlays never hide the action
- Apply alert discipline that acknowledges engagement without hijacking your commentary
- Configure a soundboard with categories, hotkeys, volume limits, and an emergency mute
- Evaluate TikFinity-style triggers (comments, gifts, follows, likes) for SFX, TTS, on-screen effects, and OBS/LIVE Studio browser-source integration where currently supported
- Apply cooldowns, user restrictions, moderation, and spam prevention to any automation you enable
- Recognize when automation crosses from "helpful acknowledgment" into "distracting or manipulative" — and pull it back

## Estimated Study Time

- **Study and layout build:** about 35 minutes to read this lesson and rebuild your scene layout
- **LIVE Mission:** complete the Soundboard Planning Worksheet, TikFinity Trigger Map, and Alert-Volume Checklist
- **First full pass:** roughly 60–75 minutes including one test session with automation running in test mode

If you only have study time today, fix your vertical layout so the game stays readable — that single change protects every other decision in this lesson.

## Prerequisites

Complete **Mobile Gaming LIVE Workflows (GM-09)** and the earlier setup/audio lessons in this Mastery Path (GM-01–GM-08). You should already have a working capture path — this lesson assumes a stable feed, not a fresh setup problem.

You should already have:

- A working OBS or TikTok LIVE Studio scene with your game feed and camera
- Basic familiarity with browser sources if you plan to add TikFinity-style overlays
- Willingness to remove features, not just add them, if your first pass feels chaotic

Tools: Soundboard Planning Worksheet, TikFinity Trigger Map, Alert-Volume Checklist. No gifts required. No viral moment required.

## Main Lesson

### Vertical layout that stays readable

Vertical gaming layouts fight against horizontal games. Your job is to protect readability, not chase a trendy layout:

- **Game feed first.** The playable action needs the largest, clearest region of the vertical canvas. Crop deliberately — do not just stretch a horizontal capture and call it done.
- **Camera placement.** Place your camera where it adds presence without covering HUD elements, health bars, minimaps, or chat/inventory text the game itself needs visible.
- **Chat overlay discipline.** Chat should be visible enough to read and respond to, but never positioned over active gameplay zones. If your game's action happens center-screen, keep chat to a margin, not a floating box mid-frame.
- **Test at actual viewer size.** What looks fine full-screen on your monitor can be unreadable on a phone screen. Preview your layout at a realistic viewing size before trusting it.

[Callout: Readable beats fancy]
A plain layout where every element is visible beats an elaborate layout where the minimap is covered by an alert box. Readability is the actual production value here.

### Alert discipline

Alerts acknowledge new followers, gifts, or likes — useful for connection, dangerous when unmanaged:

- Set alert duration and frequency so they do not stack during busy moments.
- Keep alert volume below your commentary and game audio, not competing with them.
- Batch or throttle high-frequency alerts (likes, in particular) so they inform rather than spam.
- Decide, in advance, which alert types matter enough to interrupt your attention and which can run silently in the background.

### Soundboards — software, hardware, and Stream Deck–style controls

A soundboard is a production tool, not a personality replacement:

- **Software vs hardware.** Software soundboards run inside OBS or a dedicated app; hardware (Stream Deck–style controllers) trigger the same sounds with physical buttons — faster access, one more device to manage.
- **Hotkeys** should be memorable and easy to hit mid-game; test them under real gameplay conditions, not just at rest.
- **Volume** for every clip should be normalized against your mic and game audio — one screaming-loud clip wrecks a scene's balance.
- **Categories** (reactions, transitions, hype, running bits) keep a growing library navigable instead of a scroll-searching mess.
- **Emergency mute** — one button that silences the whole board instantly — is not optional. Something will misfire eventually.
- **Copyright risk.** Commercial music and movie/TV audio carry real risk on a monetized platform. Prefer original, licensed, or clearly cleared audio.
- **Overuse and sensory overload.** A board fired every few seconds stops being a bit and starts being noise — if chat comments on the spam instead of the game, cut back.

### TikFinity where currently supported

TikFinity-style tools connect chat actions to on-screen effects and automation. Treat every capability below as **"where currently supported"** — verify inside your own setup before building a show around any single feature, since account eligibility and triggers can differ and change:

- **Triggers:** comments, gifts, follows, and likes can each map to a distinct action.
- **Outputs:** sound effects, text-to-speech readouts, and on-screen visual effects.
- **Integration:** an OBS browser source or a LIVE Studio-compatible link source displays the effect layer; some workflows use webhooks/actions to trigger external behavior.
- **Game interactions:** some setups map triggers to in-game actions where the game and tooling support it — verify this is genuinely connected before promising chat it will happen.
- **Safety controls:** cooldowns (minimum time between triggers), user restrictions (who can trigger what, and how often), moderation tools, spam prevention, volume limits per effect, an emergency stop, and a test mode to validate behavior before going LIVE.

[Callout: Do not claim every feature for every account]
TikFinity capability, TikTok LIVE Studio integration support, and account eligibility can vary and change. Verify current support in your own setup rather than promising chat features you have not personally confirmed still work.

### Automation as acknowledgment, not distraction

Automation exists to help you acknowledge engagement while you stay focused on commentary and gameplay — not to replace your attention entirely:

- Good automation: a gift triggers a short, quiet SFX so the giver feels seen without you breaking commentary to read it manually every time.
- Bad automation: a wall of TTS readouts, visual effects, and soundboard hits stacking so fast that neither you nor chat can track what is happening.
- If you find yourself narrating the automation instead of the game, or chat is engaging with the effects instead of your content, that is the line — pull back.

### Do not overload your setup

Every layer in this lesson (layout complexity, alert volume, soundboard clip count, TikFinity trigger count) adds cognitive and technical load. Build in this order:

1. Confirm the readable vertical layout works alone, with no alerts or soundboard running.
2. Add alerts; confirm they do not stack or distract during busy gameplay.
3. Add a small soundboard (5–10 clips) with categories and an emergency mute; test hotkeys under real play.
4. Only after 1–3 are stable, add TikFinity triggers in test mode with strict cooldowns before going live with them.

## Examples

**Example 1 — Minimalist competitive streamer.** Layout keeps the minimap and health bar fully visible; camera sits in an unused corner. No soundboard, two quiet alert types only (follow, gift). Automation stays invisible because the game demands full attention.

**Example 2 — Variety/party-game host.** Larger camera presence; chat rendered prominently since interaction is the show. Soundboard has eight categorized clips with an emergency mute on a Stream Deck–style button. TikFinity comment triggers drive a lightweight effect, tested in test mode for a week before going live.

**Example 3 — Creator who overloaded and pulled back.** Launched with alerts, a 40-clip soundboard, and every TikFinity trigger at once; chat commented more on the noise than the game. Fix: cut the soundboard to ten clips, disabled like-triggered effects, kept only gift and follow triggers with cooldowns.

## Real Creator Scenarios

**Scenario A — "My chat can't see the minimap."** Action: rebuild the layout with the minimap as a protected zone; move chat or camera, not the minimap.

**Scenario B — "TikFinity isn't firing."** Action: confirm test mode works, check trigger/account eligibility, verify the browser/link source is actually connected — do not assume it's broken versus misconfigured.

**Scenario C — "My soundboard clip looped and wouldn't stop."** Action: hit the emergency mute immediately, address it briefly and move on, then fix the hotkey binding after the show.

## Screenshots

[Screenshot: vertical gaming layout with protected minimap/HUD zone, camera corner, and margin-positioned chat]

[Screenshot: soundboard interface showing categorized clips, volume levels, and an emergency mute button]

[Screenshot: TikFinity trigger configuration panel with cooldowns and user restrictions set]

[Screenshot: Alert-Volume Checklist with alert types, durations, and volume levels logged]

## Diagrams

[Diagram: Build-up order — Readable layout alone → Add alerts → Add small soundboard → Add TikFinity in test mode → Go live with full stack]

[Diagram: TikFinity flow — Chat action (comment/gift/follow/like) → Trigger with cooldown/restriction check → SFX/TTS/on-screen effect via browser or link source → Moderation and spam prevention layer]

## From Brad's Experience

[BradExperience]
Principle for approval (brad_must_approve): automation and layout complexity should scale only as fast as your ability to keep the show readable and calm — adding one layer at a time and testing it before the next is a reliability principle, not a gaming anecdote. Prefer this build-up discipline over any invented Brad soundboard or TikFinity story. For platform-specific TikFinity feature availability, request a qualified contributor or current documentation check rather than treating any single account's feature set as universal.

## Pro Tips

- Preview your vertical layout at real viewer size, not full-screen on your own monitor.
- Keep an emergency mute on a fast, memorable hotkey — test it before you need it.
- Normalize soundboard clip volume against your mic, not against each other in isolation.
- Run TikFinity triggers in test mode for a few sessions before enabling them live.
- Set cooldowns generously at first; tighten once you see real trigger volume.
- Categorize your soundboard early — a flat list of 30 clips is unusable mid-game.
- If chat starts talking about the noise instead of the content, cut back immediately.

## Common Beginner Mistakes

- **Chat overlay covering the action.** Fix: rebuild with protected gameplay zones first, decorate second.
- **Alerts stacking during busy gameplay.** Fix: throttle frequency and shorten duration.
- **Soundboard with no volume normalization.** Fix: level every clip against your mic before your first real session.
- **No emergency mute.** Fix: bind one immediately — this is not optional.
- **Claiming every TikFinity feature works for every account.** Fix: verify current support in your own setup before promising it on stream.
- **Enabling every trigger type on day one.** Fix: add one automation layer at a time, testing each before the next.
- **Using copyrighted commercial audio on the soundboard.** Fix: prefer original, licensed, or clearly cleared clips.

## Reality Check

Your first automated layout will probably be too busy. That is normal — cutting back is a sign of good judgment, not failure. Mission success is a readable layout, disciplined alerts/soundboard, and verified (not assumed) TikFinity behavior — never viewer count, gift totals, or how many effects fired in one night.

## Summary

Vertical Layouts, Alerts, Soundboards, and TikFinity means protecting game readability first, then layering alert discipline, soundboard safety (categories, volume, emergency mute, copyright awareness), and verified TikFinity automation — added one layer at a time, never all at once. Automation should help you acknowledge engagement while focused, not replace your attention or overwhelm the room. File your worksheets; this layer feeds directly into your Signature Gaming LIVE Show Capstone.

## LIVE Mission

**Mission: Layout, Soundboard, and Automation Build-Up**

1. Rebuild your vertical layout so the game feed, HUD, and chat never overlap in ways that hide the action.
2. Complete the Alert-Volume Checklist for every alert type you use.
3. Complete the Soundboard Planning Worksheet: categories, hotkeys, volume levels, and emergency mute confirmed working.
4. If using TikFinity, complete the TikFinity Trigger Map and run every trigger in test mode before enabling it live.
5. Run one test session confirming readability, alert behavior, soundboard safety, and automation restraint together.

Success is graded on **implementation** — a readable, disciplined, verified setup — never on viewers, gifts, or how many effects you can trigger in one night.

## Downloads

- **Soundboard Planning Worksheet** — categories, hotkeys, volume levels, and emergency mute planning
- **TikFinity Trigger Map** — trigger types, outputs, cooldowns, and user restrictions
- **Alert-Volume Checklist** — alert type, duration, and volume verification

## Quiz

Take the interactive lesson quiz on this page (70% to pass). It includes scenario questions on layout readability, alert/soundboard discipline, and TikFinity verification — not feature-count bragging or gift math.

## Key Takeaways

- Protect game readability before decorating with alerts, soundboard, or automation
- Alerts and soundboards need volume discipline, categories, and an emergency mute
- TikFinity capability varies by account and changes over time — verify, do not assume
- Cooldowns, user restrictions, moderation, and spam prevention belong on every trigger
- Add automation one layer at a time, testing each before the next
- Automation should acknowledge engagement while you stay focused — not replace your attention
- Mission success is a readable, disciplined, verified setup — never viewers, gifts, or effect counts

## Before You Move On

☐ Finished reading this lesson

☐ Rebuilt vertical layout with protected gameplay/HUD zones

☐ Completed the Alert-Volume Checklist

☐ Completed the Soundboard Planning Worksheet with emergency mute confirmed

☐ Completed the TikFinity Trigger Map (if used) with all triggers tested in test mode

☐ Run one test session with the full stack together

☐ Passed the Lesson Quiz (70%+)

## Next Lesson Preview

Next up: **Gaming Community, Moderation, Troubleshooting, and Growth (GM-11).** Your layout and automation are readable and disciplined — now you run the room: community games, moderation for gaming-specific risks, a full troubleshooting decision tree, and gaming-specific growth without ranking-as-worth or gift-guilt.
`,
};
