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
  let statusText = "SAFE: Looking away";
  let statusBadgeClass = "badge-safe";

  switch (gazeState) {
    case "NOT_LOOKING":
      statusBadgeClass = "badge-safe";
      if (subState === "PLAYER") {
        headRotation = -6;
        headTranslateX = -4;
        statusText = "Miss Oishii: Looking at you 💕";
      } else if (subState === "CEILING") {
        headRotation = -3;
        headTranslateX = -2;
        statusText = "Miss Oishii: Daydreaming 💭";
      } else if (subState === "LAUGHING") {
        headRotation = -8;
        headTranslateX = -5;
        statusText = "Miss Oishii: Giggling 😆";
      } else {
        headRotation = -2;
        headTranslateX = 0;
        statusText = "Miss Oishii: Yawning 🥱";
      }
      break;

    case "TELL":
      headRotation = 8;
      headTranslateX = 6;
      statusBadgeClass = "badge-warning";
      statusText = "HEAD TURNING... ⚠️";
      break;

    case "FAKEOUT":
      headRotation = -4;
      headTranslateX = -2;
      statusBadgeClass = "badge-safe";
      statusText = "Miss Oishii: False alarm! 😅";
      break;

    case "LOOKING":
      headRotation = 18;
      headTranslateX = 14;
      statusBadgeClass = "badge-danger";
      statusText = "EYES ON PHONE! 🚨";
      break;

    case "SNATCH":
      headRotation = 24;
      headTranslateX = 20;
      statusBadgeClass = "badge-danger";
      statusText = "MISS OISHII: CAUGHT! 💢";
      break;
  }

  return (
    <div className="bedside-scene">
      {/* Bedroom backdrop matching the restaurant scene in purple pixel art */}
      <div className="bedroom-wall">
        <div className="bedroom-night-window window">
          <div className="city-skyline">
            <span className="building b1" />
            <span className="building b2" />
            <span className="building b3" />
          </div>
          <div className="crescent-moon" />
          <div className="star s1">✦</div>
          <div className="star s2">✦</div>
        </div>
        <div className="wall-lamp">
          <div className="lamp-shade" />
          <div className="lamp-glow" />
        </div>
      </div>

      {/* Bed Mattress & Pillows */}
      <div className="bed-mattress">
        <div className="pillow pillow-left window" />
        <div className="pillow pillow-right window" />
      </div>

      {/* Exact Pixel-Art Characters in Bed */}
      <div className="couple-container">
        {/* Miss Oishii (Strawberry Girlfriend) */}
        <div
          className={`girlfriend-character state-${gazeState.toLowerCase()}`}
          style={{
            transform: `translate(${headTranslateX}px, 0) rotate(${headRotation}deg)`,
          }}
        >
          {/* Miss Oishii Head Sprite */}
          <div className="oishii-sprite-box">
            <Image
              src="/stage-3/miss-oishii-sprite.png"
              alt="Miss Oishii"
              width={220}
              height={208}
              unoptimized
              priority
              className="pixel-sprite oishii-sprite-img"
            />

            {/* Expression Overlays for State Changes */}
            {gazeState === "NOT_LOOKING" && subState === "LAUGHING" && (
              <div className="laughing-eyes-overlay">
                <span className="laugh-eye-l">&gt;</span>
                <span className="laugh-eye-r">&lt;</span>
              </div>
            )}

            {gazeState === "NOT_LOOKING" && subState === "YAWNING" && (
              <div className="yawn-mouth-overlay">
                <span>o</span>
              </div>
            )}

            {gazeState === "LOOKING" && (
              <div className="laser-beam-indicator">
                <span className="laser-flash">⚡</span>
              </div>
            )}

            {gazeState === "SNATCH" && (
              <div className="anger-vein-overlay">
                <span>💢</span>
              </div>
            )}
          </div>

          {/* Tell Warning Indicator */}
          {gazeState === "TELL" && (
            <div className="tell-alert-bubble window">
              <span className="tell-icon">👀 ❓</span>
            </div>
          )}

          {/* Fakeout Indicator */}
          {gazeState === "FAKEOUT" && (
            <div className="fakeout-bubble window">
              <span className="fakeout-icon">...😴</span>
            </div>
          )}

          {/* Blue Nightwear Pajamas in Bed */}
          <div className="pajamas-body-oishii" />
        </div>

        {/* Apple Boyfriend (Player holding phone) */}
        <div className="player-character">
          <div className="apple-sprite-box">
            <Image
              src="/stage-3/apple-boyfriend-sprite.png"
              alt="Apple Boyfriend"
              width={220}
              height={208}
              unoptimized
              priority
              className="pixel-sprite apple-sprite-img"
            />
            <div className="player-sweat-drop">💧</div>
          </div>
          {/* Khaki Nightwear Pajamas in Bed */}
          <div className="pajamas-body-apple" />
        </div>
      </div>

      {/* Bed Blanket covering them in purple/pink pixel styling */}
      <div className="bed-duvet">
        <div className="duvet-pink-fold" />
      </div>

      {/* Classic Spooky Frutti Visual Novel Dialogue Box */}
      {speechBubble && (
        <div className="vn-message window stage3-speech-dialogue" role="alert">
          <p className="vn-nameplate">Miss Oishii</p>
          <p className="vn-dialogue-text">{speechBubble}</p>
          <span className="vn-next" aria-hidden="true">
            ▼
          </span>
        </div>
      )}

      {/* Gaze Status Pill in Pixel Window Style */}
      <div className={`gaze-status-indicator window ${statusBadgeClass}`}>
        <span className="status-dot" />
        <span className="status-label">{statusText}</span>
      </div>
    </div>
  );
}
