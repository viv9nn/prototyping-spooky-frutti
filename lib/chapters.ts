export type Chapter = {
  slug: string; // used in the URL: /chapters/<slug>
  name: string;
};

// Add or rename chapters here, in story order. The home page and chapter pages
// read from this list. A chapter can be a mini-game, a story, or both.
export const chapters: Chapter[] = [
  { slug: "chapter-1", name: "Chapter 1" },
  { slug: "chapter-2", name: "Chapter 2" },
  { slug: "chapter-3", name: "Chapter 3" },
];

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}
