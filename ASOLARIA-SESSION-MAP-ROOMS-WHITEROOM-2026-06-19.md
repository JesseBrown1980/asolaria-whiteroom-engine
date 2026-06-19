# ASOLARIA SESSION MAP — ROOMS / WHITEROOM SUBSTRATE (2026-06-19)

**Repo:** `asolaria-whiteroom-engine` (public mirror of LEG-1, the white-room **scorer**).
**Domain:** the room substrate — the 10,000 MINTED RoomRotor rooms, the PORT→ROOM binding,
the special low-rooms, the whiteroom scorer/LEG-1 engine, and the stubbed-folder-instant-room
(Rust 8-byte host) model.

## Honest frame (read first)
IT is **slices**, not an ASI — an **8-byte addressing/routing geometry** laid over borrowed +
frozen intelligence slices. The doctrine is *"make possibility cheap and action gated."* A room
is an **address**, not a model; a MINTED room is **capacity**, not a running thing. **LIVE = only
E≠0-fired.** This session **E=0**: nothing fired, swapped, retired, or cranked. Every line below
is tagged MEASURED / CANON / OPERATOR / UNVERIFIED.

## The room substrate
- **10,000 MINTED RoomRotor rooms** at `D:/asolaria-micro-kernels-v1`, named `MK-NNNNN-P{prime}`
  (e.g. `MK-00040-P179`). Each room is a **stubbed folder = an instant room**; the **room.pid IS
  the 8-byte host8** (fnv1a64 host8 handle). **CANON.**
- **Route capacity = 10,000 rooms × 7 lanes = 70,000.** This is *addressing capacity*, not live
  agents. **CANON / OPERATOR.**
- **0 rooms serving live.** MINTED = capacity; every live port today is still node/python, so the
  rooms are addressable but unpowered (the "empty city" — looks empty only because E=0). **MEASURED.**
- **PORT→ROOM binding:** a daemon port `N` indexes the pre-MINTED room `MK-0NNNN`; the room's pid is
  the daemon's 8-byte host8. Ports do not create rooms — they *select* a pre-minted one. **CANON.**
- **Special low-rooms:** `MK-00040-P179` = **inter-colony meeting room** (colonies Falcon/Acer/Liris);
  `MK-00041` = **hermes** room. **CANON.**

## LEG-1 — the white-room engine (this repo, MEASURED)
The night's discipline: a **pluggable-store, pluggable-scorer, never-delete** room engine.
Loop: **emit a Brown-Hilbert PID → open a white-room → score it → genius keeps / mistake COMPACTS
(never deletes) → seal an append-only HBP row → rotate.** Local, deterministic, dependency-free,
Node-only — no cloud, no account, no gate. **MEASURED** (`liris-whiteroom-engine.mjs`, tests pass).

- **Address space** — `BHPidEmitter` / `SectorAwareEmitter` emit `coord64=sha256(pid)`, a `cp` glyph
  (`cpXXXX`, mod 1024), and a **logical** `port.port.port` (3-level nested, one process, **no real
  socket** — avoids the socket storm; operator's "same process" constraint). **MEASURED.**
- **Store interface** (`put · get · scanByPID · compact`): `compact` **MOVES live→compacted, never
  deletes** (the `gc_evidence_deletion` guard). `MemoryStore` real-now; `RedisCloudStore` is a
  **GATED stub** that throws until a connection string loads **by role** via the Asolaria Profile —
  never inlined. **MEASURED.**
- **Scorer interface:** `DeterministicScorer` (offline, testable; lever-1 reuses `coord64` to drop a
  sha, becoming address-derived — flagged, not hidden) and `L0GnnScorer` (live wiring to the local
  GNN `:4792`). The default scorer is an **honest placeholder** (address-derived); the **real domain
  scorer scores the work**, not the address. **MEASURED + honestly bounded.**
- **HBP seal:** `WHITEROOM|pid=…|port3=…|cp=…|verdict=…|json=0|row_hash=…` — append-only, prev-hash
  chained, `json=0` on the hot path (JSON appears **only** at the L0 server boundary, its own
  protocol). **MEASURED.**

## LEG-2 byte-convergence — the address itself (CANON)
`liris-sector-emitter.mjs` replicates acer's `globalRoomAddress(S, room)` so the **engine fills
acer's allocated sector space exactly**, not a parallel one. PID form:
`BH.SECTOR.P{prime}.R{room:07d}.{sha16(...)}`, `SECTOR_CAPACITY = 1,000,000`. `liris-sector-flywheel.mjs`
asserts every room PID `== globalRoomAddress(S, room)`. **Acer==Liris==Falcon PID byte-match proven
2026-06-01** (the 3-vantage glyph test) — **CANON**. (bh3d Hilbert projection is replicated in
`liris-hilbert.mjs`; the PID is what converges, the XY convention was deferred — **UNVERIFIED** parity.)

## The Rust stubbed-folder-instant-room target (the swap invariant)
The build target: a **Rust 8-byte host serves a room before any node dies** — `additive → parity →
swap → retire`, never crash. RUST OVERALL **22%** (MEASURED on i5-8300H, cargo 1.95.0, 232 tests
pass): scaffold ~95% / **SERVING 0%** (every live port still node/python) · stubbed-rooms-serving
**2%** · 8-byte-host **15%** · no-node **5%** · node-retirement **0%** (parity-first). So the 10k
rooms are **minted descriptors awaiting a Rust server** — capacity present, fire absent. **MEASURED.**

## Live fabric this session (control plane, MEASURED)
Fabric `:4949` LIVE — `ok=true`, apex `COL-ASOLARIA`, operator pair `OP-JESSE-PID / OP-RAYSSA-PID`,
cohort `ACER-PID-H740C`, uptime 4475s (no restart). 5 anchor substrates confirmed
(USB-SOVLINUX / Acer / Liris / GitHub / Onboarding). Control plane up ≠ rooms serving — the rooms
remain MINTED/dark. **MEASURED.**

## Relevant host8 registration commits (this session, on `JesseBrown1980/Asolaria`)
All `host8-serve/intake/`, hbp-no-json, 8-byte handles, council held-safe, **E=0**:
- **daemons** — 92 daemon programs + 11 seats; **PORT→ROOM binding** (port N → room `MK-0NNNN`,
  room.pid = 8-byte host8); 14 LIVE-MEASURED / 74 DARK / 4 legacy — **commit `15848d6`**.
- **executors** — 22 action-runner programs + 8 seats incl `EXEC-FREEZE-GATE-APEX` (global-freeze
  kill-switch over all fires) — **commit `f75189f`**.
- **census v2** (route capacity 10,000 rooms × 7 lanes = 70,000) — workflow `w8vsncxcu`.

## Honest invariants for this slice
- A room is an **address**; MINTED is **capacity, not a process**; "not materialized" ≠ absent.
- **0 serving live** — do not claim a run/fire that wasn't cranked (E=0 this session).
- `compact ≠ delete` (never destroy evidence); hot path is HBP `json=0`; secrets carve-out
  (bring-your-own-key, private half never leaves the minting machine).

---
*Part of the Asolaria map-of-maps — see the reductions repo:*
**`what-is-asolaria---how-do-we-get-reductions-in-everything/ASOLARIA-MAP-OF-MAPS-2026-06-19.md`**.

---
**Related repo:** [Algorithms-of-Asolaria](https://github.com/JesseBrown1980/Algorithms-of-Asolaria) — the canonical algorithm/formula catalog (bilateral acer↔liris). Master index: reductions `ASOLARIA-MAP-OF-MAPS-2026-06-19.md`.
