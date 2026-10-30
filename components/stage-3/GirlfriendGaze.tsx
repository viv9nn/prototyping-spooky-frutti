"use client";

import React from "react";
import Image from "next/image";

export type GazeState = "NOT_LOOKING" | "TELL" | "LOOKING" | "FAKEOUT" | "SNATCH";
export type NotLookingSubState = "PLAYER" | "CEILING" | "LAUGHING" | "YAWNING";

interface GirlfriendGazeProps {
  gazeState: GazeState;
  subState: NotLookingSubState;
  speechBubble: string | null;
  progress: number;
}

export default function GirlfriendGaze({
  gazeState,
  subState,
  speechBubble,
}: GirlfriendGazeProps) {
  let headRotation = 0;
  let headTranslateX = 0;
  let statusText = "Miss Oishii: Looking away";
  let statusDotColor = "#10b981"; // green

  switch (gazeState) {
    case "NOT_LOOKING":
      if (subState === "PLAYER") {
        headRotation = -6;
        headTranslateX = -4;
        statusText = "Miss Oishii: Looking at you 💕";
        statusDotColor = "#10b981";
      } else if (subState === "CEILING") {
        headRotation = -3;
        headTranslateX = -2;
        statusText = "Miss Oishii: Daydreaming 💭";
        statusDotColor = "#10b981";
      } else if (subState === "LAUGHING") {
        headRotation = -8;
        headTranslateX = -5;
        statusText = "Miss Oishii: Giggling 😆";
        statusDotColor = "#10b981";
      } else {
        headRotation = -2;
        headTranslateX = 0;
        statusText = "Miss Oishii: Yawning 🥱";
        statusDotColor = "#10b981";
      }
      break;

    case "TELL":
      headRotation = 8;
      headTranslateX = 6;
      statusText = "Miss Oishii: Turning head... ⚠️";
      statusDotColor = "#f59e0b"; // yellow
      break;

    case "FAKEOUT":
      headRotation = -4;
      headTranslateX = -2;
      statusText = "Miss Oishii: False alarm! 😅";
      statusDotColor = "#10b981";
      break;

    case "LOOKING":
      headRotation = 18;
      headTranslateX = 14;
      statusText = "Miss Oishii: EYES ON PHONE! 🚨";
      statusDotColor = "#ef4444"; // red
      break;

    case "SNATCH":
      headRotation = 24;
      headTranslateX = 20;
      statusText = "Miss Oishii: BUSTED! 💢";
      statusDotColor = "#ef4444";
      break;
  }

  return (
    <div className="bedside-scene window">
      {/* Top-Left Gaze Status Badge (from screenshot) */}
      <div className="gaze-status-pill window">
        <span className="gaze-pill-square" style={{ color: statusDotColor }}>■</span>
        <span className="gaze-pill-text">{statusText}</span>
      </div>

      {/* Bedroom Backdrop Wall with Night Window & Wall Lamp */}
      <div className="bedroom-wall">
        {/* Night City Window */}
        <div className="bedroom-night-window window">
          <div className="night-window-glass">
            <div className="city-skyline-buildings">
              <span className="bld-block b1" />
              <span className="bld-block b2" />
              <span className="bld-block b3" />
              <span className="bld-block b4" />
            </div>
            <div className="pixel-moon-crescent" />
            <div className="pixel-star-dot s1">✦</div>
            <div className="pixel-star-dot s2">✦</div>
          </div>
        </div>

        {/* Wall Lamp on the right */}
        <div className="bedroom-wall-lamp">
          <div className="lamp-shade-cone" />
          <div className="lamp-light-cone" />
        </div>
      </div>

      {/* Bed Headboard Panels (The two blue rectangular headboard boxes behind characters) */}
      <div className="bed-headboard-row">
        <div className="headboard-box box-left window" />
        <div className="headboard-box box-right window" />
      </div>

      {/* Characters in Bed */}
      <div className="characters-bed-container">
        {/* Miss Oishii (Strawberry Girlfriend) */}
        <div
          className={`oishii-sprite-wrap state-${gazeState.toLowerCase()}`}
          style={{
            transform: `translate(${headTranslateX}px, 0) rotate(${headRotation}deg)`,
          }}
        >
          <div className="sprite-anchor">
            <Image
              src="/stage-3/miss-oishii-sprite.png"
              alt="Miss Oishii"
              width={200}
              height={190}
              unoptimized
              priority
              className="pixel-character-img"
            />

            {/* Expression Overlays */}
            {gazeState === "NOT_LOOKING" && subState === "LAUGHING" && (
              <div className="oishii-laugh-eyes">
                <span>&gt;</span>
                <span>&lt;</span>
              </div>
            )}

            {gazeState === "NOT_LOOKING" && subState === "YAWNING" && (
              <div className="oishii-yawn-mouth">
                <span>o</span>
              </div>
            )}

            {gazeState === "LOOKING" && (
              <div className="oishii-laser-beam">
                <span>⚡</span>
              </div>
            )}

            {gazeState === "SNATCH" && (
              <div className="oishii-anger-mark">
                <span>💢</span>
              </div>
            )}
          </div>

          {/* Tell Alert Popup */}
          {gazeState === "TELL" && (
            <div className="oishii-tell-bubble window">
              <span>! ❓</span>
            </div>
          )}

          {/* Fakeout Indicator */}
          {gazeState === "FAKEOUT" && (
            <div className="oishii-fakeout-bubble window">
              <span>...😴</span>
            </div>
          )}
        </div>

        {/* Honeycrisp Apple Boyfriend */}
        <div className="apple-sprite-wrap">
          <div className="sprite-anchor">
            <Image
              src="/stage-3/apple-boyfriend-sprite.png"
              alt="Apple Boyfriend"
              width={200}
              height={190}
              unoptimized
              priority
              className="pixel-character-img"
            />
            {/* Nervous sweat drop when girlfriend is turning or looking */}
            {(gazeState === "TELL" || gazeState === "LOOKING") && (
              <div className="apple-nervous-sweat">💧</div>
            )}
          </div>
        </div>
      </div>

      {/* Bed Base & Pink Sheet Line at the Bottom (Matching screenshot) */}
      <div className="bed-bottom-bar">
        <div className="pink-sheet-edge" />
        <div className="bed-mattress-base" />
      </div>

      {/* Miss Oishii VN Dialogue Box (when caught or spotted) */}
      {speechBubble && (
        <div className="vn-message window stage3-speech-dialogue" role="alert">
          <p className="vn-nameplate">Miss Oishii</p>
          <p className="vn-dialogue-text">{speechBubble}</p>
          <span className="vn-next" aria-hidden="true">
            ▼
          </span>
        </div>
      )}
    </div>
  );
}
