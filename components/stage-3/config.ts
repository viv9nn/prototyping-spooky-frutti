export const STAGE_3_CONFIG = {
  // Timing
  stageLengthSec: 60,

  // Dismissing: two clicks or taps on a banner within this many milliseconds
  doubleClickMs: 400,

  // Caught rule: risky banner on screen while she looks
  readTimeSec: 1.2, // time she needs to read a banner

  // Girlfriend Gaze difficulty escalation
  gazeIntervalStart: [5, 8] as [number, number], // s (not looking window at start)
  gazeIntervalEnd: [3, 5] as [number, number], // s (not looking window at end)
  tellStartSec: 1.0, // tell head-turning duration at start
  tellEndSec: 0.6, // tell head-turning duration at end
  lookDurationStartSec: 1.0, // look duration at start
  lookDurationEndSec: 1.5, // look duration at end
  fakeoutChanceAfterMidpoint: 0.2, // 20% chance of fakeout when t >= 30s

  // Notification spawn interval escalation
  notificationIntervalStart: 3.5, // s between spawns at start
  notificationIntervalEnd: 2.0, // s between spawns at end
  maxStackedNotifications: 3,

  // Penalties
  caughtPenalty: 30,
  spottedPenalty: 10,
} as const;

// Helper to interpolate linearly based on game progress (0 = start, 1 = end)
export function getInterpolatedValue(start: number, end: number, progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return start + (end - start) * clamped;
}

export function getRandomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
