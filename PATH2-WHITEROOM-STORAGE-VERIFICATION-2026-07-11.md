# Path 2, white-room storage, and verification — 2026-07-11

## White-room role in the exact-recovery chain

The white room is the durable curation boundary after semantic scoring:

```text
candidate result
  -> Hookwall / GNN / Fischer / Shannon
  -> white-room score
  -> GENIUS: keep
  -> MISTAKE: compact and preserve
  -> append-only HBP receipt
  -> cube/storage sink
```

Path 1 and Path 2 define how a kept or compacted object can later be recovered exactly.

## Path 1 — retained-store recall

The white-room store already contains the object. A small authenticated content address selects it:

```text
recover(address, store) = object iff object exists and hash matches
```

A missing object remains held; the address never invents bytes.

## Path 2 — distributed no-store recovery

A bounded object block can be split into pairwise-coprime cylinder residues:

```text
S_i = X mod p_i
```

A selected set reconstructs exactly only when:

```text
product(p_i) >= source_range
```

Insufficient capacity is held. Extra selected residues are consistency checks.

## DBBH→DBWH white-side proof

The name “white hole” is earned by readback, not metaphor:

```text
black projection P(X)
  -> recover candidate R(P(X))
  -> white projection P(R(P(X)))
  -> require P(R(P(X))) = P(X)
```

The implementation compares SHA, complete cylinder shadows, and frequency shells. Any mismatch is
held before a verified clone is emitted.

This is the same inverse-check shape as:

```text
N-Nest: reported == recomputed_truth
white-room seal/readback: stored/decoded == recomputed signature
```

## Never-delete and storage-backed operation

`compact(pid)` moves an object into a compacted state rather than deleting it. This allows HDD/SSD
or cloud storage to hold:

- full genius bodies;
- compacted mistakes and proof receipts;
- cube addresses and manifests;
- Path-1 retained bodies;
- Path-2 distributed shadows;
- GNN edge evidence and model checkpoints;
- HBP/HBI/SHA/HEX sidecars.

RAM contains only the rooms and batches currently being scored. GPU/accelerator hardware is needed
only for the neural scorers that genuinely use it; deterministic scoring, addressing, compaction,
CRT recovery, receipts, and readback can run on CPU/storage machines.

This is why HDD-as-RAM page persistence is meaningful: disk is the durable memory tier. It is not a
claim that disk performs neural matrix multiplication.

## Pre-Asolaria GNN origin

The optional `L0GnnScorer` connects to a lineage beginning in Jesse's AI healthcare assistant.
Four healthcare model files match the later Asolaria sidecar byte-for-byte. BigPickle and Hookwall
later compose those sidecars with G1/G2/G3/G4, OmniShannon, deterministic fallback, and Fischer.

The white room consumes their semantic evidence but preserves a deterministic store/receipt boundary.

## Independent verification

### Claude Fable 5 — operator-supplied real third seat

```text
dbbh-coms-quant-prism       rustc 1.97   19/19 green
path2-two-shadow-recovery   rustc 1.97   30/30 green
```

### GPT-5.6 Pro — audit and independent CI execution

GPT-5.6 Pro audited both recovery crates, Q-PRISM, healthcare GNNs, BigPickle/Fischer, trained GNNs,
Hookwall/Shannon, white-room source/tests, cube mint, Dispatcher, HyperHermes, reductions,
algorithms, HyperBEHCS, and N-Nest.

GPT-authored Rust 1.97.0 workflows completed successfully:

```text
Path 1      run 29134408321   exact 19-test assertion PASS
Path 2      run 29134413119   exact 30-test assertion PASS
Q-PRISM 3D run 29134419389   all targets PASS
```

## Claim ledger

- `MEASURED`: white-room keep/compact/receipt source and tests; Path-1/Path-2 recovery and DBWH
  watcher tests; exact BEHCS rung.
- `MEASURED_CLAUDE_FABLE5_THIRD_SEAT`: supplied Rust results.
- `MEASURED_GPT_DIRECTED_GITHUB_ACTIONS`: successful independent Rust CI.
- `AUDITED_GPT_5_6_PRO`: complete cross-repository audit.
- `BOUNDARY`: default deterministic scorer is a placeholder; GNN scorer is a sidecar; disk is a
  durable state tier, not a neural arithmetic engine.
- `UNVERIFIED`: one live two-fabric white-room Path-2 recovery across physical Hilbra poles.
