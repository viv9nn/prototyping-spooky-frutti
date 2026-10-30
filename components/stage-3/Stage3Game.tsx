"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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

type StageGrade = "S" | "A" | "B" | "C";

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
        } else {
          setGazeState("LOOKING");
          const lookDurationSec = getInterpolatedValue(
            STAGE_3_CONFIG.lookDurationStartSec,
            STAGE_3_CONFIG.lookDurationEndSec,
            progress
          );

          gazeTimerRef.current = setTimeout(() => {
            loopsRef.current.scheduleGazeCycle();
          }, lookDurationSec * 1000);
        }
      }, tellSec * 1000);
    }, safeDurationSec * 1000);
  }, []);

  useEffect(() => {
    loopsRef.current = {
      scheduleNextSpawn,
      scheduleGazeCycle,
    };
  }, [scheduleNextSpawn, scheduleGazeCycle]);

  // Handle Stage Clear (PASS)
  const handleStageClear = useCallback(() => {
    clearAllTimers();
    setPhase("CLEAR");
    setGazeState("NOT_LOOKING");
    setSubState("LAUGHING");
    playClearFanfare();
  }, [clearAllTimers]);

  // Report the score once the chapter ends. A failed night counts as a score of 0, and
  // playing again goes through ChapterGate, which charges a heart.
  useEffect(() => {
    if (phase === "CLEAR") finishChapter("phone", Math.max(0, 100 - stateRef.current.suspicion));
    if (phase === "RECAP") finishChapter("phone", 0);
  }, [phase]);

  // Handle SPOTTED penalty (+15 Suspicion when touching/flicking while she looks)
  const handleGrabNotification = useCallback(() => {
    if (stateRef.current.gazeState === "LOOKING") {
      const now = performance.now();
      if (now - lastSpottedTimeRef.current > 1200) {
        lastSpottedTimeRef.current = now;
        playSpottedSound();
        setTimesSpotted((prev) => prev + 1);

        const spottedLines = [
          "WHAT are you doing with your hand?!",
          "Why are you hiding the screen from me?!",
          "What are you swiping away so fast?!",
        ];
        const line = spottedLines[Math.floor(Math.random() * spottedLines.length)];
        triggerGirlfriendSpeech(line, 2500);

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

  // Dismiss a notification
  const handleDismissNotification = useCallback((instanceId: string) => {
    setNotifications((prev) => prev.filter((n) => n.instanceId !== instanceId));
  }, []);

  // Instruction Countdown effect
  useEffect(() => {
    if (phase !== "INSTRUCTION") return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase("PLAYING");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Playing loop effect
  useEffect(() => {
    if (phase !== "PLAYING") {
      clearAllTimers();
      return;
    }

    const initialSpawn = setTimeout(() => {
      spawnNotification();
      scheduleNextSpawn();
    }, 1200);

    scheduleGazeCycle();

    const clockInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(clockInterval);
          handleStageClear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const tickInterval = setInterval(() => {
      if (stateRef.current.gazeState === "LOOKING") {
        setNotifications((prev) => {
          let triggeredCatch = false;
          let catchMessage = "";

          const updated = prev.map((notif) => {
            if (notif.type === "risky" && !notif.hasBeenCaught && !notif.isExiting) {
              const newSeenDuration = notif.seenByGirlfriendDuration + 0.05;
              if (newSeenDuration >= STAGE_3_CONFIG.readTimeSec && !triggeredCatch) {
                triggeredCatch = true;
                catchMessage = notif.caughtDialogue || `Who's ${notif.sender}?!`;
                return {
                  ...notif,
                  seenByGirlfriendDuration: newSeenDuration,
                  hasBeenCaught: true,
                  isExiting: true,
                };
              }
              return { ...notif, seenByGirlfriendDuration: newSeenDuration };
            }
            return notif;
          });

          if (triggeredCatch) {
            handleCaught(catchMessage);
          }

          return updated;
        });
      }
    }, 50);

    return () => {
      clearTimeout(initialSpawn);
      clearInterval(clockInterval);
      clearInterval(tickInterval);
      clearAllTimers();
    };
  }, [
    phase,
    scheduleGazeCycle,
    scheduleNextSpawn,
    spawnNotification,
    handleCaught,
    handleStageClear,
    clearAllTimers,
  ]);

  // Sound toggle
  const toggleMute = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    setMuted(next);
  };

  // Grade calculation for UI
  const calculateCurrentGrade = (): { grade: StageGrade } => {
    if (timesCaught === 0 && timesSpotted === 0 && suspicion === 0) return { grade: "S" };
    if (suspicion < 40) return { grade: "A" };
    if (suspicion < 70) return { grade: "B" };
    return { grade: "C" };
  };

  const currentResult = calculateCurrentGrade();
  const progressRatio = (STAGE_3_CONFIG.stageLengthSec - timeLeft) / STAGE_3_CONFIG.stageLengthSec;

  return (
    <div className="stage-3-container">
      {/* HUD Header */}
      <header className="stage3-hud">
        {/* Timer */}
        <div className="hud-card hud-timer">
          <span className="hud-label">TIME REMAINING</span>
          <div className="hud-value timer-digits">
            <span className="timer-icon">⏱️</span>
            <span>{timeLeft.toString().padStart(2, "0")}s</span>
          </div>
          <div className="timer-bar-wrap">
            <div
              className="timer-bar-fill"
              style={{ width: `${(timeLeft / STAGE_3_CONFIG.stageLengthSec) * 100}%` }}
            />
          </div>
        </div>

        {/* Suspicion Meter */}
        <div className="hud-card hud-suspicion">
          <div className="suspicion-header">
            <span className="hud-label">SUSPICION</span>
            <span
              className={`suspicion-number ${
                suspicion >= 70 ? "text-danger" : suspicion >= 40 ? "text-warning" : "text-safe"
              }`}
            >
              {suspicion} / 100
            </span>
          </div>
          <div className="suspicion-meter-track">
            <div
              className={`suspicion-meter-fill ${
                suspicion >= 70 ? "meter-danger" : suspicion >= 40 ? "meter-warning" : "meter-safe"
              }`}
              style={{ width: `${suspicion}%` }}
            />
          </div>
        </div>

        {/* Tries / Lives */}
        <div className="hud-card hud-lives">
          <span className="hud-label">TRIES</span>
          <div className="lives-hearts">
            {[1, 2, 3].map((heartIdx) => (
              <span
                key={heartIdx}
                className={`heart-icon ${heartIdx <= livesLeft ? "heart-alive" : "heart-lost"}`}
              >
                ♥
              </span>
            ))}
          </div>
        </div>

        {/* Sound & Shortcuts */}
        <div className="hud-actions">
          <button
            type="button"
            className="hud-btn"
            onClick={toggleMute}
            title={isAudioMuted ? "Unmute audio" : "Mute audio"}
          >
            {isAudioMuted ? "🔇" : "🔊"}
          </button>
          {process.env.NODE_ENV === "development" && (
            <button
              type="button"
              className="hud-btn dev-btn-toggle"
              onClick={() => setShowDevControls(!showDevControls)}
              title="Toggle Dev Cheats"
            >
              🛠️ Dev
            </button>
          )}
        </div>
      </header>

      {/* Main Bedroom & Phone Stage Viewport */}
      <div className="stage3-viewport">
        {/* Left Side: Bed & Girlfriend Gaze */}
        <div className="viewport-left">
          <GirlfriendGaze
            gazeState={gazeState}
            subState={subState}
            speechBubble={speechBubble}
            progress={progressRatio}
          />
        </div>

        {/* Center: Phone Mockup with TikTok Feed & Banners */}
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
            <h2 className="instruction-chapter">LATE-NIGHT TIKTOK</h2>
            <div className="instruction-hero-text">
              <p className="instruction-main-rule">
                GRAB THE NOTIFICATION AND FLICK IT UP.
                <br />
                <span className="rule-highlight">DON&apos;T LET HER SEE.</span>
              </p>
            </div>

            <div className="instruction-demo">
              <div className="demo-banner">
                <span className="demo-icon">💬</span>
                <span>Jessica: miss you already 😘</span>
                <span className="demo-flick-arrow">⬆️</span>
              </div>
              <p className="demo-subtext">
                Flick upward quickly with your mouse, trackpad, or finger.
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
          <div className="gag-impact-text">
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
              She caught you red-handed and went through your phone. You can try again from the arcade for 1 heart. Let&apos;s recap the strategy:
            </p>

            <div className="recap-tips-list">
              <div className="recap-tip">
                <span className="tip-num">1</span>
                <div>
                  <strong>Watch Her Tell (👀 ❓)</strong>
                  <p>When her head starts turning, immediately stop touching the phone!</p>
                </div>
              </div>
              <div className="recap-tip">
                <span className="tip-num">2</span>
                <div>
                  <strong>Flick Fast and Upward</strong>
                  <p>Short, quick upward swipes work best on trackpads, mice, and touchscreens.</p>
                </div>
              </div>
              <div className="recap-tip">
                <span className="tip-num">3</span>
                <div>
                  <strong>Ignore Harmless Notifications</strong>
                  <p>Weather and battery alerts won&apos;t increase suspicion. Focus on risky ones!</p>
                </div>
              </div>
            </div>

            <div className="recap-actions">
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

            <h2 className="page-title">YOU SURVIVED THE NIGHT!</h2>
            <p className="results-girlfriend-quote">
              &ldquo;That was so funny! My eyes are getting heavy... let&apos;s go to sleep. Goodnight~ ❤️&rdquo;
            </p>

            <div className="results-stats-grid">
              <div className="stat-box">
                <span className="stat-label">FINAL SUSPICION</span>
                <span className="stat-value">{suspicion} / 100</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">TIMES CAUGHT</span>
                <span className="stat-value">{timesCaught}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">TIMES SPOTTED</span>
                <span className="stat-value">{timesSpotted}</span>
              </div>
            </div>

            <div className="results-grading-legend">
              <span className={currentResult.grade === "S" ? "active-rank" : ""}>S: Never caught</span>
              <span className={currentResult.grade === "A" ? "active-rank" : ""}>A: Suspicion &lt; 40</span>
              <span className={currentResult.grade === "B" ? "active-rank" : ""}>B: Suspicion &lt; 70</span>
              <span className={currentResult.grade === "C" ? "active-rank" : ""}>C: Survived</span>
            </div>

            <div className="results-actions">
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
