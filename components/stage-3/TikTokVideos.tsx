"use client";

import React from "react";

/**
 * 100% Authentic Pixel-Art Video Scenes for the TikTok Feed
 * Rendered using crisp pixel-art SVGs (shapeRendering="crispEdges")
 * with lively CSS animations. ZERO generic system emojis!
 */

/** VIDEO 1: Midnight Spicy Cheese Ramen Mukbang (@chef_midnight) */
export function RamenVideo() {
  return (
    <div className="tiktok-scene ramen-scene">
      <svg
        viewBox="0 0 240 320"
        className="pixel-video-svg"
        shapeRendering="crispEdges"
      >
        {/* Cozy Izakaya Background */}
        <rect width="240" height="320" fill="#1c0f0a" />

        {/* Traditional Wood Plank Wall */}
        <rect x="0" y="0" width="240" height="230" fill="#2a160c" />
        <line x1="0" y1="40" x2="240" y2="40" stroke="#1c0f0a" strokeWidth="2" />
        <line x1="0" y1="90" x2="240" y2="90" stroke="#1c0f0a" strokeWidth="2" />
        <line x1="0" y1="140" x2="240" y2="140" stroke="#1c0f0a" strokeWidth="2" />
        <line x1="0" y1="190" x2="240" y2="190" stroke="#1c0f0a" strokeWidth="2" />

        {/* Glowing Red Japanese Paper Lanterns */}
        <g className="anim-lantern-glow">
          {/* Left Lantern */}
          <rect x="22" y="10" width="2" height="14" fill="#000000" />
          <rect x="14" y="24" width="18" height="26" fill="#dc2626" rx="3" />
          <rect x="16" y="26" width="14" height="22" fill="#ef4444" />
          <rect x="20" y="30" width="6" height="14" fill="#fef08a" />
          <rect x="18" y="22" width="10" height="2" fill="#1c0f0a" />
          <rect x="18" y="50" width="10" height="2" fill="#1c0f0a" />

          {/* Right Lantern */}
          <rect x="202" y="10" width="2" height="14" fill="#000000" />
          <rect x="194" y="24" width="18" height="26" fill="#dc2626" rx="3" />
          <rect x="196" y="26" width="14" height="22" fill="#ef4444" />
          <rect x="200" y="30" width="6" height="14" fill="#fef08a" />
          <rect x="198" y="22" width="10" height="2" fill="#1c0f0a" />
          <rect x="198" y="50" width="10" height="2" fill="#1c0f0a" />
        </g>

        {/* Wooden Kitchen Counter Shelf */}
        <rect x="0" y="220" width="240" height="100" fill="#451a03" />
        <rect x="0" y="220" width="240" height="8" fill="#78350f" />
        <rect x="0" y="228" width="240" height="2" fill="#290e02" />

        {/* Condiment Jars (Shoyu, Rayu, Chili flakes) */}
        <rect x="14" y="196" width="12" height="24" fill="#78350f" />
        <rect x="16" y="192" width="8" height="4" fill="#e2e8f0" />
        <rect x="15" y="202" width="10" height="14" fill="#b91c1c" />

        <rect x="30" y="200" width="10" height="20" fill="#15803d" />
        <rect x="32" y="196" width="6" height="4" fill="#fef08a" />

        {/* Ramen Bowl Outer Rim (Ceramic Black & Red) */}
        <ellipse cx="120" cy="190" rx="76" ry="46" fill="#09090b" />
        <ellipse cx="120" cy="186" rx="73" ry="43" fill="#b91c1c" />
        <ellipse cx="120" cy="184" rx="70" ry="40" fill="#ea580c" />

        {/* Steaming Spicy Broth */}
        <ellipse cx="120" cy="183" rx="64" ry="34" fill="#c2410c" />
        <ellipse cx="120" cy="181" rx="58" ry="29" fill="#f97316" />
        <ellipse cx="118" cy="179" rx="52" ry="24" fill="#fb923c" />

        {/* Curly Noodles Swirls */}
        <path
          d="M 85 174 Q 100 162 118 175 Q 136 186 155 172"
          stroke="#fef08a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 90 182 Q 110 170 130 182 Q 145 190 152 178"
          stroke="#fde047"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 96 188 Q 115 178 135 188"
          stroke="#fef08a"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Slices of Chashu Pork */}
        <ellipse cx="92" cy="170" rx="18" ry="12" fill="#881337" />
        <ellipse cx="92" cy="170" rx="14" ry="9" fill="#be123c" />
        <ellipse cx="92" cy="170" rx="8" ry="5" fill="#fda4af" />

        {/* Marinated Ajitsuke Tamago (Ramen Egg Half) */}
        <ellipse cx="146" cy="172" rx="16" ry="12" fill="#fffbeb" />
        <ellipse cx="146" cy="172" rx="10" ry="8" fill="#f97316" />
        <ellipse cx="144" cy="170" rx="7" ry="5" fill="#facc15" />

        {/* Narutomaki (White fish cake with pink spiral) */}
        <circle cx="120" cy="190" r="10" fill="#ffffff" />
        <path
          d="M 116 190 Q 120 186 124 190 Q 124 194 120 194 Q 117 194 118 190"
          stroke="#f43f5e"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Crispy Nori Seaweed Sheet */}
        <rect x="68" y="142" width="18" height="30" fill="#14532d" transform="rotate(-15 68 142)" />

        {/* Fresh Scallions / Green Onions */}
        <rect x="110" y="165" width="5" height="4" fill="#22c55e" />
        <rect x="122" y="162" width="4" height="5" fill="#22c55e" />
        <rect x="132" y="182" width="5" height="4" fill="#4ade80" />
        <rect x="104" y="184" width="4" height="4" fill="#22c55e" />

        {/* Animated Chopsticks Lifting Noodles */}
        <g className="anim-chopsticks">
          <line x1="95" y1="88" x2="155" y2="152" stroke="#78350f" strokeWidth="4" />
          <line x1="102" y1="84" x2="160" y2="152" stroke="#92400e" strokeWidth="4" />
          {/* Dripping lifted noodles */}
          <path
            d="M 155 152 Q 160 162 156 174 Q 152 184 158 192"
            stroke="#fef08a"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M 158 152 Q 164 164 160 176"
            stroke="#fde047"
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* Animated Rising Steam Particles */}
        <g className="anim-steam">
          <path
            d="M 112 145 Q 106 125 116 105 Q 126 85 116 65"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 4"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 128 140 Q 138 120 128 100 Q 118 80 128 60"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 4"
            fill="none"
            opacity="0.8"
          />
        </g>
      </svg>

      {/* Aesthetic Pixel On-Screen TikTok Subtitle Bar */}
      <div className="pixel-video-caption-pill">
        <span className="caption-tag">FOODTOK</span>
        <span className="caption-text">3AM Spicy Cheese Ramen Hack</span>
      </div>
    </div>
  );
}

