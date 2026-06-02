# asolaria-whiteroom-engine

The **white-room engine** — **LEG-1** of the Asolaria multi-substrate fabric: the
**scorer**. A pluggable-store, pluggable-scorer, **never-delete** room engine that
emits a Brown-Hilbert address, opens a white-room, scores it, keeps genius /
**compacts** (never deletes) mistakes, and seals an append-only HBP row.

Local, deterministic, dependency-free. Runs on Node — no cloud, no account, no gate.

## The four legs

| Leg | What | This repo |
|-----|------|-----------|
| **LEG-1** | **white-room engine** — the **scorer** (pluggable store + scorer, never-delete) | ✅ here |
| LEG-2 | prime-sector **allocator** — the address: `BH.SECTOR.P{prime}.R{room:07d}.{sha16}` | replicated here (`liris-sector-emitter.mjs`) for byte-convergence |
| LEG-3 | github **bus** — commit = emit, log = read | sibling repo |
| LEG-4 | **`GoogleDriveStore`** — the 35 TB cloud sink | [`35-TB-google-AI-Ultra-migration`](https://github.com/JesseBrown1980/35-TB-google-AI-Ultra-migration) |

## The store interface (drop-in backends)

```
put(pid, value) · get(pid) · scanByPID(pred) · compact(pid)    // compact = MOVE to compacted, NEVER delete
```

Backends ship here: `MemoryStore` (real-now) and `RedisCloudStore` (a gated stub
that throws until a connection string loads **by role**, never inlined). LEG-4's
`GoogleDriveStore` is the same interface, backed by the 35 TB Drive.

The scorer is equally pluggable: `DeterministicScorer` (offline, testable) and
`L0GnnScorer` (live wiring to a local GNN server). The default scorer is an
honest **placeholder** (address-derived) — the real domain scorer scores the work.

## Run

```bash
node --test                                   # 11/11: engine 7/7 + sector 4/4
node liris-whiteroom-engine.mjs               # smoke: spin 12 rooms, seal HBP rows
node liris-sector-flywheel.mjs 0 5000 5000    # fill prime-sector 0, 5000 rooms, batched seal
node liris-flywheel-run.mjs 3000 1            # omniflywheel scale run
```

## Files

- `liris-whiteroom-engine.mjs` (+`.test.mjs`) — the engine: emitters, stores, scorers, the tick/spin loop.
- `liris-sector-emitter.mjs` (+`.test.mjs`) — LEG-2 address replication (`globalRoomAddress`), byte-converged 3-vantage.
- `liris-sector-flywheel.mjs` — proves every room PID == `globalRoomAddress(S, room)` (fills the allocated sector exactly).
- `liris-flywheel-run.mjs` — omniflywheel scale + HDD-as-RAM page persistence.
- `liris-hilbert.mjs` — standard Hilbert d→(x,y) projection (bh3d cube completion).

## Security — bring your own keys

- **No credentials, keys, tokens, or vault material live in this repo. Ever.**
  The `.gitignore` blocks every common secret pattern as a backstop, and CI runs a
  no-secret-values scan on every push.
- Each node **joins by minting its own identity locally** — the private key never
  leaves the machine that made it. Publish only the public half.

  ```bash
  # generate this node's ed25519 identity — the PRIVATE key never leaves this machine:
  ssh-keygen -t ed25519 -f ./asolaria-node.key -N ""
  # register ONLY asolaria-node.key.pub with the federation cosign chain.
  ```

  That is the whole model: asymmetric crypto works precisely *because* the private
  half is never shared. No human ever holds another human's private key.

## Part of

The broader Asolaria multi-substrate project. Companion public repos:
`35-TB-google-AI-Ultra-migration`, `bigpickle-rebuild`, `asolaria-behcs-256`,
`asolaria-federation-1024`.

## License

Operator's choice — add a `LICENSE` file before wide distribution (MIT / Apache-2.0
are common for this kind of work).
