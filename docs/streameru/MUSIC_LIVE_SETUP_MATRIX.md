# Music LIVE Setup Matrix (Internal Curriculum Reference)

**Status:** Internal production reference for Music LIVE Mastery (MU-02 + Capstone)  
**Last reviewed:** July 2026  
**Rule:** Teach principles and signal flow — not brand shopping guides.

---

## How to use

- MU-02 uses this matrix for setup categories and failure points.
- Capstone dossiers should map the creator’s real setup to one row (or a hybrid noted explicitly).
- OBS and TikTok LIVE Studio paths are **not identical** — document which path the creator uses.

---

## Beginner setups

### B1 — One vocal mic → USB interface
| Field | Detail |
|--------|--------|
| Signal flow | Dynamic/condenser mic → XLR → interface preamp → USB → computer → OBS or LIVE Studio |
| Connections | XLR; USB to PC; headphones from interface |
| Monitoring | Hardware direct monitor preferred |
| OBS path | Audio Input Capture = interface (or default mic device if single stereo mix) |
| TikTok LIVE Studio path | Select interface/mic in Audio mixer Microphone dropdown |
| Likely failures | Phantom off for condensers; gain too low/high; wrong Windows default device |
| Trade-offs | Simple, clean vocals; limited multi-instrument |
| Appropriate for | Solo singers, acoustic hosts starting out |

### B2 — Guitar + vocal (2-input interface)
| Field | Detail |
|--------|--------|
| Signal flow | Vocal XLR → In 1; guitar Hi-Z/1/4" → In 2 → USB mix or separate channels → stream app |
| Connections | XLR + instrument/Hi-Z; DI if needed for longer runs |
| Monitoring | Interface mix (vocal + guitar) in headphones |
| OBS path | Prefer two Audio Input Captures if channels exposed; else stereo mix from interface |
| TikTok LIVE Studio path | Often one device presenting the stereo mix — balance on interface first |
| Likely failures | Guitar clipping; vocal buried; no Hi-Z used; phase/bleed |
| Trade-offs | Two sources without a mixer; stereo imaging limited |
| Appropriate for | Singer-songwriters |

### B3 — Keyboard → interface (stereo)
| Field | Detail |
|--------|--------|
| Signal flow | Keyboard L/R line outs → interface line inputs → USB |
| Connections | 1/4" TS/TRS line; avoid mic-level pads incorrectly |
| Monitoring | Interface headphones |
| OBS path | Stereo Audio Input Capture; confirm L/R not missing |
| TikTok LIVE Studio path | Stereo device selection; verify both sides |
| Likely failures | Mono on one side; line vs instrument mismatch; level too quiet |
| Trade-offs | Clean keys; needs care with stereo |
| Appropriate for | Piano/synth performers |

### B4 — USB mic + backing track
| Field | Detail |
|--------|--------|
| Signal flow | USB mic → PC; backing via media player/DAW → virtual cable or interface loopback → stream |
| Connections | USB mic; software routing for tracks |
| Monitoring | Headphones; avoid speakers into mic |
| OBS path | Mic source + Media Source or Application Audio Capture for tracks; watch double audio |
| TikTok LIVE Studio path | Mic + application audio selection (selecting an app may mute others — per LIVE Studio FAQ) |
| Likely failures | Double capture; backing louder than vocal; Bluetooth latency |
| Trade-offs | Fast start; routing complexity grows quickly |
| Appropriate for | Karaoke-style / track singers |

### B5 — Phone-only acoustic
| Field | Detail |
|--------|--------|
| Signal flow | Voice/instrument acoustic → phone mic → TikTok app LIVE |
| Connections | None / optional wired headset mic |
| Monitoring | Earbuds (wired preferred) |
| OBS path | N/A (mobile) |
| TikTok LIVE Studio path | N/A — mobile app |
| Likely failures | Room noise; plosives; no separate track balance |
| Trade-offs | Lowest friction; least control |
| Appropriate for | Absolute beginners testing formats |

