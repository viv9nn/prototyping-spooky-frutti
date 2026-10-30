"use client";

import React from "react";
import { ClothingItem } from "@/lib/dress-up/items";

interface PixelAvatarProps {
  top: ClothingItem | null;
  bottom: ClothingItem | null;
  shoes: ClothingItem | null;
  accessory: ClothingItem | null;
  isVictory?: boolean;
}

export default function PixelAvatar({
  top,
  bottom,
  shoes,
  accessory,
  isVictory = false,
}: PixelAvatarProps) {
  // Check if any equipped item is bad
  const hasBadItem =
    (top && !top.isClean) ||
    (bottom && !bottom.isClean) ||
    (shoes && !shoes.isClean) ||
    (accessory && !accessory.isClean);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Dynamic Expression / Mood bubble above head */}
      <div className="avatar-bubble">
        {isVictory ? (
          <span className="text-yellow-300 font-bold animate-bounce">
            ✨ Dapper! ✨
          </span>
        ) : hasBadItem ? (
          <span className="text-pink-300 font-bold animate-pulse">
            🤢 Ugh, disgusting!
          </span>
        ) : top || bottom || shoes || accessory ? (
          <span className="text-sky-200">
            Getting ready...
          </span>
        ) : (
          <span className="text-purple-200">
            Need an outfit!
          </span>
        )}
      </div>

      {/* Pixel Art SVG Canvas */}
      <svg
        viewBox="0 0 200 240"
        className="w-48 sm:w-60 md:w-68 h-auto drop-shadow-xl"
        style={{
          shapeRendering: "crispEdges",
          imageRendering: "pixelated",
        }}
      >
        <defs>
          {/* Stink lines animation */}
          <linearGradient id="appleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#aa2840" />
            <stop offset="60%" stopColor="#871b2d" />
            <stop offset="100%" stopColor="#5c0e1d" />
          </linearGradient>
          <linearGradient id="appleHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c73e57" />
            <stop offset="100%" stopColor="#871b2d" />
          </linearGradient>
        </defs>

        {/* --- STINK FUMES IF BAD ITEM EQUIPPED --- */}
        {hasBadItem && (
          <g className="stink-fumes">
            <path
              d="M36,60 Q42,50 36,40 T44,20"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
              opacity="0.8"
            />
            <path
              d="M164,65 Q158,52 164,42 T156,22"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
              opacity="0.8"
            />
            <path
              d="M100,32 Q106,20 100,10 T108,-2"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
              opacity="0.8"
            />
          </g>
        )}

        {/* --- VICTORY SPARKLES --- */}
        {isVictory && (
          <g className="victory-sparkles">
            {/* Left sparkle */}
            <path d="M25,50 L28,40 L31,50 L41,53 L31,56 L28,66 L25,56 L15,53 Z" fill="#ffe680" />
            {/* Right sparkle */}
            <path d="M170,40 L173,32 L176,40 L184,43 L176,46 L173,54 L170,46 L162,43 Z" fill="#ff8fc0" />
            {/* Head sparkle */}
            <path d="M50,15 L52,8 L54,15 L61,17 L54,19 L52,26 L50,19 L43,17 Z" fill="#fdfbff" />
          </g>
        )}

        {/* --- MR. HONEYCRISP HEAD (APPLE) --- */}
        {/* Apple Stem */}
        <rect x="102" y="10" width="8" height="18" fill="#5e381b" />
        <rect x="106" y="6" width="6" height="8" fill="#7d4d27" />

        {/* Apple Leaf */}
        <path
          d="M102,18 C85,6 65,12 60,20 C68,28 92,26 102,18 Z"
          fill="#439637"
        />
        <path
          d="M98,19 C84,12 70,16 66,20"
          fill="none"
          stroke="#68bf5a"
          strokeWidth="2"
        />

        {/* Apple Head Body */}
        {/* Shadow base */}
        <path
          d="M50,30 C30,30 20,55 20,80 C20,112 45,134 85,134 C95,134 98,131 100,131 C102,131 105,134 115,134 C155,134 180,112 180,80 C180,55 170,30 150,30 C130,30 114,40 100,40 C86,40 70,30 50,30 Z"
          fill="#520e1a"
        />
        {/* Main Apple Body */}
        <path
          d="M52,32 C34,32 24,56 24,80 C24,110 48,130 85,130 C96,130 98,128 100,128 C102,128 104,130 115,130 C152,130 176,110 176,80 C176,56 166,32 148,32 C129,32 113,42 100,42 C87,42 71,32 52,32 Z"
          fill="url(#appleGradient)"
        />

        {/* Subtle Highlights on Apple cheek */}
        <ellipse cx="44" cy="62" rx="12" ry="20" fill="url(#appleHighlight)" opacity="0.6" />
        <rect x="42" y="52" width="4" height="12" fill="#d9526c" opacity="0.4" />

        {/* --- FACE --- */}
        {/* Eyebrows */}
        {isVictory ? (
          /* Confident/happy curved brows */
          <g fill="#260d14">
            <polygon points="56,66 84,62 82,66 56,70" />
            <polygon points="144,66 116,62 118,66 144,70" />
          </g>
        ) : hasBadItem ? (
          /* Angry / disgusted brows */
          <g fill="#260d14">
            <polygon points="54,72 86,60 84,64 54,76" />
            <polygon points="146,72 114,60 116,64 146,76" />
            {/* Center brow furrows */}
            <line x1="97" y1="62" x2="97" y2="72" stroke="#260d14" strokeWidth="2" />
            <line x1="103" y1="62" x2="103" y2="72" stroke="#260d14" strokeWidth="2" />
          </g>
        ) : (
          /* Signature serious/determined brows from reference image */
          <g fill="#260d14">
            <polygon points="54,68 84,62 82,66 54,72" />
            <polygon points="146,68 116,62 118,66 146,72" />
            <line x1="100" y1="64" x2="100" y2="70" stroke="#260d14" strokeWidth="2" />
          </g>
        )}

        {/* Eyes */}
        {/* Left eye */}
        <g>
          {/* Sclera */}
          <ellipse cx="70" cy="80" rx="14" ry="9" fill="#fdfbff" />
          {/* Pupil */}
          <ellipse cx="74" cy="80" rx="9" ry="8" fill="#1c0c11" />
          {/* Eye light */}
          <circle cx="72" cy="77" r="2.5" fill="#ffffff" />
          {/* Upper eyelid contour (grumpy / narrow) */}
          <path d="M56,77 Q70,72 84,76" stroke="#260d14" strokeWidth="3" fill="none" />
          <path d="M57,85 Q70,89 83,85" stroke="#260d14" strokeWidth="2" fill="none" />
        </g>

        {/* Right eye */}
        <g>
          {/* Sclera */}
          <ellipse cx="130" cy="80" rx="14" ry="9" fill="#fdfbff" />
          {/* Pupil */}
          <ellipse cx="126" cy="80" rx="9" ry="8" fill="#1c0c11" />
          {/* Eye light */}
          <circle cx="124" cy="77" r="2.5" fill="#ffffff" />
          {/* Upper eyelid contour */}
          <path d="M116,76 Q130,72 144,77" stroke="#260d14" strokeWidth="3" fill="none" />
          <path d="M117,85 Q130,89 143,85" stroke="#260d14" strokeWidth="2" fill="none" />
        </g>

        {/* Mouth */}
        {isVictory ? (
          /* Confident slight smirk */
          <path d="M92,104 Q102,110 114,103" stroke="#260d14" strokeWidth="3" fill="none" />
        ) : hasBadItem ? (
          /* Wavy disgusted grimace */
          <path d="M88,106 Q94,101 100,107 T112,103" stroke="#260d14" strokeWidth="3" fill="none" />
        ) : (
          /* Standard serious straight/slightly curved line */
          <path d="M92,106 L108,106" stroke="#260d14" strokeWidth="3" fill="none" />
        )}

        {/* Sweat drop if bad item or panicked */}
        {hasBadItem && (
          <path
            d="M152,65 C156,65 160,70 156,76 C153,74 152,70 152,65 Z"
            fill="#80d0ff"
            stroke="#1c1440"
            strokeWidth="1.5"
          />
        )}

        {/* Blush marks if victory */}
        {isVictory && (
          <g fill="#ff5e85" opacity="0.6">
            <rect x="48" y="88" width="6" height="3" />
            <rect x="56" y="88" width="6" height="3" />
            <rect x="138" y="88" width="6" height="3" />
            <rect x="146" y="88" width="6" height="3" />
          </g>
        )}

        {/* --- BODY / LEGS BASE (RED APPLE LIMBS) --- */}
        {/* Left Arm */}
        <path d="M46,126 L30,158 L40,162 L54,134 Z" fill="#871b2d" />
        {/* Right Arm */}
        <path d="M154,126 L170,158 L160,162 L146,134 Z" fill="#871b2d" />

        {/* Torso Base / Boxer state */}
        <rect x="68" y="128" width="64" height="36" fill="#871b2d" />

        {/* --- LAYER 1: BOTTOM (TROUSERS / SHORTS) --- */}
        {bottom ? (
          <g>
            {bottom.id === "bottom-khaki-slacks" ? (
              /* Crisp Khaki Slacks (from reference art) */
              <g>
                {/* Belt */}
                <rect x="68" y="152" width="64" height="6" fill="#663e18" />
                <rect x="96" y="152" width="8" height="6" fill="#ffe680" />
                {/* Pants legs */}
                <rect x="68" y="158" width="30" height="48" fill="#cfb97c" />
                <rect x="102" y="158" width="30" height="48" fill="#cfb97c" />
                {/* Crease lines */}
                <line x1="83" y1="158" x2="83" y2="204" stroke="#ab9558" strokeWidth="2" />
                <line x1="117" y1="158" x2="117" y2="204" stroke="#ab9558" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-midnight-trousers" ? (
              /* Charcoal Evening Trousers */
              <g>
                <rect x="68" y="152" width="64" height="6" fill="#111111" />
                <rect x="96" y="152" width="8" height="6" fill="#cccccc" />
                <rect x="68" y="158" width="30" height="48" fill="#25283b" />
                <rect x="102" y="158" width="30" height="48" fill="#25283b" />
                <line x1="83" y1="158" x2="83" y2="204" stroke="#171824" strokeWidth="2" />
                <line x1="117" y1="158" x2="117" y2="204" stroke="#171824" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-tailored-chinos" ? (
              /* Royal Blue Tailored Chinos */
              <g>
                <rect x="68" y="152" width="64" height="6" fill="#4d2f16" />
                <rect x="96" y="152" width="8" height="6" fill="#ffe680" />
                <rect x="68" y="158" width="30" height="48" fill="#273b66" />
                <rect x="102" y="158" width="30" height="48" fill="#273b66" />
                <line x1="83" y1="158" x2="83" y2="204" stroke="#1a2744" strokeWidth="2" />
                <line x1="117" y1="158" x2="117" y2="204" stroke="#1a2744" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-muddy-jeans" ? (
              /* Bad: Muddy Torn Jeans */
              <g>
                <rect x="68" y="154" width="30" height="48" fill="#465369" />
                <rect x="102" y="154" width="30" height="48" fill="#465369" />
                {/* Ripped knee hole with skin/red showing */}
                <rect x="74" y="180" width="16" height="8" fill="#871b2d" />
                <rect x="72" y="182" width="20" height="4" fill="#fdfbff" stroke="#333" strokeWidth="1" />
                {/* Mud splatters */}
                <ellipse cx="80" cy="196" rx="8" ry="5" fill="#4a3219" />
                <ellipse cx="116" cy="176" rx="10" ry="7" fill="#4a3219" />
                <ellipse cx="110" cy="198" rx="6" ry="4" fill="#36220e" />
              </g>
            ) : bottom.id === "bottom-greasy-sweats" ? (
              /* Bad: Baggy Greasy Sweats */
              <g>
                <rect x="66" y="152" width="33" height="50" fill="#696969" />
                <rect x="101" y="152" width="33" height="50" fill="#696969" />
                {/* Saggy wrinkled cuffs */}
                <rect x="65" y="200" width="35" height="5" fill="#505050" />
                <rect x="100" y="200" width="35" height="5" fill="#505050" />
                {/* Grease stains */}
                <circle cx="82" cy="172" r="7" fill="#3b322a" opacity="0.8" />
                <circle cx="118" cy="188" r="9" fill="#2e251e" opacity="0.8" />
              </g>
            ) : (
              /* Bad: Threadbare Boxer Shorts */
              <g>
                <rect x="68" y="152" width="30" height="24" fill="#785055" />
                <rect x="102" y="152" width="30" height="24" fill="#785055" />
                {/* Bare apple legs poking out */}
                <rect x="74" y="176" width="18" height="30" fill="#871b2d" />
                <rect x="108" y="176" width="18" height="30" fill="#871b2d" />
                {/* Torn jagged edges on boxers */}
                <polygon points="68,176 74,170 80,176 86,170 92,176 98,170" fill="#540e1d" />
              </g>
            )}
          </g>
        ) : (
          /* Default basic underwear (waiting for pants) */
          <g>
            <rect x="70" y="154" width="28" height="20" fill="#fdfbff" stroke="#ccc" strokeWidth="1" />
            <rect x="102" y="154" width="28" height="20" fill="#fdfbff" stroke="#ccc" strokeWidth="1" />
            {/* Bare legs */}
            <rect x="75" y="174" width="18" height="32" fill="#871b2d" />
            <rect x="107" y="174" width="18" height="32" fill="#871b2d" />
          </g>
        )}

        {/* --- LAYER 2: SHOES --- */}
        {shoes ? (
          <g>
            {shoes.id === "shoes-white-loafers" ? (
              /* Pristine White Sneakers (reference image) */
              <g fill="#fdfbff" stroke="#cfd6df" strokeWidth="1">
                <rect x="64" y="204" width="34" height="14" rx="3" />
                <rect x="102" y="204" width="34" height="14" rx="3" />
                {/* Black sole line */}
                <line x1="64" y1="216" x2="98" y2="216" stroke="#8c9aa8" strokeWidth="2" />
                <line x1="102" y1="216" x2="136" y2="216" stroke="#8c9aa8" strokeWidth="2" />
              </g>
            ) : shoes.id === "shoes-oxford-leather" ? (
              /* Polished Brown Oxfords */
              <g fill="#422013" stroke="#261208" strokeWidth="1">
                <rect x="64" y="204" width="34" height="14" rx="2" />
                <rect x="102" y="204" width="34" height="14" rx="2" />
                {/* Shine mark */}
                <rect x="68" y="206" width="10" height="2" fill="#b08665" />
                <rect x="106" y="206" width="10" height="2" fill="#b08665" />
              </g>
            ) : shoes.id === "shoes-velvet-loafers" ? (
              /* Wine Velvet Loafers */
              <g fill="#6e152d" stroke="#3b0816" strokeWidth="1">
                <rect x="64" y="204" width="34" height="14" rx="3" />
                <rect x="102" y="204" width="34" height="14" rx="3" />
                <rect x="76" y="207" width="8" height="3" fill="#ffe680" />
                <rect x="114" y="207" width="8" height="3" fill="#ffe680" />
              </g>
            ) : shoes.id === "shoes-toe-sneakers" ? (
              /* Bad: Stinky green toe hole sneaker */
              <g>
                <rect x="64" y="204" width="34" height="14" fill="#545e48" />
                <rect x="102" y="204" width="34" height="14" fill="#545e48" />
                {/* Hole with apple toes sticking out */}
                <ellipse cx="66" cy="211" rx="5" ry="4" fill="#871b2d" />
                {/* Stink fumes at shoe */}
                <path d="M60,205 Q56,198 62,192" stroke="#78aa3b" strokeWidth="2" fill="none" />
                <path d="M138,205 Q142,198 136,192" stroke="#78aa3b" strokeWidth="2" fill="none" />
              </g>
            ) : shoes.id === "shoes-crusty-workboots" ? (
              /* Bad: Crusty Mud Boots */
              <g fill="#4a3219">
                <rect x="62" y="198" width="38" height="20" rx="3" />
                <rect x="100" y="198" width="38" height="20" rx="3" />
                {/* Mud dripping */}
                <circle cx="68" cy="220" r="3" fill="#2b1a09" />
                <circle cx="128" cy="220" r="4" fill="#2b1a09" />
              </g>
            ) : (
              /* Bad: Chewed Busted Flip-Flop */
              <g>
                <rect x="64" y="212" width="32" height="6" fill="#286161" />
                <rect x="102" y="212" width="32" height="6" fill="#286161" />
                {/* Snapped thong strap with wire */}
                <path d="M78,212 L80,204" stroke="#a32626" strokeWidth="2" />
                <path d="M118,212 L120,206" stroke="#999" strokeWidth="1.5" />
              </g>
            )}
          </g>
        ) : (
          /* Bare apple feet */
          <g fill="#871b2d">
            <ellipse cx="80" cy="210" rx="14" ry="6" />
            <ellipse cx="118" cy="210" rx="14" ry="6" />
          </g>
        )}

        {/* --- LAYER 3: TOP (SHIRT / BLAZER / VEST) --- */}
        {top ? (
          <g>
            {top.id === "top-dress-shirt" ? (
              /* Crisp Cream Dress Shirt (reference image) */
              <g>
                <rect x="66" y="124" width="68" height="32" fill="#f5f0db" />
                {/* Folded Collar */}
                <polygon points="76,124 92,138 98,124" fill="#e6dec3" stroke="#b8ae90" strokeWidth="1" />
                <polygon points="124,124 108,138 102,124" fill="#e6dec3" stroke="#b8ae90" strokeWidth="1" />
                {/* Placket & Buttons */}
                <rect x="98" y="124" width="4" height="32" fill="#e6dec3" />
                <circle cx="100" cy="132" r="1.5" fill="#7a7058" />
                <circle cx="100" cy="142" r="1.5" fill="#7a7058" />
                <circle cx="100" cy="150" r="1.5" fill="#7a7058" />
                {/* Sleeves */}
                <rect x="44" y="126" width="22" height="18" fill="#f5f0db" />
                <rect x="134" y="126" width="22" height="18" fill="#f5f0db" />
              </g>
            ) : top.id === "top-navy-blazer" ? (
              /* Midnight Navy Blazer */
              <g>
                <rect x="64" y="122" width="72" height="34" fill="#1f275e" />
                {/* White inner shirt V-neck */}
                <polygon points="90,122 100,138 110,122" fill="#fdfbff" />
                {/* Blazer Lapels */}
                <polygon points="68,122 92,146 86,156 68,140" fill="#151b42" />
                <polygon points="132,122 108,146 114,156 132,140" fill="#151b42" />
                {/* Gold buttons */}
                <circle cx="100" cy="144" r="2.5" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <circle cx="100" cy="152" r="2.5" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                {/* Sleeves */}
                <rect x="42" y="124" width="22" height="22" fill="#1f275e" />
                <rect x="136" y="124" width="22" height="22" fill="#1f275e" />
              </g>
            ) : top.id === "top-tux-vest" ? (
              /* Dapper Velvet Vest */
              <g>
                {/* White shirt base */}
                <rect x="66" y="124" width="68" height="32" fill="#fdfbff" />
                {/* Crimson vest */}
                <path d="M66,126 L88,144 L100,154 L112,144 L134,126 L134,156 L100,156 L66,156 Z" fill="#801235" />
                {/* Gold buttons */}
                <circle cx="100" cy="140" r="1.5" fill="#ffe680" />
                <circle cx="100" cy="148" r="1.5" fill="#ffe680" />
                {/* White sleeves */}
                <rect x="44" y="126" width="22" height="16" fill="#fdfbff" />
                <rect x="134" y="126" width="22" height="16" fill="#fdfbff" />
              </g>
            ) : top.id === "top-mustard-tank" ? (
              /* Bad: Mustard-Stained Tank */
              <g>
                <rect x="70" y="124" width="60" height="32" fill="#998a44" />
                {/* Huge yellow mustard splat */}
                <path
                  d="M90,132 Q105,128 112,136 Q108,148 95,146 Q86,142 90,132 Z"
                  fill="#e6c310"
                />
                <circle cx="114" cy="144" r="2.5" fill="#e6c310" />
                <circle cx="86" cy="148" r="2" fill="#e6c310" />
              </g>
            ) : top.id === "top-moth-sweater" ? (
              /* Bad: Moth-Eaten Sweater */
              <g>
                <rect x="64" y="124" width="72" height="32" fill="#6b5952" />
                {/* Holes showing bare apple skin */}
                <circle cx="78" cy="136" r="6" fill="#871b2d" />
                <circle cx="118" cy="142" r="8" fill="#871b2d" />
                <circle cx="96" cy="148" r="5" fill="#871b2d" />
                {/* Ragged unraveled bottom */}
                <polygon points="64,156 70,150 76,156 82,150 88,156 94,150 100,156 106,150 112,156 118,150 124,156 130,150 136,156" fill="#540e1d" />
              </g>
            ) : (
              /* Bad: Greasy Pit-Stained Tee */
              <g>
                <rect x="64" y="124" width="72" height="32" fill="#8b8878" />
                {/* Yellow sweat pit stains */}
                <ellipse cx="66" cy="132" rx="6" ry="10" fill="#a89a42" opacity="0.8" />
                <ellipse cx="134" cy="132" rx="6" ry="10" fill="#a89a42" opacity="0.8" />
                {/* Front grease splatters */}
                <circle cx="98" cy="140" r="5" fill="#47453d" opacity="0.9" />
                <circle cx="106" cy="146" r="4" fill="#47453d" opacity="0.9" />
              </g>
            )}
          </g>
        ) : (
          /* Default basic white undershirt */
          <g>
            <rect x="72" y="124" width="56" height="30" fill="#fdfbff" opacity="0.7" />
          </g>
        )}

        {/* --- LAYER 4: ACCESSORY (BOWTIE / ROSE / WATCH / JUNK) --- */}
        {accessory && (
          <g>
            {accessory.id === "acc-silk-bowtie" ? (
              /* Crimson Silk Bowtie */
              <g>
                <polygon points="90,126 100,132 90,138" fill="#d91e48" />
                <polygon points="110,126 100,132 110,138" fill="#d91e48" />
                <circle cx="100" cy="132" r="3" fill="#ff4d73" />
              </g>
            ) : accessory.id === "acc-gold-watch" ? (
              /* Gleaming Pocket Watch on Wrist / Pocket */
              <g>
                <circle cx="44" cy="148" r="7" fill="#ffe680" stroke="#b3921b" strokeWidth="2" />
                <line x1="44" y1="148" x2="44" y2="144" stroke="#4a3e14" strokeWidth="1.5" />
                <line x1="44" y1="148" x2="47" y2="148" stroke="#4a3e14" strokeWidth="1.5" />
                {/* Gold chain looping across chest */}
                <path d="M48,146 Q70,154 96,146" stroke="#ffe680" strokeWidth="2" fill="none" />
              </g>
            ) : accessory.id === "acc-rose-boutonniere" ? (
              /* Fresh Red Boutonniere on Lapel */
              <g>
                <ellipse cx="80" cy="132" rx="6" ry="6" fill="#e62249" />
                <ellipse cx="80" cy="132" rx="3" ry="3" fill="#ff6b8b" />
                <path d="M78,136 Q75,142 74,146" stroke="#3da649" strokeWidth="2" fill="none" />
                <ellipse cx="76" cy="140" rx="3" ry="1.5" fill="#58c465" />
              </g>
            ) : accessory.id === "acc-fishbone-tie" ? (
              /* Bad: Stinky Fishbone Necklace */
              <g>
                <line x1="100" y1="126" x2="100" y2="152" stroke="#d5d5d5" strokeWidth="2" />
                <line x1="94" y1="134" x2="106" y2="134" stroke="#d5d5d5" strokeWidth="2" />
                <line x1="92" y1="140" x2="108" y2="140" stroke="#d5d5d5" strokeWidth="2" />
                <line x1="95" y1="146" x2="105" y2="146" stroke="#d5d5d5" strokeWidth="2" />
                {/* Fish head skeleton */}
                <polygon points="96,126 104,126 100,120" fill="#a0a0a0" />
                {/* Little buzzing fly */}
                <circle cx="112" cy="130" r="1.5" fill="#111" />
              </g>
            ) : accessory.id === "acc-soup-bib" ? (
              /* Bad: Crusty Tomato Soup Bib */
              <g>
                <path d="M84,124 Q100,120 116,124 L114,148 Q100,154 86,148 Z" fill="#fdfbff" stroke="#333" strokeWidth="1" />
                <path d="M88,128 Q98,136 104,130 Q112,142 96,144 Z" fill="#a3362a" />
                <circle cx="108" cy="140" r="3" fill="#e67e22" />
              </g>
            ) : (
              /* Bad: Cracked Duct-Tape Shades */
              <g>
                <rect x="62" y="74" width="30" height="12" rx="2" fill="#222" />
                <rect x="108" y="74" width="30" height="12" rx="2" fill="#222" />
                {/* Missing right lens crack */}
                <line x1="110" y1="76" x2="136" y2="84" stroke="#fff" strokeWidth="1" />
                {/* Duct tape lump over nose bridge */}
                <rect x="92" y="76" width="16" height="8" fill="#a8a8a8" stroke="#666" strokeWidth="1" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
