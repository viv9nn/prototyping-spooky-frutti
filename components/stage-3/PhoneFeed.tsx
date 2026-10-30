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
  bgGradient: string;
  animationType: "dance" | "cat" | "ramen" | "soap" | "gamer";
}

const FEED_VIDEOS: VideoPost[] = [
  {
    id: 1,
    author: "@pixel_dancer",
    avatar: "💃",
    caption: "Late night dance trend at 3 AM 😂 don't wake the neighbors",
    tags: "#fyp #dance #retro #arcade",
    likes: "248.5K",
    comments: "1,420",
    bgGradient: "linear-gradient(135deg, #2b1055, #7597de)",
    animationType: "dance",
  },
  {
    id: 2,
    author: "@chef_midnight",
    avatar: "🍜",
    caption: "Secret 5-minute spicy cheese ramen hack you HAVE to try 🤤🔥",
    tags: "#ramen #foodtok #midnight_snack",
    likes: "512.9K",
    comments: "3,892",
    bgGradient: "linear-gradient(135deg, #431407, #ea580c)",
    animationType: "ramen",
  },
  {
    id: 3,
    author: "@chonky_mimi",
    avatar: "🐱",
    caption: "My cat refuses to sleep until I scroll 100 videos",
    tags: "#cattok #cute #pets #meow",
    likes: "1.2M",
    comments: "8,921",
    bgGradient: "linear-gradient(135deg, #1e1b4b, #4338ca)",
    animationType: "cat",
  },
  {
    id: 4,
    author: "@asmr_slice",
    avatar: "🧼",
    caption: "Oddly satisfying crunchy soap cuts to put you right to sleep 😴✨",
    tags: "#asmr #satisfying #relaxing",
    likes: "890.3K",
    comments: "4,102",
    bgGradient: "linear-gradient(135deg, #064e3b, #10b981)",
    animationType: "soap",
  },
  {
    id: 5,
    author: "@retro_vibes",
    avatar: "👾",
    caption: "POV: You're playing dating sims on your phone past bedtime",
    tags: "#spookyfrutti #gaming #arcade #romance",
    likes: "439.1K",
    comments: "2,054",
    bgGradient: "linear-gradient(135deg, #4c0519, #e11d48)",
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

  // Auto-scroll TikTok video every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % FEED_VIDEOS.length);
      setIsLiked(false);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const video = FEED_VIDEOS[currentVideoIdx];

  return (
    <div className={`phone-mockup ${isPhoneSnatched ? "phone-snatched" : ""}`}>
      {/* Phone outer hardware bezel */}
      <div className="phone-screen">
        {/* iOS status bar */}
        <div className="phone-status-bar">
          <span className="status-time">11:42</span>
          <div className="status-notch">
            <span className="notch-speaker" />
            <span className="notch-camera" />
          </div>
          <div className="status-icons">
            <span className="icon-signal">5G</span>
            <span className="icon-wifi">📶</span>
            <span className="icon-battery">🔋 24%</span>
          </div>
        </div>

        {/* Video feed container */}
        <div
          className="tiktok-video-canvas"
          style={{ background: video.bgGradient }}
        >
          {/* Animated video content placeholder */}
          <div className="video-animation-layer">
            {video.animationType === "dance" && (
              <div className="anim-dance">
                <span className="retro-sprite sprite-dance">💃✨</span>
                <div className="music-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            {video.animationType === "ramen" && (
              <div className="anim-ramen">
                <span className="retro-sprite sprite-bowl">🍜</span>
                <span className="steam-particle">♨️</span>
              </div>
            )}
            {video.animationType === "cat" && (
              <div className="anim-cat">
                <span className="retro-sprite sprite-cat">🐱💤</span>
                <span className="floating-z">z</span>
                <span className="floating-z z2">Z</span>
              </div>
            )}
            {video.animationType === "soap" && (
              <div className="anim-soap">
                <span className="retro-sprite sprite-soap">🧼✂️</span>
                <span className="sparkle">✨</span>
              </div>
            )}
            {video.animationType === "gamer" && (
              <div className="anim-gamer">
                <span className="retro-sprite sprite-gamer">🎮💖</span>
                <span className="pixel-hearts">♥♥♥</span>
              </div>
            )}
          </div>

          {/* TikTok Right Action Sidebar */}
          <div className="tiktok-sidebar">
            <div className="sidebar-btn avatar-btn">
              <span className="avatar-circle">{video.avatar}</span>
              <span className="plus-badge">+</span>
            </div>
            <button
              type="button"
              className={`sidebar-btn like-btn ${isLiked ? "liked" : ""}`}
              onClick={() => setIsLiked(!isLiked)}
              title="Like video"
            >
              <span className="sidebar-icon">{isLiked ? "❤️" : "🤍"}</span>
              <span className="sidebar-count">{video.likes}</span>
            </button>
            <div className="sidebar-btn">
              <span className="sidebar-icon">💬</span>
              <span className="sidebar-count">{video.comments}</span>
            </div>
            <div className="sidebar-btn">
              <span className="sidebar-icon">↗️</span>
              <span className="sidebar-count">Share</span>
            </div>
            <div className="sidebar-btn disc-btn">
              <span className="vinyl-disc">💿</span>
            </div>
          </div>

          {/* TikTok Bottom Caption Info */}
          <div className="tiktok-info">
            <span className="author-handle">{video.author}</span>
            <p className="caption-text">{video.caption}</p>
            <span className="tags-text">{video.tags}</span>
            <div className="music-ticker">
              <span>🎵 Original Sound - Trending Bedtime Beats</span>
            </div>
          </div>

          {/* Notification Banners stacked on top of the phone screen */}
          <div className="notification-stack-container" aria-live="polite">
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

          {/* Swipe indicator at bottom */}
          <div className="tiktok-nav-bar">
            <span>Home</span>
            <span>Friends</span>
            <span className="nav-plus">+</span>
            <span>Inbox</span>
            <span>Profile</span>
          </div>
          <div className="home-bar-indicator" />
        </div>
      </div>
    </div>
  );
}
