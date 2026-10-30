"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { finishChapter } from "@/lib/progress";

// The cash that earns a score of 100.
const FULL_SCORE_MONEY = 1000;

export default function SideHustleFrame() {
  const frame = useRef<HTMLIFrameElement>(null);

  // The game reports the player's cash after every job, win or bust.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "side-hustle-run") return;
      finishChapter("side-hustle", Math.min(100, Math.round((event.data.money / FULL_SCORE_MONEY) * 100)));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="game-page">
      <iframe
        ref={frame}
        src="/games/side-hustle/index.html?embed"
        title="Side Hustle mini-game"
        className="game-frame"
      />
      <Link href="/" className="vn-choice">
        Back to the arcade
      </Link>
    </div>
  );
}
