import ChapterGate from "@/components/ChapterGate";
import ProposalGame from "./ProposalGame";

export default function ProposalPage() {
  return (
    <ChapterGate slug="proposal">
      <ProposalGame />
    </ChapterGate>
  );
}
