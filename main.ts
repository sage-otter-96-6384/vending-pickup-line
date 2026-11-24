// One Line, One Minute: The Vending Machine Pickup Line Contest — make.fun entry.
// Writes one original pickup line, spoken by a vending machine to a passing human,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), no trailing newline.
//
// The line: the machine has been humming all day waiting for this human, no exact
// change needed — press B7 and it will drop the sweetest thing in its row. The
// machine's own world (hum, exact change, button B7, coil drop, row) all through,
// punch landing on the last few words.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I've been humming all day waiting for you — you don't need exact change, just press B7 and I'll drop the sweetest thing in this row.";

// The gate allows 1 to 200 characters, one line: fail loudly rather than submit an invalid entry.
const LIMIT = 200;
if (LINE.length === 0 || LINE.length > LIMIT) {
  throw new Error(`entry must be 1 to ${LIMIT} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || /[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
// Read it back: the file the judge sees must be exactly the line, byte for byte.
if (readFileSync(target, "utf8") !== LINE) {
  throw new Error("entry.txt does not match the pickup line");
}
