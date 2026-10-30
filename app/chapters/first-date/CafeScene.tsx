"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { finishChapter } from "@/lib/progress";
import HoldGame from "./HoldGame";
import styles from "./cafe.module.css";

type Speaker = "Miss Oishii" | "Mr. Honeycrisp";

const script: { speaker: Speaker; text: string }[] = [
  { speaker: "Miss Oishii", text: "This place is so cute! I can't believe we finally got a table." },
  { speaker: "Mr. Honeycrisp", text: "It's fine." },
  {
    speaker: "Mr. Honeycrisp",
    text: "(omg, I HAVE TO hold in the fart that is about to come out of me. Press space to help me hold it in!)",
  },
];

const endings = {
  success: {
    text: "It was really fun, I hope we can see each other again for drinks~",
    sprite: "/first-date/oishii-happy.png",
    alt: "Miss Oishii beams with a big, happy smile.",
  },
  failure: {
    text: "Ummm... I think you should go see a GI doctor.",
    sprite: "/first-date/oishii-disgusted.png",
    alt: "Miss Oishii looks away with a disgusted grimace.",
  },
};

type Ending = keyof typeof endings;

export default function CafeScene() {
  const [line, setLine] = useState(0);
  const [farts, setFarts] = useState(0);
  const [ending, setEnding] = useState<Ending | null>(null);
  const current = line < script.length ? script[line] : null;

  function nextLine() {
    setLine(line + 1);
  }

  function endDate(result: Ending) {
    setEnding(result);
    finishChapter("first-date", result === "success" ? 100 : 0);
  }

  return (
    <div className="vn-stage">
      <Image
        src="/first-date/cafe.png"
        alt="A cozy cafe at dusk. A small round table holds two coffees and a slice of cake."
        width={320}
        height={180}
        unoptimized
        priority
        className="vn-background"
      />
      <Image
        src="/first-date/oishii.png"
        alt="Miss Oishii, a cheerful strawberry in a blue shirt and jeans, sits at the table."
        width={320}
        height={180}
        unoptimized
        priority
        className={`${styles.sprite} ${current?.speaker === "Miss Oishii" ? styles.speaking : ""}`}
      />
      {/* Sits on top of her normal sprite. Remounting it on each fart replays its timed fade. */}
      <Image
        key={`surprised-${farts}`}
        src="/first-date/oishii-surprised.png"
        alt=""
        width={320}
        height={180}
        unoptimized
        priority
        className={`${styles.sprite} ${styles.surprised} ${farts > 0 ? styles.reacting : ""}`}
      />
      {/* Both ending faces stay mounted so they're already loaded when the date ends. */}
      {(Object.keys(endings) as Ending[]).map((name) => (
        <Image
          key={name}
          src={endings[name].sprite}
          alt={ending === name ? endings[name].alt : ""}
          width={320}
          height={180}
          unoptimized
          priority
          className={`${styles.sprite} ${ending === name ? "" : styles.hiddenSprite}`}
        />
      ))}
      <Image
        key={`honeycrisp-${farts}`}
        src="/first-date/honeycrisp.png"
        alt="Mr. Honeycrisp, a tired-looking apple in a cream shirt and khakis, sits across from her."
        width={320}
        height={180}
        unoptimized
        priority
        className={`${styles.sprite} ${current?.speaker === "Mr. Honeycrisp" ? styles.speaking : ""} ${farts > 0 ? styles.jolt : ""}`}
      />
      <div key={`fart-${farts}`} className={`${styles.fart} ${farts > 0 ? styles.farting : ""}`}>
        <Image src="/first-date/fart.png" alt="" width={1920} height={180} unoptimized priority className={styles.fartFrames} />
        <p className={styles.fartSound}>PFFFT!</p>
      </div>

      {ending ? (
        <div className="vn-message window">
          <p className="vn-nameplate">Miss Oishii</p>
          <p aria-live="polite">{endings[ending].text}</p>
          <Link href="/" className={`vn-choice ${styles.exit}`}>
            Back to the arcade
          </Link>
        </div>
      ) : current ? (
        // Clicking anywhere in the window advances; the button's click bubbles up to here.
        <div className={`vn-message window ${styles.message}`} onClick={nextLine}>
          <p className="vn-nameplate">{current.speaker}</p>
          <p aria-live="polite">{current.text}</p>
          <button key={line} type="button" autoFocus className={`vn-next ${styles.next}`} aria-label="Next line">
            ▼
          </button>
        </div>
      ) : (
        <HoldGame onFart={() => setFarts((count) => count + 1)} onEnd={endDate} />
      )}
    </div>
  );
}
