import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Crimsonwood",
  description:
    "Explore moments from our kitchen, dining room, and private spaces at Crimsonwood, Seattle's premier steakhouse.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
