import Link from "next/link";
import HeartCount from "@/components/HeartCount";
import { ARCADE_NAME } from "@/lib/arcade";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="arcade-name">
        {ARCADE_NAME}
      </Link>
      <nav>
        <Link href="/shop">Gift Shop</Link>
      </nav>
      <HeartCount />
    </header>
  );
}
