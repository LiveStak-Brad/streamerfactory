# Gaming LIVE Setup Matrix (Internal Curriculum Reference)

**Status:** Internal production reference for Gaming LIVE Mastery (GM-01 + Capstone)  
**Last reviewed:** July 2026  
**Rule:** Teach principles and signal flow — not brand shopping guides.  
**Hard rules:** Stream-key access is not guaranteed. OBS ≠ TikTok LIVE Studio feature parity. OBS Virtual Camera carries video, not mixed program audio by itself. Dual-PC is not required for most creators. Never teach stream-key circumvention.

---

## How to use

- GM-01 uses this matrix for setup categories and failure points.
- Capstone dossiers should map the creator’s real setup to one row (or a hybrid noted explicitly).
- Document which path the creator uses: **TikTok LIVE Studio**, **OBS + stream key**, **OBS Virtual Camera → LIVE Studio**, or **mobile-native**.
- Prefer the simplest path that is reliable for the creator’s game and hardware.

---

## 1. TikTok LIVE Studio only — PC gaming

| Field | Detail |
|--------|--------|
| Signal / source flow | PC game → LIVE Studio game/window/display capture → camera + mic devices in LIVE Studio → Go LIVE (platform login; no manual stream key required for LIVE Studio itself) |
| Required categories | Windows/macOS PC capable of game + LIVE Studio; microphone; optional webcam; stable internet; LIVE-eligible TikTok account |
| Video path | LIVE Studio game/screen capture + camera source; vertical layout framing |
| Audio path | LIVE Studio microphone device + game/system audio per current LIVE Studio mixer model (verify current UI) |
| Monitoring | Headphones preferred; watch for desktop speakers into mic |
| Chat visibility | Native LIVE Studio chat panel |
| Scene layout | Keep game readable in vertical canvas; camera secondary; avoid covering action with overlays |
| Strengths | No stream key needed; platform-native gifts/chat; fastest PC start |
| Limitations | Fewer advanced filters/routing options than OBS; UI and capture options change — version-aware screenshots required |
| Common failures | Wrong capture target; mic device wrong after replug; system audio missing or doubled; vertical crop hiding HUD; GPU overload from game + Studio |
| Appropriate user | Beginners and intermediate PC gamers without stream-key access |
| OBS route | Not used |
| TikTok LIVE Studio route | Primary |
| No-stream-key route | Yes (native) |
| Stream-key route | N/A for this path |

---

## 2. OBS with TikTok stream key

| Field | Detail |
|--------|--------|
| Signal / source flow | Game/Window/Display Capture (+ camera, overlays, browser sources) → OBS encoder → TikTok RTMP server URL + stream key |
| Required categories | OBS Studio; valid TikTok stream credentials when eligible; mic; optional webcam; encoder-capable GPU/CPU |
| Video path | Prefer **Game Capture** first; Window Capture fallback; Display Capture last (privacy risk) |
| Audio path | Mic via Audio Input Capture; game via Application Audio Capture / Capture Audio on source / Desktop Audio — balance in Advanced Audio Properties |
| Monitoring | OBS audio meters + headphones; confirm no double paths |
| Alerts / overlays | Browser sources (e.g. TikFinity widgets) — keep load light |
| Chat | External / dock / phone — not always native like LIVE Studio |
| Encoder | Prefer hardware encoder when stable; test; do not prescribe one universal bitrate |
| Vertical canvas | Common planning target 1080×1920 for TikTok vertical — confirm current platform guidance |
| Direct stream flow | Settings → Stream → Custom → Server + Key → Start Streaming |
| Backup plan | Known-good simple scene; if key fails/unavailable → LIVE Studio or OBS Virtual Camera path |
| Strengths | Deep scene control, filters, hotkeys, recording/replay buffer |
| Limitations | **Stream-key access is not guaranteed** and may be account-/network-dependent; eligibility can change |
| Common failures | Invalid/expired key; wrong canvas; encoder overload; Game Capture black screen; Display Capture leaking private windows |
| Appropriate user | Creators with confirmed stream-key access who need OBS depth |
| OBS route | Primary broadcast |
| TikTok LIVE Studio route | Fallback |
| No-stream-key route | Switch to §1 or §3 |
| Stream-key route | Primary when credentials valid |

