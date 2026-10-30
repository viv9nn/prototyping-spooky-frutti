"use client";

import { chooseOption, useProposalPlan, useProposalResult } from "@/lib/proposal";
import type { Difficulty } from "@/lib/proposalPlan";
import styles from "./proposal.module.css";

const riskLabels: Record<Difficulty, string> = { easy: "Low", normal: "Medium", hard: "High" };

export default function PlanningBoard({ onPropose }: { onPropose: () => void }) {
  const { steps, complete } = useProposalPlan();
  const { affection } = useProposalResult();

  return (
    <div className={`window ${styles.board}`}>
      <h1 className="page-title">The Proposal Plan</h1>
      <p>Plan the big night one step at a time. A higher score in the matching game means less risk.</p>

      <div className="vn-affection">
        <span id="plan-affection">Affection</span>
        <div className="vn-affection-bar" role="progressbar" aria-labelledby="plan-affection" aria-valuenow={affection}>
          <div className="vn-affection-fill" style={{ width: `${affection}%` }} />
        </div>
      </div>

      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.id} className={step.status === "upcoming" ? styles.upcoming : ""}>
            <div className={styles.stepHeading}>
              <h2>{step.name}</h2>
              <span>Risk: {riskLabels[step.difficulty]}</span>
            </div>
            <div className={styles.options}>
              {step.options.map((option) => {
                const selected = step.chosen?.id === option.id;
                let note = option.price === 0 ? "Free" : `$${option.price}`;
                if (selected) note = `✓ ${note}`;
                else if (!option.unlocked) note = `Needs skill ${option.minSkill}`;
                else if (!option.affordable) note = `$${option.price}: not enough money`;

                return (
                  <button
                    key={option.id}
                    className={`vn-choice ${styles.option} ${selected ? styles.selected : ""}`}
                    disabled={step.status === "upcoming" || !option.unlocked || !option.affordable}
                    aria-pressed={selected}
                    onClick={() => chooseOption(step.id, option.id)}
                  >
                    {option.name}
                    <small>{note}</small>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {complete && (
        <div className={styles.ready}>
          <p>Everything is ready. Once you ask, there&rsquo;s no taking it back.</p>
          <button className={`vn-choice ${styles.propose}`} onClick={onPropose}>
            Pop the question
          </button>
        </div>
      )}
    </div>
  );
}
