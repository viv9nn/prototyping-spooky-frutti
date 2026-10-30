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
          <span className="bubble-text text-victory">✨ Looking Dapper! ✨</span>
        ) : hasBadItem ? (
          <span className="bubble-text text-bad">🤢 Stained &amp; Disgusting!</span>
        ) : top || bottom || shoes || accessory ? (
          <span className="bubble-text text-normal">Getting dressed...</span>
        ) : (
          <span className="bubble-text text-empty">Pick an outfit!</span>
        )}
      </div>

      {/* Mr. Honeycrisp Full Body SVG */}
      <svg
        viewBox="0 0 220 320"
        className="fullbody-avatar-svg"
        style={{
          shapeRendering: "crispEdges",
          imageRendering: "pixelated",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="appleGradientFull" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b0263f" />
            <stop offset="65%" stopColor="#871b2d" />
            <stop offset="100%" stopColor="#540f1d" />
          </linearGradient>
          <radialGradient id="rugShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 10, 35, 0.7)" />
            <stop offset="100%" stopColor="rgba(15, 10, 35, 0)" />
          </radialGradient>
        </defs>

        {/* --- DRESSING STAND / RUG SHADOW AT FEET --- */}
        <ellipse cx="110" cy="298" rx="65" ry="14" fill="url(#rugShadow)" />

        {/* --- STINK FUMES IF BAD ITEM EQUIPPED --- */}
        {hasBadItem && (
          <g className="stink-fumes">
            <path
              d="M35,110 Q42,95 36,80 T44,55"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            <path
              d="M185,120 Q178,105 184,90 T176,65"
              fill="none"
              stroke="#88cc44"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            <path
              d="M110,30 Q116,16 110,4 T118,-10"
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
            <path d="M28,60 L32,46 L36,60 L50,64 L36,68 L32,82 L28,68 L14,64 Z" fill="#ffe680" />
            <path d="M190,50 L194,38 L198,50 L210,54 L198,58 L194,70 L190,58 L178,54 Z" fill="#ff8fc0" />
            <path d="M40,210 L43,200 L46,210 L56,213 L46,216 L43,226 L40,216 L30,213 Z" fill="#ffe680" />
            <path d="M180,220 L183,212 L186,220 L194,223 L186,226 L183,234 L180,226 L172,223 Z" fill="#ffe680" />
          </g>
        )}

        {/* --- BASE BODY: ARMS & HANDS (RED APPLE LIMBS) --- */}
        {/* Left Arm & Hand */}
        <path d="M62,142 L42,178 L34,174 L52,138 Z" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
        <circle cx="36" cy="180" r="7" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
        {/* Right Arm & Hand */}
        <path d="M158,142 L178,178 L186,174 L168,138 Z" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
        <circle cx="184" cy="180" r="7" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />

        {/* --- BASE BODY: TORSO & LEGS --- */}
        {/* Red torso base */}
        <rect x="76" y="132" width="68" height="64" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />

        {/* --- LAYER 1: BOTTOM (SLACKS / JEANS / BOXERS) --- */}
        {bottom ? (
          <g>
            {bottom.id === "bottom-khaki-slacks" ? (
              /* Pressed Khaki Slacks (from reference art) */
              <g>
                <rect x="74" y="188" width="72" height="10" fill="#694119" stroke="#36200a" strokeWidth="1.5" />
                <rect x="105" y="188" width="10" height="10" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <polygon points="74,198 107,198 103,275 74,275" fill="#cfb97c" stroke="#36200a" strokeWidth="2" />
                <polygon points="113,198 146,198 146,275 117,275" fill="#cfb97c" stroke="#36200a" strokeWidth="2" />
                <line x1="88" y1="198" x2="88" y2="272" stroke="#ab9558" strokeWidth="2" />
                <line x1="132" y1="198" x2="132" y2="272" stroke="#ab9558" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-midnight-trousers" ? (
              /* Charcoal Evening Trousers */
              <g>
                <rect x="74" y="188" width="72" height="10" fill="#141417" stroke="#000" strokeWidth="1.5" />
                <rect x="105" y="188" width="10" height="10" fill="#cccccc" stroke="#666" strokeWidth="1" />
                <polygon points="74,198 107,198 103,275 74,275" fill="#25283b" stroke="#11131c" strokeWidth="2" />
                <polygon points="113,198 146,198 146,275 117,275" fill="#25283b" stroke="#11131c" strokeWidth="2" />
                <line x1="88" y1="198" x2="88" y2="272" stroke="#3d4261" strokeWidth="2" />
                <line x1="132" y1="198" x2="132" y2="272" stroke="#3d4261" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-tailored-chinos" ? (
              /* Royal Blue Tailored Chinos */
              <g>
                <rect x="74" y="188" width="72" height="10" fill="#523214" stroke="#2b1a09" strokeWidth="1.5" />
                <rect x="105" y="188" width="10" height="10" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <polygon points="74,198 107,198 103,275 74,275" fill="#293c69" stroke="#131c33" strokeWidth="2" />
                <polygon points="113,198 146,198 146,275 117,275" fill="#293c69" stroke="#131c33" strokeWidth="2" />
                <line x1="88" y1="198" x2="88" y2="272" stroke="#3f5a9e" strokeWidth="2" />
                <line x1="132" y1="198" x2="132" y2="272" stroke="#3f5a9e" strokeWidth="2" />
              </g>
            ) : bottom.id === "bottom-muddy-jeans" ? (
              /* Bad: Muddy Torn Jeans */
              <g>
                <polygon points="74,196 107,196 103,275 74,275" fill="#465369" stroke="#222a36" strokeWidth="2" />
                <polygon points="113,196 146,196 146,275 117,275" fill="#465369" stroke="#222a36" strokeWidth="2" />
                {/* Ripped knee holes */}
                <rect x="80" y="232" width="16" height="10" fill="#871b2d" stroke="#222a36" strokeWidth="1" />
                <line x1="78" y1="237" x2="98" y2="237" stroke="#fff" strokeWidth="1.5" />
                <rect x="122" y="228" width="16" height="9" fill="#871b2d" stroke="#222a36" strokeWidth="1" />
                {/* Wet mud clods */}
                <ellipse cx="88" cy="255" rx="10" ry="7" fill="#4a3219" stroke="#2b1a09" strokeWidth="1" />
                <ellipse cx="132" cy="256" rx="11" ry="8" fill="#4a3219" stroke="#2b1a09" strokeWidth="1" />
                <circle cx="100" cy="218" r="5" fill="#4a3219" />
              </g>
            ) : bottom.id === "bottom-greasy-sweats" ? (
              /* Bad: Baggy Greasy Sweats */
              <g>
                <rect x="71" y="192" width="37" height="82" rx="6" fill="#696969" stroke="#333" strokeWidth="2" />
                <rect x="112" y="192" width="37" height="82" rx="6" fill="#696969" stroke="#333" strokeWidth="2" />
                <rect x="70" y="270" width="39" height="6" fill="#474747" stroke="#333" strokeWidth="1" />
                <rect x="111" y="270" width="39" height="6" fill="#474747" stroke="#333" strokeWidth="1" />
                {/* Grease spots */}
                <circle cx="86" cy="226" r="9" fill="#3b322a" opacity="0.9" />
                <circle cx="130" cy="242" r="11" fill="#2b1c11" opacity="0.9" />
                <circle cx="92" cy="252" r="6" fill="#2b1c11" opacity="0.9" />
              </g>
            ) : (
              /* Bad: Threadbare Boxer Shorts */
              <g>
                <rect x="76" y="192" width="32" height="38" fill="#785055" stroke="#3d2125" strokeWidth="2" />
                <rect x="112" y="192" width="32" height="38" fill="#785055" stroke="#3d2125" strokeWidth="2" />
                {/* Tears */}
                <polygon points="76,230 82,222 88,230 94,222 100,230 106,222 108,230" fill="#3d2125" />
                <polygon points="112,230 118,222 124,230 130,222 136,230 142,222 144,230" fill="#3d2125" />
                {/* Red apple legs poking out */}
                <rect x="82" y="230" width="20" height="46" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
                <rect x="118" y="230" width="20" height="46" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
              </g>
            )}
          </g>
        ) : (
          /* Default basic underwear (waiting for pants) */
          <g>
            <rect x="76" y="192" width="32" height="30" fill="#fdfbff" stroke="#9da6cc" strokeWidth="1.5" />
            <rect x="112" y="192" width="32" height="30" fill="#fdfbff" stroke="#9da6cc" strokeWidth="1.5" />
            {/* Cute pink heart on boxers */}
            <circle cx="88" cy="204" r="3" fill="#ff8fc0" />
            <circle cx="94" cy="204" r="3" fill="#ff8fc0" />
            <polygon points="85,205 97,205 91,213" fill="#ff8fc0" />
            {/* Bare legs */}
            <rect x="83" y="222" width="18" height="54" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
            <rect x="119" y="222" width="18" height="54" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
          </g>
        )}

        {/* --- LAYER 2: SHOES --- */}
        {shoes ? (
          <g>
            {shoes.id === "shoes-white-loafers" ? (
              /* Pristine White Sneakers (reference image) */
              <g fill="#fdfbff" stroke="#24287e" strokeWidth="1.5">
                <rect x="70" y="274" width="36" height="18" rx="4" />
                <rect x="114" y="274" width="36" height="18" rx="4" />
                <line x1="70" y1="288" x2="106" y2="288" stroke="#8c9aa8" strokeWidth="3" />
                <line x1="114" y1="288" x2="150" y2="288" stroke="#8c9aa8" strokeWidth="3" />
              </g>
            ) : shoes.id === "shoes-oxford-leather" ? (
              /* Polished Brown Oxfords */
              <g fill="#422013" stroke="#1f0c05" strokeWidth="1.5">
                <rect x="70" y="274" width="36" height="18" rx="3" />
                <rect x="114" y="274" width="36" height="18" rx="3" />
                <rect x="74" y="277" width="12" height="3" fill="#99633d" />
                <rect x="118" y="277" width="12" height="3" fill="#99633d" />
                <line x1="70" y1="290" x2="106" y2="290" stroke="#1f0c05" strokeWidth="3" />
                <line x1="114" y1="290" x2="150" y2="290" stroke="#1f0c05" strokeWidth="3" />
              </g>
            ) : shoes.id === "shoes-velvet-loafers" ? (
              /* Wine Velvet Loafers */
              <g fill="#6e152d" stroke="#380613" strokeWidth="1.5">
                <rect x="70" y="274" width="36" height="18" rx="4" />
                <rect x="114" y="274" width="36" height="18" rx="4" />
                <rect x="84" y="278" width="10" height="4" rx="1" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <rect x="128" y="278" width="10" height="4" rx="1" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
              </g>
            ) : shoes.id === "shoes-toe-sneakers" ? (
              /* Bad: Stinky green toe hole sneaker */
              <g>
                <rect x="70" y="274" width="36" height="18" rx="4" fill="#545e48" stroke="#2b3323" strokeWidth="1.5" />
                <rect x="114" y="274" width="36" height="18" rx="4" fill="#545e48" stroke="#2b3323" strokeWidth="1.5" />
                {/* Red apple toe poking out */}
                <ellipse cx="72" cy="282" rx="6" ry="5" fill="#871b2d" stroke="#520e1a" strokeWidth="1" />
                {/* Stink lines */}
                <path d="M64,272 Q60,264 66,256" stroke="#78aa3b" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
                <path d="M154,272 Q158,264 152,256" stroke="#78aa3b" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
              </g>
            ) : shoes.id === "shoes-crusty-workboots" ? (
              /* Bad: Crusty Mud Boots */
              <g fill="#4a3219" stroke="#211406" strokeWidth="1.5">
                <rect x="68" y="268" width="40" height="24" rx="4" />
                <rect x="112" y="268" width="40" height="24" rx="4" />
                <circle cx="74" cy="294" r="4" fill="#2b1a09" stroke="none" />
                <circle cx="146" cy="294" r="4.5" fill="#2b1a09" stroke="none" />
              </g>
            ) : (
              /* Bad: Chewed Busted Flip-Flop */
              <g>
                <ellipse cx="88" cy="286" rx="20" ry="8" fill="#286161" stroke="#123636" strokeWidth="1.5" />
                <ellipse cx="132" cy="286" rx="20" ry="8" fill="#286161" stroke="#123636" strokeWidth="1.5" />
                <path d="M82,286 L86,276" stroke="#a32626" strokeWidth="2.5" />
                <line x1="128" y1="286" x2="132" y2="278" stroke="#999" strokeWidth="1.5" />
              </g>
            )}
          </g>
        ) : (
          /* Bare apple feet */
          <g fill="#871b2d" stroke="#520e1a" strokeWidth="1.5">
            <ellipse cx="88" cy="284" rx="16" ry="8" />
            <ellipse cx="132" cy="284" rx="16" ry="8" />
          </g>
        )}

        {/* --- LAYER 3: TOP (SHIRTS / BLAZERS / VESTS) --- */}
        {top ? (
          <g>
            {top.id === "top-dress-shirt" ? (
              /* Crisp Cream Dress Shirt (reference image) */
              <g>
                <rect x="72" y="132" width="76" height="66" fill="#fcf9ec" stroke="#24287e" strokeWidth="2" />
                <polygon points="86,132 110,154 96,132" fill="#eae4cb" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="134,132 110,154 124,132" fill="#eae4cb" stroke="#24287e" strokeWidth="1.5" />
                <rect x="107" y="132" width="6" height="66" fill="#eae4cb" />
                <circle cx="110" cy="148" r="2" fill="#7a7058" />
                <circle cx="110" cy="162" r="2" fill="#7a7058" />
                <circle cx="110" cy="176" r="2" fill="#7a7058" />
                {/* Sleeves */}
                <polygon points="72,134 52,168 62,174 72,148" fill="#fcf9ec" stroke="#24287e" strokeWidth="2" />
                <polygon points="148,134 168,168 158,174 148,148" fill="#fcf9ec" stroke="#24287e" strokeWidth="2" />
                {/* Gold cufflinks */}
                <rect x="54" y="170" width="5" height="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <rect x="160" y="170" width="5" height="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
              </g>
            ) : top.id === "top-navy-blazer" ? (
              /* Midnight Navy Blazer */
              <g>
                <rect x="70" y="130" width="80" height="70" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
                <polygon points="98,130 110,158 122,130" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="76,130 102,168 94,186 74,152" fill="#293780" stroke="#0e1333" strokeWidth="1.5" />
                <polygon points="144,130 118,168 126,186 146,152" fill="#293780" stroke="#0e1333" strokeWidth="1.5" />
                <circle cx="110" cy="170" r="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <circle cx="110" cy="184" r="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
                <polygon points="70,132 48,168 58,176 70,146" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
                <polygon points="150,132 172,168 162,176 150,146" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
                <polygon points="84,158 90,152 94,158" fill="#ff8fc0" />
              </g>
            ) : top.id === "top-tux-vest" ? (
              /* Dapper Velvet Vest */
              <g>
                <rect x="72" y="132" width="76" height="66" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="72,134 52,168 62,174 72,148" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
                <polygon points="148,134 168,168 158,174 148,148" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
                <path d="M72,136 L98,166 L110,182 L122,166 L148,136 L148,198 L72,198 Z" fill="#7a1233" stroke="#4a081c" strokeWidth="2" />
                <circle cx="110" cy="168" r="2.5" fill="#ffe680" />
                <circle cx="110" cy="180" r="2.5" fill="#ffe680" />
                <circle cx="110" cy="190" r="2.5" fill="#ffe680" />
              </g>
            ) : top.id === "top-mustard-tank" ? (
              /* Bad: Mustard-Stained Tank */
              <g>
                <path d="M80,132 L92,148 L128,148 L140,132 L146,144 L142,196 L78,196 L74,144 Z" fill="#8f844b" stroke="#4a4220" strokeWidth="2" />
                <path d="M96,154 Q118,144 126,160 Q120,184 104,180 Q90,172 96,154 Z" fill="#e6c310" stroke="#998000" strokeWidth="2" />
                <circle cx="128" cy="178" r="4.5" fill="#e6c310" />
                <circle cx="94" cy="184" r="3.5" fill="#e6c310" />
              </g>
            ) : top.id === "top-moth-sweater" ? (
              /* Bad: Moth-Eaten Sweater */
              <g>
                <rect x="70" y="132" width="80" height="66" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
                <polygon points="70,134 50,166 60,174 70,148" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
                <polygon points="150,134 170,166 160,174 150,148" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
                <circle cx="88" cy="154" r="8" fill="#871b2d" stroke="#3b2d27" strokeWidth="1.5" />
                <circle cx="132" cy="168" r="10" fill="#871b2d" stroke="#3b2d27" strokeWidth="1.5" />
                <circle cx="106" cy="182" r="7" fill="#871b2d" stroke="#3b2d27" strokeWidth="1.5" />
              </g>
            ) : (
              /* Bad: Greasy Pit-Stained Tee */
              <g>
                <rect x="72" y="132" width="76" height="66" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
                <polygon points="72,134 52,164 62,172 72,148" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
                <polygon points="148,134 168,164 158,172 148,148" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
                <ellipse cx="70" cy="148" rx="8" ry="14" fill="#a89a42" opacity="0.85" />
                <ellipse cx="150" cy="148" rx="8" ry="14" fill="#a89a42" opacity="0.85" />
                <ellipse cx="108" cy="164" rx="10" ry="8" fill="#383630" opacity="0.9" />
                <circle cx="122" cy="178" r="6" fill="#383630" opacity="0.9" />
              </g>
            )}
          </g>
        ) : (
          /* Default basic white ribbed undershirt */
          <g>
            <rect x="78" y="132" width="64" height="60" fill="#fdfbff" stroke="#9da6cc" strokeWidth="1.5" />
            <line x1="88" y1="134" x2="88" y2="190" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="98" y1="134" x2="98" y2="190" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="108" y1="134" x2="108" y2="190" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="118" y1="134" x2="118" y2="190" stroke="#e0e4f5" strokeWidth="1" />
            <line x1="128" y1="134" x2="128" y2="190" stroke="#e0e4f5" strokeWidth="1" />
          </g>
        )}

        {/* --- MR. HONEYCRISP HEAD (APPLE) --- */}
        {/* Apple Stem */}
        <rect x="112" y="14" width="8" height="20" fill="#5e381b" stroke="#361f0e" strokeWidth="1.5" />
        <rect x="116" y="8" width="6" height="8" fill="#7d4d27" />

        {/* Apple Leaf */}
        <path
          d="M112,24 C90,8 68,16 62,26 C72,36 100,34 112,24 Z"
          fill="#439637"
          stroke="#265e1f"
          strokeWidth="1.5"
        />
        <path
          d="M108,24 C92,16 76,20 70,26"
          fill="none"
          stroke="#68bf5a"
          strokeWidth="2"
        />

        {/* Apple Head Body */}
        {/* Shadow base */}
        <path
          d="M52,36 C30,36 18,62 18,92 C18,128 46,148 94,148 C105,148 108,145 110,145 C112,145 115,148 126,148 C174,148 202,128 202,92 C202,62 190,36 168,36 C146,36 128,46 110,46 C92,46 74,36 52,36 Z"
          fill="#520e1a"
        />
        {/* Main Apple Body */}
        <path
          d="M54,38 C34,38 22,64 22,92 C22,125 48,145 94,145 C106,145 108,142 110,142 C112,142 114,145 126,145 C172,145 198,125 198,92 C198,64 186,38 166,38 C144,38 126,48 110,48 C94,48 76,38 54,38 Z"
          fill="url(#appleGradientFull)"
        />

        {/* Subtle Highlights on Apple cheek */}
        <ellipse cx="44" cy="74" rx="14" ry="24" fill="#c73e57" opacity="0.6" />
        <rect x="42" y="62" width="4" height="16" fill="#fca4b4" opacity="0.4" />

        {/* --- FACE --- */}
        {/* Eyebrows */}
        {isVictory ? (
          <g fill="#260d14">
            <polygon points="62,76 94,70 92,76 62,82" />
            <polygon points="158,76 126,70 128,76 158,82" />
          </g>
        ) : hasBadItem ? (
          <g fill="#260d14">
            <polygon points="60,84 96,70 94,76 60,90" />
            <polygon points="160,84 124,70 126,76 160,90" />
            <line x1="107" y1="72" x2="107" y2="84" stroke="#260d14" strokeWidth="2.5" />
            <line x1="113" y1="72" x2="113" y2="84" stroke="#260d14" strokeWidth="2.5" />
          </g>
        ) : (
          <g fill="#260d14">
            <polygon points="60,78 94,70 92,76 60,84" />
            <polygon points="160,78 126,70 128,76 160,84" />
            <line x1="110" y1="74" x2="110" y2="82" stroke="#260d14" strokeWidth="2.5" />
          </g>
        )}

        {/* Eyes */}
        {/* Left eye */}
        <g>
          <ellipse cx="78" cy="94" rx="16" ry="10" fill="#fdfbff" stroke="#260d14" strokeWidth="2" />
          <ellipse cx="83" cy="94" rx="10" ry="9" fill="#1c0c11" />
          <circle cx="81" cy="91" r="3" fill="#ffffff" />
          <path d="M62,90 Q78,84 94,89" stroke="#260d14" strokeWidth="3" fill="none" />
        </g>

        {/* Right eye */}
        <g>
          <ellipse cx="142" cy="94" rx="16" ry="10" fill="#fdfbff" stroke="#260d14" strokeWidth="2" />
          <ellipse cx="137" cy="94" rx="10" ry="9" fill="#1c0c11" />
          <circle cx="135" cy="91" r="3" fill="#ffffff" />
          <path d="M126,89 Q142,84 158,90" stroke="#260d14" strokeWidth="3" fill="none" />
        </g>

        {/* Mouth */}
        {isVictory ? (
          <path d="M100,120 Q112,128 126,118" stroke="#260d14" strokeWidth="3.5" fill="none" />
        ) : hasBadItem ? (
          <path d="M96,122 Q103,115 110,122 T124,118" stroke="#260d14" strokeWidth="3.5" fill="none" />
        ) : (
          <path d="M100,122 L120,122" stroke="#260d14" strokeWidth="3.5" fill="none" />
        )}

        {/* Sweat drop if bad item */}
        {hasBadItem && (
          <path
            d="M170,72 C175,72 180,78 175,86 C171,84 170,78 170,72 Z"
            fill="#80d0ff"
            stroke="#1c1440"
            strokeWidth="1.5"
          />
        )}

        {/* Blush marks if victory */}
        {isVictory && (
          <g fill="#ff5e85" opacity="0.7">
            <rect x="52" cy="102" width="8" height="4" />
            <rect x="62" cy="102" width="8" height="4" />
            <rect x="150" cy="102" width="8" height="4" />
            <rect x="160" cy="102" width="8" height="4" />
          </g>
        )}

        {/* --- LAYER 4: ACCESSORY (BOWTIE / ROSE / WATCH / JUNK) --- */}
        {accessory && (
          <g>
            {accessory.id === "acc-silk-bowtie" ? (
              /* Crimson Silk Bowtie at collar */
              <g>
                <polygon points="98,136 110,144 98,152" fill="#d91e48" stroke="#8a0c29" strokeWidth="1.5" />
                <polygon points="122,136 110,144 122,152" fill="#d91e48" stroke="#8a0c29" strokeWidth="1.5" />
                <circle cx="110" cy="144" r="4.5" fill="#ff4d73" stroke="#8a0c29" strokeWidth="1.5" />
              </g>
            ) : accessory.id === "acc-gold-watch" ? (
              /* Gleaming Pocket Watch on chain */
              <g>
                <circle cx="50" cy="172" r="9" fill="#ffe680" stroke="#9e7b0a" strokeWidth="2" />
                <line x1="50" y1="172" x2="50" y2="167" stroke="#1c1440" strokeWidth="1.5" />
                <line x1="50" y1="172" x2="54" y2="172" stroke="#1c1440" strokeWidth="1.5" />
                <path d="M54,168 Q80,180 106,166" stroke="#ffe680" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
              </g>
            ) : accessory.id === "acc-rose-boutonniere" ? (
              /* Fresh Red Boutonniere on lapel */
              <g>
                <circle cx="86" cy="144" r="8" fill="#e62249" stroke="#8a0c29" strokeWidth="1.5" />
                <circle cx="86" cy="144" r="4" fill="#ff6b8b" />
                <path d="M84,150 Q80,158 78,164" stroke="#2f8039" strokeWidth="2.5" fill="none" />
                <ellipse cx="82" cy="156" rx="4" ry="2" fill="#439637" />
              </g>
            ) : accessory.id === "acc-fishbone-tie" ? (
              /* Bad: Fishbone tie around neck */
              <g>
                <line x1="110" y1="134" x2="110" y2="172" stroke="#d5d5d5" strokeWidth="3" />
                <line x1="100" y1="144" x2="120" y2="144" stroke="#d5d5d5" strokeWidth="2.5" />
                <line x1="98" y1="152" x2="122" y2="152" stroke="#d5d5d5" strokeWidth="2.5" />
                <line x1="102" y1="160" x2="118" y2="160" stroke="#d5d5d5" strokeWidth="2.5" />
                <polygon points="104,134 116,134 110,126" fill="#a0a0a0" stroke="#666" strokeWidth="1.5" />
                <circle cx="126" cy="142" r="2.5" fill="#111" />
              </g>
            ) : accessory.id === "acc-soup-bib" ? (
              /* Bad: Tomato soup bib */
              <g>
                <path d="M88,132 Q110,126 132,132 L130,172 Q110,182 90,172 Z" fill="#fdfbff" stroke="#333" strokeWidth="2" />
                <path d="M94,142 Q110,152 122,140 Q124,166 104,164 Z" fill="#a3362a" stroke="#6e2017" strokeWidth="1.5" />
                <circle cx="120" cy="164" r="4" fill="#e67e22" />
              </g>
            ) : (
              /* Bad: Cracked Duct-Tape Shades on eyes */
              <g>
                <rect x="66" y="86" width="36" height="16" rx="3" fill="#222" stroke="#000" strokeWidth="2" />
                <rect x="118" y="86" width="36" height="16" rx="3" fill="#222" stroke="#000" strokeWidth="2" />
                <line x1="120" y1="88" x2="148" y2="100" stroke="#fff" strokeWidth="2" />
                <rect x="102" y="88" width="16" height="12" fill="#b0b0b0" stroke="#555" strokeWidth="1.5" />
                <line x1="102" y1="92" x2="118" y2="92" stroke="#777" strokeWidth="1" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
