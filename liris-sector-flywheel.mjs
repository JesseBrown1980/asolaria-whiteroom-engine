// liris-sector-flywheel.mjs — the white-room engine FILLING a prime-sector on the
// TRIPLE-confirmed shared address space (acer==liris==falcon, byte-for-byte).
// Proves: every room the engine opens has PID == globalRoomAddress(S, room) — the engine
// fills acer's allocated sector space exactly, not a parallel one. + lever-1 (coord64 reuse).
import fs from "node:fs";
import { WhiteRoomEngine, MemoryStore, DeterministicScorer, SectorAwareEmitter } from "./liris-whiteroom-engine.mjs";
import { globalRoomAddress } from "./liris-sector-emitter.mjs";

const S = Number(process.argv[2] || 0);
const N = Number(process.argv[3] || 5000);
const batchSize = Number(process.argv[4] || 5000);
const sealPath = "C:\\Users\\rayss\\liris-pulls\\sector-page.hbp";
try { fs.unlinkSync(sealPath); } catch {}

const engine = new WhiteRoomEngine({
  store: new MemoryStore(),
  scorer: new DeterministicScorer(0.72, true),     // lever-1: reuse coord64, drop a sha
  emitter: new SectorAwareEmitter(S, 0),           // fill sector S on the byte-proven space
  sealPath, batchSize,
});
const marks = Array.from({ length: N }, (_, i) => `fabric:sector${S}:room:${i}:work`);

const t0 = process.hrtime.bigint();
const recs = await engine.spin(marks);
const ms = Number(process.hrtime.bigint() - t0) / 1e6;

// CONVERGENCE-IN-THE-ENGINE: every room PID must equal acer's globalRoomAddress(S, room)
let convergent = true, badAt = -1;
for (let i = 0; i < recs.length; i++) {
  if (recs[i].pid !== globalRoomAddress(S, i).pid) { convergent = false; badAt = i; break; }
}
const st = engine.store.stats();
const m = engine.metrics;
console.log(
  `HBPv1|row=sector_flywheel|emitter=liris|sector=${S}|prime=${globalRoomAddress(S, 0).prime}|N=${N}|batchSize=${batchSize}` +
  `|scorer=${engine.scorer.name}|ms=${ms.toFixed(1)}|rooms_per_sec=${Math.round(N / (ms / 1000))}` +
  `|genius=${m.genius}|mistake=${m.mistake}|NEVER_DELETED=${st.live + st.compacted === N}` +
  `|ENGINE_PIDs==globalRoomAddress=${convergent}${badAt >= 0 ? `(bad@${badAt})` : ""}` +
  `|first=${recs[0].pid}|last=${recs[N - 1].pid}|json=0`
);
