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

## Prism/Comb 0-loss (2026-07-01) — quarantine rooms and the two-regimes law

*Campaign `acer/prism-comb-0loss-2026-07-01` · E=0 docs-only: this section describes, nothing fires.*

White rooms are **quarantine rooms**: regions where collisions are deliberately
**CAUSED** (interference-as-search — spin many rooms, let candidates collide, keep
genius, compact the rest) — held strictly separate from the **exec lanes**, where
collisions are avoided by construction. One fabric, two directions of one bijection:

- **forward = comb (exec lanes)** — the room address
  `BH.SECTOR.P{prime}.R{room:07d}.{sha16}` runs the avoidance regime: pairwise-coprime
  prime sectors are CRT lanes (`ℤ_M ≅ ℤ_{m₁} × … × ℤ_{m_k}`), mutually collision-proof
  forward and losslessly reassemblable backward. [CANON]
- **backward = prism (white rooms)** — scoring runs the search regime, and quarantine
  is the wall between the regimes: a CAUSE-side cascade cannot leak into an AVOID-side
  lane because they occupy disjoint residue lanes of the same integer. [CANON]

Why **never-delete** is this repo's copy of the 0-loss law: `compact = MOVE to
compacted, NEVER delete` is a bijective re-relation, and entropy is invariant under
bijection (`H(f(X)) = H(X)`) — the engine re-relates room outcomes with 0 loss and
never claims compression below Shannon's bound (`E[bits] ≥ H(X)`). The `sha16` tail
of every room address is the honest form of that bound: a 64-bit **coordinate against
the content-addressed store** (`H(content | store) = 0`) — infinite *addressing*
capacity, never lossless infinite *compression*; birthday bound `≈ M²/2⁶⁵`. [CANON]

Scope, tagged per the claims-gate:
- **MEASURED** — the 256↔1024 transcode rung (Q-PRISM commit `53023b6`: round-trip
  `transcode₁₀₂₄→₂₅₆ ∘ transcode₂₅₆→₁₀₂₄ = id`, sha256-identical, Rust==Python; also
  `79e8d63`, `de00aca`). Local to this repo: `node --test` = 14/14 pass (2026-07-01
  local run), including the sector-flywheel invariant room PID ==
  `globalRoomAddress(S, room)`.
- **CANON frame** — the 43+ level ladder as a groupoid (`T_ji ∘ T_ij = id`,
  `T_jk ∘ T_ij = T_ik`); each further rung earns MEASURED only by its own round-trip proof.
- **UNVERIFIED / gated** — any *materialized* expansion of room space (slice-deepening
  à la `bh_inject_between`) stays operator-gated; E=0 here.

Cross-links: waves-cascades (the CAUSE/AVOID duality this section instantiates),
what-is-asolaria-reductions (addressing-not-compression boundary), N-Nest (integrity
dual: `reported == recomputed`), Metatagging (Brown & Fedotov digital-physics grounding).

## Part of

The broader Asolaria multi-substrate project. Companion public repos:
`35-TB-google-AI-Ultra-migration`, `bigpickle-rebuild`, `asolaria-behcs-256`,
`asolaria-federation-1024`.

## License

Operator's choice — add a `LICENSE` file before wide distribution (MIT / Apache-2.0
are common for this kind of work).
