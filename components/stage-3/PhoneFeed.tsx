"use client";

import React, { useState, useEffect } from "react";
import NotificationBanner from "./NotificationBanner";
import { ActiveNotification } from "./notificationsData";

interface PhoneFeedProps {
  notifications: ActiveNotification[];
  onDismissNotification: (instanceId: string) => void;
  onGrabNotification: () => void;
  isGirlfriendLooking: boolean;
  isPhoneSnatched: boolean;
}

interface VideoPost {
  id: number;
  author: string;
  avatar: string;
  caption: string;
  tags: string;
  likes: string;
  comments: string;
  bgClass: string;
  animationType: "dance" | "cat" | "ramen" | "soap" | "gamer";
}

const FEED_VIDEOS: VideoPost[] = [
  {
    id: 1,
    author: "@pixel_dancer",
    avatar: "💃",
    caption: "Late night dance trend at 3 AM 😂 don't wake the neighbors!",
    tags: "#fyp #dance #arcade #retro",
    likes: "248.5K",
    comments: "1.4K",
    bgClass: "feed-bg-purple",
    animationType: "dance",
  },
  {
    id: 2,
    author: "@chef_midnight",
    avatar: "🍜",
    caption: "5-minute spicy cheese ramen hack you HAVE to try 🤤🔥",
    tags: "#ramen #foodtok #midnight",
    likes: "512.9K",
    comments: "3.8K",
    bgClass: "feed-bg-orange",
    animationType: "ramen",
  },
  {
    id: 3,
    author: "@chonky_mimi",
    avatar: "🐱",
    caption: "My cat refuses to sleep until I scroll 100 videos",
    tags: "#cattok #cute #meow #pets",
    likes: "1.2M",
    comments: "8.9K",
    bgClass: "feed-bg-indigo",
    animationType: "cat",
  },
  {
    id: 4,
    author: "@asmr_slice",
    avatar: "🧼",
    caption: "Oddly satisfying crunchy soap cuts to put you to sleep 😴✨",
    tags: "#asmr #soap #relaxing #satisfying",
    likes: "890.3K",
    comments: "4.1K",
    bgClass: "feed-bg-green",
    animationType: "soap",
  },
  {
    id: 5,
    author: "@retro_vibes",
    avatar: "👾",
    caption: "POV: Playing dating sims on your phone past bedtime with Miss Oishii",
    tags: "#spookyfrutti #gaming #romance #arcade",
    likes: "439.1K",
    comments: "2.0K",
    bgClass: "feed-bg-crimson",
    animationType: "gamer",
  },
];

export default function PhoneFeed({
  notifications,
  onDismissNotification,
  onGrabNotification,
  isGirlfriendLooking,
  isPhoneSnatched,
}: PhoneFeedProps) {
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % FEED_VIDEOS.length);
      setIsLiked(false);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const video = FEED_VIDEOS[currentVideoIdx];

  return (
    <div className={`pixel-phone-case window ${isPhoneSnatched ? "phone-snatched" : ""}`}>
      {/* Phone screen with stepped pixel border */}
      <div className="pixel-phone-screen">
        {/* Pixel Status Bar */}
        <div className="pixel-status-bar">
          <span className="pixel-status-time">11:42 PM</span>
          <div className="pixel-status-notch">
            <span className="pixel-notch-dot" />
            <span className="pixel-notch-bar" />
          </div>
          <div className="pixel-status-meters">
            <span>5G</span>
            <span>[■■■ ]</span>
          </div>
        </div>

        {/* Pixel TikTok Video Stage */}
        <div className={`pixel-tiktok-stage ${video.bgClass}`}>
          {/* Animated retro pixel content */}
          <div className="pixel-video-anim">
            {video.animationType === "dance" && (
              <div className="anim-dance">
                <span className="pixel-actor">💃</span>
                <div className="pixel-eq-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            {video.animationType === "ramen" && (
              <div className="anim-ramen">
                <span className="pixel-actor">🍜</span>
                <span className="pixel-steam">♨️</span>
              </div>
            )}
            {video.animationType === "cat" && (
              <div className="anim-cat">
                <span className="pixel-actor">🐱💤</span>
                <span className="pixel-z z1">Z</span>
                <span className="pixel-z z2">z</span>
              </div>
            )}
            {video.animationType === "soap" && (
              <div className="anim-soap">
                <span className="pixel-actor">🧼✂️</span>
                <span className="pixel-sparkles">✦✦✦</span>
              </div>
            )}
            {video.animationType === "gamer" && (
              <div className="anim-gamer">
                <span className="pixel-actor">🎮💖</span>
                <span className="pixel-hearts-float">♥♥♥</span>
              </div>
            )}
          </div>

          {/* TikTok Right Action Buttons in Retro Pixel Style */}
          <div className="pixel-tiktok-sidebar">
            <div className="pixel-side-btn avatar-btn">
              <span className="pixel-avatar">{video.avatar}</span>
              <span className="pixel-badge">+</span>
            </div>
            <button
              type="button"
              className={`pixel-side-btn like-btn ${isLiked ? "liked" : ""}`}
              onClick={() => setIsLiked(!isLiked)}
              title="Like video"
            >
              <span className="pixel-btn-icon">{isLiked ? "♥" : "♡"}</span>
              <span className="pixel-btn-count">{video.likes}</span>
            </button>
            <div className="pixel-side-btn">
              <span className="pixel-btn-icon">💬</span>
              <span className="pixel-btn-count">{video.comments}</span>
            </div>
            <div className="pixel-side-btn">
              <span className="pixel-btn-icon">↗</span>
              <span className="pixel-btn-count">SHARE</span>
            </div>
            <div className="pixel-side-btn disc-btn">
              <span className="pixel-disc">💿</span>
            </div>
          </div>

          {/* TikTok Bottom Caption Info in Pixel Font */}
          <div className="pixel-tiktok-info">
            <span className="pixel-author">{video.author}</span>
            <p className="pixel-caption">{video.caption}</p>
            <span className="pixel-tags">{video.tags}</span>
            <div className="pixel-music-row">
              <span>♫ Original Sound - Spooky Frutti Beats</span>
            </div>
          </div>

          {/* Notification Stack on Top */}
          <div className="pixel-notif-container" aria-live="polite">
            {notifications.map((notif, idx) => (
              <NotificationBanner
                key={notif.instanceId}
                notification={notif}
                index={idx}
                onDismiss={onDismissNotification}
                onGrab={onGrabNotification}
                isGirlfriendLooking={isGirlfriendLooking}
              />
            ))}
          </div>

          {/* Pixel Navigation Bar at Bottom */}
          <div className="pixel-bottom-nav">
            <span className="nav-tab active-tab">[HOME]</span>
            <span className="nav-tab">[NOW]</span>
            <span className="nav-tab nav-add">[+]</span>
            <span className="nav-tab">[INBOX]</span>
            <span className="nav-tab">[ME]</span>
          </div>
          <div className="pixel-home-bar" />
        </div>
      </div>
    </div>
  );
}
