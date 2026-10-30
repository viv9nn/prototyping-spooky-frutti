"use client";

import React, { useState, useEffect } from "react";
import NotificationBanner from "./NotificationBanner";
import { ActiveNotification } from "./notificationsData";
import {
  RamenVideo,
  CatVideo,
  DanceVideo,
  SoapVideo,
  GamerVideo,
} from "./TikTokVideos";

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
  avatarIcon: string;
  caption: string;
  tags: string;
  likes: string;
  comments: string;
  sound: string;
  component: React.ComponentType;
}

const FEED_VIDEOS: VideoPost[] = [
  {
    id: 1,
    author: "@chef_midnight",
    avatarIcon: "🍜",
    caption: "5-minute spicy cheese ramen hack you HAVE to try 🤤🔥",
    tags: "#ramen #foodtok #midnight",
    likes: "512.9K",
    comments: "3.8K",
    sound: "♫ Original Sound - Spooky Frutti Beats",
    component: RamenVideo,
  },
  {
    id: 2,
    author: "@chonky_mimi",
    avatarIcon: "🐱",
    caption: "Bro really thinks he's the DJ at 2 AM 😭🎧",
    tags: "#cattok #cute #lofi #meow",
    likes: "1.2M",
    comments: "8.9K",
    sound: "♫ Lofi Cat Purr - Sleep Waves",
    component: CatVideo,
  },
  {
    id: 3,
    author: "@pixel_dancer",
    avatarIcon: "💃",
    caption: "Late night dance practice at 3 AM 😂 don't wake the neighbors!",
    tags: "#fyp #dance #arcade #kpop",
    likes: "248.5K",
    comments: "1.4K",
    sound: "♫ Neon City Pop (Night Mix)",
    component: DanceVideo,
  },
  {
    id: 4,
    author: "@asmr_slices",
    avatarIcon: "🧼",
    caption: "Oddly satisfying crunchy rainbow soap cuts to put you to sleep ✨",
    tags: "#asmr #soap #relaxing #satisfying",
    likes: "890.3K",
    comments: "4.1K",
    sound: "♫ Crunchy Sounds ASMR Vol 2",
    component: SoapVideo,
  },
  {
    id: 5,
    author: "@retro_arcader",
    avatarIcon: "🎮",
    caption: "POV: Trying to play dating sims past bedtime next to Miss Oishii",
    tags: "#spookyfrutti #gaming #arcade",
    likes: "439.1K",
    comments: "2.0K",
    sound: "♫ Spooky Frutti Arcade Theme",
    component: GamerVideo,
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

  // Auto-scroll TikTok video every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % FEED_VIDEOS.length);
      setIsLiked(false);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const video = FEED_VIDEOS[currentVideoIdx];
  const VideoComponent = video.component;

  return (
    <div className={`phone-mockup window ${isPhoneSnatched ? "phone-snatched" : ""}`}>
      {/* Phone Screen Container */}
      <div className="phone-screen">
        {/* Status Bar (from screenshot: 11:42 PM - 5G [■■■ ]) */}
        <div className="phone-status-bar">
          <span className="status-time">11:42 PM</span>
          <div className="status-notch">
            <span className="notch-pill" />
          </div>
          <div className="status-meters">
            <span className="status-5g">5G</span>
            <span className="status-battery">[■■■ ]</span>
          </div>
        </div>

        {/* Video Stage Canvas */}
        <div className="tiktok-video-stage">
          <div className="video-component-wrapper">
            <VideoComponent />
          </div>

          {/* Right Action Sidebar (From screenshot) */}
          <div className="tiktok-sidebar">
            <div className="sidebar-btn avatar-btn">
              <span className="avatar-circle">{video.avatarIcon}</span>
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

            <div className="sidebar-btn share-btn">
              <span className="sidebar-icon">↗</span>
              <span className="sidebar-count">SHARE</span>
            </div>

            <div className="sidebar-btn disc-btn">
              <span className="vinyl-disc">💿</span>
            </div>
          </div>

          {/* Bottom-Left Video Caption Info (From screenshot) */}
          <div className="tiktok-info">
            <span className="author-handle">{video.author}</span>
            <p className="caption-text">{video.caption}</p>
            <span className="tags-text">{video.tags}</span>
            <div className="music-ticker">
              <span className="music-icon">🎵</span>
              <span className="music-name">{video.sound}</span>
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

          {/* Bottom Navigation Tabs: [HOME] [NOW] [+] [INBOX] [ME] (From screenshot) */}
          <div className="tiktok-bottom-tabs">
            <span className="tab-pill active">[HOME]</span>
            <span className="tab-pill">[NOW]</span>
            <span className="tab-pill add-tab">[+]</span>
            <span className="tab-pill">[INBOX]</span>
            <span className="tab-pill">[ME]</span>
          </div>

          {/* Phone Bottom Home Bar */}
          <div className="phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}
