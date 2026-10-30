export type PlanOption = {
  id: string;
  name: string;
  price: number;
  points: number; // added to her affection if this step goes smoothly
  minSkill: number; // the skill needed to unlock this option
};

export type PlanStep = {
  id: string;
  name: string;
  drivenBy: string[]; // slugs of the chapters whose scores set this step's skill
  options: PlanOption[];
};

export type Difficulty = "easy" | "normal" | "hard";

// Skill below `normal` is hard, and skill at or above `easy` is easy.
export const DIFFICULTY_SKILL = { normal: 40, easy: 70 };

// How likely each difficulty is to go wrong during the cutscenes. Set them all to
// 0 to make the outcome depend only on the player's scores and choices.
export const MISHAP_CHANCE: Record<Difficulty, number> = { easy: 0.1, normal: 0.25, hard: 0.5 };

// The finale's checklist, in order. Balance everything here. Each step has a free
// option, so a player with no money can always finish.
export const proposalPlan: PlanStep[] = [
  {
    id: "bouquet",
    name: "Buy a bouquet",
    drivenBy: ["dress-up"],
    options: [
      { id: "wildflowers", name: "Roadside Wildflowers", price: 0, points: 0, minSkill: 0 },
      { id: "roses", name: "Red Roses", price: 100, points: 3, minSkill: 40 },
      { id: "giant-bouquet", name: "Giant Bouquet", price: 250, points: 5, minSkill: 70 },
    ],
  },
  {
    id: "ring",
    name: "Buy a ring",
    drivenBy: ["job"],
    options: [
      { id: "candy-ring", name: "Candy Ring", price: 0, points: 0, minSkill: 0 },
      { id: "silver-ring", name: "Silver Ring", price: 150, points: 5, minSkill: 40 },
      { id: "diamond-ring", name: "Diamond Ring", price: 400, points: 10, minSkill: 70 },
    ],
  },
  {
    id: "dinner",
    name: "Book a dinner reservation",
    drivenBy: ["first-date"],
    options: [
      { id: "home-cooked", name: "Home-Cooked Noodles", price: 0, points: 0, minSkill: 0 },
      { id: "bistro", name: "Cozy Bistro", price: 75, points: 3, minSkill: 40 },
      { id: "rooftop", name: "Rooftop Restaurant", price: 200, points: 5, minSkill: 70 },
    ],
  },
  {
    id: "friends",
    name: "Rally your friends",
    drivenBy: ["phone"],
    options: [
      { id: "one-friend", name: "Text Your One Reliable Friend", price: 0, points: 0, minSkill: 0 },
      { id: "group-chat", name: "Start a Secret Group Chat", price: 25, points: 3, minSkill: 40 },
      { id: "flash-mob", name: "Organize a Flash Mob", price: 100, points: 5, minSkill: 70 },
    ],
  },
  {
    id: "spot",
    name: "Pick and book the proposal spot",
    drivenBy: ["dress-up", "first-date", "phone", "job"],
    options: [
      { id: "arcade", name: "The Arcade", price: 0, points: 0, minSkill: 0 },
      { id: "park", name: "Sunset Park", price: 50, points: 3, minSkill: 40 },
      { id: "fireworks", name: "Fireworks Over the Bay", price: 300, points: 5, minSkill: 70 },
    ],
  },
];