**Security:** Never share stream keys. Regenerate/revoke if exposed where supported.

---

## 3. OBS Virtual Camera into TikTok LIVE Studio (critical)

| Field | Detail |
|--------|--------|
| Signal / source flow | Build program scene in OBS → **Start Virtual Camera** → In LIVE Studio add camera source = OBS Virtual Camera → Go LIVE from LIVE Studio |
| Video path | OBS program (or configured Virtual Camera output mode) → virtual webcam device → LIVE Studio |
| Audio path | **Separate from Virtual Camera.** Select mic / interface / virtual cable in LIVE Studio. OBS Virtual Camera normally provides **video only**, not a complete mixed-audio bus |
| Preventing double audio | Do not also send desktop speakers into the mic; if using virtual cable from OBS monitor, do not also capture the same sources again in LIVE Studio |
| Sync | Align mic latency and game audio; use monitoring to catch drift |
| Overlays / scene changes | Change scenes in OBS; LIVE Studio sees the virtual camera feed |
| Recovery | Restart Virtual Camera; open OBS before LIVE Studio; check permissions; confirm device list; fallback to LIVE Studio native capture |
| Strengths | OBS scene craft + LIVE Studio broadcast without stream key |
| Weaknesses | Two apps to manage; audio routing mistakes common; Virtual Camera detection issues |
| Common failures | VC not listed; black/frozen feed; video OK but silent stream; double game audio; NDI/device conflicts |
| Appropriate user | Creators who want OBS production without stream-key access |
| OBS route | Production / Virtual Camera |
| TikTok LIVE Studio route | Broadcast host |
| No-stream-key route | Primary purpose of this path |
| Stream-key route | Optional alternate (not required here) |

**Wording:** This is a legitimate production-source workflow inside LIVE Studio where supported — **not** a bypass of platform eligibility rules.

---

## 4. Single-PC OBS gaming

| Field | Detail |
|--------|--------|
| Signal / source flow | Same PC runs game + OBS (+ optional LIVE Studio Virtual Camera host) |
| Load factors | Game GPU/CPU + OBS render/encode + browser sources/alerts |
| Encoder | Prefer GPU encoder when available and stable; watch encoding lag |
| Stability tactics | Cap in-game FPS; lower extras before lowering clarity blindly; reduce browser-source/alert load; test before LIVE |
| Monitoring | OBS stats (dropped frames, rendering lag, encoding lag) |
| Strengths | One machine; lower cost; most creators start here |
| Weaknesses | Competitive titles + heavy overlays can overload |
| Common failures | Encoder overload; stuttering game; browser-source spikes; thermal throttling |
| Appropriate user | Most PC gaming creators |
| OBS / LIVE Studio / key routes | Works with §2 or §3; LIVE Studio-only is also single-PC (§1) |

---

## 5. Dual-PC gaming

| Field | Detail |
|--------|--------|
| Signal / source flow | Gaming PC → capture card (or equivalent clean feed) → Streaming PC (OBS/LIVE Studio) → TikTok |
| Audio path | Mic usually on streaming PC; game audio via capture; Discord may need careful routing |
| Monitoring | Streaming PC headphones; confirm sync between game picture and mic |
| Trade-offs | Better load isolation; higher cost/complexity; more failure points |
| Who needs this | Creators hitting persistent single-PC encoder/game conflict after optimization — **not most creators** |
| Strengths | Isolates game performance from encode load |
| Weaknesses | Capture latency; cable/USB bandwidth; audio sync; setup time |
| Common failures | Capture not detected; HDMI/HDCP issues; one-sided audio; desync |
| Do not present as necessary | Default teaching path remains single-PC |

---

## 6. Console + capture card

