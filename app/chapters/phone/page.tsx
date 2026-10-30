import ChapterGate from "@/components/ChapterGate";
import Stage3Game from "@/components/stage-3/Stage3Game";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Late-Night TikTok - Spooky Frutti Arcade",
  description: "Survive 60 seconds watching TikTok in bed with Miss Oishii without getting caught!",
};

export default function PhoneChapterPage() {
  return (
    <ChapterGate slug="phone">
      <Stage3Game />
    </ChapterGate>
  );
}
