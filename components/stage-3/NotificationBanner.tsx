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
      if (e.button !== 0) return;

      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // fallback if capture fails
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
      const dy = oldest.y - e.clientY;

      const upwardVelocity = dy / dt;
      const upwardDistance = startYRef.current - e.clientY;

      const isFlickSuccess =
        upwardVelocity >= STAGE_3_CONFIG.flickMinVelocity &&
        upwardDistance >= STAGE_3_CONFIG.flickMinDistancePx;

      if (isFlickSuccess) {
        setIsDismissing(true);
        playSwooshSound();
        setOffsetY(-350);

        setTimeout(() => {
          onDismiss(notification.instanceId);
        }, 180);
      } else {
        setOffsetY(0);
        if (upwardDistance > 8) {
          playSnapBackSound();
        }
      }
    },
    [isDragging, isDismissing, notification.instanceId, onDismiss]
  );

  const stackTop = 14 + index * 72;
  const scale = Math.max(0.9, 1 - index * 0.03);
  const opacity = Math.max(0.85, 1 - index * 0.08);

  const transformStyle = `translateY(${offsetY}px) scale(${scale})`;

  const transitionStyle = isDragging
    ? "none"
    : isDismissing
    ? "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.18s ease-out"
    : "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.2s ease";

  return (
    <div
      ref={bannerRef}
      role="button"
      tabIndex={0}
      aria-label={`Notification from ${notification.sender}: ${notification.message}. Flick up to dismiss.`}
      className={`notif-banner ${notification.type === "risky" ? "notif-risky" : "notif-harmless"} ${
        isDragging ? "notif-dragging" : ""
      }`}
      style={{
        top: `${stackTop}px`,
        transform: transformStyle,
        transition: transitionStyle,
        opacity: isDismissing ? 0 : opacity,
        zIndex: 50 - index,
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
    >
      <div className="notif-header">
        <span className="notif-app-icon">{notification.appIcon || "💬"}</span>
        <span className="notif-app-name">{notification.appLabel || "MESSAGES"}</span>
        <span className="notif-time">now</span>
      </div>
      <div className="notif-body">
        <strong className="notif-sender">{notification.sender}</strong>
        <span className="notif-message">{notification.message}</span>
      </div>
      <div className="notif-handle-bar" />
    </div>
  );
}