/** VIDEO 2: Lo-Fi Dancing Calico Cat (@chonky_mimi) */
export function CatVideo() {
  return (
    <div className="tiktok-scene cat-scene">
      <svg
        viewBox="0 0 240 320"
        className="pixel-video-svg"
        shapeRendering="crispEdges"
      >
        {/* Cozy Lo-Fi Bedroom */}
        <rect width="240" height="320" fill="#13102a" />

        {/* Purple LED Wall Wash & String Lights */}
        <rect x="0" y="0" width="240" height="220" fill="#1e1840" />
        <g className="anim-string-lights">
          <line x1="0" y1="20" x2="240" y2="28" stroke="#3b3264" strokeWidth="2" />
          <circle cx="20" cy="21" r="3" fill="#facc15" />
          <circle cx="50" cy="22" r="3" fill="#f43f5e" />
          <circle cx="80" cy="23" r="3" fill="#38bdf8" />
          <circle cx="110" cy="24" r="3" fill="#a855f7" />
          <circle cx="140" cy="25" r="3" fill="#facc15" />
          <circle cx="170" cy="26" r="3" fill="#34d399" />
          <circle cx="200" cy="27" r="3" fill="#f43f5e" />
          <circle cx="230" cy="28" r="3" fill="#38bdf8" />
        </g>

        {/* Bedroom Window with gentle rainy streaks */}
        <rect x="25" y="45" width="80" height="70" fill="#0b081d" rx="2" />
        <rect x="25" y="45" width="80" height="70" stroke="#312a58" strokeWidth="3" fill="none" />
        <line x1="65" y1="45" x2="65" y2="115" stroke="#312a58" strokeWidth="2" />
        <line x1="25" y1="80" x2="105" y2="80" stroke="#312a58" strokeWidth="2" />
        {/* Rain streaks */}
        <line x1="38" y1="52" x2="34" y2="68" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
        <line x1="52" y1="70" x2="48" y2="86" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
        <line x1="78" y1="56" x2="74" y2="72" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
        <line x1="92" y1="78" x2="88" y2="94" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />

        {/* Small floating shelf with cute potted cactus */}
        <rect x="140" y="80" width="70" height="6" fill="#6d3919" />
        <rect x="155" y="66" width="14" height="14" fill="#ea580c" />
        <rect x="158" y="52" width="8" height="14" fill="#22c55e" />
        <rect x="166" y="56" width="4" height="6" fill="#22c55e" />

        {/* Striped Bedroom Floor & Fluffy Rug */}
        <rect x="0" y="210" width="240" height="110" fill="#2e1a47" />
        <ellipse cx="120" cy="245" rx="88" ry="46" fill="#4338ca" />
        <ellipse cx="120" cy="245" rx="74" ry="38" fill="#4f46e5" />
        <ellipse cx="120" cy="245" rx="58" ry="28" fill="#6366f1" />

        {/* Dancing Chubby Calico Cat with Pink Gamer Headset */}
        <g className="anim-cat-bop">
          {/* Cat Shadow */}
          <ellipse cx="120" cy="250" rx="36" ry="12" fill="#000000" opacity="0.4" />

          {/* Chubby White Body */}
          <ellipse cx="120" cy="216" rx="34" ry="26" fill="#f8fafc" />
          {/* Calico orange and black patches */}
          <ellipse cx="106" cy="208" rx="14" ry="12" fill="#f97316" />
          <ellipse cx="134" cy="222" rx="14" ry="10" fill="#1e1b4b" />

          {/* Cat Head */}
          <circle cx="120" cy="172" r="24" fill="#f8fafc" />
          {/* Calico orange patch on head */}
          <path d="M 104 156 Q 118 152 120 172 Z" fill="#f97316" />

          {/* Cat Ears */}
          <polygon points="102,154 94,136 112,148" fill="#f97316" />
          <polygon points="102,152 98,140 110,148" fill="#fda4af" />
          <polygon points="138,154 146,136 128,148" fill="#f8fafc" />
          <polygon points="138,152 142,140 130,148" fill="#fda4af" />

          {/* Happy Grooving Eyes (Closed anime curves) */}
          <path d="M 108 172 Q 113 167 118 172" stroke="#1e1b4b" strokeWidth="2.5" fill="none" />
          <path d="M 122 172 Q 127 167 132 172" stroke="#1e1b4b" strokeWidth="2.5" fill="none" />

          {/* Tiny Pink Nose & Cute Mouth */}
          <polygon points="119,176 121,176 120,178" fill="#f43f5e" />
          <path d="M 117 180 Q 120 182 123 180" stroke="#1e1b4b" strokeWidth="2" fill="none" />

          {/* Rosy Pixel Blush */}
          <rect x="103" y="176" width="6" height="3" fill="#fb7185" />
          <rect x="131" y="176" width="6" height="3" fill="#fb7185" />

          {/* Pink Gaming Headset */}
          <path d="M 96 172 Q 120 142 144 172" stroke="#ec4899" strokeWidth="4" fill="none" />
          {/* Ear-cups */}
          <rect x="92" y="164" width="8" height="18" rx="3" fill="#ec4899" />
          <rect x="94" y="166" width="4" height="14" rx="2" fill="#f472b6" />
          <rect x="140" y="164" width="8" height="18" rx="3" fill="#ec4899" />
          <rect x="142" y="166" width="4" height="14" rx="2" fill="#f472b6" />

          {/* Cute Paws tapping */}
          <ellipse cx="108" cy="234" rx="7" ry="5" fill="#f8fafc" />
          <ellipse cx="132" cy="234" rx="7" ry="5" fill="#f8fafc" />
          {/* Pink toe beans */}
          <circle cx="108" cy="234" r="2" fill="#fda4af" />
          <circle cx="132" cy="234" r="2" fill="#fda4af" />

          {/* Swishing Tail */}
          <path
            d="M 152 225 Q 166 218 162 202 Q 155 194 148 200"
            stroke="#f97316"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Animated Music Notes & Floating Hearts */}
        <g className="anim-floating-beats">
          <text x="82" y="140" fill="#f43f5e" fontSize="16" fontWeight="bold">♫</text>
          <text x="146" y="132" fill="#a855f7" fontSize="18" fontWeight="bold">♪</text>
          <text x="158" y="152" fill="#ec4899" fontSize="14" fontWeight="bold">♥</text>
        </g>
      </svg>

      <div className="pixel-video-caption-pill">
        <span className="caption-tag">PETTOK</span>
        <span className="caption-text">Bro won&apos;t sleep until beat drops</span>
      </div>
    </div>
  );
}

