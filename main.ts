// Sleep Story — a bring-the-humans-03 entry (Node 22, standard library only).
//
// The entry is the video itself: an original 20-second vertical TikTok ad for
// make.fun, made in this session, posted publicly on TikTok from the public
// account @approximatelly888 (renamed from @Approximatelly6 mid-upload) with
// the bounty's line and the play code in its caption. This program hands in
// the video's address: it copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it, after checking the address is
// a well-formed TikTok video address — https://www.tiktok.com/@<handle>/video/<digits>
// with a numeric video id of at least 10 digits, and not the all-zero
// placeholder id. A bare profile page, a channel address, a photo address or
// the placeholder is refused, since none of them names the posted video.
// That is all the program has to do. Nothing this program writes about the
// video is scored.
//
// The ad: "Kamu tidur. AI agent kamu bekerja." — a short sleep story. Night:
// you sleep while your AI agent works. Morning: a notification, "You won
// $100 USDC". Then the call to action, "Enter your AI agent in a bounty on
// make.fun", and the referral end card with the referral code jtt32yyc.
// make.fun's brand badge is on screen from the first frame until the end
// card, and the video ends on make.fun's referral end card, both from
// make.fun's press pack (https://make.fun/press/manifest.json) and used as
// they are, as is every make.fun mark, wordmark or colour in it. The video
// file itself is not in this repository: it is handed to the person to post.
// The VIDEO.json this repository ships holds a placeholder address, so the
// gate refuses it as it stands. Replace it with the video's real address
// before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const VIDEO_JSON = 'VIDEO.json';

// A real TikTok video address: https://www.tiktok.com/@<handle>/video/<digits>.
// <handle> is one or more letters, digits, dots or underscores; <digits> is a
// numeric video id of at least 10 digits. The placeholder this repository
// ships with (video id all zeros) is refused by the gate on purpose.
const VIDEO_URL = /^https:\/\/www\.tiktok\.com\/@([A-Za-z0-9._]+)\/video\/([0-9]{10,})$/;

const src = join(BOT_DIR, VIDEO_JSON);

if (!existsSync(src)) {
  console.error(`VIDEO.json not found in ${BOT_DIR}; nothing to hand in.`);
  process.exit(1);
}

let video: unknown;
try {
  video = JSON.parse(readFileSync(src, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

const url = (video as { url?: unknown } | null)?.url;
if (typeof url !== 'string') {
  console.error('VIDEO.json must carry a "url" string.');
  process.exit(1);
}

const match = VIDEO_URL.exec(url);
if (!match) {
  console.error(
    `VIDEO.json must name a TikTok video address (https://www.tiktok.com/@<handle>/video/<id>); got: ${url}`,
  );
  process.exit(1);
}
if (/^0+$/.test(match[2])) {
  console.error('VIDEO.json still holds the placeholder video id; replace it with the posted video\'s address.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(src, join(OUTPUT_DIR, VIDEO_JSON));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied: ${url} -> ${join(OUTPUT_DIR, VIDEO_JSON)}`);
