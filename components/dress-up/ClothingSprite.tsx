"use client";

import React from "react";
import { ClothingItem } from "@/lib/dress-up/items";

interface ClothingSpriteProps {
  item: ClothingItem;
  size?: number; // width & height in px
}

export default function ClothingSprite({ item, size = 80 }: ClothingSpriteProps) {
  const { id } = item;

  return (
    <div
      className="clothing-sprite-wrap"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          shapeRendering: "crispEdges",
          imageRendering: "pixelated",
          overflow: "visible",
        }}
      >
        {/* ======================= TOPS ======================= */}

        {/* Crisp Dress Shirt (Clean) */}
        {id === "top-dress-shirt" && (
          <g>
            {/* White shirt body */}
            <rect x="25" y="22" width="50" height="56" fill="#fcf9ec" stroke="#24287e" strokeWidth="2" />
            {/* Folded collar */}
            <polygon points="35,22 50,42 42,22" fill="#eae4cb" stroke="#24287e" strokeWidth="1.5" />
            <polygon points="65,22 50,42 58,22" fill="#eae4cb" stroke="#24287e" strokeWidth="1.5" />
            {/* Center placket & buttons */}
            <rect x="47" y="22" width="6" height="56" fill="#eae4cb" />
            <circle cx="50" cy="46" r="2" fill="#7a7058" />
            <circle cx="50" cy="58" r="2" fill="#7a7058" />
            <circle cx="50" cy="70" r="2" fill="#7a7058" />
            {/* Sleeves */}
            <polygon points="25,24 8,46 18,52 25,38" fill="#fcf9ec" stroke="#24287e" strokeWidth="2" />
            <polygon points="75,24 92,46 82,52 75,38" fill="#fcf9ec" stroke="#24287e" strokeWidth="2" />
            {/* Gold cufflinks */}
            <rect x="10" y="48" width="5" height="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
            <rect x="85" y="48" width="5" height="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
            {/* Clean sparkle */}
            <path d="M78,16 L80,10 L82,16 L88,18 L82,20 L80,26 L78,20 L72,18 Z" fill="#ffe680" />
          </g>
        )}

        {/* Midnight Navy Blazer (Clean) */}
        {id === "top-navy-blazer" && (
          <g>
            {/* Inner white shirt */}
            <polygon points="40,20 50,44 60,20" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
            {/* Blazer jacket body */}
            <rect x="24" y="22" width="52" height="58" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
            {/* Lapels */}
            <polygon points="26,22 48,54 38,70 26,44" fill="#293780" stroke="#0e1333" strokeWidth="1.5" />
            <polygon points="74,22 52,54 62,70 74,44" fill="#293780" stroke="#0e1333" strokeWidth="1.5" />
            {/* Gold buttons */}
            <circle cx="50" cy="56" r="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
            <circle cx="50" cy="68" r="3" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
            {/* Sleeves */}
            <polygon points="24,24 6,48 16,56 24,40" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
            <polygon points="76,24 94,48 84,56 76,40" fill="#1b245a" stroke="#0e1333" strokeWidth="2" />
            {/* Pocket square */}
            <polygon points="32,46 38,40 42,46" fill="#ff8fc0" />
            {/* Sparkle */}
            <path d="M84,18 L86,12 L88,18 L94,20 L88,22 L86,28 L84,22 L78,20 Z" fill="#ffe680" />
          </g>
        )}

        {/* Dapper Velvet Vest (Clean) */}
        {id === "top-tux-vest" && (
          <g>
            {/* White shirt base */}
            <rect x="26" y="22" width="48" height="54" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
            <polygon points="26,24 12,44 20,48 26,36" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
            <polygon points="74,24 88,44 80,48 74,36" fill="#fdfbff" stroke="#24287e" strokeWidth="1.5" />
            {/* Crimson velvet vest */}
            <path d="M26,28 L42,50 L50,62 L58,50 L74,28 L74,76 L50,76 L26,76 Z" fill="#7a1233" stroke="#4a081c" strokeWidth="2" />
            {/* Vest buttons */}
            <circle cx="50" cy="54" r="2" fill="#ffe680" />
            <circle cx="50" cy="64" r="2" fill="#ffe680" />
            <circle cx="50" cy="72" r="2" fill="#ffe680" />
            {/* Sparkle */}
            <path d="M18,18 L20,12 L22,18 L28,20 L22,22 L20,28 L18,22 L12,20 Z" fill="#ff8fc0" />
          </g>
        )}

        {/* Mustard-Stained Tank (Bad) */}
        {id === "top-mustard-tank" && (
          <g>
            {/* Dingy yellow-brown tank */}
            <path d="M32,20 L40,32 L60,32 L68,20 L76,28 L70,78 L30,78 L24,28 Z" fill="#8f844b" stroke="#4a4220" strokeWidth="2" />
            {/* Armhole cuts */}
            <ellipse cx="26" cy="38" rx="5" ry="12" fill="none" stroke="#4a4220" strokeWidth="1.5" />
            <ellipse cx="74" cy="38" rx="5" ry="12" fill="none" stroke="#4a4220" strokeWidth="1.5" />
            {/* HUGE yellow mustard splatter */}
            <path d="M42,42 Q58,34 66,46 Q62,62 48,58 Q38,54 42,42 Z" fill="#e6c310" stroke="#998000" strokeWidth="1.5" />
            <circle cx="68" cy="58" r="3.5" fill="#e6c310" />
            <circle cx="38" cy="62" r="3" fill="#e6c310" />
            <circle cx="52" cy="66" r="2.5" fill="#e6c310" />
            {/* Stink squiggles */}
            <path d="M78,28 Q82,20 78,14" fill="none" stroke="#88cc44" strokeWidth="2" strokeDasharray="3 2" />
          </g>
        )}

        {/* Moth-Eaten Sweater (Bad) */}
        {id === "top-moth-sweater" && (
          <g>
            {/* Brown ragged sweater */}
            <rect x="24" y="24" width="52" height="52" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
            <polygon points="24,26 6,48 14,54 24,38" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
            <polygon points="76,26 94,48 86,54 76,38" fill="#69554d" stroke="#3b2d27" strokeWidth="2" />
            {/* Gaping moth holes */}
            <circle cx="38" cy="42" r="7" fill="#181335" stroke="#3b2d27" strokeWidth="1.5" />
            <circle cx="64" cy="52" r="9" fill="#181335" stroke="#3b2d27" strokeWidth="1.5" />
            <circle cx="48" cy="64" r="5" fill="#181335" stroke="#3b2d27" strokeWidth="1.5" />
            <circle cx="70" cy="36" r="4" fill="#181335" stroke="#3b2d27" strokeWidth="1" />
            {/* Ragged unraveled bottom */}
            <polygon points="24,76 30,70 36,76 42,70 48,76 54,70 60,76 66,70 72,76 76,70" fill="#3b2d27" />
          </g>
        )}

        {/* Greasy Pit-Stained Tee (Bad) */}
        {id === "top-greasy-tee" && (
          <g>
            {/* Dingy grey tee */}
            <rect x="25" y="24" width="50" height="54" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
            <polygon points="25,24 8,42 16,48 25,36" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
            <polygon points="75,24 92,42 84,48 75,36" fill="#8a877c" stroke="#47453e" strokeWidth="2" />
            {/* Dark yellow armpit sweat stains */}
            <ellipse cx="23" cy="34" rx="8" ry="12" fill="#a89a42" opacity="0.85" />
            <ellipse cx="77" cy="34" rx="8" ry="12" fill="#a89a42" opacity="0.85" />
            {/* Dark grease spots on chest */}
            <ellipse cx="48" cy="46" rx="8" ry="6" fill="#383630" opacity="0.9" />
            <circle cx="58" cy="58" r="5" fill="#383630" opacity="0.9" />
            <circle cx="38" cy="62" r="4" fill="#383630" opacity="0.9" />
          </g>
        )}

        {/* ======================= BOTTOMS ======================= */}

        {/* Pressed Khaki Slacks (Clean) */}
        {id === "bottom-khaki-slacks" && (
          <g>
            {/* Leather belt */}
            <rect x="26" y="20" width="48" height="8" fill="#694119" stroke="#36200a" strokeWidth="1.5" />
            <rect x="46" y="20" width="8" height="8" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
            {/* Pants legs */}
            <polygon points="26,28 47,28 44,82 26,82" fill="#cfb97c" stroke="#36200a" strokeWidth="2" />
            <polygon points="53,28 74,28 74,82 56,82" fill="#cfb97c" stroke="#36200a" strokeWidth="2" />
            {/* Pressed creases */}
            <line x1="36" y1="28" x2="35" y2="80" stroke="#ab9558" strokeWidth="2" />
            <line x1="64" y1="28" x2="65" y2="80" stroke="#ab9558" strokeWidth="2" />
            {/* Sparkle */}
            <path d="M78,32 L80,26 L82,32 L88,34 L82,36 L80,42 L78,36 L72,34 Z" fill="#ffe680" />
          </g>
        )}

        {/* Charcoal Evening Trousers (Clean) */}
        {id === "bottom-midnight-trousers" && (
          <g>
            {/* Black belt */}
            <rect x="26" y="20" width="48" height="8" fill="#141417" stroke="#000" strokeWidth="1.5" />
            <rect x="46" y="20" width="8" height="8" fill="#cccccc" stroke="#666" strokeWidth="1" />
            {/* Trousers */}
            <polygon points="26,28 47,28 44,82 26,82" fill="#25283b" stroke="#11131c" strokeWidth="2" />
            <polygon points="53,28 74,28 74,82 56,82" fill="#25283b" stroke="#11131c" strokeWidth="2" />
            {/* Fine shine crease */}
            <line x1="36" y1="28" x2="35" y2="80" stroke="#3d4261" strokeWidth="2" />
            <line x1="64" y1="28" x2="65" y2="80" stroke="#3d4261" strokeWidth="2" />
            {/* Sparkle */}
            <path d="M18,36 L20,30 L22,36 L28,38 L22,40 L20,46 L18,40 L12,38 Z" fill="#ffe680" />
          </g>
        )}

        {/* Tailored Royal Chinos (Clean) */}
        {id === "bottom-tailored-chinos" && (
          <g>
            {/* Brown belt */}
            <rect x="26" y="20" width="48" height="8" fill="#523214" stroke="#2b1a09" strokeWidth="1.5" />
            <rect x="46" y="20" width="8" height="8" fill="#ffe680" stroke="#b3921b" strokeWidth="1" />
            {/* Blue chinos */}
            <polygon points="26,28 47,28 44,82 26,82" fill="#293c69" stroke="#131c33" strokeWidth="2" />
            <polygon points="53,28 74,28 74,82 56,82" fill="#293c69" stroke="#131c33" strokeWidth="2" />
            {/* Crease */}
            <line x1="36" y1="28" x2="35" y2="80" stroke="#3f5a9e" strokeWidth="2" />
            <line x1="64" y1="28" x2="65" y2="80" stroke="#3f5a9e" strokeWidth="2" />
            {/* Sparkle */}
            <path d="M78,34 L80,28 L82,34 L88,36 L82,38 L80,44 L78,38 L72,36 Z" fill="#ffe680" />
          </g>
        )}

        {/* Mud-Caked Torn Denim (Bad) */}
        {id === "bottom-muddy-jeans" && (
          <g>
            <polygon points="26,24 47,24 44,80 26,80" fill="#465369" stroke="#222a36" strokeWidth="2" />
            <polygon points="53,24 74,24 74,80 56,80" fill="#465369" stroke="#222a36" strokeWidth="2" />
            {/* Ripped open knees with threads */}
            <rect x="30" y="52" width="12" height="8" fill="#871b2d" stroke="#222a36" strokeWidth="1" />
            <line x1="28" y1="56" x2="44" y2="56" stroke="#fff" strokeWidth="1" />
            <rect x="58" y="50" width="12" height="7" fill="#871b2d" stroke="#222a36" strokeWidth="1" />
            {/* Splattered wet mud */}
            <ellipse cx="36" cy="68" rx="8" ry="6" fill="#4a3219" stroke="#2b1a09" strokeWidth="1" />
            <ellipse cx="64" cy="70" rx="9" ry="7" fill="#4a3219" stroke="#2b1a09" strokeWidth="1" />
            <circle cx="44" cy="42" r="4" fill="#4a3219" />
            <circle cx="68" cy="38" r="5" fill="#4a3219" />
          </g>
        )}

        {/* Stained Baggy Sweats (Bad) */}
        {id === "bottom-greasy-sweats" && (
          <g>
            <rect x="22" y="24" width="26" height="58" rx="6" fill="#696969" stroke="#333" strokeWidth="2" />
            <rect x="52" y="24" width="26" height="58" rx="6" fill="#696969" stroke="#333" strokeWidth="2" />
            <rect x="20" y="78" width="30" height="6" fill="#474747" stroke="#333" strokeWidth="1" />
            <rect x="50" y="78" width="30" height="6" fill="#474747" stroke="#333" strokeWidth="1" />
            {/* Grease spots */}
            <circle cx="34" cy="46" r="7" fill="#3b322a" opacity="0.9" />
            <circle cx="64" cy="58" r="9" fill="#2b1c11" opacity="0.9" />
            <circle cx="38" cy="66" r="5" fill="#2b1c11" opacity="0.9" />
          </g>
        )}

        {/* Threadbare Boxer Shorts (Bad) */}
        {id === "bottom-threadbare-boxers" && (
          <g>
            <rect x="26" y="24" width="22" height="36" fill="#785055" stroke="#3d2125" strokeWidth="2" />
            <rect x="52" y="24" width="22" height="36" fill="#785055" stroke="#3d2125" strokeWidth="2" />
            {/* Jagged tears at hem */}
            <polygon points="26,60 30,54 34,60 38,54 42,60 46,54 48,60" fill="#3d2125" />
            <polygon points="52,60 56,54 60,60 64,54 68,60 72,54 74,60" fill="#3d2125" />
            {/* Pale skin/red apple legs poking out */}
            <rect x="30" y="60" width="14" height="24" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
            <rect x="56" y="60" width="14" height="24" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
          </g>
        )}

        {/* ======================= SHOES ======================= */}

        {/* Pristine Date Kicks (Clean) */}
        {id === "shoes-white-loafers" && (
          <g>
            <rect x="18" y="42" width="64" height="30" rx="8" fill="#fdfbff" stroke="#24287e" strokeWidth="2" />
            <line x1="18" y1="62" x2="82" y2="62" stroke="#8c9aa8" strokeWidth="3" />
            {/* Laces */}
            <line x1="42" y1="46" x2="58" y2="46" stroke="#24287e" strokeWidth="2" />
            <line x1="44" y1="52" x2="56" y2="52" stroke="#24287e" strokeWidth="2" />
            {/* Sparkle */}
            <path d="M76,28 L78,22 L80,28 L86,30 L80,32 L78,38 L76,32 L70,30 Z" fill="#ffe680" />
          </g>
        )}

        {/* Polished Oxford Shoes (Clean) */}
        {id === "shoes-oxford-leather" && (
          <g>
            <rect x="18" y="42" width="64" height="28" rx="6" fill="#422013" stroke="#1f0c05" strokeWidth="2" />
            <rect x="22" y="46" width="22" height="4" fill="#99633d" />
            <line x1="18" y1="64" x2="82" y2="64" stroke="#1f0c05" strokeWidth="4" />
            {/* Sparkle */}
            <path d="M78,28 L80,22 L82,28 L88,30 L82,32 L80,38 L78,32 L72,30 Z" fill="#ffe680" />
          </g>
        )}

        {/* Wine Velvet Loafers (Clean) */}
        {id === "shoes-velvet-loafers" && (
          <g>
            <rect x="18" y="42" width="64" height="28" rx="8" fill="#6e152d" stroke="#380613" strokeWidth="2" />
            {/* Gold bit/buckle */}
            <rect x="42" y="48" width="16" height="6" rx="2" fill="#ffe680" stroke="#b3921b" strokeWidth="1.5" />
            <line x1="18" y1="64" x2="82" y2="64" stroke="#380613" strokeWidth="4" />
            {/* Sparkle */}
            <path d="M76,26 L78,20 L80,26 L86,28 L80,30 L78,36 L76,30 L70,28 Z" fill="#ff8fc0" />
          </g>
        )}

        {/* Toe-Hole Stinky Sneaker (Bad) */}
        {id === "shoes-toe-sneakers" && (
          <g>
            <rect x="18" y="42" width="64" height="28" rx="6" fill="#545e48" stroke="#2b3323" strokeWidth="2" />
            {/* Hole in the front with red fruit toe poking out */}
            <ellipse cx="24" cy="54" rx="8" ry="6" fill="#871b2d" stroke="#520e1a" strokeWidth="1.5" />
            {/* Stink lines */}
            <path d="M30,36 Q36,26 30,18" fill="none" stroke="#78aa3b" strokeWidth="2.5" strokeDasharray="3 2" />
            <path d="M50,34 Q46,24 52,16" fill="none" stroke="#78aa3b" strokeWidth="2.5" strokeDasharray="3 2" />
            <path d="M70,36 Q76,26 70,18" fill="none" stroke="#78aa3b" strokeWidth="2.5" strokeDasharray="3 2" />
          </g>
        )}

        {/* Crusty Mud Boots (Bad) */}
        {id === "shoes-crusty-workboots" && (
          <g>
            <rect x="16" y="32" width="68" height="40" rx="6" fill="#4a3219" stroke="#211406" strokeWidth="2" />
            {/* Chunky mud dripping */}
            <circle cx="28" cy="74" r="5" fill="#2b1a09" />
            <circle cx="48" cy="76" r="6" fill="#2b1a09" />
            <circle cx="70" cy="74" r="5" fill="#2b1a09" />
            <circle cx="38" cy="46" r="4" fill="#2b1a09" />
            <circle cx="62" cy="48" r="5" fill="#2b1a09" />
          </g>
        )}

        {/* Chewed Busted Flip-Flop (Bad) */}
        {id === "shoes-broken-flipflops" && (
          <g>
            <ellipse cx="50" cy="56" rx="34" ry="14" fill="#286161" stroke="#123636" strokeWidth="2" />
            {/* Snapped strap with wire */}
            <path d="M38,56 L46,42" stroke="#a32626" strokeWidth="3" />
            <line x1="48" y1="42" x2="52" y2="40" stroke="#bbb" strokeWidth="2" />
            {/* Dog chew marks */}
            <circle cx="20" cy="54" r="4" fill="#181335" />
            <circle cx="24" cy="58" r="3" fill="#181335" />
          </g>
        )}

        {/* ======================= ACCESSORIES ======================= */}

        {/* Crimson Silk Bowtie (Clean) */}
        {id === "acc-silk-bowtie" && (
          <g>
            <polygon points="22,34 50,48 22,62" fill="#d91e48" stroke="#8a0c29" strokeWidth="2" />
            <polygon points="78,34 50,48 78,62" fill="#d91e48" stroke="#8a0c29" strokeWidth="2" />
            <circle cx="50" cy="48" r="8" fill="#ff4d73" stroke="#8a0c29" strokeWidth="2" />
            {/* Sparkle */}
            <path d="M78,22 L80,16 L82,22 L88,24 L82,26 L80,32 L78,26 L72,24 Z" fill="#ffe680" />
          </g>
        )}

        {/* Gleaming Pocket Watch (Clean) */}
        {id === "acc-gold-watch" && (
          <g>
            {/* Gold Chain */}
            <path d="M24,24 Q50,44 76,28" stroke="#ffe680" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            {/* Watch casing */}
            <circle cx="50" cy="58" r="22" fill="#ffe680" stroke="#9e7b0a" strokeWidth="2.5" />
            {/* Watch face */}
            <circle cx="50" cy="58" r="17" fill="#fdfbff" stroke="#9e7b0a" strokeWidth="1.5" />
            {/* Hands */}
            <line x1="50" y1="58" x2="50" y2="46" stroke="#1c1440" strokeWidth="2" />
            <line x1="50" y1="58" x2="60" y2="58" stroke="#1c1440" strokeWidth="2" />
            {/* Sparkle */}
            <path d="M74,44 L76,38 L78,44 L84,46 L78,48 L76,54 L74,48 L68,46 Z" fill="#ffe680" />
          </g>
        )}

        {/* Fresh Red Boutonniere (Clean) */}
        {id === "acc-rose-boutonniere" && (
          <g>
            {/* Green Stem and Leaf */}
            <path d="M48,54 Q44,72 38,82" stroke="#2f8039" strokeWidth="3" fill="none" />
            <ellipse cx="54" cy="64" rx="8" ry="4" transform="rotate(-25 54 64)" fill="#439637" stroke="#225e29" strokeWidth="1.5" />
            {/* Rose Blossom */}
            <circle cx="50" cy="46" r="16" fill="#e62249" stroke="#8a0c29" strokeWidth="2" />
            <circle cx="50" cy="46" r="10" fill="#ff4d73" stroke="#8a0c29" strokeWidth="1.5" />
            <circle cx="50" cy="46" r="5" fill="#fdfbff" />
            {/* Sparkle */}
            <path d="M72,28 L74,22 L76,28 L82,30 L76,32 L74,38 L72,32 L66,30 Z" fill="#ffe680" />
          </g>
        )}

        {/* Stinky Fishbone Necklace (Bad) */}
        {id === "acc-fishbone-tie" && (
          <g>
            {/* Dirty twine */}
            <path d="M22,26 Q50,46 78,26" stroke="#524a3e" strokeWidth="2" fill="none" />
            {/* Spine */}
            <line x1="50" y1="36" x2="50" y2="76" stroke="#d5d5d5" strokeWidth="3" />
            {/* Ribs */}
            <line x1="36" y1="46" x2="64" y2="46" stroke="#d5d5d5" strokeWidth="2" />
            <line x1="34" y1="54" x2="66" y2="54" stroke="#d5d5d5" strokeWidth="2" />
            <line x1="38" y1="62" x2="62" y2="62" stroke="#d5d5d5" strokeWidth="2" />
            {/* Fish head skeleton */}
            <polygon points="44,36 56,36 50,26" fill="#a0a0a0" stroke="#666" strokeWidth="1.5" />
            {/* Tail */}
            <polygon points="44,76 56,76 50,84" fill="#a0a0a0" stroke="#666" strokeWidth="1.5" />
            {/* Buzzing fly */}
            <circle cx="68" cy="44" r="2.5" fill="#111" />
            {/* Stink fumes */}
            <path d="M74,34 Q80,26 74,18" fill="none" stroke="#78aa3b" strokeWidth="2" strokeDasharray="3 2" />
          </g>
        )}

        {/* Crusty Tomato Soup Bib (Bad) */}
        {id === "acc-soup-bib" && (
          <g>
            {/* Bib string and body */}
            <path d="M30,22 Q50,38 70,22 L76,74 Q50,86 24,74 Z" fill="#fdfbff" stroke="#333" strokeWidth="2" />
            {/* Crusty tomato soup splatters */}
            <path d="M34,38 Q56,48 64,36 Q68,66 48,64 Q32,60 34,38 Z" fill="#a3362a" stroke="#6e2017" strokeWidth="1.5" />
            <circle cx="62" cy="68" r="4.5" fill="#e67e22" />
            <circle cx="36" cy="68" r="3.5" fill="#e67e22" />
          </g>
        )}

        {/* Cracked Duct-Tape Shades (Bad) */}
        {id === "acc-duct-glasses" && (
          <g>
            {/* Frames */}
            <rect x="18" y="40" width="28" height="18" rx="3" fill="#222" stroke="#000" strokeWidth="2" />
            <rect x="54" y="40" width="28" height="18" rx="3" fill="#222" stroke="#000" strokeWidth="2" />
            {/* Missing broken lens glass crack */}
            <line x1="56" y1="42" x2="80" y2="56" stroke="#fff" strokeWidth="2" />
            <line x1="72" y1="42" x2="62" y2="56" stroke="#fff" strokeWidth="1.5" />
            {/* Duct tape lump on nose bridge */}
            <rect x="42" y="42" width="16" height="12" fill="#b0b0b0" stroke="#555" strokeWidth="1.5" />
            <line x1="42" y1="46" x2="58" y2="46" stroke="#888" strokeWidth="1" />
            <line x1="42" y1="50" x2="58" y2="50" stroke="#888" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
}
