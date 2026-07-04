import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Ember & Oak",
  description:
    "Explore moments from our kitchen, dining room, and private spaces at Ember & Oak, Seattle's premier steakhouse.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
