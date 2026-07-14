import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Crimson Red Wood",
  description:
    "Explore moments from our kitchen, dining room, and private spaces at Crimson Red Wood, Seattle's premier steakhouse.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
