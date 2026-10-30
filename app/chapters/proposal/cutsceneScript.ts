import type { ProposalOutcome } from "@/lib/proposal";

export type Mood = "smile" | "happy" | "surprised" | "sorry";

export type CutsceneLine = {
  speaker: string;
  text: string;
  mood: Mood;
  kneeling?: boolean; // Mr. Honeycrisp is on stage, down on one knee
};

const NARRATOR = "The Big Night";
const OISHII = "Miss Oishii";
const HONEYCRISP = "Mr. Honeycrisp";

// What happens for each option, depending on whether that step went wrong.
const optionLines: Record<string, { smooth: string; mishap: string }> = {
  wildflowers: {
    smooth: "He hands her a bunch of roadside wildflowers. She tucks one behind her leaf.",
    mishap: "He hands her a bunch of roadside wildflowers. A very angry bee comes with them.",
  },
  roses: {
    smooth: "He presents a dozen red roses. She gasps and hugs them close.",
    mishap: "He presents a dozen red roses, then finds out how sharp the thorns are.",
  },
  "giant-bouquet": {
    smooth: "A bouquet so big it needs both arms. She disappears behind it, delighted.",
    mishap: "A bouquet so big it needs both arms. He walks straight into a lamppost.",
  },
  "candy-ring": {
    smooth: "He checks his pocket. The candy ring is safe, and still only a little sticky.",
    mishap: "He checks his pocket. The candy ring has melted to his keys.",
  },
  "silver-ring": {
    smooth: "He checks his pocket. The silver ring is safe in its little box.",
    mishap: "He checks his pocket. The silver ring box has rolled under a bench. He crawls after it.",
  },
  "diamond-ring": {
    smooth: "He checks his pocket. The diamond ring catches the light. Even he looks impressed.",
    mishap: "He checks his pocket. Empty! After a long, sweaty minute, it turns up in his other pocket.",
  },
  "home-cooked": {
    smooth: "Dinner is home-cooked noodles. She asks for seconds.",
    mishap: "Dinner is home-cooked noodles. They're mostly one noodle now.",
  },
  bistro: {
    smooth: "Dinner is at a cozy bistro. The candlelight is doing him a lot of favors.",
    mishap: "Dinner is at a cozy bistro, where they have no record of his reservation.",
  },
  rooftop: {
    smooth: "Dinner is on the rooftop, with the whole city glittering below them.",
    mishap: "Dinner is on the rooftop, until the wind takes the tablecloth and the soup.",
  },
  "one-friend": {
    smooth: "His one reliable friend gives a thumbs up from behind a bush. Right on time.",
    mishap: "His one reliable friend texts him: sorry, wrong night.",
  },
  "group-chat": {
    smooth: "The secret group chat pays off. Everyone hides in place, right on cue.",
    mishap: "The secret group chat pays off, until someone sends a message to Miss Oishii by mistake.",
  },
  "flash-mob": {
    smooth: "The flash mob bursts out dancing. Strangers cheer. She's laughing with both hands on her face.",
    mishap: "The flash mob bursts out dancing, at the wrong couple.",
  },
  arcade: {
    smooth: "He leads her to the arcade where it all started. The machines hum like they remember.",
    mishap: "He leads her to the arcade, which is closing. They have five minutes.",
  },
  park: {
    smooth: "He leads her to Sunset Park, right as the sky turns gold.",
    mishap: "He leads her to Sunset Park, right as the sprinklers turn on.",
  },
  fireworks: {
    smooth: "He leads her to the bay. Fireworks bloom over the water, right on time.",
    mishap: "He leads her to the bay. The fireworks start twenty minutes early.",
  },
};

export function buildCutscene(outcome: ProposalOutcome): CutsceneLine[] {
  const beats: CutsceneLine[] = outcome.beats.map(({ optionId, mishap }) => ({
    speaker: NARRATOR,
    text: optionLines[optionId][mishap ? "mishap" : "smooth"],
    mood: mishap ? "surprised" : "happy",
  }));

  const answer: CutsceneLine[] = outcome.accepted
    ? [
        { speaker: OISHII, text: "...", mood: "surprised", kneeling: true },
        { speaker: OISHII, text: "Yes! A thousand times, yes!", mood: "happy", kneeling: true },
        { speaker: HONEYCRISP, text: "That's... that's fine. That's really, really fine.", mood: "happy", kneeling: true },
      ]
    : [
        { speaker: OISHII, text: "...", mood: "surprised", kneeling: true },
        {
          speaker: OISHII,
          text: "It was a sweet proposal. I just... wish things had gone differently. I'm sorry.",
          mood: "sorry",
          kneeling: true,
        },
        { speaker: HONEYCRISP, text: "...It's fine.", mood: "sorry", kneeling: true },
      ];

  return [
    { speaker: NARRATOR, text: "The big night is finally here. Mr. Honeycrisp has checked his list twice.", mood: "smile" },
    ...beats,
    {
      speaker: HONEYCRISP,
      text: "Miss Oishii. I say everything is fine, but with you, it really is. Will you marry me?",
      mood: "surprised",
      kneeling: true,
    },
    ...answer,
  ];
}
