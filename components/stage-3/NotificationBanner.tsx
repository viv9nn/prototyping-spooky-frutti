"use client";

import React, { useRef, useState, useCallback } from "react";
import { ActiveNotification } from "./notificationsData";
import { playSwooshSound, playSnapBackSound } from "./audio";

interface NotificationBannerProps {
  notification: ActiveNotification;
  index: number;
  onDismiss: (instanceId: string) => void;
  onGrab: () => void;
  isGirlfriendLooking: boolean;
}

export default function NotificationBanner({
  notification,
  index,
  onDismiss,
  onGrab,
}: NotificationBannerProps) {
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const startYRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const maxUpwardRef = useRef<number>(0);
  const pointerHistoryRef = useRef<Array<{ y: number; time: number }>>([]);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Instant smooth dismiss trigger
  const triggerDismiss = useCallback(() => {
    if (isDismissing) return;
    setIsDismissing(true);
    setIsDragging(false);
    onGrab();
    playSwooshSound();
    setOffsetY(-520);

    setTimeout(() => {
      onDismiss(notification.instanceId);
    }, 200);
  }, [isDismissing, onGrab, onDismiss, notification.instanceId]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDismissing) return;
      if (e.button !== 0) return; // primary button only

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // fallback
      }

      const now = performance.now();
      startYRef.current = e.clientY;
      startTimeRef.current = now;
      maxUpwardRef.current = 0;
      pointerHistoryRef.current = [{ y: e.clientY, time: now }];
      setIsDragging(true);
      onGrab();
    },
    [isDismissing, onGrab]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || isDismissing) return;

      const rawDeltaY = e.clientY - startYRef.current;
      // Allow snappy upward dragging with 1.15x feel; resist downward dragging
      const clampedDeltaY = rawDeltaY < 0 ? rawDeltaY * 1.15 : Math.min(12, rawDeltaY * 0.06);

      setOffsetY(clampedDeltaY);

      const upwardSoFar = -clampedDeltaY;
      if (upwardSoFar > maxUpwardRef.current) {
        maxUpwardRef.current = upwardSoFar;
      }

      const now = performance.now();
      const history = pointerHistoryRef.current;
      history.push({ y: e.clientY, time: now });

      const filtered = history.filter((pt) => now - pt.time <= 120);
      pointerHistoryRef.current = filtered.length > 0 ? filtered : [{ y: e.clientY, time: now }];
    },
    [isDragging, isDismissing]
  );

  const handlePointerUpOrCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || isDismissing) return;
      setIsDragging(false);

      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      const now = performance.now();
      const history = pointerHistoryRef.current;
      const oldest = history[0] || { y: e.clientY, time: now };
      const dt = Math.max(8, now - oldest.time);
      const dy = oldest.y - e.clientY; // upward distance travelled in recent ms

      const upwardVelocity = dy / dt; // px / ms
      const totalUpwardDistance = startYRef.current - e.clientY;
      const duration = now - startTimeRef.current;

      // Ultra-forgiving & smooth flick conditions:
      // 1. Any upward movement of >= 24px
      // 2. Or quick flick with velocity >= 0.25 px/ms
      // 3. Or peak upward drag was >= 30px
      // 4. Or quick tap (duration < 280ms, distance < 10px) on the card
      const isFlickSuccess =
        totalUpwardDistance >= 24 ||
        upwardVelocity >= 0.25 ||
        maxUpwardRef.current >= 30 ||
        (duration < 280 && Math.abs(totalUpwardDistance) < 10);

      if (isFlickSuccess) {
        triggerDismiss();
      } else {
        // Snap back smoothly
        setOffsetY(0);
        if (totalUpwardDistance > 8) {
          playSnapBackSound();
        }
      }
    },
    [isDragging, isDismissing, triggerDismiss]
  );

  // Stack styling: stacked cards sit nicely below each other with stepped depth
  const stackTop = 10 + index * 76;
  const scale = Math.max(0.92, 1 - index * 0.035);
  const opacity = Math.max(0.88, 1 - index * 0.06);

  const rotation = isDragging ? Math.max(-3, Math.min(3, offsetY * 0.03)) : 0;
  const transformStyle = `translateY(${offsetY}px) scale(${scale}) rotate(${rotation}deg)`;

  const transitionStyle = isDragging
    ? "none"
    : isDismissing
    ? "transform 0.22s cubic-bezier(0.15, 0.85, 0.35, 1.2), opacity 0.2s ease-out"
    : "transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.2s ease";

  const appTitle = notification.appLabel || "Messages";

  return (
    <div
      ref={bannerRef}
      role="button"
      tabIndex={0}
      aria-label={`Notification from ${notification.sender}: ${notification.message}. Click or flick up to dismiss.`}
      className={`notif-banner-card window ${
        notification.type === "risky" ? "notif-risky" : "notif-harmless"
      } ${isDragging ? "notif-dragging" : ""}`}
      style={{
        top: `${stackTop}px`,
        transform: transformStyle,
        transition: transitionStyle,
        opacity: isDismissing ? 0 : opacity,
        zIndex: 60 - index,
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
    >
      {/* Top Header Row: [i] ALERT [App] NOW */}
      <div className="notif-header-row">
        <div className="notif-header-left">
          <span className="notif-icon-badge">
            {notification.type === "risky" ? "⚠️ ALERT" : "ℹ️ ALERT"}
          </span>
          <span className="notif-app-name">[{appTitle}]</span>
        </div>
        <span className="notif-now-time">NOW</span>
      </div>

      {/* Main Sender & Message Content */}
      <div className="notif-body-row">
        <strong className="notif-sender-title">{notification.sender}:</strong>
        <span className="notif-message-text">{notification.message}</span>
      </div>

      {/* Interactive Flick / Dismiss Pill Button */}
      <button
        type="button"
        className="notif-flick-btn"
        onClick={(e) => {
          e.stopPropagation();
          triggerDismiss();
        }}
        title="Click or Flick Up to Dismiss"
      >
        <span className="hint-arrow">▲ ▲</span>
        <span className="hint-text">FLICK UP / CLICK TO DISMISS</span>
        <span className="hint-arrow">▲ ▲</span>
      </button>
    </div>
  );
}