/** VIDEO 3: Neon K-Pop Dance Challenge (@pixel_dancer) */
export function DanceVideo() {
  return (
    <div className="tiktok-scene dance-scene">
      <svg
        viewBox="0 0 240 320"
        className="pixel-video-svg"
        shapeRendering="crispEdges"
      >
        {/* Neon Dance Practice Studio */}
        <rect width="240" height="320" fill="#090514" />

        {/* Perspective Grid Floor with Pink Neon Glow */}
        <path d="M 0 210 L 240 210 L 240 320 L 0 320 Z" fill="#140828" />
        <line x1="0" y1="230" x2="240" y2="230" stroke="#701a75" strokeWidth="2" />
        <line x1="0" y1="260" x2="240" y2="260" stroke="#701a75" strokeWidth="2" />
        <line x1="0" y1="290" x2="240" y2="290" stroke="#701a75" strokeWidth="2" />

        <line x1="120" y1="210" x2="120" y2="320" stroke="#ec4899" strokeWidth="2" />
        <line x1="120" y1="210" x2="40" y2="320" stroke="#ec4899" strokeWidth="2" />
        <line x1="120" y1="210" x2="200" y2="320" stroke="#ec4899" strokeWidth="2" />
        <line x1="120" y1="210" x2="-20" y2="320" stroke="#06b6d4" strokeWidth="2" />
        <line x1="120" y1="210" x2="260" y2="320" stroke="#06b6d4" strokeWidth="2" />

        {/* Neon Wall Ring Light & Sign */}
        <g className="anim-neon-pulse">
          <ellipse cx="120" cy="80" rx="34" ry="34" fill="none" stroke="#ec4899" strokeWidth="4" />
          <ellipse cx="120" cy="80" rx="30" ry="30" fill="none" stroke="#ffffff" strokeWidth="2" />
          <line x1="120" y1="114" x2="120" y2="210" stroke="#334155" strokeWidth="3" />
        </g>

        {/* Neon Light Tubes on Side Walls */}
        <rect x="14" y="30" width="6" height="150" fill="#06b6d4" />
        <rect x="220" y="30" width="6" height="150" fill="#f43f5e" />

        {/* Dancing Pixel Idol Character */}
        <g className="anim-pixel-dancer">
          {/* Shadow */}
          <ellipse cx="120" cy="265" rx="30" ry="8" fill="#000000" opacity="0.6" />

          {/* Chunky Retro Sneakers */}
          <rect x="102" y="252" width="14" height="10" fill="#ffffff" />
          <rect x="124" y="250" width="14" height="10" fill="#ffffff" />
          <rect x="102" y="258" width="14" height="4" fill="#ec4899" />
          <rect x="124" y="256" width="14" height="4" fill="#06b6d4" />

          {/* Baggy Cargo Streetwear Pants */}
          <rect x="103" y="206" width="14" height="48" fill="#1e293b" />
          <rect x="123" y="204" width="14" height="48" fill="#1e293b" />

          {/* Cool Oversized Cropped Hoodie */}
          <rect x="98" y="160" width="44" height="48" fill="#a855f7" />
          <rect x="106" y="160" width="28" height="48" fill="#c084fc" />

          {/* Arms Dancing */}
          <rect x="80" y="165" width="20" height="10" fill="#a855f7" transform="rotate(-25 80 165)" />
          <rect x="140" y="160" width="20" height="10" fill="#a855f7" transform="rotate(35 140 160)" />

          {/* Head & Stylish Bucket Hat */}
          <rect x="108" y="128" width="24" height="24" fill="#fed7aa" />
          {/* Retro Sunglasses */}
          <rect x="106" y="136" width="28" height="8" fill="#0f172a" />
          <line x1="110" y1="140" x2="118" y2="140" stroke="#38bdf8" strokeWidth="2" />
          <line x1="124" y1="140" x2="132" y2="140" stroke="#38bdf8" strokeWidth="2" />

          {/* Yellow Bucket Hat */}
          <rect x="100" y="116" width="40" height="14" fill="#facc15" />
          <rect x="94" y="128" width="52" height="4" fill="#eab308" />
        </g>

        {/* Glinting Neon Sparkles */}
        <g className="anim-sparkle">
          <text x="35" y="100" fill="#facc15" fontSize="18">✦</text>
          <text x="190" y="120" fill="#38bdf8" fontSize="20">✧</text>
          <text x="50" y="180" fill="#ec4899" fontSize="16">✦</text>
          <text x="180" y="70" fill="#f43f5e" fontSize="14">✦</text>
        </g>
      </svg>

      <div className="pixel-video-caption-pill">
        <span className="caption-tag">DANCETOK</span>
        <span className="caption-text">Supernova Dance Challenge ✨</span>
      </div>
    </div>
  );
}

