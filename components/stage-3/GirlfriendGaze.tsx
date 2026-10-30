"use client";

import React from "react";

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
  // Eye coordinates and head rotation based on state
  let headRotation = 0;
  let eyeTargetX = 0; // -1 = looking at player, 0 = ceiling/closed, 1 = looking at phone
  let eyeTargetY = 0;
  let eyeShape: "normal" | "laugh" | "closed" | "laser" | "alert" | "angry" = "normal";
  let statusText = "SAFE: Looking away";
  let statusBadgeClass = "badge-safe";

  switch (gazeState) {
    case "NOT_LOOKING":
      statusBadgeClass = "badge-safe";
      if (subState === "PLAYER") {
        headRotation = -8;
        eyeTargetX = -0.7;
        eyeTargetY = 0.2;
        statusText = "Miss Oishii: Looking at you 💕";
      } else if (subState === "CEILING") {
        headRotation = -4;
        eyeTargetX = 0;
        eyeTargetY = -0.9;
        statusText = "Miss Oishii: Daydreaming 💭";
      } else if (subState === "LAUGHING") {
        headRotation = -6;
        eyeShape = "laugh";
        statusText = "Miss Oishii: Giggling 😆";
      } else {
        headRotation = -2;
        eyeShape = "closed";
        statusText = "Miss Oishii: Yawning 🥱";
      }
      break;

    case "TELL":
      headRotation = 12;
      eyeTargetX = 0.5;
      eyeTargetY = 0.2;
      eyeShape = "alert";
      statusBadgeClass = "badge-warning";
      statusText = "HEAD TURNING... ⚠️";
      break;

    case "FAKEOUT":
      headRotation = -5;
      eyeTargetX = 0;
      eyeTargetY = -0.4;
      eyeShape = "normal";
      statusBadgeClass = "badge-safe";
      statusText = "Miss Oishii: False alarm! 😅";
      break;

    case "LOOKING":
      headRotation = 24;
      eyeTargetX = 1.0;
      eyeTargetY = 0.2;
      eyeShape = "laser";
      statusBadgeClass = "badge-danger";
      statusText = "EYES ON PHONE! 🚨";
      break;

    case "SNATCH":
      headRotation = 30;
      eyeShape = "angry";
      statusBadgeClass = "badge-danger";
      statusText = "MISS OISHII: CAUGHT! 💢";
      break;
  }

  return (
    <div className="bedside-scene">
      {/* Bedroom backdrop with night window matching the restaurant scene */}
      <div className="bedroom-wall">
        <div className="bedroom-night-window">
          <div className="city-buildings">
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

      {/* Bed frame & Pillows */}
      <div className="bed-mattress">
        <div className="pillow pillow-left" />
        <div className="pillow pillow-right" />
      </div>

      {/* Spooky Frutti Characters in Bed */}
      <div className="couple-container">
        {/* Miss Oishii (Strawberry Girlfriend) */}
        <div
          className={`girlfriend-character state-${gazeState.toLowerCase()}`}
          style={{ transform: `rotate(${headRotation}deg)` }}
        >
          {/* Miss Oishii's Strawberry Head */}
          <div className="strawberry-head-wrap">
            {/* Green Leaf Calyx Crown on top */}
            <div className="strawberry-leaves">
              <span className="leaf leaf-1" />
              <span className="leaf leaf-2" />
              <span className="leaf leaf-3" />
              <span className="leaf leaf-4" />
              <span className="leaf leaf-5" />
              <span className="leaf-stem" />
            </div>

            {/* Red Strawberry Body / Head */}
            <div className="strawberry-face">
              {/* Strawberry Seeds Texture */}
              <div className="strawberry-seeds">
                <span className="seed s-1" />
                <span className="seed s-2" />
                <span className="seed s-3" />
                <span className="seed s-4" />
                <span className="seed s-5" />
                <span className="seed s-6" />
                <span className="seed s-7" />
                <span className="seed s-8" />
                <span className="seed s-9" />
                <span className="seed s-10" />
              </div>

              {/* Eyebrows */}
              <div className={`gf-eyebrows eyebrows-${eyeShape}`}>
                <span className="brow brow-left" />
                <span className="brow brow-right" />
              </div>

              {/* Miss Oishii's Big Anime Eyes */}
              <div className={`gf-eyes eyes-${eyeShape}`}>
                {eyeShape === "laugh" ? (
                  <>
                    <span className="eye-laugh">&gt;</span>
                    <span className="eye-laugh">&lt;</span>
                  </>
                ) : eyeShape === "closed" ? (
                  <>
                    <span className="eye-closed">⌒</span>
                    <span className="eye-closed">⌒</span>
                  </>
                ) : eyeShape === "angry" ? (
                  <>
                    <div className="eye-angry-wrap">
                      <span className="eye-angry">ಠ</span>
                      <span className="eye-angry">ಠ</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="eye eye-left">
                      <div
                        className="pupil"
                        style={{
                          transform: `translate(${eyeTargetX * 8}px, ${eyeTargetY * 5}px)`,
                        }}
                      >
                        <span className="pupil-shine" />
                        <span className="pupil-shine-small" />
                      </div>
                      <div className="eyelash-top" />
                    </div>
                    <div className="eye eye-right">
                      <div
                        className="pupil"
                        style={{
                          transform: `translate(${eyeTargetX * 8}px, ${eyeTargetY * 5}px)`,
                        }}
                      >
                        <span className="pupil-shine" />
                        <span className="pupil-shine-small" />
                      </div>
                      <div className="eyelash-top" />
                    </div>
                  </>
                )}
              </div>

              {/* Cute Pink Blush Marks */}
              <div className="gf-blush blush-left">
                <span>{"///"}</span>
              </div>
              <div className="gf-blush blush-right">
                <span>{"///"}</span>
              </div>

              {/* Mouth */}
              <div className={`gf-mouth mouth-${eyeShape} mouth-${subState.toLowerCase()}`}>
                {eyeShape === "laugh"
                  ? "▽"
                  : eyeShape === "angry"
                  ? "皿"
                  : subState === "YAWNING" && gazeState === "NOT_LOOKING"
                  ? "o"
                  : "◡"}
              </div>
            </div>
          </div>

          {/* Tell Alert Icon */}
          {gazeState === "TELL" && (
            <div className="tell-alert-bubble">
              <span className="tell-icon">👀 ❓</span>
            </div>
          )}

          {/* Fakeout Indicator */}
          {gazeState === "FAKEOUT" && (
            <div className="fakeout-bubble">
              <span className="fakeout-icon">...😴</span>
            </div>
          )}

          {/* Laser Eyes Effect when Looking */}
          {gazeState === "LOOKING" && (
            <div className="laser-sight-beam">
              <div className="laser-flash">⚡</div>
            </div>
          )}

          {/* Miss Oishii's Pajamas in bed */}
          <div className="gf-body">
            <div className="gf-pajamas-blue" />
          </div>
        </div>

        {/* Apple Boyfriend Character (Player holding phone) */}
        <div className="player-character">
          {/* Apple Head */}
          <div className="apple-head-wrap">
            {/* Apple Stem and Leaf on top */}
            <div className="apple-stem-wrap">
              <div className="apple-stem" />
              <div className="apple-leaf" />
            </div>

            {/* Dark Red Apple Head */}
            <div className="apple-face">
              {/* Apple Brow / Angry-Nervous Eyebrows */}
              <div className="apple-eyebrows">
                <span className="apple-brow a-brow-left" />
                <span className="apple-brow a-brow-right" />
              </div>

              {/* Nervous Apple Eyes */}
              <div className="apple-eyes">
                <span className="a-eye">■</span>
                <span className="a-eye">■</span>
              </div>

              {/* Sweat drop when nervous */}
              <div className="player-sweat-drop">💧</div>

              {/* Nervous mouth */}
              <div className="apple-mouth">_</div>
            </div>
          </div>

          {/* Beige Pajamas */}
          <div className="player-pajamas-beige" />
        </div>
      </div>

      {/* Bed Blanket covering both characters */}
      <div className="bed-duvet">
        <div className="duvet-fold" />
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

      {/* Gaze Status Pill */}
      <div className={`gaze-status-indicator ${statusBadgeClass}`}>
        <span className="status-dot" />
        <span className="status-label">{statusText}</span>
      </div>
    </div>
  );
}
