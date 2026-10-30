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

interface VideoMetadata {
  id: number;
  author: string;
  avatarRenderer: () => React.ReactNode;
  caption: string;
  tags: string;
  likes: string;
  comments: string;
  bookmarks: string;
  sound: string;
  component: React.ComponentType;
}

/** Pixel Art Avatars for Creators */
function ChefAvatar() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" shapeRendering="crispEdges">
      <rect width="34" height="34" rx="17" fill="#ea580c" />
      {/* Chef Toque */}
      <rect x="10" y="6" width="14" height="10" rx="3" fill="#ffffff" />
      <circle cx="12" cy="7" r="4" fill="#ffffff" />
      <circle cx="17" cy="5" r="4" fill="#ffffff" />
      <circle cx="22" cy="7" r="4" fill="#ffffff" />
      <rect x="11" y="14" width="12" height="3" fill="#e2e8f0" />
      {/* Face */}
      <rect x="12" y="17" width="10" height="9" fill="#fed7aa" />
      <rect x="13" y="19" width="2" height="2" fill="#1e1b4b" />
      <rect x="19" y="19" width="2" height="2" fill="#1e1b4b" />
      {/* Mustache */}
      <rect x="13" y="22" width="8" height="2" fill="#78350f" />
    </svg>
  );
}

function CatAvatar() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" shapeRendering="crispEdges">
      <rect width="34" height="34" rx="17" fill="#6366f1" />
      {/* Cat face */}
      <circle cx="17" cy="18" r="9" fill="#f8fafc" />
      <polygon points="10,13 8,6 14,11" fill="#f97316" />
      <polygon points="24,13 26,6 20,11" fill="#f8fafc" />
      <rect x="13" y="16" width="2" height="2" fill="#1e1b4b" />
      <rect x="19" y="16" width="2" height="2" fill="#1e1b4b" />
      <rect x="16" y="19" width="2" height="1" fill="#f43f5e" />
      {/* Pink Headset */}
      <path d="M 8 18 Q 17 9 26 18" stroke="#ec4899" strokeWidth="2.5" fill="none" />
      <rect x="7" y="15" width="3" height="6" fill="#ec4899" />
      <rect x="24" y="15" width="3" height="6" fill="#ec4899" />
    </svg>
  );
}

function DancerAvatar() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" shapeRendering="crispEdges">
      <rect width="34" height="34" rx="17" fill="#ec4899" />
      <circle cx="17" cy="18" r="9" fill="#fed7aa" />
      {/* Sunglasses */}
      <rect x="11" y="15" width="12" height="4" fill="#0f172a" />
      <line x1="13" y1="17" x2="16" y2="17" stroke="#38bdf8" strokeWidth="1" />
      <line x1="18" y1="17" x2="21" y2="17" stroke="#38bdf8" strokeWidth="1" />
      {/* Yellow Bucket Hat */}
      <rect x="10" y="8" width="14" height="6" fill="#facc15" />
      <rect x="8" y="13" width="18" height="2" fill="#eab308" />
    </svg>
  );
}

function SoapAvatar() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" shapeRendering="crispEdges">
      <rect width="34" height="34" rx="17" fill="#0d9488" />
      {/* Rainbow Cube */}
      <rect x="10" y="10" width="14" height="3" fill="#f43f5e" />
      <rect x="10" y="13" width="14" height="3" fill="#f97316" />
      <rect x="10" y="16" width="14" height="3" fill="#facc15" />
      <rect x="10" y="19" width="14" height="3" fill="#10b981" />
      <rect x="10" y="22" width="14" height="3" fill="#6366f1" />
    </svg>
  );
}

