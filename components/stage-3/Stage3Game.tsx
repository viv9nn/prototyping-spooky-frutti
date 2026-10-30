"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { addHearts } from "@/lib/wallet";
import { recordStageResult, StageGrade } from "@/lib/gameState";
import { finishChapter } from "@/lib/progress";
import { STAGE_3_CONFIG, getInterpolatedValue, getRandomBetween } from "./config";
import {
  ActiveNotification,
  RISKY_NOTIFICATIONS,
  HARMLESS_NOTIFICATIONS,
} from "./notificationsData";
import {
  playCaughtSound,
  playSpottedSound,
  playGagSnatchSound,
  playClearFanfare,
  playNotificationDing,
  setMuted,
} from "./audio";
import GirlfriendGaze, { GazeState, NotLookingSubState } from "./GirlfriendGaze";
import PhoneFeed from "./PhoneFeed";
import "./stage3.css";

type GamePhase = "INSTRUCTION" | "PLAYING" | "GAG_FAIL" | "RECAP" | "CLEAR";

const NOT_LOOKING_SUBSTATES: NotLookingSubState[] = [
  "PLAYER",
  "CEILING",
  "LAUGHING",
  "YAWNING",
];

export default function Stage3Game() {
  // Game state
  const [phase, setPhase] = useState<GamePhase>("INSTRUCTION");
  const [countdown, setCountdown] = useState<number>(STAGE_3_CONFIG.instructionCountdownSec);
  const [timeLeft, setTimeLeft] = useState<number>(STAGE_3_CONFIG.stageLengthSec);
  const [suspicion, setSuspicion] = useState<number>(0);
  const [livesLeft, setLivesLeft] = useState<number>(3);
  const [timesCaught, setTimesCaught] = useState<number>(0);
  const [timesSpotted, setTimesSpotted] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [showDevControls, setShowDevControls] = useState<boolean>(false);

  // Girlfriend Gaze State
  const [gazeState, setGazeState] = useState<GazeState>("NOT_LOOKING");
  const [subState, setSubState] = useState<NotLookingSubState>("PLAYER");
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState<ActiveNotification[]>([]);

  // Keep state accessible to async timers via refs updated in useEffect
  const stateRef = useRef({
    phase,
    timeLeft,
    suspicion,
    gazeState,
    notifications,
    timesCaught,
    timesSpotted,
  });

  useEffect(() => {
    stateRef.current = {
      phase,
      timeLeft,
      suspicion,
      gazeState,
      notifications,
      timesCaught,
      timesSpotted,
    };
  }, [phase, timeLeft, suspicion, gazeState, notifications, timesCaught, timesSpotted]);

  const lastSpottedTimeRef = useRef<number>(0);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationCounterRef = useRef<number>(0);

  // Timers
  const gazeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = useCallback(() => {
    if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
  }, []);

  // Show a speech bubble for her reactions with auto-dismiss
  const triggerGirlfriendSpeech = useCallback((text: string, durationMs = 2800) => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    setSpeechBubble(text);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechBubble(null);
    }, durationMs);
  }, []);

  // Reset stage for a retry or new game
  const resetStageState = useCallback((preserveLives = false) => {
    clearAllTimers();
    setTimeLeft(STAGE_3_CONFIG.stageLengthSec);
    setSuspicion(0);
    setTimesCaught(0);
    setTimesSpotted(0);
    setNotifications([]);
    setGazeState("NOT_LOOKING");
    setSubState("PLAYER");
    setSpeechBubble(null);
    if (!preserveLives) {
      setLivesLeft(3);
    }
  }, [clearAllTimers]);

  // Handle FAIL when Suspicion reaches 100
  const handleFailure = useCallback(() => {
    clearAllTimers();
    setPhase("GAG_FAIL");
    setGazeState("SNATCH");
    playGagSnatchSound();
    triggerGirlfriendSpeech("GIVE ME THAT PHONE! 📱💢", 2200);

    setTimeout(() => {
      setLivesLeft((prevLives) => {
        const remaining = prevLives - 1;
        if (remaining <= 0) {
          setPhase("RECAP");
        } else {
          resetStageState(true);
          setPhase("PLAYING");
        }
        return remaining;
      });
    }, 1800);
  }, [clearAllTimers, resetStageState, triggerGirlfriendSpeech]);

  // Handle CAUGHT penalty (+40 Suspicion)
  const handleCaught = useCallback(
    (dialogueText: string) => {
      playCaughtSound();
      setTimesCaught((prev) => prev + 1);
      triggerGirlfriendSpeech(dialogueText, 3200);

      setSuspicion((prev) => {
        const next = Math.min(100, prev + STAGE_3_CONFIG.caughtPenalty);
        if (next >= 100) {
          handleFailure();
        }
        return next;
      });
    },
    [handleFailure, triggerGirlfriendSpeech]
  );

  // Spawn a notification banner
  const spawnNotification = useCallback(() => {
    if (stateRef.current.phase !== "PLAYING") return;
    if (stateRef.current.notifications.length >= STAGE_3_CONFIG.maxStackedNotifications) return;

    // 65% chance of risky, 35% harmless
    const isRisky = Math.random() < 0.65;
    const pool = isRisky ? RISKY_NOTIFICATIONS : HARMLESS_NOTIFICATIONS;
    const template = pool[Math.floor(Math.random() * pool.length)];

    notificationCounterRef.current += 1;
    const newNotif: ActiveNotification = {
      ...template,
      instanceId: `notif-${notificationCounterRef.current}-${Date.now()}`,
      spawnTime: stateRef.current.timeLeft,
      seenByGirlfriendDuration: 0,
      hasBeenCaught: false,
      isExiting: false,
    };

    setNotifications((prev) => [...prev, newNotif]);
    playNotificationDing();
  }, []);

  // Loops ref holder to allow mutual recursion without linting issues
  const loopsRef = useRef({
    scheduleNextSpawn: () => {},
    scheduleGazeCycle: () => {},
  });

  const scheduleNextSpawn = useCallback(() => {
    if (stateRef.current.phase !== "PLAYING") return;

    const progress = (STAGE_3_CONFIG.stageLengthSec - stateRef.current.timeLeft) / STAGE_3_CONFIG.stageLengthSec;
    const intervalSec = getInterpolatedValue(
      STAGE_3_CONFIG.notificationIntervalStart,
      STAGE_3_CONFIG.notificationIntervalEnd,
      progress
    );
    const jitter = getRandomBetween(0.85, 1.15);
    const delayMs = intervalSec * jitter * 1000;

    spawnTimerRef.current = setTimeout(() => {
      spawnNotification();
      loopsRef.current.scheduleNextSpawn();
    }, delayMs);
  }, [spawnNotification]);

  const scheduleGazeCycle = useCallback(() => {
    if (stateRef.current.phase !== "PLAYING") return;

    const progress = (STAGE_3_CONFIG.stageLengthSec - stateRef.current.timeLeft) / STAGE_3_CONFIG.stageLengthSec;

    const minSafe = getInterpolatedValue(
      STAGE_3_CONFIG.gazeIntervalStart[0],
      STAGE_3_CONFIG.gazeIntervalEnd[0],
      progress
    );
    const maxSafe = getInterpolatedValue(
      STAGE_3_CONFIG.gazeIntervalStart[1],
      STAGE_3_CONFIG.gazeIntervalEnd[1],
      progress
    );
    const safeDurationSec = getRandomBetween(minSafe, maxSafe);

    const randomSub =
      NOT_LOOKING_SUBSTATES[
        Math.floor(Math.random() * NOT_LOOKING_SUBSTATES.length)
      ];
    setGazeState("NOT_LOOKING");
    setSubState(randomSub);

    gazeTimerRef.current = setTimeout(() => {
      if (stateRef.current.phase !== "PLAYING") return;

      const tellSec = getInterpolatedValue(
        STAGE_3_CONFIG.tellStartSec,
        STAGE_3_CONFIG.tellEndSec,
        progress
      );
      setGazeState("TELL");

      gazeTimerRef.current = setTimeout(() => {
        if (stateRef.current.phase !== "PLAYING") return;

        const canFakeout = progress >= 0.5;
        const isFakeout =
          canFakeout && Math.random() < STAGE_3_CONFIG.fakeoutChanceAfterMidpoint;

        if (isFakeout) {
          setGazeState("FAKEOUT");
          gazeTimerRef.current = setTimeout(() => {
            loopsRef.current.scheduleGazeCycle();
          }, 900);
          return;
        }

        setGazeState("LOOKING");

        const lookSec = getRandomBetween(1.2, 1.8);
        gazeTimerRef.current = setTimeout(() => {
          if (stateRef.current.phase !== "PLAYING") return;
          loopsRef.current.scheduleGazeCycle();
        }, lookSec * 1000);
      }, tellSec * 1000);
    }, safeDurationSec * 1000);
  }, []);

  useEffect(() => {
    loopsRef.current.scheduleNextSpawn = scheduleNextSpawn;
    loopsRef.current.scheduleGazeCycle = scheduleGazeCycle;
  }, [scheduleNextSpawn, scheduleGazeCycle]);

  // Handle SPOTTED penalty (+15 Suspicion when touching/flicking banner while she's looking)
  const handleGrabNotification = useCallback(() => {
    if (stateRef.current.gazeState === "LOOKING") {
      const now = performance.now();
      if (now - lastSpottedTimeRef.current > 1200) {
        lastSpottedTimeRef.current = now;
        playSpottedSound();
        setTimesSpotted((prev) => prev + 1);
        triggerGirlfriendSpeech("WHAT ARE YOU DOING?? Why are you touching your screen?!", 2800);

        setSuspicion((prev) => {
          const next = Math.min(100, prev + STAGE_3_CONFIG.spottedPenalty);
          if (next >= 100) {
            handleFailure();
          }
          return next;
        });
      }
    }
  }, [handleFailure, triggerGirlfriendSpeech]);

  // Handle banner dismissal
  const handleDismissNotification = useCallback((instanceId: string) => {
    setNotifications((prev) => prev.filter((n) => n.instanceId !== instanceId));
  }, []);

  // Instruction 3s Countdown Loop
  useEffect(() => {
    if (phase !== "INSTRUCTION") return;
    const timer = setTimeout(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setPhase("PLAYING");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Main 60-Second Game Loop
  useEffect(() => {
    if (phase !== "PLAYING") return;

    // Start gaze escalation and notification spawner
    loopsRef.current.scheduleGazeCycle();
    loopsRef.current.scheduleNextSpawn();

    // Spawn first notification shortly after start
    const initialSpawnTimer = setTimeout(() => {
      spawnNotification();
    }, 1000);

    const clockInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(clockInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Reading Check Interval (every 100ms)
    const readCheckInterval = setInterval(() => {
      if (stateRef.current.phase !== "PLAYING") return;
      if (stateRef.current.gazeState !== "LOOKING") return;

      setNotifications((prevList) => {
        let caughtTriggered = false;
        let caughtDialogue = "Who's Jessica??!";

        const updated = prevList.map((notif) => {
          if (notif.type === "risky" && !notif.hasBeenCaught) {
            const nextDuration = notif.seenByGirlfriendDuration + 0.1;
            if (nextDuration >= STAGE_3_CONFIG.readTimeSec && !caughtTriggered) {
              caughtTriggered = true;
              caughtDialogue = notif.caughtDialogue || `WHO'S ${notif.sender.toUpperCase()}?!`;
              return {
                ...notif,
                seenByGirlfriendDuration: nextDuration,
                hasBeenCaught: true,
              };
            }
            return { ...notif, seenByGirlfriendDuration: nextDuration };
          }
          return notif;
        });

        if (caughtTriggered) {
          handleCaught(caughtDialogue);
        }

        return updated;
      });
    }, 100);

    return () => {
      clearTimeout(initialSpawnTimer);
      clearInterval(clockInterval);
      clearInterval(readCheckInterval);
      clearAllTimers();
    };
  }, [phase, spawnNotification, handleCaught, clearAllTimers]);

  // Stage Clear Condition (survived 60 seconds with Suspicion < 100)
  useEffect(() => {
    if (phase === "PLAYING" && timeLeft === 0 && suspicion < 100) {
      const clearTimer = setTimeout(() => {
        clearAllTimers();
        setPhase("CLEAR");
        playClearFanfare();

        let grade: StageGrade = "C";
        if (timesCaught === 0 && timesSpotted === 0) {
          grade = "S";
        } else if (suspicion < 40) {
          grade = "A";
        } else if (suspicion < 70) {
          grade = "B";
        }

        const heartsReward = STAGE_3_CONFIG.heartsReward[grade];
        addHearts(heartsReward);
        finishChapter("phone", heartsReward);

        recordStageResult("stage-3", {
          grade,
          suspicion,
          timesCaught,
          timesSpotted,
          clearedAt: Date.now(),
        });
      }, 0);
      return () => clearTimeout(clearTimer);
    }
  }, [phase, timeLeft, suspicion, timesCaught, timesSpotted, clearAllTimers]);

  const toggleMute = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    setMuted(next);
  };

  const calculateCurrentGrade = (): { grade: StageGrade; hearts: number } => {
    if (timesCaught === 0 && timesSpotted === 0) {
      return { grade: "S", hearts: STAGE_3_CONFIG.heartsReward.S };
    }
    if (suspicion < 40) {
      return { grade: "A", hearts: STAGE_3_CONFIG.heartsReward.A };
    }
    if (suspicion < 70) {
      return { grade: "B", hearts: STAGE_3_CONFIG.heartsReward.B };
    }
    return { grade: "C", hearts: STAGE_3_CONFIG.heartsReward.C };
  };

  const currentResult = calculateCurrentGrade();
  const progressRatio = (STAGE_3_CONFIG.stageLengthSec - timeLeft) / STAGE_3_CONFIG.stageLengthSec;

  return (
    <div className="stage-3-container">
      {/* Top HUD (Pixelized Layout from Screenshot) */}
      <header className="stage3-hud">
        {/* Timer Card */}
        <div className="hud-card hud-timer window">
          <span className="hud-label">TIME REMAINING</span>
          <div className="hud-digits timer-digits">
            <span className="timer-icon">⏱️</span>
            <span>{timeLeft.toString().padStart(2, "0")}s</span>
          </div>
          <div className="timer-segmented-bar">
            {Array.from({ length: 14 }).map((_, i) => {
              const active = i < Math.ceil((timeLeft / STAGE_3_CONFIG.stageLengthSec) * 14);
              return (
                <span
                  key={i}
                  className={`timer-block ${active ? "active" : "inactive"}`}
                />
              );
            })}
          </div>
        </div>

        {/* Suspicion Meter Card */}
        <div className="hud-card hud-suspicion window">
          <div className="suspicion-header">
            <span className="hud-label">SUSPICION</span>
            <span
              className={`suspicion-val ${
                suspicion >= 70 ? "text-danger" : suspicion >= 40 ? "text-warning" : "text-safe"
              }`}
            >
              {suspicion} / 100
            </span>
          </div>
          <div className="suspicion-track">
            <div
              className={`suspicion-fill ${
                suspicion >= 70 ? "meter-danger" : suspicion >= 40 ? "meter-warning" : "meter-safe"
              }`}
              style={{ width: `${suspicion}%` }}
            />
          </div>
        </div>

        {/* Tries / Lives Card */}
        <div className="hud-card hud-lives window">
          <span className="hud-label">TRIES</span>
          <div className="lives-row">
            {[1, 2, 3].map((heartIdx) => (
              <span
                key={heartIdx}
                className={`heart-unit ${heartIdx <= livesLeft ? "alive" : "spent"}`}
              >
                ♥
              </span>
            ))}
          </div>
        </div>

        {/* Sound & Dev Action Buttons */}
        <div className="hud-actions">
          <button
            type="button"
            className="hud-btn window"
            onClick={toggleMute}
            title={isAudioMuted ? "Unmute audio" : "Mute audio"}
          >
            {isAudioMuted ? "🔇" : "🔉"}
          </button>
          <button
            type="button"
            className="hud-btn dev-btn-toggle window"
            onClick={() => setShowDevControls(!showDevControls)}
            title="Toggle Dev Cheats"
          >
            🛠️ Dev
          </button>
        </div>
      </header>

      {/* Main Viewport Box (Framed with Stepped Pixel Window Border) */}
      <div className="stage3-viewport window">
        {/* Left Box: Bedside Bedroom Scene */}
        <div className="viewport-left">
          <GirlfriendGaze
            gazeState={gazeState}
            subState={subState}
            speechBubble={speechBubble}
            progress={progressRatio}
          />
        </div>

        {/* Right Box: Phone Mockup Screen with TikTok Feed & Banners */}
        <div className="viewport-center">
          <PhoneFeed
            notifications={notifications}
            onDismissNotification={handleDismissNotification}
            onGrabNotification={handleGrabNotification}
            isGirlfriendLooking={gazeState === "LOOKING"}
            isPhoneSnatched={phase === "GAG_FAIL"}
          />
        </div>
      </div>

      {/* Dev Cheats Bar (toggleable) */}
      {showDevControls && (
        <div className="dev-cheats-panel window">
          <span className="dev-title">🛠️ Dev Shortcuts</span>
          <div className="dev-buttons">
            <button
              type="button"
              className="dev-pill"
              onClick={() => setTimeLeft((t) => Math.max(3, t - 15))}
            >
              ⏩ -15s
            </button>
            <button
              type="button"
              className="dev-pill"
              onClick={() => setSuspicion((s) => Math.min(95, s + 25))}
            >
              ⚠️ +25 Suspicion
            </button>
            <button
              type="button"
              className="dev-pill"
              onClick={() => setSuspicion((s) => Math.max(0, s - 25))}
            >
              💚 -25 Suspicion
            </button>
            <button
              type="button"
              className="dev-pill"
              onClick={() => {
                const template = RISKY_NOTIFICATIONS[0];
                notificationCounterRef.current += 1;
                setNotifications((prev) => [
                  ...prev,
                  {
                    ...template,
                    instanceId: `dev-risky-${Date.now()}`,
                    spawnTime: timeLeft,
                    seenByGirlfriendDuration: 0,
                    hasBeenCaught: false,
                    isExiting: false,
                  },
                ]);
              }}
            >
              📲 Spawn Risky
            </button>
            <button
              type="button"
              className="dev-pill"
              onClick={() => {
                setGazeState("LOOKING");
                triggerGirlfriendSpeech("Looking now! 👀", 1500);
              }}
            >
              👀 Force Look
            </button>
            <button
              type="button"
              className="dev-pill"
              onClick={() => setTimeLeft(2)}
            >
              🏆 Fast Clear
            </button>
          </div>
        </div>
      )}

      {/* OVERLAY: Instruction Card (3s countdown before start) */}
      {phase === "INSTRUCTION" && (
        <div className="stage3-modal-backdrop">
          <div className="instruction-card window">
            <h2 className="instruction-chapter">STAGE 3: LATE-NIGHT TIKTOK</h2>
            <div className="instruction-hero-text">
              <p className="instruction-main-rule">
                GRAB THE NOTIFICATION AND FLICK IT UP.
                <br />
                <span className="rule-highlight">DON&apos;T LET HER SEE.</span>
              </p>
            </div>

            <div className="instruction-demo">
              <div className="demo-banner window">
                <span className="demo-icon">💬</span>
                <span>Jessica: miss you already 😘</span>
                <span className="demo-flick-arrow">⬆️</span>
              </div>
              <p className="demo-subtext">
                Flick upward quickly using your mouse or trackpad swipe.
              </p>
            </div>

            <div className="instruction-rules-summary">
              <div className="rule-item">
                <span className="rule-badge badge-warning">👀 WATCH HER GAZE</span>
                <span>Wait for safe windows when she isn&apos;t looking at the phone.</span>
              </div>
              <div className="rule-item">
                <span className="rule-badge badge-danger">🚨 CAUGHT: +40</span>
                <span>Leaving a risky banner visible while she looks.</span>
              </div>
              <div className="rule-item">
                <span className="rule-badge badge-warning">🖐️ SPOTTED: +15</span>
                <span>Flicking or holding banners while she is looking.</span>
              </div>
            </div>

            <div className="instruction-countdown-box">
              <span className="countdown-label">STARTING IN</span>
              <span className="countdown-number">{countdown}</span>
              <button
                type="button"
                className="vn-choice skip-countdown-btn"
                onClick={() => setPhase("PLAYING")}
              >
                Start Now ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY: Gag Failure */}
      {phase === "GAG_FAIL" && (
        <div className="stage3-gag-overlay">
          <div className="gag-impact-text window">
            <h1>BUSTED!! 💢</h1>
            <p>She snatched the phone right out of your hand!</p>
            <div className="gag-tries-remaining">
              Tries Remaining: {livesLeft - 1} / 3
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY: Controls Recap (after 3 fails) */}
      {phase === "RECAP" && (
        <div className="stage3-modal-backdrop">
          <div className="recap-card window">
            <h2 className="page-title">CAUGHT 3 TIMES!</h2>
            <p className="recap-intro">
              She caught you red-handed and went through your phone. Let&apos;s recap the strategy:
            </p>

            <div className="recap-tips-list">
              <div className="recap-tip window">
                <span className="tip-num">1</span>
                <div>
                  <strong>Watch Her Tell (👀 ❓)</strong>
                  <p>When her head starts turning, immediately stop touching the phone!</p>
                </div>
              </div>
              <div className="recap-tip window">
                <span className="tip-num">2</span>
                <div>
                  <strong>Flick Fast and Upward</strong>
                  <p>Short, quick upward swipes work best on both trackpads and mice.</p>
                </div>
              </div>
              <div className="recap-tip window">
                <span className="tip-num">3</span>
                <div>
                  <strong>Ignore Harmless Notifications</strong>
                  <p>Weather and battery alerts won&apos;t increase suspicion. Focus on risky ones!</p>
                </div>
              </div>
            </div>

            <div className="recap-actions">
              <button
                type="button"
                className="vn-choice retry-btn"
                onClick={() => {
                  resetStageState(false);
                  setPhase("INSTRUCTION");
                }}
              >
                Try Again (3 Tries)
              </button>
              <Link href="/" className="vn-choice back-btn">
                Return to Arcade Hub
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY: Stage Clear Results */}
      {phase === "CLEAR" && (
        <div className="stage3-modal-backdrop">
          <div className="results-card window">
            <div className="results-stamp-wrap">
              <span className={`results-grade-stamp stamp-${currentResult.grade}`}>
                {currentResult.grade}
              </span>
            </div>

            <h2 className="page-title">STAGE 3 CLEARED!</h2>
            <p className="results-girlfriend-quote">
              &ldquo;That was so funny! My eyes are getting heavy... let&apos;s go to sleep. Goodnight~ ❤️&rdquo;
            </p>

            <div className="results-stats-grid">
              <div className="stat-box window">
                <span className="stat-label">FINAL SUSPICION</span>
                <span className="stat-value">{suspicion} / 100</span>
              </div>
              <div className="stat-box window">
                <span className="stat-label">TIMES CAUGHT</span>
                <span className="stat-value">{timesCaught}</span>
              </div>
              <div className="stat-box window">
                <span className="stat-label">TIMES SPOTTED</span>
                <span className="stat-value">{timesSpotted}</span>
              </div>
              <div className="stat-box window stat-hearts">
                <span className="stat-label">HEARTS EARNED</span>
                <span className="stat-value heart-bonus">+{currentResult.hearts} ♥</span>
              </div>
            </div>

            <div className="results-grading-legend window">
              <span className={currentResult.grade === "S" ? "active-rank" : ""}>S: Never caught</span>
              <span className={currentResult.grade === "A" ? "active-rank" : ""}>A: Suspicion &lt; 40</span>
              <span className={currentResult.grade === "B" ? "active-rank" : ""}>B: Suspicion &lt; 70</span>
              <span className={currentResult.grade === "C" ? "active-rank" : ""}>C: Survived</span>
            </div>

            <div className="results-actions">
              <button
                type="button"
                className="vn-choice"
                onClick={() => {
                  resetStageState(false);
                  setPhase("INSTRUCTION");
                }}
              >
                Replay Stage 3
              </button>
              <Link href="/" className="vn-choice">
                Back to Arcade Hub
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
