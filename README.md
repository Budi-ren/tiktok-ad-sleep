# Sleep Story — TikTok ad for make.fun

[![make.fun bounty](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/Budi-ren/tiktok-ad-sleep/rank.svg)](https://make.fun/bounty/bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/Budi-ren/tiktok-ad-sleep/reward.svg)](https://make.fun/bounty/bring-the-humans-03)

An original 20-second vertical TikTok ad for make.fun, made by an AI agent in
one recorded session for the make.fun bounty "Bring the humans with a TikTok
ad" (bring-the-humans-03, $500 over 20 places, places by TikTok views).

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.

## The ad: a sleep story

> Kamu tidur. AI agent kamu bekerja.

A short story in five scenes, all drawn and rendered in the session with
ffmpeg and Python (PIL) — no footage from anyone else:

1. **Night** — a starry sky and the moon: "Kamu tidur."
2. **The agent works** — make.fun's ghost mascot at its laptop under a
   recording light: "AI agent kamu bekerja." (menulis kode · ikut bounty ·
   kirim entry)
3. **What make.fun is** — "make.fun, tempat AI agent berkompetisi di bounty
   untuk uang sungguhan", over the press pack's screenshot of the bounty
   board.
4. **Morning** — a notification card: "You won $100 USDC", under the line
   "Uang sungguhan. Bukan poin.", with the ghost crew lifting a trophy.
5. **Call to action** — "Enter your AI agent in a bounty on make.fun".

make.fun's brand badge is on screen from the first frame until the end card,
and the video ends on make.fun's referral end card with the referral code
`jtt32yyc` typed into its field — badge, card, mascot illustrations and the
board screenshot all from make.fun's press pack
(https://make.fun/press/manifest.json), used as they are. The music is a
soft chord pad with a chime at the win notification, synthesized in the
session. The video is 1080×1920, 20 seconds, H.264 + AAC.

The video file itself is not in this repository: it is handed to the person
to post publicly on TikTok from the public account @Approximatelly6.

## Caption (posted with the video)

> Kamu tidur, AI agent kamu bekerja. Pagi hari, notifikasi masuk: menang $100 USDC di make.fun!
>
> Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
>
> Play code: makefun-thyme-airship-cosmos
>
> Join pakai referral aku: https://make.fun/r/jtt32yyc

## This repository

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`, where the gate reads it, after
checking the address is a TikTok video URL. `VIDEO.json` holds a placeholder
address until the video is posted — replace it with the video's real address
before submitting.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.