function GamerAvatar() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" shapeRendering="crispEdges">
      <rect width="34" height="34" rx="17" fill="#7c3aed" />
      <rect x="10" y="10" width="14" height="14" rx="2" fill="#1e1b4b" />
      {/* D-Pad */}
      <rect x="12" y="15" width="4" height="2" fill="#38bdf8" />
      <rect x="13" y="14" width="2" height="4" fill="#38bdf8" />
      {/* Buttons */}
      <circle cx="20" cy="15" r="1.5" fill="#f43f5e" />
      <circle cx="22" cy="18" r="1.5" fill="#facc15" />
    </svg>
  );
}

/** TikTok Action Icons (Pure Pixel SVG, zero emojis) */
function PixelHeartIcon({ liked }: { liked: boolean }) {
  if (liked) {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" shapeRendering="crispEdges">
        <path
          d="M 12 21 L 4 13 C 1 10 1 5 5 2 C 8 -1 11 1 12 4 C 13 1 16 -1 19 2 C 23 5 23 10 20 13 Z"
          fill="#ff0055"
        />
        <path
          d="M 12 18 L 6 12 C 4 10 4 6 7 4 C 9 2 11 3 12 5 C 13 3 15 2 17 4 C 20 6 20 10 18 12 Z"
          fill="#ff3b77"
        />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" shapeRendering="crispEdges">
      <path
        d="M 12 21 L 4 13 C 1 10 1 5 5 2 C 8 -1 11 1 12 4 C 13 1 16 -1 19 2 C 23 5 23 10 20 13 Z"
        fill="rgba(0,0,0,0.4)"
        stroke="#ffffff"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function PixelCommentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" shapeRendering="crispEdges">
      <path
        d="M 4 4 L 20 4 L 20 16 L 10 16 L 6 20 L 6 16 L 4 16 Z"
        fill="rgba(0,0,0,0.4)"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <circle cx="8.5" cy="10" r="1.5" fill="#ffffff" />
      <circle cx="12" cy="10" r="1.5" fill="#ffffff" />
      <circle cx="15.5" cy="10" r="1.5" fill="#ffffff" />
    </svg>
  );
}

function PixelBookmarkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" shapeRendering="crispEdges">
      <path
        d="M 6 3 L 18 3 L 18 21 L 12 16 L 6 21 Z"
        fill="rgba(0,0,0,0.4)"
        stroke="#ffffff"
        strokeWidth="2"
      />
    </svg>
  );
}

function PixelShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" shapeRendering="crispEdges">
      <path
        d="M 14 5 L 21 11 L 14 17 L 14 13 C 8 13 4 15 2 20 C 3 13 7 9 14 8 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function PixelDiscIcon() {
  return (
    <div className="spinning-vinyl-wrap">
      <svg width="34" height="34" viewBox="0 0 34 34" shapeRendering="crispEdges" className="vinyl-disc-svg">
        <circle cx="17" cy="17" r="16" fill="#18181b" stroke="#27272a" strokeWidth="2" />
        <circle cx="17" cy="17" r="12" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="17" cy="17" r="8" fill="none" stroke="#27272a" strokeWidth="1" />
        <circle cx="17" cy="17" r="6" fill="#f43f5e" />
        <circle cx="17" cy="17" r="2" fill="#ffffff" />
      </svg>
    </div>
  );
}

