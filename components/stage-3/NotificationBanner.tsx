"use client";

import React, { useRef, useState, useCallback } from "react";
import { ActiveNotification } from "./notificationsData";
import { STAGE_3_CONFIG } from "./config";
import { playSwooshSound } from "./audio";

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
  const [isDismissing, setIsDismissing] = useState(false);
  const lastClickRef = useRef(0);

  // Every click counts as touching the phone, so clicking while she looks gets you
  // spotted. Two clicks close together dismiss the banner.
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDismissing) return;
      if (e.button !== 0) return; // primary button only

      e.preventDefault();
      onGrab();

      const now = performance.now();
      if (now - lastClickRef.current <= STAGE_3_CONFIG.doubleClickMs) {
        setIsDismissing(true);
        playSwooshSound();
        setTimeout(() => {
          onDismiss(notification.instanceId);
        }, 180);
      }
      lastClickRef.current = now;
    },
    [isDismissing, notification.instanceId, onDismiss, onGrab]
  );

  // Stack styling: stacked cards sit just below each other with stepped depth
  const stackTop = 10 + index * 70;
  const scale = Math.max(0.9, 1 - index * 0.04);
  const opacity = Math.max(0.85, 1 - index * 0.08);

  const transformStyle = `translateY(${isDismissing ? -360 : 0}px) scale(${scale})`;

  const transitionStyle = isDismissing
    ? "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.18s ease-out"
    : "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.2s ease";

  const appTitle = notification.appLabel || "Messages";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Notification from ${notification.sender}: ${notification.message}. Double-click to dismiss.`}
      className={`notif-banner-card window ${
        notification.type === "risky" ? "notif-risky" : "notif-harmless"
      }`}
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

      {/* Dismiss hint */}
      <div className="notif-flick-hint">
        <span className="hint-arrow">▶ ▶</span>
        <span className="hint-text">DOUBLE-CLICK</span>
        <span className="hint-arrow">◀ ◀</span>
      </div>
    </div>
  );
}