| Field | Detail |
|--------|--------|
| Signal / source flow | Console HDMI out → capture card HDMI in → USB/PCIe to PC → OBS Video Capture Device **or** LIVE Studio capture card / camera-style device → optional HDMI passthrough to display |
| Consoles | Teach Xbox-style / PlayStation-style / Switch-style as workflow families; use platform-neutral language unless a distinction is educationally necessary |
| Headset / party chat | Often the hard part: console chat may stay in headset and not reach capture — may need chat-link-style or audio-extractor approaches |
| Latency | Capture adds delay; competitive feel vs viewer feed differ |
| Protected output | HDCP/protected-output can block capture on some titles/devices — diagnose honestly |
| Privacy | Hide friend lists, private messages, party invites, account emails |
| Strengths | Clean console picture on TikTok vertical |
| Weaknesses | Party-chat routing; passthrough setup; HDCP; extra hardware |
| Common failures | No video; no game audio; chat missing; passthrough black screen; wrong resolution/FPS |
| OBS route | Video Capture Device + audio from card |
| LIVE Studio route | Capture card source (per current TikTok help) + audio capture modes |
| Stream-key / no-key | Either broadcast host (§1–§3) |

---

## 7. Mobile gaming

| Field | Detail |
|--------|--------|
| Native path | TikTok mobile LIVE while playing (where supported) — simplest |
| Mirror path | USB or wireless screen mirror → PC → OBS/LIVE Studio |
| Capture path | Device display into OBS via mirror/capture tool |
| Risks | Heat, battery drain, notification leaks, orientation mismatch, wireless latency, unstable internet |
| Audio | Phone mic vs headset vs PC mic when mirrored |
| Privacy | Disable previews of private notifications; clear lock-screen content |
| Strengths | Low barrier; mobile-first games |
| Weaknesses | Thermal limits; less production control; mirror flakiness |
| Common failures | Mirror disconnect; overheating; wrong orientation; exposed DMs; mic too quiet vs game |
| Appropriate user | Mobile-first creators; beginners testing formats |

---

## 8. Beginner setup (recommended default)

| Field | Detail |
|--------|--------|
| Shape | One PC **or** one console+simple capture **or** mobile-native; one mic/headset; camera optional |
| Software | TikTok LIVE Studio **or** simple OBS workflow — not both on night one |
| Avoid | Soundboard overload, alert spam, dual-PC, complex virtual cable graphs |
| Goal | Stable picture + clear mic + readable game + basic commentary |
| Appropriate user | First 30 days of gaming LIVE |

---

## 9. Intermediate setup

| Field | Detail |
|--------|--------|
| Add | Separate mic, webcam, OBS scenes (or richer LIVE Studio scenes), basic alerts, TikFinity or equivalent (verified), simple soundboard, better audio control, replay recording, backup scene |
| Discipline | Cooldowns, volume caps, one backup scene, test mode before LIVE |
| Appropriate user | Creators with a stable beginner setup who need engagement tools |

---

## 10. Advanced setup

| Field | Detail |
|--------|--------|
| Add | Multi-camera, dual-PC **only if justified**, advanced audio routing, capture card, Stream Deck-style controls, soundboard categories, TikFinity automation with queues/cooldowns, redundant recording, backup internet, scene macros, advanced moderation workflow |
| Rule | Stability and clarity beat flashy overload |
| Appropriate user | Creators who already pass reliability checks and need scale — not beginners |

---

## Cross-cutting comparison

| Setup | Stream key needed? | OBS role | LIVE Studio role | Typical failure |
|-------|--------------------|----------|------------------|-----------------|
| LIVE Studio only | No | None | Broadcast + capture | Wrong device / crop |
| OBS + key | Yes (if eligible) | Broadcast | Optional fallback | Key/eligibility |
| OBS VC → LIVE Studio | No | Production video | Broadcast | Silent audio / VC missing |
| Single-PC | Depends on host path | Often both roles | Often host | Overload |
| Dual-PC | Depends on host path | Streaming PC | Streaming PC option | Sync / capture |
| Console + card | Depends on host path | Capture host | Capture host | Party chat |
| Mobile | Usually no (app) | Optional mirror host | Optional | Heat / notifications |

---

## Capstone mapping rule

Every Signature Gaming LIVE Show dossier must state:

1. Primary setup row from this matrix  
2. Broadcast host (LIVE Studio / OBS+key / hybrid VC)  
3. Stream-key status: available / unavailable / not used  
4. Audio-routing map  
5. Known-good fallback scene or path  