const FEED_VIDEOS: VideoMetadata[] = [
  {
    id: 1,
    author: "@chef_midnight",
    avatarRenderer: ChefAvatar,
    caption: "5-minute spicy cheese ramen hack you HAVE to try 🤤🔥",
    tags: "#ramen #foodtok #midnight",
    likes: "512.9K",
    comments: "3.8K",
    bookmarks: "128K",
    sound: "♫ Midnight Kitchen Beats - Chef",
    component: RamenVideo,
  },
  {
    id: 2,
    author: "@chonky_mimi",
    avatarRenderer: CatAvatar,
    caption: "Bro really thinks he's the DJ at 2 AM 😭🎧",
    tags: "#cattok #cute #lofi #meow",
    likes: "1.2M",
    comments: "8.9K",
    bookmarks: "340K",
    sound: "♫ Lofi Cat Purr - Sleep Waves",
    component: CatVideo,
  },
  {
    id: 3,
    author: "@pixel_dancer",
    avatarRenderer: DancerAvatar,
    caption: "Late night dance practice at 3 AM 😂 don't wake the neighbors!",
    tags: "#fyp #dance #arcade #kpop",
    likes: "248.5K",
    comments: "1.4K",
    bookmarks: "56K",
    sound: "♫ Neon City Pop (Night Mix)",
    component: DanceVideo,
  },
  {
    id: 4,
    author: "@asmr_slices",
    avatarRenderer: SoapAvatar,
    caption: "Oddly satisfying crunchy rainbow soap cuts to put you to sleep ✨",
    tags: "#asmr #soap #relaxing #satisfying",
    likes: "890.3K",
    comments: "4.1K",
    bookmarks: "210K",
    sound: "♫ Crunchy Sounds ASMR Vol 2",
    component: SoapVideo,
  },
  {
    id: 5,
    author: "@retro_arcader",
    avatarRenderer: GamerAvatar,
    caption: "POV: Trying to play dating sims past bedtime next to Miss Oishii",
    tags: "#spookyfrutti #gaming #arcade",
    likes: "439.1K",
    comments: "2.0K",
    bookmarks: "94K",
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

  // Auto-scroll TikTok video every 5.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % FEED_VIDEOS.length);
      setIsLiked(false);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  const video = FEED_VIDEOS[currentVideoIdx];
  const VideoComponent = video.component;
  const AvatarComponent = video.avatarRenderer;

  return (
    <div className={`pixel-phone-case window ${isPhoneSnatched ? "phone-snatched" : ""}`}>
      {/* Outer Phone Mockup Frame */}
      <div className="pixel-phone-screen">
        {/* Pixel Status Bar */}
        <div className="pixel-status-bar">
          <span className="pixel-status-time">11:42 PM</span>
          {/* Dynamic Island / Camera Punch Hole */}
          <div className="pixel-status-notch">
            <span className="pixel-notch-dot" />
            <span className="pixel-notch-bar" />
          </div>
          <div className="pixel-status-meters">
            <span className="pixel-5g-text">5G</span>
            <span className="pixel-battery-icon">[■■■■]</span>
          </div>
        </div>

        {/* Top TikTok Feeds Navigation Tabs */}
        <div className="pixel-tiktok-header-tabs">
          <div className="tiktok-live-badge">
            <span className="live-red-dot" />
            <span className="live-text">LIVE</span>
          </div>
          <div className="tiktok-center-tabs">
            <span className="tab-following">Following</span>
            <span className="tab-separator">|</span>
            <span className="tab-foryou active">
              For You
              <span className="active-underline" />
            </span>
          </div>
          <div className="tiktok-search-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="#ffffff" strokeWidth="2" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Video Stage with Animated Pixel Scene */}
        <div className="pixel-tiktok-stage">
          <div className="pixel-video-wrapper">
            <VideoComponent />
          </div>

          {/* TikTok Right Action Sidebar (Pure Pixel Art, Zero generic emojis) */}
          <div className="pixel-tiktok-sidebar">
            {/* Creator Profile Avatar */}
            <div className="pixel-side-btn avatar-btn">
              <div className="pixel-avatar-frame">
                <AvatarComponent />
              </div>
              <span className="pixel-badge-plus">+</span>
            </div>

            {/* Like Button */}
            <button
              type="button"
              className={`pixel-side-btn like-btn ${isLiked ? "liked" : ""}`}
              onClick={() => setIsLiked(!isLiked)}
              title="Like video"
            >
              <div className="pixel-btn-icon-wrap">
                <PixelHeartIcon liked={isLiked} />
              </div>
              <span className="pixel-btn-count">{video.likes}</span>
            </button>

            {/* Comment Button */}
            <div className="pixel-side-btn">
              <div className="pixel-btn-icon-wrap">
                <PixelCommentIcon />
              </div>
              <span className="pixel-btn-count">{video.comments}</span>
            </div>

            {/* Bookmark Button */}
            <div className="pixel-side-btn">
              <div className="pixel-btn-icon-wrap">
                <PixelBookmarkIcon />
              </div>
              <span className="pixel-btn-count">{video.bookmarks}</span>
            </div>

            {/* Share Button */}
            <div className="pixel-side-btn">
              <div className="pixel-btn-icon-wrap">
                <PixelShareIcon />
              </div>
              <span className="pixel-btn-count">Share</span>
            </div>

            {/* Spinning Vinyl Record */}
            <div className="pixel-side-btn disc-btn">
              <PixelDiscIcon />
              <div className="floating-music-notes">
                <span className="f-note n1">♪</span>
                <span className="f-note n2">♫</span>
              </div>
            </div>
          </div>

          {/* TikTok Bottom Caption Info (Pixel Font) */}
          <div className="pixel-tiktok-info">
            <div className="pixel-author-row">
              <span className="pixel-author">{video.author}</span>
              <span className="pixel-verified-badge">✓</span>
            </div>
            <p className="pixel-caption">{video.caption}</p>
            <span className="pixel-tags">{video.tags}</span>
            <div className="pixel-music-row">
              <span className="music-note-icon">♫</span>
              <span className="music-title">{video.sound}</span>
            </div>
          </div>

          {/* Notification Stack on Top of Phone */}
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

          {/* Bottom Tab Bar (Authentic Pixel Navigation) */}
          <div className="pixel-bottom-nav">
            <div className="nav-tab active-tab">
              {/* Home Icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" shapeRendering="crispEdges">
                <path d="M 9 2 L 2 8 L 4 8 L 4 16 L 8 16 L 8 11 L 10 11 L 10 16 L 14 16 L 14 8 L 16 8 Z" fill="#ffffff" />
              </svg>
              <span className="nav-label">Home</span>
            </div>

            <div className="nav-tab">
              {/* Friends/Now Icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" shapeRendering="crispEdges">
                <circle cx="7" cy="6" r="3" fill="#94a3b8" />
                <path d="M 2 15 C 2 12 4 11 7 11 C 10 11 12 12 12 15 Z" fill="#94a3b8" />
                <circle cx="13" cy="7" r="2.5" fill="#64748b" />
                <path d="M 12 15 C 12 13 13 12.5 15 12.5 C 16.5 12.5 17 13.5 17 15 Z" fill="#64748b" />
              </svg>
              <span className="nav-label">Friends</span>
            </div>

            {/* Iconic TikTok [+] Create Button */}
            <div className="nav-tab nav-add-tab">
              <div className="tiktok-add-btn">
                <span className="add-cyan" />
                <span className="add-magenta" />
                <span className="add-white">
                  <span className="add-plus">+</span>
                </span>
              </div>
            </div>

            <div className="nav-tab">
              {/* Inbox Icon with Red Dot */}
              <div className="inbox-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 18 18" shapeRendering="crispEdges">
                  <rect x="2" y="4" width="14" height="10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M 2 4 L 9 10 L 16 4" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="inbox-badge">2</span>
              </div>
              <span className="nav-label">Inbox</span>
            </div>

            <div className="nav-tab">
              {/* Profile Icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" shapeRendering="crispEdges">
                <circle cx="9" cy="6" r="3.5" fill="#94a3b8" />
                <path d="M 3 16 C 3 12.5 5.5 11.5 9 11.5 C 12.5 11.5 15 12.5 15 16 Z" fill="#94a3b8" />
              </svg>
              <span className="nav-label">Profile</span>
            </div>
          </div>

          {/* Pixel Home Screen Touch Bar */}
          <div className="pixel-home-bar" />
        </div>
      </div>
    </div>
  );
}
