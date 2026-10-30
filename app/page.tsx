import Image from "next/image";
import Link from "next/link";
import { chapters } from "@/lib/chapters";

export default function Home() {
  return (
    <div className="vn-stage">
      <Image
        src="/hub/arcade.png"
        alt=""
        width={320}
        height={180}
        unoptimized
        priority
        className="vn-background"
      />
      <Image
        src="/hub/host.png"
        alt="A girl with long pink hair and a sailor uniform smiles at you."
        width={128}
        height={170}
        unoptimized
        priority
        className="vn-character"
      />

      <nav className="vn-choices window" aria-labelledby="chapter-select">
        <h1 id="chapter-select">Chapter Select</h1>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={`/chapters/${chapter.slug}`} className="vn-choice">
                {chapter.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="vn-message window">
        <p className="vn-nameplate">???</p>
        <p>
          Oh! You actually came. The arcade closes soon, but there&rsquo;s still time for one
          more story. Which one do you want to play?
        </p>
        <span className="vn-next" aria-hidden="true">
          ▼
        </span>
      </div>
    </div>
  );
}
