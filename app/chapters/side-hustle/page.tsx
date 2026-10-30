import Link from "next/link";

export default function SideHustlePage() {
  return (
    <div className="game-page">
      <iframe
        src="/games/side-hustle/index.html?embed"
        title="Side Hustle mini-game"
        className="game-frame"
      />
      <Link href="/" className="vn-choice">
        Back to the arcade
      </Link>
    </div>
  );
}
