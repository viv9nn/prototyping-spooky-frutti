"use client";

import { useState } from "react";
import { propose, type ProposalOutcome } from "@/lib/proposal";
import PlanningBoard from "./PlanningBoard";
import ProposalCutscene from "./ProposalCutscene";

export default function ProposalGame() {
  const [outcome, setOutcome] = useState<ProposalOutcome | null>(null);

  if (outcome) return <ProposalCutscene outcome={outcome} />;
  return <PlanningBoard onPropose={() => setOutcome(propose())} />;
}
