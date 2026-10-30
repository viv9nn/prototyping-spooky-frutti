export type Chapter = {
  slug: string; // used in the URL: /chapters/<slug>
  name: string;
  blurb: string; // shown in the hub's message window
  icon: string;
  isFinale?: boolean; // locked until every other chapter is finished
};

// The whole story, in order. The hub and chapter pages read from this list.
export const chapters: Chapter[] = [
  {
    slug: "dress-up",
    name: "Dress to Impress",
    blurb: "Your big date is coming up. Put together the perfect outfit!",
    icon: "/hub/icons/dress-up.png",
  },
  {
    slug: "first-date",
    name: "Hold It In",
    blurb: "It's your first date. Keep the conversation going and, whatever you do, don't fart!",
    icon: "/hub/icons/first-date.png",
  },
  {
    slug: "phone",
    name: "Late-Night TikTok",
    blurb: "Watching TikTok in bed with Miss Oishii. Secretly flick away risky notifications before she catches you!",
    icon: "/hub/icons/phone.png",
  },
  {
    slug: "job",
    name: "Odd Jobs",
    blurb: "A ring and a bouquet won't buy themselves. Everything you earn here pays for the proposal!",
    icon: "/hub/icons/job.png",
  },
  {
    slug: "proposal",
    name: "The Proposal",
    blurb: "Plan the big day: bouquet, ring, dinner, friends, and the perfect spot. Then pop the question!",
    icon: "/hub/icons/proposal.png",
    isFinale: true,
  },
];

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}
