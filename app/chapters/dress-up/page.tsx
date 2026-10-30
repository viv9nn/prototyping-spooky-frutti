import ChapterGate from "@/components/ChapterGate";
import DressUpGame from "@/components/dress-up/DressUpGame";

export const metadata = {
  title: "Dress to Impress | Spooky Frutti Arcade",
  description: "Help Mr. Honeycrisp pick a dapper outfit for his date with Miss Oishii!",
};

export default function DressUpChapterPage() {
  return (
    <ChapterGate slug="dress-up">
      <DressUpGame />
    </ChapterGate>
  );
}
