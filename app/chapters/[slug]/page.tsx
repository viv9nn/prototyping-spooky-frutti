import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getChapter } from "@/lib/chapters";

export const instant = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function ChapterPage({ params }: PageProps<"/chapters/[slug]">) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  return (
    <div className="placeholder window">
      <h1 className="page-title">{chapter.name}</h1>
      <p>{chapter.blurb}</p>
      <p className="coming-soon">Coming soon</p>
      <Link href="/" className="vn-choice">
        Back to the arcade
      </Link>
    </div>
  );
}
