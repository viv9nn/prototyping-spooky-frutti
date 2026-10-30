"use client";

import { useHearts } from "@/lib/wallet";

export default function HeartCount() {
  const hearts = useHearts();
  return <p className="heart-count">&hearts; Hearts: {hearts}</p>;
}
