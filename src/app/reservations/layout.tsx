import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations | Crimsonwood",
  description:
    "Reserve your table at Crimsonwood, Seattle's premier steakhouse. Choose your party size, date, and time for an unforgettable dining experience.",
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
