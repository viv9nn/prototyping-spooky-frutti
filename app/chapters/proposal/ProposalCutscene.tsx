"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProposalOutcome } from "@/lib/proposal";
import { buildCutscene, type Mood } from "./cutsceneScript";
import styles from "./proposal.module.css";

const moods: Mood[] = ["smile", "happy", "surprised", "sorry"];

const spotBackgrounds: Record<string, string> = {
  arcade: "/hub/arcade.png",
  park: "/proposal/park.png",
  fireworks: "/proposal/fireworks.png",
};

export default function ProposalCutscene({ outcome }: { outcome: ProposalOutcome }) {
  const [script] = useState(() => buildCutscene(outcome));
  const [lineIndex, setLineIndex] = useState(0);
  const line = script[lineIndex];
  const isLastLine = lineIndex === script.length - 1;
  const spot = outcome.beats.find((beat) => beat.stepId === "spot")?.optionId ?? "arcade";

  function nextLine() {
    if (!isLastLine) setLineIndex(lineIndex + 1);
  }

  return (
    <div className="vn-stage">
      <Image src={spotBackgrounds[spot]} alt="" width={320} height={180} unoptimized priority className="vn-background" />
      {/* Every face stays mounted so swapping moods never flashes while an image loads. */}
      {moods.map((mood) => (
        <Image
          key={mood}
          src={`/proposal/oishii-${mood}.png`}
          alt={line.mood === mood ? `Miss Oishii looks ${mood}.` : ""}
          width={320}
          height={180}
          unoptimized
          priority
          className={`${styles.sprite} ${line.mood === mood ? "" : styles.hiddenSprite}`}
        />
      ))}
      <Image
        src="/proposal/honeycrisp-kneeling.png"
        alt={line.kneeling ? "Mr. Honeycrisp kneels, holding out a ring box." : ""}
        width={320}
        height={180}
        unoptimized
        priority
        className={`${styles.sprite} ${line.kneeling ? "" : styles.hiddenSprite}`}
      />

      {/* Clicking anywhere in the window advances; the button's click bubbles up to here. */}
      <div className={`vn-message window ${isLastLine ? "" : styles.message}`} onClick={nextLine}>
        <p className="vn-nameplate">{line.speaker}</p>
        <p aria-live="polite">{line.text}</p>
        {isLastLine ? (
          <div className={styles.ending}>
            <p>Final affection: {outcome.affection}</p>
            <Link href="/" className="vn-choice">
              Back to the arcade
            </Link>
          </div>
        ) : (
          <button key={lineIndex} type="button" autoFocus className={`vn-next ${styles.next}`} aria-label="Next line">
            ▼
          </button>
        )}
      </div>
    </div>
  );
}
