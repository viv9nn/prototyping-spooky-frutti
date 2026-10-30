import Stage3Game from "@/components/stage-3/Stage3Game";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[DEV] Stage 3: Late-Night TikTok",
};

export default function Stage3DevPage() {
  return <Stage3Game />;
}
