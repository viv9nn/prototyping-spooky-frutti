"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cafe.module.css";

// All positions are fractions of the bar's height, measured from the top.
const SAFE_ZONE_HEIGHT = 0.24;
const SAFE_ZONE_START = 0.38;
const SAFE_ZONE_EDGE = 0.04; // the zone never gets closer than this to either end of the bar
// After each success the zone moves, and moves further the higher the score is.
const SHIFT_AT_START = 0.06;
const SHIFT_PER_SUCCESS = 0.02;
const MARKER_HEIGHT = 0.05;
const SWEEP_SECONDS = 1.4; // one full trip up and back down
const POINTS_PER_TRY = 10; // gained on a success, lost on a failure
const WINNING_SCORE = 100;
const LOSING_SCORE = -30;
const PAUSE_BETWEEN_LINES_MS = 2000;
const COUNTDOWN_SECONDS = 10; // how long she waits for the player to press A
const NUDGE = "...Hello? Are you listening to me?";

const monologue = [
  "So I've been thinking about getting a cat. Do you like cats?",
  "I'd name it Mochi. Isn't that the cutest name?",
  "Oh! Have you tried the cake here? Everyone online keeps talking about it.",
  "My sister says I talk too much. Do you think I talk too much?",
  "Is it just me, or did it get a little warm in here?",
  "I went to the arcade last week and won a plush strawberry. It was a little weird, honestly.",
  "You're so quiet! I like that. It's very mysterious.",
  "Do you ever feel like someone is watching us?",
  "What's been your favorite part of today so far?",
  "Hmm? Did you hear something just now?",
];

function inSafeZone(markerTop: number, zoneTop: number) {
  const center = markerTop + MARKER_HEIGHT / 2;
  return center >= zoneTop && center <= zoneTop + SAFE_ZONE_HEIGHT;
}

function shiftSafeZone(zoneTop: number, score: number) {
  const shift = SHIFT_AT_START + (SHIFT_PER_SUCCESS * Math.max(0, score)) / POINTS_PER_TRY;
  const moved = zoneTop + (Math.random() < 0.5 ? shift : -shift);
  const fits = moved >= SAFE_ZONE_EDGE && moved <= 1 - SAFE_ZONE_HEIGHT - SAFE_ZONE_EDGE;
  return fits ? moved : zoneTop + (zoneTop < moved ? -shift : shift);
}

type HoldGameProps = {
  onFart: () => void;
  onEnd: (ending: "success" | "failure") => void;
};

export default function HoldGame({ onFart, onEnd }: HoldGameProps) {
  const [score, setScore] = useState(0);
  const [zoneTop, setZoneTop] = useState(SAFE_ZONE_START);
  const [line, setLine] = useState(0);
  const [talking, setTalking] = useState(false);
  const [timesIgnored, setTimesIgnored] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const marker = useRef<HTMLDivElement>(null);
  const markerTop = useRef(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    function move(now: number) {
      const progress = ((now - start) / 1000 / SWEEP_SECONDS) % 1;
      const distance = 1 - Math.abs(progress * 2 - 1);
      // Snapping to whole steps keeps the movement chunky, like the art.
      markerTop.current = (Math.round(distance * 40) / 40) * (1 - MARKER_HEIGHT);
      if (marker.current) marker.current.style.top = `${markerTop.current * 100}%`;
      frame = requestAnimationFrame(move);
    }

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Between lines this waits for her to speak; during a line it waits for the player to press A.
  useEffect(() => {
    if (line >= monologue.length) return;
    const timer = talking
      ? setTimeout(() => {
          if (secondsLeft > 1) {
            setSecondsLeft(secondsLeft - 1);
            return;
          }
          setScore((current) => current - POINTS_PER_TRY);
          setTimesIgnored((count) => count + 1);
          setSecondsLeft(COUNTDOWN_SECONDS);
        }, 1000)
      : setTimeout(() => setTalking(true), PAUSE_BETWEEN_LINES_MS);
    return () => clearTimeout(timer);
  }, [line, talking, secondsLeft]);

  useEffect(() => {
    if (score >= WINNING_SCORE) onEnd("success");
    if (score <= LOSING_SCORE) onEnd("failure");
  }, [score, onEnd]);

  function continueTalking() {
    if (!talking) return;
    setTalking(false);
    setTimesIgnored(0);
    setSecondsLeft(COUNTDOWN_SECONDS);
    setLine((current) => current + 1);
  }

  function attemptHold() {
    const held = inSafeZone(markerTop.current, zoneTop);
    const nextScore = held ? score + POINTS_PER_TRY : score - POINTS_PER_TRY;
    setScore((current) => current + (held ? POINTS_PER_TRY : -POINTS_PER_TRY));
    if (held) setZoneTop(shiftSafeZone(zoneTop, nextScore));
    else onFart();
  }

  // Runs every render so the listener always calls the latest attemptHold.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;
      if (event.code === "KeyA") continueTalking();
      if (event.code === "Space") {
        event.preventDefault(); // stops the page from scrolling
        attemptHold();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      {/* Tapping the scene does the same as Space, so the game also works on phones. */}
      <div className={styles.gameLayer} onPointerDown={attemptHold}>
        <div
          className={styles.bar}
          role="img"
          aria-label="A marker moves up and down a bar. Press Space while it is in the green safe zone."
        >
          <div
            className={styles.safeZone}
            style={{ top: `${zoneTop * 100}%`, height: `${SAFE_ZONE_HEIGHT * 100}%` }}
          >
            Safe zone
          </div>
          <div ref={marker} className={styles.marker} style={{ height: `${MARKER_HEIGHT * 100}%` }} />
        </div>
        <p className={styles.score} aria-live="polite">
          Score: {score}
        </p>
      </div>

      {talking && (
        // On phones, tapping the window does the same as A.
        <div className={`vn-message window ${styles.message}`} onPointerDown={continueTalking}>
          <p className="vn-nameplate">Miss Oishii</p>
          <span className={styles.countdown} aria-label="Seconds left to answer">
            {secondsLeft}
          </span>
          <p aria-live="polite">{timesIgnored > 0 ? NUDGE : monologue[line]}</p>
          <span className={`vn-next ${styles.pressA}`}>Press A ▼</span>
        </div>
      )}
    </>
  );
}