### B6 — Simple analog mixer → computer
| Field | Detail |
|--------|--------|
| Signal flow | Mics/instruments → mixer → USB or main out into interface → PC |
| Connections | XLR/1/4"; mixer USB or 2-track into interface |
| Monitoring | Mixer headphone out |
| OBS path | Capture mixer USB / interface stereo mix |
| TikTok LIVE Studio path | Same device as stereo program mix |
| Likely failures | Main out also feeding speakers into mics; wrong USB mode |
| Trade-offs | Easy multi-source pre-mix; less per-source OBS control |
| Appropriate for | Small multi-input beginners |

### B7 — TikTok LIVE Studio + one interface
| Field | Detail |
|--------|--------|
| Signal flow | Sources → interface mix → LIVE Studio mic/device |
| Connections | As B1–B3 |
| Monitoring | Interface direct |
| OBS path | Not used |
| TikTok LIVE Studio path | Primary — fewer filters than OBS; pre-mix on hardware |
| Likely failures | Duplicate desktop audio; wrong device after replug |
| Trade-offs | Platform-native; less granular FX |
| Appropriate for | Musicians staying inside TikTok tooling |

---

## Intermediate setups

### I1 — Vocal + guitar + backing track
Pre-balance on interface/mixer; separate OBS sources when possible; ducking only after clean gains. Failures: track overpowers vocal; double audio from speakers.

### I2 — Keyboard stereo + vocal
Preserve stereo keys; vocal centered; watch sample-rate match (prefer 48 kHz chain-wide).

### I3 — Electronic drums + vocal
E-drums module line/USB → interface; vocal separate; control kit velocity/volume before stream compression.

### I4 — Small band through mixer
Multiple XLR/DI → mixer → USB stereo to PC; cue mixes for performers; label channels.

### I5 — DJ controller + microphone
Controller USB/output + vocal mic; avoid feeding booth speakers into mic; rights-aware track choices.

### I6 — OBS with multiple audio sources
Vocal / instrument / backing as separate sources; Advanced Audio Properties; Monitor Off for performers using hardware monitoring.

### I7 — Separate monitor mix
Aux/headphone mix ≠ stream mix; prevents performers needing the delayed stream feed.

### I8 — Multi-camera music stream
Cameras for wide + instrument detail; audio clock from one interface; scene switches without audio resets.

---

## Advanced setups

### A1 — Full band + digital mixer
Digital mixer USB/multitrack or stereo program; scene recalls; aux monitor mixes; redundant recording.

### A2 — Multiple vocalists
Individual mics, bleed control, who-sings plan; shared gain discipline.

### A3 — Multi-instrument routing
DI + mic blends; stereo stems; documented patch bay.

### A4 — Auxiliary monitor mixes
Each performer hears what they need without raising stage/volume into mics.

### A5 — Loopback
Interface/software loopback for DAW/backing into stream without speakers; watch echo.

### A6 — DAW / software instruments
Low-buffer monitoring for performer; stream gets stable mix; ASIO/loopback as platform allows.

### A7 — Advanced OBS scenes
Talk / perform / collab scenes; backup scenes; media + browser sources; multitrack record when useful.

### A8 — Redundant recording + backup audio path
Local record + secondary USB path or phone backup; issue log for Capstone.

### A9 — Synchronized multi-camera production
Genlock not required for most creators — prioritize audio sync offset and consistent frame rates.

---

## Common failure quick map

| Symptom | Check first |
|---------|-------------|
| Interface visible, no audio | Gain, mute, pad, cable, correct channels |
| Mic quiet / clipping | Gain staging at source before filters |
| Guitar clipping | Hi-Z/DI, pad, input type |
| Backing > vocal | Balance before going LIVE; separate faders |
| Echo / double audio | Duplicate capture paths; speakers |
| Latency | Sample rate, buffer, Bluetooth, software monitoring |
| Mono one-side | Stereo routing / pan |
| Meters move, viewers silent | Streaming app source not selected / muted for output |
| Hum | Ground lift on DI, cable quality, power noise |
| Drift on long sessions | Matched sample rates; restart devices if needed |

---

## Platform note

- **OBS (Last reviewed July 2026):** Deep per-source filters, Advanced Audio Properties, sync offset, scenes.
- **TikTok LIVE Studio (Last reviewed July 2026):** Audio mixer, device selection, application audio selection, noise suppression; fewer pro filter chains — pre-mix recommended for musicians.
- UI screenshots need admin refresh when vendors change layouts.
