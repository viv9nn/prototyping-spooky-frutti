import Link from "next/link";
import HeartCount from "@/components/HeartCount";
import MoneyCount from "@/components/MoneyCount";
import { ARCADE_NAME } from "@/lib/arcade";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="arcade-name">
        {ARCADE_NAME}
      </Link>
      <MoneyCount />
      <HeartCount />
    </header>
  );
}
