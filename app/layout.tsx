import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import Header from "@/components/Header";
import { ARCADE_NAME } from "@/lib/arcade";
import "./globals.css";

const pixelFont = DotGothic16({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ARCADE_NAME,
  description: "A retro dating sim set in an arcade. Play chapters, earn hearts, and spend them on gifts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={pixelFont.className}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
