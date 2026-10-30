import ChapterGate from "@/components/ChapterGate";
import OddJobsGame from "./OddJobsGame";

export default function OddJobsPage() {
  return (
    <ChapterGate slug="job">
      <OddJobsGame />
    </ChapterGate>
  );
}
