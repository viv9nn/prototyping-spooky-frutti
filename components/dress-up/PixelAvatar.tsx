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
  const hasBadItem = Boolean(
    (top && !top.isClean) ||
    (bottom && !bottom.isClean) ||
    (shoes && !shoes.isClean) ||
    (accessory && !accessory.isClean)
  );

  return (
    <div className="fullbody-avatar-container">
      {/* Dynamic Expression / Mood bubble above head */}
      <div className="avatar-bubble">
        {isVictory ? (
          <span className="bubble-text text-victory">✨ Looking Sharp &amp; Dapper! ✨</span>
        ) : hasBadItem ? (
          <span className="bubble-text text-bad">🤢 Stained &amp; Disgusting!</span>
        ) : top || bottom || shoes || accessory ? (
          <span className="bubble-text text-normal">Getting dressed...</span>
        ) : (
          <span className="bubble-text text-empty">Grab an outfit!</span>
        )}
      </div>

      {/* Mr. Honeycrisp Full Body SVG - Proportioned after reference image */}
      <svg
        viewBox="0 0 200 440"
        className="fullbody-avatar-svg"
        style={{
          shapeRendering: "crispEdges",
          imageRendering: "pixelated",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="appleGradRef" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b52640" />
            <stop offset="65%" stopColor="#8a172c" />
            <stop offset="100%" stopColor="#570d1b" />
          </linearGradient>
          <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 10, 35, 0.75)" />
            <stop offset="100%" stopColor="rgba(15, 10, 35, 0)" />
          </radialGradient>
        </defs>

        {/* --- FLOOR SHADOW BENEATH SHOES --- */}
        <ellipse cx="100" cy="425" rx="55" ry="10" fill="url(#floorShadow)" />

        {/* --- STINK FUMES IF BAD ITEM EQUIPPED --- */}
        {hasBadItem && (
          <g className="stink-fumes">
            <path
              d="M30,130 Q38,110 32,90 T42,60"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            <path
              d="M170,140 Q162,120 168,100 T158,70"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            <path
              d="M100,35 Q106,18 100,5 T108,-10"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          </g>
        )}

        {/* --- VICTORY SPARKLES --- */}
        {isVictory && (
          <g className="victory-sparkles">
            <path d="M22,70 L26,56 L30,70 L44,74 L30,78 L26,92 L22,78 L8,74 Z" fill="#ffe680" />
            <path d="M178,60 L182,48 L186,60 L198,64 L186,68 L182,80 L178,68 L166,64 Z" fill="#ff8fc0" />
            <path d="M30,260 L33,250 L36,260 L46,263 L36,266 L33,276 L30,266 L20,263 Z" fill="#ffe680" />
            <path d="M170,270 L173,262 L176,270 L184,273 L176,276 L173,284 L170,276 L162,273 Z" fill="#ffe680" />
          </g>
        )}

        {/* --- BASE BODY: APPLE ARMS & HANDS (Extending at sides) --- */}
        {/* Left Arm & Hand */}
        <path d="M68,185 L52,240 L46,290 L56,293 L62,242 L74,185 Z" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
        <circle cx="48" cy="294" r="6.5" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
        {/* Right Arm & Hand */}
        <path d="M132,185 L148,240 L154,290 L144,293 L138,242 L126,185 Z" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
        <circle cx="152" cy="294" r="6.5" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />

        {/* --- BASE BODY: TORSO & LEGS --- */}
        {/* Red apple torso base */}
        <rect x="74" y="180" width="52" height="82" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />

        {/* --- LAYER 1: BOTTOM (SLACKS / JEANS / BOXERS) --- */}
        {bottom ? (
          <g>
            {bottom.id === "bottom-khaki-slacks" ? (
              /* Slender Tan Chinos / Slacks (from reference image) */
              <g>
                {/* Belt */}
                <rect x="72" y="256" width="56" height="8" fill="#694119" stroke="#36200a" strokeWidth="1.5" />
                <rect x="96" y="256" width="8" height="8" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                {/* Left pant leg */}
                <polygon points="72,264 98,264 94,395 72,395" fill="#cfb97c" stroke="#36200a" strokeWidth="2" />
                {/* Right pant leg */}
                <polygon points="102,264 128,264 128,395 106,395" fill="#cfb97c" stroke="#36200a" strokeWidth="2" />
                {/* Pressed front crease lines */}
                <line x1="84" y1="264" x2="83" y2="392" stroke="#ab9558" strokeWidth="2" />
                <line x1="116" y1="264" x2="117" y2="392" stroke="#ab9558" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-midnight-trousers" ? (
              /* Charcoal Evening Trousers */
              <g>
                <rect x="72" y="256" width="56" height="8" fill="#141417" stroke="#000" strokeWidth="1.5" />
                <rect x="96" y="256" width="8" height="8" fill="#cccccc" stroke="#666" strokeWidth="1" />
                <polygon points="72,264 98,264 94,395 72,395" fill="#25283b" stroke="#11131c" strokeWidth="2" />
                <polygon points="102,264 128,264 128,395 106,395" fill="#25283b" stroke="#11131c" strokeWidth="2" />
                <line x1="84" y1="264" x2="83" y2="392" stroke="#3d4261" strokeWidth="2" />
                <line x1="116" y1="264" x2="117" y2="392" stroke="#3d4261" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-tailored-chinos" ? (
              /* Royal Blue Tailored Chinos */
              <g>
                <rect x="72" y="256" width="56" height="8" fill="#523214" stroke="#2b1a09" strokeWidth="1.5" />
                <rect x="96" y="256" width="8" height="8" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <polygon points="72,264 98,264 94,395 72,395" fill="#293c69" stroke="#131c33" strokeWidth="2" />
                <polygon points="102,264 128,264 128,395 106,395" fill="#293c69" stroke="#131c33" strokeWidth="2" />
                <line x1="84" y1="264" x2="83" y2="392" stroke="#3f5a9e" strokeWidth="2" />
                <line x1="116" y1="264" x2="117" y2="392" stroke="#3f5a9e" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-muddy-jeans" ? (
              /* Bad: Muddy Torn Jeans */
              <g>
                <polygon points="72,264 98,264 94,395 72,395" fill="#465369" stroke="#222a36" strokeWidth="2" />
                <polygon points="102,264 128,264 128,395 106,395" fill="#465369" stroke="#222a36" strokeWidth="2" />
                {/* Ripped knee holes */}
                <rect x="76" y="325" width="14" height="10" fill="#8a172c" stroke="#222a36" strokeWidth="1" />
                <line x1="74" y1="330" x2="92" y2="330" stroke="#fff" strokeWidth="1.5" />
                <rect x="110" y="320" width="14" height="9" fill="#8a172c" stroke="#222a36" strokeWidth="1" />
                {/* Mud splatters */}
                <ellipse cx="82" cy="360" rx="9" ry="7" fill="#4a3219" stroke="#2b1a09" strokeWidth="1" />
                <ellipse cx="118" cy="365" rx="10" ry="8" fill="#4a3219" stroke="#2b1a09" strokeWidth="1" />
              </g>
            ) : bottom.id === "bottom-greasy-sweats" ? (
              /* Bad: Baggy Greasy Sweats */
              <g>
                <rect x="68" y="260" width="31" height="135" rx="5" fill="#696969" stroke="#333" strokeWidth="2" />
                <rect x="101" y="260" width="31" height="135" rx="5" fill="#696969" stroke="#333" strokeWidth="2" />
                <circle cx="80" cy="310" r="8" fill="#3b322a" opacity="0.9" />
                <circle cx="118" cy="340" r="10" fill="#2b1c11" opacity="0.9" />
              </g>
            ) : (
              /* Bad: Threadbare Boxer Shorts */
              <g>
                <rect x="74" y="260" width="24" height="42" fill="#785055" stroke="#3d2125" strokeWidth="2" />
                <rect x="102" y="260" width="24" height="42" fill="#785055" stroke="#3d2125" strokeWidth="2" />
                <polygon points="74,302 80,296 86,302 92,296 98,302" fill="#3d2125" />
                <polygon points="102,302 108,296 114,302 120,296 126,302" fill="#3d2125" />
                {/* Bare red apple legs */}
                <rect x="78" y="302" width="16" height="93" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
                <rect x="106" y="302" width="16" height="93" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
              </g>
            )}
          </g>
        ) : (
          /* Default underwear waiting for pants */
          <g>
            <rect x="74" y="260" width="24" height="34" fill="#fdfbff" stroke="#9da6cc" strokeWidth="1.5" />
            <rect x="102" y="260" width="24" height="34" fill="#fdfbff" stroke="#9da6cc" strokeWidth="1.5" />
            <circle cx="84" cy="272" r="2.5" fill="#ff8fc0" />
            <circle cx="90" cy="272" r="2.5" fill="#ff8fc0" />
            <polygon points="81,273 93,273 87,280" fill="#ff8fc0" />
            {/* Bare legs */}
            <rect x="78" y="294" width="16" height="101" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
            <rect x="106" y="294" width="16" height="101" fill="#8a172c" stroke="#520e1a" strokeWidth="1.5" />
          </g>
        )}

        {/* --- LAYER 2: SHOES --- */}
        {shoes ? (
          <g>
            {shoes.id === "shoes-white-loafers" ? (
              /* Off-white canvas sneakers with tan rubber soles (reference image) */
              <g fill="#f7f5ed" stroke="#36200a" strokeWidth="1.5">
                <rect x="66" y="395" width="32" height="24" rx="4" />
                <rect x="102" y="395" width="32" height="24" rx="4" />
                {/* Tan rubber sole */}
                <rect x="66" y="413" width="32" height="6" fill="#cfb97c" stroke="#36200a" strokeWidth="1.5" />
                <rect x="102" y="413" width="32" height="6" fill="#cfb97c" stroke="#36200a" strokeWidth="1.5" />
                {/* Laces */}
                <line x1="76" y1="401" x2="88" y2="401" stroke="#888" strokeWidth="1.5" />
                <line x1="76" y1="406" x2="88" y2="406" stroke="#888" strokeWidth="1.5" />
                <line x1="112" y1="401" x2="124" y2="401" stroke="#888" strokeWidth="1.5" />
                <line x1="112" y1="406" x2="124" y2="406" stroke="#888" strokeWidth="1.5" />
              </g>
            ) : shoes.id === "shoes-oxford-leather" ? (
              /* Polished Brown Oxfords */
              <g fill="#422013" stroke="#1f0c05" strokeWidth="1.5">
                <rect x="66" y="395" width="32" height="24" rx="3" />
                <rect x="102" y="395" width="32" height="24" rx="3" />
                <rect x="70" y="398" width="10" height="3" fill="#99633d" />
                <rect x="106" y="398" width="10" height="3" fill="#99633d" />
                <line x1="66" y1="414" x2="98" y2="414" stroke="#1f0c05" strokeWidth="3" />
                <line x1="102" y1="414" x2="134" y2="414" stroke="#1f0c05" strokeWidth="3" />
              </g>
            ) : shoes.id === "shoes-velvet-loafers" ? (
              /* Wine Velvet Loafers */
              <g fill="#6e152d" stroke="#380613" strokeWidth="1.5">
                <rect x="66" y="395" width="32" height="24" rx="4" />
                <rect x="102" y="395" width="32" height="24" rx="4" />
                <rect x="78" y="400" width="8" height="4" rx="1" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <rect x="114" y="400" width="8" height="4" rx="1" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
              </g>
            ) : shoes.id === "shoes-toe-sneakers" ? (
              /* Bad: Stinky green toe hole sneaker */
              <g>
                <rect x="66" y="395" width="32" height="24" rx="4" fill="#545e48" stroke="#2b3323" strokeWidth="1.5" />
                <rect x="102" y="395" width="32" height="24" rx="4" fill="#545e48" stroke="#2b3323" strokeWidth="1.5" />
                {/* Red apple toe poking out */}
                <ellipse cx="68" cy="405" rx="5" ry="4" fill="#8a172c" stroke="#520e1a" strokeWidth="1" />
                {/* Stink lines */}
                <path d="M60,392 Q56,384 62,376" stroke="#78aa3b" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
                <path d="M138,392 Q142,384 136,376" stroke="#78aa3b" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
              </g>
            ) : shoes.id === "shoes-crusty-workboots" ? (
              /* Bad: Crusty Mud Boots */
              <g fill="#4a3219" stroke="#211406" strokeWidth="1.5">
                <rect x="64" y="390" width="36" height="29" rx="4" />
                <rect x="100" y="390" width="36" height="29" rx="4" />
                <circle cx="70" cy="421" r="3.5" fill="#2b1a09" stroke="none" />
                <circle cx="130" cy="421" r="4" fill="#2b1a09" stroke="none" />
              </g>
            ) : (
              /* Bad: Chewed Busted Flip-Flop */
              <g>
                <ellipse cx="82" cy="408" rx="18" ry="8" fill="#286161" stroke="#123636" strokeWidth="1.5" />
                <ellipse cx="118" cy="408" rx="18" ry="8" fill="#286161" stroke="#123636" strokeWidth="1.5" />
                <path d="M76,408 L80,398" stroke="#a32626" strokeWidth="2.5" />
                <line x1="114" y1="408" x2="118" y2="400" stroke="#999" strokeWidth="1.5" />
              </g>
            )}
          </g>
        ) : (
          /* Bare red apple feet */
          <g fill="#8a172c" stroke="#520e1a" strokeWidth="1.5">
            <ellipse cx="82" cy="406" rx="14" ry="7" />
            <ellipse cx="118" cy="406" rx="14" ry="7" />
          </g>
        )}

        {/* --- LAYER 3: TOP (SHIRTS / BLAZERS / VESTS) --- */}
        {top ? (
          <g>
            {top.id === "top-dress-shirt" ? (
              /* White Button-Up with Rolled-Up Sleeves (reference image!) */
              <g>
                {/* Shirt body */}
                <rect x="70" y="180" width="60" height="78" fill="#fdfbff" stroke="#24287e" strokeWidth="2" />
                {/* Open V-collar */}
                <polygon points="84,180 100,202 92,180" fill="#ede9da" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="116,180 100,202 108,180" fill="#ede9da" stroke="#24287e" strokeWidth="1.5" />
                {/* Placket & Buttons */}
                <rect x="98" y="180" width="4" height="78" fill="#ede9da" />
                <circle cx="100" cy="214" r="1.5" fill="#7a7058" />
                <circle cx="100" cy="228" r="1.5" fill="#7a7058" />
                <circle cx="100" cy="242" r="1.5" fill="#7a7058" />
                {/* Rolled up 3/4 sleeves (leaving forearms bare red!) */}
                <polygon points="70,182 52,230 62,234 70,192" fill="#fdfbff" stroke="#24287e" strokeWidth="2" />
                <rect x="50" y="228" width="14" height="6" fill="#ede9da" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="130,182 148,230 138,234 130,192" fill="#fdfbff" stroke="#24287e" strokeWidth="2" />
                <rect x="136" y="228" width="14" height="6" fill="#ede9da" stroke="#24287e" strokeWidth="1.5" />
              </g>
            ) : top.id === "top-navy-blazer" ? (
              /* Midnight Navy Blazer */
              <g>
                <rect x="68" y="178" width="64" height="82" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
                <polygon points="92,178 100,206 108,178" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="74,178 96,218 88,236 72,200" fill="#293780" stroke="#0e1333" strokeWidth="1.5" />
                <polygon points="126,178 104,218 112,236 128,200" fill="#293780" stroke="#0e1333" strokeWidth="1.5" />
                <circle cx="100" cy="220" r="2.5" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <circle cx="100" cy="234" r="2.5" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                {/* Full sleeves to wrist */}
                <polygon points="68,180 48,270 56,273 68,190" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
                <polygon points="132,180 152,270 144,273 132,190" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
                <polygon points="80,206 85,200 89,206" fill="#ff8fc0" />
              </g>
            ) : top.id === "top-tux-vest" ? (
              /* Dapper Velvet Vest */
              <g>
                <rect x="70" y="180" width="60" height="78" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="70,182 52,230 62,234 70,192" fill="#fdfbff" stroke="#24287e" strokeWidth="2" />
                <polygon points="130,182 148,230 138,234 130,192" fill="#fdfbff" stroke="#24287e" strokeWidth="2" />
                <path d="M70,184 L90,214 L100,230 L110,214 L130,184 L130,258 L70,258 Z" fill="#7a1233" stroke="#4a081c" strokeWidth="2" />
                <circle cx="100" cy="216" r="2" fill="#ffe680" />
                <circle cx="100" cy="228" r="2" fill="#ffe680" />
                <circle cx="100" cy="240" r="2" fill="#ffe680" />
              </g>
            ) : top.id === "top-mustard-tank" ? (
              /* Bad: Mustard-Stained Tank */
              <g>
                <path d="M78,180 L88,196 L112,196 L122,180 L128,192 L124,258 L76,258 L72,192 Z" fill="#8f844b" stroke="#4a4220" strokeWidth="2" />
                <path d="M88,202 Q108,192 114,208 Q108,232 94,228 Q82,220 88,202 Z" fill="#e6c310" stroke="#998000" strokeWidth="2" />
                <circle cx="116" cy="226" r="3.5" fill="#e6c310" />
                <circle cx="86" cy="232" r="2.5" fill="#e6c310" />
              </g>
            ) : top.id === "top-moth-sweater" ? (
              /* Bad: Moth-Eaten Sweater */
              <g>
                <rect x="68" y="180" width="64" height="78" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
                <polygon points="68,182 48,236 56,242 68,192" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
                <polygon points="132,182 152,236 144,242 132,192" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
                <circle cx="82" cy="204" r="7" fill="#8a172c" stroke="#3b2d27" strokeWidth="1.5" />
                <circle cx="118" cy="218" r="9" fill="#8a172c" stroke="#3b2d27" strokeWidth="1.5" />
                <circle cx="96" cy="236" r="6" fill="#8a172c" stroke="#3b2d27" strokeWidth="1.5" />
              </g>
            ) : (
              /* Bad: Greasy Pit-Stained Tee */
              <g>
                <rect x="70" y="180" width="60" height="78" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
                <polygon points="70,182 52,226 60,232 70,192" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
                <polygon points="130,182 148,226 140,232 130,192" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
                <ellipse cx="68" cy="196" rx="6" ry="12" fill="#a89a42" opacity="0.85" />
                <ellipse cx="132" cy="196" rx="6" ry="12" fill="#a89a42" opacity="0.85" />
                <ellipse cx="98" cy="212" rx="8" ry="6" fill="#383630" opacity="0.9" />
                <circle cx="110" cy="226" r="5" fill="#383630" opacity="0.9" />
              </g>
            )}
          </g>
        ) : (
          /* Default basic white ribbed undershirt */
          <g>
            <rect x="76" y="180" width="48" height="76" fill="#fdfbff" stroke="#9da6cc" strokeWidth="1.5" />
            <line x1="84" y1="182" x2="84" y2="254" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="92" y1="182" x2="92" y2="254" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="100" y1="182" x2="100" y2="254" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="108" y1="182" x2="108" y2="254" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="116" y1="182" x2="116" y2="254" stroke="#e0e4f5" strokeWidth="1" />
          </g>
        )}

        {/* --- MR. HONEYCRISP HEAD (APPLE) --- */}
        {/* Apple Stem - Woody curved */}
        <path d="M100,52 C103,34 108,24 114,16" stroke="#613d1e" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M100,52 C103,34 108,24 114,16" stroke="#87572d" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Apple Leaf - Curved green leaf to upper left */}
        <path
          d="M100,48 C78,28 54,34 46,46 C56,58 86,56 100,48 Z"
          fill="#4ea63b"
          stroke="#265e1f"
          strokeWidth="1.5"
        />
        <path
          d="M96,48 C80,38 64,42 56,48"
          fill="none"
          stroke="#6cc256"
          strokeWidth="2"
        />

        {/* Apple Head Silhouette / Volume */}
        {/* Shadow base */}
        <path
          d="M48,60 C26,60 14,88 14,120 C14,158 44,180 88,180 C97,180 99,177 100,177 C101,177 103,180 112,180 C156,180 186,158 186,120 C186,88 174,60 152,60 C132,60 116,70 100,70 C84,70 68,60 48,60 Z"
          fill="#520e1a"
        />
        {/* Main Apple Body */}
        <path
          d="M50,62 C30,62 18,90 18,120 C18,155 46,177 88,177 C98,177 99,174 100,174 C101,174 102,177 112,177 C154,177 182,155 182,120 C182,90 170,62 150,62 C130,62 114,72 100,72 C86,72 70,62 50,62 Z"
          fill="url(#appleGradRef)"
        />

        {/* Glossy Apple Top & Cheek Highlights (matching reference image) */}
        <ellipse cx="140" cy="80" rx="18" ry="10" transform="rotate(-15 140 80)" fill="#d64966" opacity="0.65" />
        <ellipse cx="42" cy="100" rx="12" ry="24" fill="#c73e57" opacity="0.6" />
        <rect x="40" y="88" width="4" height="18" fill="#fca4b4" opacity="0.4" />

        {/* --- FACE (MATCHING REFERENCE IMAGE EXPRESSION) --- */}
        {/* Eyebrows - Arched with worry/frown furrow */}
        {isVictory ? (
          <g fill="#260d14">
            <polygon points="56,104 88,98 86,104 56,110" />
            <polygon points="144,104 112,98 114,104 144,110" />
          </g>
        ) : hasBadItem ? (
          <g fill="#260d14">
            <polygon points="54,112 90,98 88,104 54,118" />
            <polygon points="146,112 110,98 112,104 146,118" />
            <line x1="97" y1="100" x2="97" y2="112" stroke="#260d14" strokeWidth="2.5" />
            <line x1="103" y1="100" x2="103" y2="112" stroke="#260d14" strokeWidth="2.5" />
          </g>
        ) : (
          /* Signature furrowed arched brows & center vertical frown wrinkle from reference image! */
          <g fill="#260d14">
            <polygon points="54,106 88,98 86,104 54,112" />
            <polygon points="146,106 112,98 114,104 146,112" />
            {/* Vertical frown wrinkles between brows */}
            <path d="M96,102 Q97,110 96,114" stroke="#260d14" strokeWidth="2.5" fill="none" />
            <path d="M104,102 Q103,110 104,114" stroke="#260d14" strokeWidth="2.5" fill="none" />
          </g>
        )}

        {/* Hooded, tired/scowling eyes */}
        {/* Left eye */}
        <g>
          {/* Eyelid crease */}
          <path d="M52,110 Q70,105 88,111" stroke="#260d14" strokeWidth="2.5" fill="none" />
          {/* Sclera */}
          <ellipse cx="70" cy="122" rx="16" ry="10" fill="#fdfbff" stroke="#260d14" strokeWidth="2" />
          {/* Dark Iris/Pupil */}
          <ellipse cx="73" cy="123" rx="10" ry="9" fill="#1c0c11" />
          {/* White shine */}
          <circle cx="71" cy="120" r="3" fill="#ffffff" />
          {/* Heavy hooded upper lid line */}
          <path d="M54,117 Q70,113 86,117" stroke="#260d14" strokeWidth="3" fill="none" />
        </g>

        {/* Right eye */}
        <g>
          {/* Eyelid crease */}
          <path d="M112,111 Q130,105 148,110" stroke="#260d14" strokeWidth="2.5" fill="none" />
          {/* Sclera */}
          <ellipse cx="130" cy="122" rx="16" ry="10" fill="#fdfbff" stroke="#260d14" strokeWidth="2" />
          {/* Dark Iris/Pupil */}
          <ellipse cx="127" cy="123" rx="10" ry="9" fill="#1c0c11" />
          {/* White shine */}
          <circle cx="125" cy="120" r="3" fill="#ffffff" />
          {/* Heavy hooded upper lid line */}
          <path d="M114,117 Q130,113 146,117" stroke="#260d14" strokeWidth="3" fill="none" />
        </g>

        {/* Mouth - Prominent downturned curved scowl/frown (from reference image) */}
        {isVictory ? (
          <path d="M90,154 Q100,162 112,152" stroke="#260d14" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        ) : hasBadItem ? (
          <path d="M86,156 Q93,148 100,156 T114,152" stroke="#260d14" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        ) : (
          /* Signature downturned curved scowl */
          <path d="M88,158 Q100,148 112,158" stroke="#260d14" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        )}

        {/* Sweat drop if bad item */}
        {hasBadItem && (
          <path
            d="M156,98 C161,98 166,104 161,112 C157,110 156,104 156,98 Z"
            fill="#80d0ff"
            stroke="#1c1440"
            strokeWidth="1.5"
          />
        )}

        {/* Blush marks if victory */}
        {isVictory && (
          <g fill="#ff5e85" opacity="0.7">
            <rect x="46" y="132" width="8" height="4" />
            <rect x="56" y="132" width="8" height="4" />
            <rect x="136" y="132" width="8" height="4" />
            <rect x="146" y="132" width="8" height="4" />
          </g>
        )}

        {/* --- LAYER 4: ACCESSORY (BOWTIE / ROSE / WATCH / JUNK) --- */}
        {accessory && (
          <g>
            {accessory.id === "acc-silk-bowtie" ? (
              /* Crimson Silk Bowtie at open collar */
              <g>
                <polygon points="88,182 100,190 88,198" fill="#d91e48" stroke="#8a0c29" strokeWidth="1.5" />
                <polygon points="112,182 100,190 112,198" fill="#d91e48" stroke="#8a0c29" strokeWidth="1.5" />
                <circle cx="100" cy="190" r="4" fill="#ff4d73" stroke="#8a0c29" strokeWidth="1.5" />
              </g>
            ) : accessory.id === "acc-gold-watch" ? (
              /* Gleaming Gold Wristwatch on left wrist */
              <g>
                <circle cx="48" cy="286" r="8" fill="#ffe680" stroke="#9e7b0a" strokeWidth="2" />
                <line x1="48" y1="286" x2="48" y2="282" stroke="#1c1440" strokeWidth="1.5" />
                <line x1="48" y1="286" x2="52" y2="286" stroke="#1c1440" strokeWidth="1.5" />
                <path d="M52,282 Q74,272 96,258" stroke="#ffe680" strokeWidth="2" fill="none" strokeDasharray="3 2" />
              </g>
            ) : accessory.id === "acc-rose-boutonniere" ? (
              /* Fresh Red Boutonniere on chest */
              <g>
                <circle cx="82" cy="198" r="7.5" fill="#e62249" stroke="#8a0c29" strokeWidth="1.5" />
                <circle cx="82" cy="198" r="3.5" fill="#ff6b8b" />
                <path d="M80,204 Q76,212 74,218" stroke="#2f8039" strokeWidth="2.5" fill="none" />
                <ellipse cx="78" cy="210" rx="3.5" ry="1.8" fill="#439637" />
              </g>
            ) : accessory.id === "acc-fishbone-tie" ? (
              /* Bad: Stinky Fishbone around neck */
              <g>
                <line x1="100" y1="182" x2="100" y2="220" stroke="#d5d5d5" strokeWidth="3" />
                <line x1="90" y1="192" x2="110" y2="192" stroke="#d5d5d5" strokeWidth="2.5" />
                <line x1="88" y1="200" x2="112" y2="200" stroke="#d5d5d5" strokeWidth="2.5" />
                <line x1="92" y1="208" x2="108" y2="208" stroke="#d5d5d5" strokeWidth="2.5" />
                <polygon points="94,182 106,182 100,174" fill="#a0a0a0" stroke="#666" strokeWidth="1.5" />
                <circle cx="116" cy="190" r="2.5" fill="#111" />
              </g>
            ) : accessory.id === "acc-soup-bib" ? (
              /* Bad: Tomato Soup Bib over chest */
              <g>
                <path d="M82,180 Q100,174 118,180 L116,220 Q100,230 84,220 Z" fill="#fdfbff" stroke="#333" strokeWidth="2" />
                <path d="M86,190 Q100,200 110,188 Q112,214 94,212 Z" fill="#a3362a" stroke="#6e2017" strokeWidth="1.5" />
                <circle cx="108" cy="212" r="3.5" fill="#e67e22" />
              </g>
            ) : (
              /* Bad: Cracked Duct-Tape Shades over eyes */
              <g>
                <rect x="58" y="112" width="34" height="16" rx="3" fill="#222" stroke="#000" strokeWidth="2" />
                <rect x="108" y="112" width="34" height="16" rx="3" fill="#222" stroke="#000" strokeWidth="2" />
                <line x1="110" y1="114" x2="138" y2="126" stroke="#fff" strokeWidth="2" />
                <rect x="92" y="114" width="16" height="12" fill="#b0b0b0" stroke="#555" strokeWidth="1.5" />
                <line x1="92" y1="118" x2="108" y2="118" stroke="#777" strokeWidth="1" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
