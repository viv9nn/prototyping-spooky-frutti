"use client";

import { useMoney } from "@/lib/wallet";

export default function MoneyCount() {
  const money = useMoney();
  return <p className="money-count">Money: ${money}</p>;
}
