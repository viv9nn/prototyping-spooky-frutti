import Stage3Game from "@/components/stage-3/Stage3Game";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapter 3: Late-Night TikTok - Spooky Frutti Arcade",
  description: "Survive 60 seconds watching TikTok with your girlfriend without getting caught!",
};

export default function Chapter3Page() {
  return <Stage3Game />;
}