/** VIDEO 4: Satisfying Rainbow Soap Slicing ASMR (@asmr_slices) */
export function SoapVideo() {
  return (
    <div className="tiktok-scene soap-scene">
      <svg
        viewBox="0 0 240 320"
        className="pixel-video-svg"
        shapeRendering="crispEdges"
      >
        {/* Soft Pastel Studio Backdrop */}
        <rect width="240" height="320" fill="#042f2e" />
        <rect x="0" y="210" width="240" height="110" fill="#115e59" />

        {/* Large Rainbow Pastel Soap Block */}
        <g transform="translate(42, 110)">
          {/* Layer 1: Coral Pink */}
          <rect x="10" y="20" width="136" height="20" fill="#f43f5e" />
          <rect x="10" y="16" width="136" height="4" fill="#fb7185" />
          {/* Layer 2: Sunset Orange */}
          <rect x="10" y="40" width="136" height="20" fill="#f97316" />
          <rect x="10" y="36" width="136" height="4" fill="#fb923c" />
          {/* Layer 3: Lemon Yellow */}
          <rect x="10" y="60" width="136" height="20" fill="#eab308" />
          <rect x="10" y="56" width="136" height="4" fill="#fde047" />
          {/* Layer 4: Mint Green */}
          <rect x="10" y="80" width="136" height="20" fill="#10b981" />
          <rect x="10" y="76" width="136" height="4" fill="#34d399" />
          {/* Layer 5: Lavender Blue */}
          <rect x="10" y="100" width="136" height="20" fill="#6366f1" />
          <rect x="10" y="96" width="136" height="4" fill="#818cf8" />

          {/* Grid lines scored into soap */}
          <line x1="34" y1="20" x2="34" y2="120" stroke="#000000" strokeWidth="2" opacity="0.3" />
          <line x1="58" y1="20" x2="58" y2="120" stroke="#000000" strokeWidth="2" opacity="0.3" />
          <line x1="82" y1="20" x2="82" y2="120" stroke="#000000" strokeWidth="2" opacity="0.3" />
          <line x1="106" y1="20" x2="106" y2="120" stroke="#000000" strokeWidth="2" opacity="0.3" />
          <line x1="130" y1="20" x2="130" y2="120" stroke="#000000" strokeWidth="2" opacity="0.3" />
        </g>

        {/* Shiny Steel Utility Knife Slicing */}
        <g className="anim-knife">
          <rect x="65" y="85" width="115" height="9" fill="#f1f5f9" transform="rotate(-15 65 85)" />
          <rect x="65" y="94" width="115" height="3" fill="#cbd5e1" transform="rotate(-15 65 85)" />
          {/* Rosewood Knife Handle */}
          <rect x="160" y="60" width="42" height="15" fill="#78350f" transform="rotate(-15 160 60)" />
          <circle cx="172" cy="62" r="2" fill="#fbbf24" />
          <circle cx="188" cy="58" r="2" fill="#fbbf24" />
        </g>

        {/* Cascading Sliced Soap Cubes Tumbling Down */}
        <g className="anim-falling-cubes">
          <rect x="38" y="234" width="16" height="16" fill="#f43f5e" transform="rotate(12 38 234)" />
          <rect x="60" y="244" width="14" height="14" fill="#f97316" transform="rotate(-8 60 244)" />
          <rect x="160" y="230" width="15" height="15" fill="#eab308" transform="rotate(22 160 230)" />
          <rect x="180" y="245" width="16" height="16" fill="#10b981" transform="rotate(-15 180 245)" />
          <rect x="136" y="250" width="14" height="14" fill="#6366f1" transform="rotate(5 136 250)" />
          <rect x="96" y="246" width="15" height="15" fill="#f43f5e" transform="rotate(18 96 246)" />
        </g>

        {/* Clean Sparkles */}
        <text x="32" y="105" fill="#fde047" fontSize="16">✦</text>
        <text x="185" y="115" fill="#fde047" fontSize="20">✦</text>
        <text x="110" y="75" fill="#ffffff" fontSize="14">✧</text>
      </svg>

      <div className="pixel-video-caption-pill">
        <span className="caption-tag">ASMR</span>
        <span className="caption-text">Satisfying Soap Cubes ASMR</span>
      </div>
    </div>
  );
}

