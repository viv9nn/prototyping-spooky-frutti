"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { finishChapter } from "@/lib/progress";
import { addMoney, getMoney, spendMoney } from "@/lib/wallet";

// The game is a plain HTML file in a frame. It sends its earnings and final score
// here, so the wallet and progress stores stay the only code that writes saves.
export default function OddJobsGame() {
  const frame = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      const { type, amount, score } = event.data ?? {};
      if (type === "money" && amount > 0) addMoney(amount);
      if (type === "money" && amount < 0) spendMoney(Math.min(-amount, getMoney()));
      if (type === "finish") finishChapter("job", score);
      if (type === "leave") router.push("/");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  return (
    <iframe
      ref={frame}
      src="/games/side-hustle/index.html?embed"
      title="Odd Jobs mini-game"
      className="game-frame"
      onLoad={() => frame.current?.focus()}
    />
  );
}
