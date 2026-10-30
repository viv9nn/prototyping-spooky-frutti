import DressUpGame from "@/components/dress-up/DressUpGame";

export const metadata = {
  title: "Chapter 1: Dapper Honeycrisp | Spooky Frutti Arcade",
  description: "Help Mr. Honeycrisp pick a dapper outfit for his date with Miss Oishii!",
};

export default function DressUpChapterPage() {
  return (
    <main className="dress-up-page">
      <DressUpGame />
    </main>
  );
}
