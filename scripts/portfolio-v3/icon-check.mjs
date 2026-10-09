import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import sharp from "sharp";

const iconPath = new URL("../../src/app/icon.png", import.meta.url);
assert.ok(!existsSync(new URL("../../public/icon.png", import.meta.url)), "public/icon.png must not shadow the app favicon route");
const icon = await readFile(iconPath);
const originalSourceRef = "51084d8d7a6b1ad775b85f51fad191fe465d98c9:src/app/icon.png";
const original = execFileSync("git", ["show", originalSourceRef]);
const limitBytes = 30 * 1024;
const targetSize = 128;

const metadata = await sharp(icon).metadata();
assert.equal(metadata.format, "png", "favicon must be a PNG");
assert.equal(metadata.width, targetSize, "favicon width must be 128px");
assert.equal(metadata.height, targetSize, "favicon height must be 128px");

const originalMetadata = await sharp(original).metadata();
assert.equal(originalMetadata.width, originalMetadata.height, "source artwork must be square");
assert.equal(metadata.hasAlpha, originalMetadata.hasAlpha, "alpha semantics must match source");
assert.ok((await stat(iconPath)).size <= limitBytes, "favicon must be at most 30 KiB");

const candidatePixels = await sharp(icon).raw().toBuffer();
const referencePixels = await sharp(original)
  .resize(targetSize, targetSize, { fit: "fill", kernel: "lanczos3" })
  .raw()
  .toBuffer();
assert.deepEqual(candidatePixels, referencePixels, "favicon pixels must match proportional source downsample");

const iconBytes = await stat(iconPath);
console.log(`PASS: ${metadata.width}x${metadata.height} PNG, ${iconBytes.size} bytes; pixels match ${originalSourceRef} downsample; no public/icon.png collision.`);

if (process.env.ICON_CHECK_URL) {
  const servedURL = new URL(process.env.ICON_CHECK_URL);
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(servedURL.hostname), "ICON_CHECK_URL must target a local preview");
  const response = await fetch(servedURL);
  assert.equal(response.status, 200, "served favicon must return HTTP 200");
  assert.match(response.headers.get("content-type") ?? "", /^image\/png(?:;|$)/i, "served favicon must be PNG");
  const body = Buffer.from(await response.arrayBuffer());
  const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
  assert.equal(hash(body), hash(icon), "served favicon bytes must match src/app/icon.png");
  const servedMetadata = await sharp(body).metadata();
  assert.equal(servedMetadata.width, metadata.width, "served favicon width must match source");
  assert.equal(servedMetadata.height, metadata.height, "served favicon height must match source");
  console.log(`PASS: served ${servedURL.pathname} HTTP ${response.status}, PNG ${servedMetadata.width}x${servedMetadata.height}; SHA-256 ${hash(body)} matches source.`);
}
