"use client";

import { chapters } from "@/lib/chapters";
import { finishChapter, useScores } from "@/lib/progress";
import {
  chooseOption,
  propose,
  resetProgress,
  useProposalPlan,
  useProposalResult,
  YES_SCORE,
} from "@/lib/proposal";
import { addMoney } from "@/lib/wallet";

export default function DevPanel() {
  const scores = useScores();
  const { affection, ready, outcome } = useProposalResult();
  const { steps, complete } = useProposalPlan();

  return (
    <div className="placeholder window dev-panel">
      <h1 className="page-title">Test Panel</h1>
      <p>Scores only go up, so reset to test a lower one.</p>
      <ul>
        {chapters
          .filter((chapter) => !chapter.isFinale)
          .map((chapter) => (
            <li key={chapter.slug}>
              <span>
                {chapter.name}: {scores[chapter.slug] ?? "not played"}
              </span>
              {[0, 50, 100].map((score) => (
                <button key={score} onClick={() => finishChapter(chapter.slug, score)}>
                  {score}
                </button>
              ))}
            </li>
          ))}
      </ul>
      <p className="dev-status">
        Affection: {affection}. {ready ? `She says yes at ${YES_SCORE}.` : "The finale is locked."}
      </p>
      <ol className="dev-steps">
        {steps.map((step) => (
          <li key={step.id} data-step={step.id}>
            <strong>{step.name}</strong> ({step.status}, skill {step.skill}, {step.difficulty})
            <div>
              {step.options.map((option) => (
                <button
                  key={option.id}
                  disabled={!option.unlocked || !option.affordable || step.status === "upcoming"}
                  onClick={() => chooseOption(step.id, option.id)}
                >
                  {step.chosen?.id === option.id ? "✓ " : ""}
                  {option.name} (${option.price}, +{option.points})
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="gate-actions">
        <button onClick={() => addMoney(100)}>Add $100</button>
        <button disabled={!complete || !ready || outcome !== null} onClick={() => propose()}>
          Propose
        </button>
        <button onClick={resetProgress}>Reset save</button>
      </div>
      {outcome && (
        <p className="dev-outcome">
          She says {outcome.accepted ? "yes" : "no"} at {outcome.affection}. Mishaps:{" "}
          {outcome.beats.filter((beat) => beat.mishap).map((beat) => beat.stepId).join(", ") || "none"}.
        </p>
      )}
    </div>
  );
}
