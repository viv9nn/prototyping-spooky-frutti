"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getChapter } from "@/lib/chapters";
import { startChapter, usePlayStatuses, useScores } from "@/lib/progress";
import { resetProgress } from "@/lib/proposal";

// Wrap your chapter's game in this. It shows a start screen and charges the
// heart, then shows your game once the player presses start.
export default function ChapterGate({ slug, children }: { slug: string; children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  // Next keeps pages alive but hidden after leaving them. Without this, coming back
  // would resume the game and skip the heart charge.
  useEffect(() => () => setPlaying(false), []);
  const status = usePlayStatuses()[slug];
  const best = useScores()[slug];

  if (playing) return children;

  const buttonLabels = {
    free: "Start",
    continue: "Continue (free)",
    first: "Start (uses 1 heart)",
    retry: "Retry (uses 1 heart)",
  };
  const canPlay = status !== "locked" && status !== "blocked" && status !== "finished";

  return (
    <div className="placeholder window">
      <h1 className="page-title">{getChapter(slug)?.name}</h1>
      <p>{getChapter(slug)?.blurb}</p>
      {best !== undefined && status !== "finished" && <p>Best score: {best}</p>}
      {status === "locked" && (
        <p className="coming-soon">Finish every other chapter before you pop the question.</p>
      )}
      {status === "blocked" && (
        <p className="coming-soon">
          {best === undefined
            ? "You're out of hearts."
            : "You're saving your last hearts for the games you haven't played."}
        </p>
      )}
      {status === "finished" && <p className="coming-soon">You&rsquo;ve already proposed. Your story is over.</p>}
      <div className="gate-actions">
        {canPlay && (
          <button className="vn-choice" onClick={() => startChapter(slug) && setPlaying(true)}>
            {buttonLabels[status]}
          </button>
        )}
        {status === "finished" && (
          <button className="vn-choice" onClick={resetProgress}>
            New game
          </button>
        )}
        <Link href="/" className="vn-choice">
          Back to the arcade
        </Link>
      </div>
    </div>
  );
}
