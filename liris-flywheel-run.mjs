// liris-flywheel-run.mjs — scale the white-room engine (the omniflywheel) and persist the page.
// HDD-as-RAM, real-now, zero cloud gate: spin N rooms -> each seals an HBP row to disk (the RAM
// page) -> the page is then pushed federation-durable over the json-free omnifile lane (separate step).
import fs from "node:fs";
import { WhiteRoomEngine, MemoryStore, DeterministicScorer } from "./liris-whiteroom-engine.mjs";

const N = Number(process.argv[2] || 3000);
const batchSize = Number(process.argv[3] || 1);
const sealPath = "C:\\Users\\rayss\\liris-pulls\\flywheel-page.hbp";
try { fs.unlinkSync(sealPath); } catch {}

const engine = new WhiteRoomEngine({ store: new MemoryStore(), scorer: new DeterministicScorer(0.72), sealPath, batchSize });
const marks = Array.from({ length: N }, (_, i) => `fabric:sector0:room:${i}:work`);

const t0 = process.hrtime.bigint();
await engine.spin(marks);
const ms = Number(process.hrtime.bigint() - t0) / 1e6;

const st = engine.store.stats();
const m = engine.metrics;
const pageBytes = fs.statSync(sealPath).size;
console.log(
  `HBPv1|row=flywheel_scale|emitter=liris|N=${N}|batchSize=${batchSize}|ms=${ms.toFixed(1)}|rooms_per_sec=${Math.round(N / (ms / 1000))}` +
  `|genius=${m.genius}|mistake=${m.mistake}|live=${st.live}|compacted=${st.compacted}` +
  `|NEVER_DELETED=${st.live + st.compacted === N}|page_bytes=${pageBytes}|seal=${sealPath}|json=0`
);