/** VIDEO 5: POV Dating Sim Streamer (@retro_arcader) */
export function GamerVideo() {
  return (
    <div className="tiktok-scene gamer-scene">
      <svg
        viewBox="0 0 240 320"
        className="pixel-video-svg"
        shapeRendering="crispEdges"
      >
        {/* Dark Bedroom with Neon RGB Ambience */}
        <rect width="240" height="320" fill="#080312" />

        {/* Desk */}
        <rect x="0" y="225" width="240" height="95" fill="#1a102c" />
        <rect x="0" y="225" width="240" height="4" fill="#c026d3" />

        {/* Left Monitor (Twitch Chat Streaming Live) */}
        <rect x="12" y="105" width="96" height="92" fill="#1e1b4b" rx="2" />
        <rect x="15" y="108" width="90" height="86" fill="#312e81" />
        {/* Chat Stream Lines */}
        <rect x="18" y="115" width="50" height="4" fill="#a855f7" />
        <rect x="18" y="123" width="70" height="4" fill="#e2e8f0" />
        <rect x="18" y="131" width="60" height="4" fill="#f43f5e" />
        <rect x="18" y="139" width="80" height="4" fill="#e2e8f0" />
        <rect x="18" y="147" width="65" height="4" fill="#38bdf8" />
        <rect x="18" y="155" width="75" height="4" fill="#e2e8f0" />
        <rect x="18" y="163" width="55" height="4" fill="#a855f7" />
        <rect x="18" y="171" width="70" height="4" fill="#e2e8f0" />
        <rect x="56" y="198" width="8" height="28" fill="#0a0515" />

        {/* Right Main Monitor (Playing Spooky Frutti Dating Sim!) */}
        <rect x="114" y="95" width="116" height="106" fill="#1e1b4b" rx="2" />
        <rect x="117" y="98" width="110" height="100" fill="#24287e" />
        {/* Dating Cafe Scene on Screen */}
        <rect x="117" y="155" width="110" height="43" fill="#1c1440" />
        {/* Cafe Table */}
        <ellipse cx="172" cy="172" rx="36" ry="12" fill="#b45309" />
        {/* Mini Strawberry & Mini Apple */}
        <rect x="145" y="146" width="14" height="15" fill="#f43f5e" />
        <rect x="185" y="146" width="14" height="15" fill="#dc2626" />
        <rect x="168" y="202" width="8" height="24" fill="#0a0515" />

        {/* Mechanical RGB Keyboard with Rainbow Wave */}
        <rect x="75" y="240" width="90" height="22" fill="#0f172a" />
        <rect x="78" y="242" width="84" height="4" fill="#f43f5e" />
        <rect x="78" y="248" width="84" height="4" fill="#a855f7" />
        <rect x="78" y="254" width="84" height="4" fill="#06b6d4" />

        {/* Streamer FaceCam in Corner */}
        <rect x="14" y="16" width="72" height="72" fill="#000000" />
        <rect x="16" y="18" width="68" height="68" fill="#4c1d95" />
        <rect x="14" y="16" width="72" height="72" stroke="#f43f5e" strokeWidth="2" fill="none" />

        {/* Headset Streamer Avatar */}
        <circle cx="50" cy="54" r="18" fill="#fed7aa" />
        <circle cx="44" cy="52" r="3" fill="#1e1b4b" />
        <circle cx="56" cy="52" r="3" fill="#1e1b4b" />
        <rect x="40" y="58" width="6" height="3" fill="#f43f5e" />
        <rect x="54" y="58" width="6" height="3" fill="#f43f5e" />
        {/* Pink Cat Headset */}
        <path d="M 34 42 Q 50 32 66 42" stroke="#ec4899" strokeWidth="3" fill="none" />
        <polygon points="34,38 30,22 44,34" fill="#ec4899" />
        <polygon points="66,38 70,22 56,34" fill="#ec4899" />
      </svg>

      <div className="pixel-video-caption-pill">
        <span className="caption-tag">GAMING</span>
        <span className="caption-text">Secret 3AM Arcade Stream 🎮</span>
      </div>
    </div>
  );
}
