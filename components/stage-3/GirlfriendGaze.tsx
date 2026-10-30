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
        statusText = "Miss Oishii: Looking at you ♡";
      } else if (subState === "CEILING") {
        headRotation = -3;
        headTranslateX = -2;
        statusText = "Miss Oishii: Daydreaming 💭";
      } else if (subState === "LAUGHING") {
        headRotation = -8;
        headTranslateX = -5;
        statusText = "Miss Oishii: Giggling ♫";
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
      statusText = "MISS OISHII: BUSTED! 💢";
      break;
  }

  return (
    <div className="aesthetic-bedside-scene window">
      {/* Bedroom Wallpaper with Purple Stripes (Matches Chapter 1 cafe palette) */}
      <div className="bedroom-striped-wall">
        {/* Cozy Night Window with Wooden Trim & Curtains */}
        <div className="cozy-window-frame">
          <div className="window-curtain curtain-l" />
          <div className="window-curtain curtain-r" />
          <div className="window-glass">
            <div className="sky-stars">
              <span className="p-star s1">✦</span>
              <span className="p-star s2">✦</span>
              <span className="p-star s3">✦</span>
            </div>
            <div className="pixel-crescent-moon" />
            <div className="city-skyline-silhouette">
              <span className="bld b1" />
              <span className="bld b2" />
              <span className="bld b3" />
              <span className="bld b4" />
            </div>
          </div>
        </div>

        {/* Cozy Nightstand with Glowing Brass Bedside Lamp */}
        <div className="nightstand-table">
          <div className="bedside-lamp">
            <div className="lamp-shade-retro" />
            <div className="lamp-bulb-glow" />
            <div className="lamp-stand-brass" />
          </div>
          <div className="nightstand-drawer" />
        </div>
      </div>

      {/* Warm Wooden Bed Headboard */}
      <div className="wooden-headboard">
        <div className="headboard-slat" />
        <div className="headboard-slat" />
        <div className="headboard-slat" />
        <div className="headboard-slat" />
      </div>

      {/* Fluffy White/Cream Pillows Behind Heads */}
      <div className="pillows-row">
        <div className="fluffy-pillow pillow-oishii">
          <div className="pillow-crease" />
        </div>
        <div className="fluffy-pillow pillow-apple">
          <div className="pillow-crease" />
        </div>
      </div>

      {/* Characters in Bed */}
      <div className="bed-characters-layer">
        {/* Miss Oishii (Strawberry Girlfriend) */}
        <div
          className={`oishii-bed-sprite state-${gazeState.toLowerCase()}`}
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
              className="pixel-sprite"
            />

            {/* Rosy Pixel Blush on Cheeks */}
            <div className="oishii-blush-marks">
              <span className="blush-mark blush-l">{"///"}</span>
              <span className="blush-mark blush-r">{"///"}</span>
            </div>

            {/* Expression Overlays */}
            {gazeState === "NOT_LOOKING" && subState === "LAUGHING" && (
              <div className="pixel-overlay-eyes">
                <span className="p-eye-l">&gt;</span>
                <span className="p-eye-r">&lt;</span>
              </div>
            )}

            {gazeState === "NOT_LOOKING" && subState === "YAWNING" && (
              <div className="pixel-overlay-mouth">
                <span>o</span>
              </div>
            )}

            {gazeState === "LOOKING" && (
              <div className="pixel-laser-indicator">
                <span className="laser-beam-spark">⚡</span>
              </div>
            )}

            {gazeState === "SNATCH" && (
              <div className="pixel-anger-indicator">
                <span>💢</span>
              </div>
            )}
          </div>

          {/* Tell Warning Bubble */}
          {gazeState === "TELL" && (
            <div className="pixel-tell-popup window">
              <span className="popup-icon">! ❓</span>
            </div>
          )}

          {/* Fakeout Bubble */}
          {gazeState === "FAKEOUT" && (
            <div className="pixel-fakeout-popup window">
              <span>...😴</span>
            </div>
          )}
        </div>

        {/* Mr. Honeycrisp Apple (Boyfriend Holding Phone in Bed) */}
        <div className="apple-bed-sprite">
          <div className="sprite-anchor">
            <Image
              src="/stage-3/apple-boyfriend-sprite.png"
              alt="Apple Boyfriend"
              width={200}
              height={190}
              unoptimized
              priority
              className="pixel-sprite"
            />
            {/* Nervous sweat drop when girlfriend looks */}
            {(gazeState === "TELL" || gazeState === "LOOKING") && (
              <div className="apple-sweat-drop">💧</div>
            )}
          </div>
        </div>
      </div>

      {/* Cozy Quilted Duvet Blanket (Tucks them in bed) */}
      <div className="cozy-duvet-blanket">
        <div className="duvet-pink-folded-sheet">
          <span className="stitch-line" />
        </div>
        <div className="duvet-quilt-body">
          <div className="quilt-diamond-pattern" />
        </div>
      </div>

      {/* Miss Oishii Speech Reaction (Classic VN Dialogue Box with Nameplate) */}
      {speechBubble && (
        <div className="vn-message window stage3-oishii-dialogue" role="alert">
          <p className="vn-nameplate">Miss Oishii</p>
          <p className="vn-dialogue-text">{speechBubble}</p>
          <span className="vn-next" aria-hidden="true">
            ▼
          </span>
        </div>
      )}

      {/* Aesthetic Gaze Status Pill (Top Header) */}
      <div className={`aesthetic-gaze-pill window ${statusBadgeClass}`}>
        <span className="gaze-dot-icon" />
        <span className="gaze-status-title">{statusText}</span>
      </div>
    </div>
  );
}
