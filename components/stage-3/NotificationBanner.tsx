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

/** Pixel Art App Icons for the Notification Banner */
function AppPixelIcon({ appLabel, sender }: { appLabel?: string; sender: string }) {
  const label = (appLabel || "").toLowerCase();
  const name = sender.toLowerCase();

  if (label.includes("instagram") || name.includes("insta")) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
        <rect width="22" height="22" rx="4" fill="#e1306c" />
        <rect x="2" y="2" width="18" height="18" fill="#c13584" />
        <rect x="4" y="4" width="14" height="14" fill="#f56040" />
        <rect x="6" y="6" width="10" height="10" fill="none" stroke="#ffffff" strokeWidth="2" />
        <circle cx="11" cy="11" r="2.5" fill="#ffffff" />
        <rect x="13.5" y="6.5" width="2" height="2" fill="#ffffff" />
      </svg>
    );
  }

  if (label.includes("tinder")) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
        <rect width="22" height="22" rx="4" fill="#fd3a73" />
        <path
          d="M 11 4 C 11 7 8 9 8 13 C 8 16 10 18 13 18 C 16 18 18 16 18 13 C 18 9 14 6 14 4 Z"
          fill="#ff7854"
        />
        <path
          d="M 11 10 C 11 12 10 13 10 15 C 10 17 11.5 17.5 12.5 17.5 C 14 17.5 15 16.5 15 14.5 C 15 12.5 12.5 11 12.5 10 Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (label.includes("weather") || name.includes("weather")) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
        <rect width="22" height="22" rx="4" fill="#38bdf8" />
        {/* Golden Sun */}
        <circle cx="14" cy="8" r="4" fill="#facc15" />
        {/* Soft Cloud */}
        <rect x="4" y="10" width="12" height="7" rx="2" fill="#ffffff" />
        <rect x="7" y="7" width="7" height="6" rx="2" fill="#ffffff" />
      </svg>
    );
  }

  if (label.includes("duolingo") || name.includes("duolingo")) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
        <rect width="22" height="22" rx="4" fill="#58cc02" />
        <circle cx="7.5" cy="10" r="3.5" fill="#ffffff" />
        <circle cx="7.5" cy="10" r="1.5" fill="#1c1440" />
        <circle cx="14.5" cy="10" r="3.5" fill="#ffffff" />
        <circle cx="14.5" cy="10" r="1.5" fill="#1c1440" />
        <polygon points="11,12 9,15 13,15" fill="#ff9600" />
      </svg>
    );
  }

  if (label.includes("battery") || name.includes("battery") || label.includes("system")) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
        <rect width="22" height="22" rx="4" fill="#1e1840" />
        <rect x="3" y="7" width="14" height="8" rx="1" fill="none" stroke="#ef4444" strokeWidth="2" />
        <rect x="17" y="9" width="2" height="4" fill="#ef4444" />
        <rect x="5" y="9" width="4" height="4" fill="#ef4444" />
      </svg>
    );
  }

  if (label.includes("calendar") || name.includes("calendar")) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
        <rect width="22" height="22" rx="4" fill="#ffffff" />
        <rect x="0" y="0" width="22" height="6" rx="2" fill="#ef4444" />
        <rect x="4" y="1" width="2" height="2" fill="#1c1440" />
        <rect x="16" y="1" width="2" height="2" fill="#1c1440" />
        <text
          x="11"
          y="17"
          fill="#1c1440"
          fontSize="10"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="monospace"
        >
          28
        </text>
      </svg>
    );
  }

  // Default: iOS-style Green Messages App
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" shapeRendering="crispEdges">
      <rect width="22" height="22" rx="4" fill="#22c55e" />
      <path
        d="M 5 6 C 5 4.5 6.5 4 8 4 L 14 4 C 15.5 4 17 4.5 17 6 L 17 12 C 17 13.5 15.5 14 14 14 L 9 14 L 6 17 L 6 14 C 5 13.5 5 12.5 5 12 Z"
        fill="#ffffff"
      />
    </svg>
  );
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

  // Stack styling: stacked cards sit just below each other with slight 3D depth
  const stackTop = 10 + index * 68;
  const scale = Math.max(0.9, 1 - index * 0.04);
  const opacity = Math.max(0.85, 1 - index * 0.08);

  const transformStyle = `translateY(${offsetY}px) scale(${scale})`;

  const transitionStyle = isDragging
    ? "none"
    : isDismissing
    ? "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.18s ease-out"
    : "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.2s ease";

  const appTitle = (notification.appLabel || "MESSAGES").toUpperCase();

  return (
    <div
      ref={bannerRef}
      role="button"
      tabIndex={0}
      aria-label={`Notification from ${notification.sender}: ${notification.message}. Flick up to dismiss.`}
      className={`aesthetic-pixel-banner window ${
        notification.type === "risky" ? "banner-risky" : "banner-harmless"
      } ${isDragging ? "banner-dragging" : ""}`}
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
      {/* Top Header Row with Pixel App Icon */}
      <div className="banner-top-row">
        <div className="banner-app-info">
          <span className="banner-app-icon">
            <AppPixelIcon appLabel={notification.appLabel} sender={notification.sender} />
          </span>
          <span className="banner-app-name">{appTitle}</span>
        </div>
        <span className="banner-time-tag">• now</span>
      </div>

      {/* Main Sender & Message Preview Row */}
      <div className="banner-content-row">
        <span className="banner-sender-name">{notification.sender}</span>
        <span className="banner-text-snippet">{notification.message}</span>
      </div>

      {/* Subtle Flick Hint Handle (Flick up gesture guide) */}
      <div className="banner-flick-handle">
        <span className="flick-chevron">▲</span>
        <span className="flick-hint-text">FLICK UP</span>
        <span className="flick-chevron">▲</span>
      </div>
    </div>
  );
}
