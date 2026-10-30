"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CLOTHING_ITEMS,
  ClothingItem,
  ClothingCategory,
  CATEGORY_NAMES,
} from "@/lib/dress-up/items";
import {
  playCatchGood,
  playCatchBad,
  playClearSlot,
  playWinFanfare,
} from "@/lib/dress-up/audio";
import PixelAvatar from "./PixelAvatar";
import { addHearts } from "@/lib/wallet";

interface FlyingEntity {
  instanceId: number;
  item: ClothingItem;
  x: number; // percentage from left (110% down to -20%)
  y: number; // percentage from top (12% to 75%)
  speed: number;
  phase: number;
}

interface OutfitSlots {
  top: ClothingItem | null;
  bottom: ClothingItem | null;
  shoes: ClothingItem | null;
  accessory: ClothingItem | null;
}

export default function DressUpGame() {
  const [gameState, setGameState] = useState<"INTRO" | "PLAYING" | "VICTORY">("INTRO");
  const [slots, setSlots] = useState<OutfitSlots>({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
  });

  const [flyingItems, setFlyingItems] = useState<FlyingEntity[]>([]);
  const [feedback, setFeedback] = useState<{ id: number; text: string; isGood: boolean; x: number; y: number } | null>(null);
  const nextEntityId = useRef(1);
  const nextFeedbackId = useRef(1);
  const animationFrameId = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);

  // Check outfit completion
  const isCompleteAndClean = Boolean(
    slots.top?.isClean &&
    slots.bottom?.isClean &&
    slots.shoes?.isClean &&
    slots.accessory?.isClean
  );

  const anyBadEquipped = Boolean(
    (slots.top && !slots.top.isClean) ||
    (slots.bottom && !slots.bottom.isClean) ||
    (slots.shoes && !slots.shoes.isClean) ||
    (slots.accessory && !slots.accessory.isClean)
  );

  // Spawn new flying items
  const spawnItem = useCallback(() => {
    // Pick random item from catalog
    const randomIndex = Math.floor(Math.random() * CLOTHING_ITEMS.length);
    const item = CLOTHING_ITEMS[randomIndex];

    const newEntity: FlyingEntity = {
      instanceId: nextEntityId.current++,
      item,
      x: 105, // start slightly off the right edge
      y: 12 + Math.random() * 62, // vertical spread
      speed: 0.18 + Math.random() * 0.22, // speed
      phase: Math.random() * Math.PI * 2,
    };

    setFlyingItems((prev) => [...prev.slice(-7), newEntity]);
  }, []);

  // Main game loop
  useEffect(() => {
    if (gameState !== "PLAYING") {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      // Spawn every 1400ms
      if (currentTime - lastSpawnTime.current > 1400) {
        spawnItem();
        lastSpawnTime.current = currentTime;
      }

      // Update positions
      setFlyingItems((prev) => {
        return prev
          .map((entity) => ({
            ...entity,
            x: entity.x - entity.speed * (delta / 16),
            phase: entity.phase + 0.05,
          }))
          .filter((entity) => entity.x > -25); // remove when offscreen left
      });

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, spawnItem]);

  // Handle clicking a flying item
  const handleCatch = (entity: FlyingEntity, e: React.MouseEvent) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    const relativeX = parentRect ? ((rect.left - parentRect.left + rect.width / 2) / parentRect.width) * 100 : 50;
    const relativeY = parentRect ? ((rect.top - parentRect.top) / parentRect.height) * 100 : 50;

    const { item } = entity;

    // Remove from flying array
    setFlyingItems((prev) => prev.filter((i) => i.instanceId !== entity.instanceId));

    const feedbackId = nextFeedbackId.current++;

    // Audio & Feedback
    if (item.isClean) {
      playCatchGood();
      setFeedback({
        id: feedbackId,
        text: `+ ${item.name}!`,
        isGood: true,
        x: relativeX,
        y: relativeY,
      });
    } else {
      playCatchBad();
      setFeedback({
        id: feedbackId,
        text: item.flaw || "Yuck! Stained!",
        isGood: false,
        x: relativeX,
        y: relativeY,
      });
    }

    // Equip to appropriate slot and check for win
    setSlots((prev) => {
      const nextSlots = {
        ...prev,
        [item.category]: item,
      };

      const won = Boolean(
        nextSlots.top?.isClean &&
        nextSlots.bottom?.isClean &&
        nextSlots.shoes?.isClean &&
        nextSlots.accessory?.isClean
      );

      if (won) {
        playWinFanfare();
        addHearts(10);
        setTimeout(() => {
          setGameState("VICTORY");
        }, 1200);
      }

      return nextSlots;
    });

    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  // Remove / strip an item from a slot
  const handleClearSlot = (category: ClothingCategory) => {
    playClearSlot();
    setSlots((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  // Reset game
  const handleRestart = () => {
    setSlots({
      top: null,
      bottom: null,
      shoes: null,
      accessory: null,
    });
    setFlyingItems([]);
    setGameState("PLAYING");
  };

  return (
    <div className="dress-up-container">
      {/* --- INTRO SCREEN --- */}
      {gameState === "INTRO" && (
        <div className="vn-stage window">
          <div className="intro-screen">
            <div className="intro-header">
              <span className="retro-badge">Episode 1</span>
              <h1 className="page-title">Date Night Dapper</h1>
              <p className="intro-subtitle">
                Help Mr. Honeycrisp pick a sharp outfit for his date with Miss Oishii!
              </p>
            </div>

            <div className="intro-avatar-preview">
              <PixelAvatar
                top={null}
                bottom={null}
                shoes={null}
                accessory={null}
              />
            </div>

            <div className="intro-rules window">
              <h2 className="rules-heading">How to Play:</h2>
              <ul>
                <li>
                  <span className="rule-bullet">✦</span> Clothes fly across the room from Mr. Honeycrisp&rsquo;s overflowing closet.
                </li>
                <li>
                  <span className="rule-bullet">✦</span> Click to catch a <strong>Top</strong>, <strong>Bottom</strong>, <strong>Shoes</strong>, and <strong>Accessory</strong>.
                </li>
                <li>
                  <span className="rule-bullet">✦</span> <strong>Grab clean & dressy clothes</strong>. Watch out for stained, moth-eaten, or ripped junk!
                </li>
                <li>
                  <span className="rule-bullet">✦</span> You pass when <strong>all 4 articles are completed and clean</strong>.
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                playCatchGood();
                setGameState("PLAYING");
              }}
              className="vn-choice start-button"
            >
              Start Getting Dressed! ▶
            </button>
          </div>
        </div>
      )}

      {/* --- PLAYING SCREEN --- */}
      {gameState === "PLAYING" && (
        <div className="vn-stage dress-up-arena window">
          {/* Top Bar HUD */}
          <div className="game-hud">
            <div className="hud-status">
              <span className="hud-title">Date Prep Status:</span>
              {isCompleteAndClean ? (
                <span className="status-tag tag-pass">
                  ★ OUTFIT PERFECT! HEADING TO THE CAFE... ★
                </span>
              ) : anyBadEquipped ? (
                <span className="status-tag tag-bad">
                  ⚠ STAINED / RIPPED ITEMS DETECTED! REPLACE THEM!
                </span>
              ) : (
                <span className="status-tag tag-normal">
                  Catch Clean &amp; Dressy Items Flying Across!
                </span>
              )}
            </div>
            <button
              onClick={() => handleRestart()}
              className="reset-btn"
              title="Reset outfit"
            >
              Restart
            </button>
          </div>

          {/* Closet Arena where clothes fly */}
          <div className="flying-arena">
            {/* Background decor (closet / bedroom wallpaper) */}
            <div className="closet-bg-pattern" />

            {/* Flying Items */}
            {flyingItems.map((entity) => {
              const { item, x, y, phase, instanceId } = entity;
              const bobY = y + Math.sin(phase) * 3;

              return (
                <button
                  key={instanceId}
                  onClick={(e) => handleCatch(entity, e)}
                  style={{
                    left: `${x}%`,
                    top: `${bobY}%`,
                  }}
                  className={`flying-item ${item.isClean ? "item-clean" : "item-bad"}`}
                  title={`${item.name} (${CATEGORY_NAMES[item.category]})`}
                >
                  <span className="item-icon">{item.icon}</span>
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-cat-badge">
                      {CATEGORY_NAMES[item.category]} • {item.isClean ? "Clean" : "Dirty/Ripped"}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Floating Pop Feedback */}
            {feedback && (
              <div
                key={feedback.id}
                style={{
                  left: `${feedback.x}%`,
                  top: `${feedback.y}%`,
                }}
                className={`pop-feedback ${feedback.isGood ? "feedback-good" : "feedback-bad"}`}
              >
                {feedback.text}
              </div>
            )}

            {/* Mr. Honeycrisp Avatar in dressing area */}
            <div className="honeycrisp-dressing-stage">
              <PixelAvatar
                top={slots.top}
                bottom={slots.bottom}
                shoes={slots.shoes}
                accessory={slots.accessory}
                isVictory={isCompleteAndClean}
              />
            </div>
          </div>

          {/* Outfit Slots Bottom Bar */}
          <div className="slots-panel window">
            <h3 className="slots-header">Equipped Date Outfit (Need 4 Clean Articles):</h3>
            <div className="slots-grid">
              {(["top", "bottom", "shoes", "accessory"] as ClothingCategory[]).map((cat) => {
                const equipped = slots[cat];
                return (
                  <div
                    key={cat}
                    className={`outfit-slot ${
                      !equipped
                        ? "slot-empty"
                        : equipped.isClean
                        ? "slot-clean"
                        : "slot-bad"
                    }`}
                  >
                    <div className="slot-type-header">
                      <span className="slot-cat-name">{CATEGORY_NAMES[cat]}</span>
                      {equipped && (
                        <button
                          onClick={() => handleClearSlot(cat)}
                          className="clear-slot-btn"
                          title="Strip / Remove this item"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {equipped ? (
                      <div className="slot-equipped-content">
                        <span className="equipped-icon">{equipped.icon}</span>
                        <div className="equipped-details">
                          <p className="equipped-name">{equipped.name}</p>
                          <p className="equipped-status">
                            {equipped.isClean ? (
                              <span className="clean-label">✓ Dressy &amp; Clean</span>
                            ) : (
                              <span className="bad-label">✗ {equipped.flaw || "Stained"}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="slot-empty-content">
                        <span className="empty-dash">-- Empty --</span>
                        <span className="empty-sub">Catch a {CATEGORY_NAMES[cat].toLowerCase()}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- VICTORY CUTSCENE --- */}
      {gameState === "VICTORY" && (
        <div className="vn-stage window victory-screen">
          <div className="victory-media-wrap">
            <Image
              src="/chapters/dress-up/date-scene.png"
              alt="Mr. Honeycrisp and Miss Oishii enjoying their date at the cafe"
              width={838}
              height={854}
              unoptimized
              priority
              className="victory-scene-image"
            />
          </div>

          <div className="vn-message window victory-dialogue">
            <p className="vn-nameplate">Miss Oishii</p>
            <p className="dialogue-text">
              &ldquo;Oh, Mr. Honeycrisp! You look so dashing and put-together tonight!
              I can&rsquo;t believe we finally got a table at our favorite cafe!&rdquo;
            </p>
            <p className="dialogue-subtext">
              Mr. Honeycrisp adjusts his collar with a satisfied smirk. &ldquo;Hmph. Only the finest
              clean attire when I take you out, Miss Oishii.&rdquo;
            </p>
            <div className="victory-reward-badge">
              ♥ +10 Hearts Awarded to Your Wallet!
            </div>
          </div>

          <div className="victory-actions">
            <button
              onClick={handleRestart}
              className="vn-choice victory-btn"
            >
              Play Again ↺
            </button>
            <Link href="/" className="vn-choice victory-btn">
              Back to Arcade ➔
            </Link>
            <Link href="/shop" className="vn-choice victory-btn">
              Visit Gift Shop 🎁
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
