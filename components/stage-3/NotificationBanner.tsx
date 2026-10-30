"use client";

import React, { useRef, useState, useCallback } from "react";
import { ActiveNotification } from "./notificationsData";
import { STAGE_3_CONFIG } from "./config";
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
  const pointerHistoryRef = useRef<Array<{ y: number; time: number }>>([]);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDismissing) return;
      if (e.button !== 0) return; // primary button only

      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // fallback
      }

      startYRef.current = e.clientY;
      pointerHistoryRef.current = [{ y: e.clientY, time: performance.now() }];
      setIsDragging(true);
      onGrab();
    },
    [isDismissing, onGrab]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || isDismissing) return;

      const rawDeltaY = e.clientY - startYRef.current;
      // Allow rapid upward dragging; apply high resistance if dragging downward
      const clampedDeltaY = rawDeltaY < 0 ? rawDeltaY : rawDeltaY * 0.08;

      setOffsetY(clampedDeltaY);

      const now = performance.now();
      const history = pointerHistoryRef.current;
      history.push({ y: e.clientY, time: now });

      const filtered = history.filter((pt) => now - pt.time <= 80);
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
      const upwardDistance = startYRef.current - e.clientY;

      const isFlickSuccess =
        upwardVelocity >= STAGE_3_CONFIG.flickMinVelocity &&
        upwardDistance >= STAGE_3_CONFIG.flickMinDistancePx;

      if (isFlickSuccess) {
        setIsDismissing(true);
        playSwooshSound();
        setOffsetY(-360);

        setTimeout(() => {
          onDismiss(notification.instanceId);
        }, 180);
      } else {
        // Snap back to normal resting place
        setOffsetY(0);
        if (upwardDistance > 8) {
          playSnapBackSound();
        }
      }
    },
    [isDragging, isDismissing, notification.instanceId, onDismiss]
  );

  // Stack styling: stacked cards sit just below each other with stepped depth
  const stackTop = 10 + index * 70;
  const scale = Math.max(0.9, 1 - index * 0.04);
  const opacity = Math.max(0.85, 1 - index * 0.08);

  const transformStyle = `translateY(${offsetY}px) scale(${scale})`;

  const transitionStyle = isDragging
    ? "none"
    : isDismissing
    ? "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.18s ease-out"
    : "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.2s ease";

  const appTitle = notification.appLabel || "Messages";

  return (
    <div
      ref={bannerRef}
      role="button"
      tabIndex={0}
      aria-label={`Notification from ${notification.sender}: ${notification.message}. Flick up to dismiss.`}
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
      {/* Top Header Row (From screenshot: [i] ALERT [Calendar] NOW) */}
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

      {/* Upward Flick Hint (From screenshot: ▲ ▲ FLICK UP ▲ ▲) */}
      <div className="notif-flick-hint">
        <span className="hint-arrow">▲ ▲</span>
        <span className="hint-text">FLICK UP</span>
        <span className="hint-arrow">▲ ▲</span>
      </div>
    </div>
  );
}
