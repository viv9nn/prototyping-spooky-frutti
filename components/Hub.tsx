"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { chapters, type Chapter } from "@/lib/chapters";
import { usePlayStatuses, useScores } from "@/lib/progress";
import { resetProgress, useProposalResult } from "@/lib/proposal";

const MAX_STARS = 5;

function Rating({ score }: { score: number | undefined }) {
  if (score === undefined) return <span className="vn-chapter-status">New</span>;
  const filled = Math.round((score / 100) * MAX_STARS);
  return (
    <span className="vn-chapter-status vn-rating" aria-label={`Best score: ${score} out of 100`}>
      {"♥".repeat(filled)}
      <span className="vn-rating-empty">{"♥".repeat(MAX_STARS - filled)}</span>
    </span>
  );
}

export default function Hub() {
  const scores = useScores();
  const { affection, ready, accepted } = useProposalResult();
  const statuses = usePlayStatuses();
  const [preview, setPreview] = useState<Chapter | null>(null);
  // Next keeps this page alive but hidden after leaving it, so clear the preview.
  useEffect(() => () => setPreview(null), []);

  const playedCount = chapters.filter((c) => !c.isFinale && scores[c.slug] !== undefined).length;
  const finale = chapters.find((c) => c.isFinale);
  const finaleDone = finale !== undefined && scores[finale.slug] !== undefined;
  const flustered = affection >= 50;

  let line = "Oh! You actually came. So, about our date... you won't let me down, will you?";
  if (finaleDone) {
    line = accepted
      ? "I still can't believe you asked. Yes. A thousand times, yes."
      : "It was a sweet proposal. I just... wish things had gone differently.";
  } else if (ready) {
    line = "You've been acting strange lately. Is there something you want to ask me?";
  } else if (playedCount > 0) {
    line = flustered
      ? "I had a really nice time with you. W-what are we doing next?"
      : "That was... interesting. Let's see how the next one goes.";
  }

  function previewOn(chapter: Chapter) {
    return {
      onMouseEnter: () => setPreview(chapter),
      onMouseLeave: () => setPreview(null),
      onFocus: () => setPreview(chapter),
      onBlur: () => setPreview(null),
    };
  }

  let name = "???";
  let message = line;
  if (preview) {
    name = `Chapter ${chapters.indexOf(preview) + 1}`;
    const status = statuses[preview.slug];
    message = preview.blurb;
    if (status === "locked") message = "Not yet. Finish every other chapter before you pop the question.";
    if (status === "retry") message = `Best score: ${scores[preview.slug]}. Spend 1 heart to try and beat it.`;
    if (status === "finished") message = "You've already proposed. Your story is over.";
    if (status === "blocked") message = `Best score: ${scores[preview.slug]}. You're saving your last hearts for the games you haven't played.`;
  }

  return (
    <div className="vn-stage">
      <Image
        src="/hub/arcade.png"
        alt=""
        width={320}
        height={180}
        unoptimized
        priority
        className="vn-background"
      />
      <Image
        src={flustered ? "/hub/host-blush.png" : "/hub/host.png"}
        alt={`A strawberry-headed woman in a blue shirt and jeans ${flustered ? "blushes" : "smiles"} at you.`}
        width={128}
        height={170}
        unoptimized
        priority
        className="vn-character"
      />

      <nav className="vn-choices window" aria-labelledby="chapter-select">
        <h1 id="chapter-select">Chapter Select</h1>
        <div className="vn-affection">
          <span id="affection-label">Affection</span>
          <div
            className="vn-affection-bar"
            role="progressbar"
            aria-labelledby="affection-label"
            aria-valuenow={affection}
          >
            <div className="vn-affection-fill" style={{ width: `${affection}%` }} />
          </div>
        </div>
        <ol>
          {chapters.map((chapter) => {
            const icon = <Image src={chapter.icon} alt="" width={12} height={12} unoptimized />;

            return (
              <li key={chapter.slug}>
                {chapter.isFinale && !ready ? (
                  <span
                    className="vn-choice vn-chapter vn-chapter-locked"
                    tabIndex={0}
                    {...previewOn(chapter)}
                  >
                    {icon}
                    <span>{chapter.name}</span>
                    <span className="vn-chapter-status">Locked</span>
                  </span>
                ) : (
                  <Link
                    href={`/chapters/${chapter.slug}`}
                    className={`vn-choice vn-chapter${chapter.isFinale ? " vn-chapter-finale" : ""}`}
                    {...previewOn(chapter)}
                  >
                    {icon}
                    <span>{chapter.name}</span>
                    <Rating score={scores[chapter.slug]} />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="vn-message window">
        <p className="vn-nameplate">{name}</p>
        <p>{message}</p>
        {finaleDone && (
          <button className="vn-choice vn-new-game" onClick={resetProgress}>
            New game
          </button>
        )}
        <span className="vn-next" aria-hidden="true">
          ▼
        </span>
      </div>
    </div>
  );
}
