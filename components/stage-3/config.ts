export const STAGE_3_CONFIG = {
  // Timing
  stageLengthSec: 60,
  instructionCountdownSec: 3,

  // Flick mechanics
  flickMinVelocity: 0.8, // px/ms upward
  flickMinDistancePx: 40, // px moved upward

  // Caught rule: risky banner on screen while she looks
  readTimeSec: 0.7, // time she needs to read a banner

  // Girlfriend Gaze difficulty escalation
  gazeIntervalStart: [4, 6] as [number, number], // s (not looking window at start)
  gazeIntervalEnd: [1, 2.5] as [number, number], // s (not looking window at end)
  tellStartSec: 0.6, // tell head-turning duration at start
  tellEndSec: 0.25, // tell head-turning duration at end
  lookDurationStartSec: 1.5, // look duration at start
  lookDurationEndSec: 2.3, // look duration at end
  fakeoutChanceAfterMidpoint: 0.35, // 35% chance of fakeout when t >= 30s

  // Notification spawn interval escalation
  notificationIntervalStart: 3.0, // s between spawns at start
  notificationIntervalEnd: 1.0, // s between spawns at end
  maxStackedNotifications: 3,

  // Penalties
  caughtPenalty: 40,
  spottedPenalty: 15,

  // Hearts reward by grade
  heartsReward: {
    S: 30,
    A: 20,
    B: 10,
    C: 5,
  },
} as const;

// Helper to interpolate linearly based on game progress (0 = start, 1 = end)
export function getInterpolatedValue(start: number, end: number, progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return start + (end - start) * clamped;
}

export function getRandomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
