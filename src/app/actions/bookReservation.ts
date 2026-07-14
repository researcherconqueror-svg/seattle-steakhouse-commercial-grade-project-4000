"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";

interface ReservationData {
  date: string;
  time: string;
  partySize: number;
  experience: string;
  name: string;
  email: string;
  phone: string;
  requests?: string;
}

const RESTAURANT_EMAIL = "reservations@crimsonredwood.com";

export async function bookReservation(data: ReservationData) {
  const supabase = createAdminClient();

  // 1. Store in Supabase
  const { error: dbError } = await supabase.from("reservations").insert([
    {
      reservation_date: data.date,
      reservation_time: data.time,
      party_size: data.partySize,
      experience: data.experience,
      guest_name: data.name,
      guest_email: data.email,
      guest_phone: data.phone,
      special_requests: data.requests || null,
      status: "confirmed",
    },
  ]);

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    throw new Error("Failed to save reservation. Please try again.");
  }

  // 2. Send notification email to restaurant
  const experienceLabel =
    data.experience === "chefs-counter"
      ? "The Chef's Counter"
      : "Main Dining Room";

  const formattedDate = new Date(data.date + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const restaurantHtml = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 40px; border: 1px solid #2a2824;">
      <div style="text-align: center; border-bottom: 1px solid #c9a96e; padding-bottom: 20px; margin-bottom: 24px;">
        <h1 style="color: #c9a96e; font-size: 24px; letter-spacing: 0.1em; margin: 0;">NEW RESERVATION</h1>
      </div>
      <table style="width: 100%; font-size: 15px; line-height: 1.8;">
        <tr><td style="color: #8a8278; padding: 4px 0;">Guest</td><td style="color: #f5f0e8; font-weight: bold;">${data.name}</td></tr>
        <tr><td style="color: #8a8278; padding: 4px 0;">Date</td><td style="color: #f5f0e8;">${formattedDate}</td></tr>
        <tr><td style="color: #8a8278; padding: 4px 0;">Time</td><td style="color: #f5f0e8;">${data.time}</td></tr>
        <tr><td style="color: #8a8278; padding: 4px 0;">Party Size</td><td style="color: #f5f0e8;">${data.partySize} guest${data.partySize > 1 ? "s" : ""}</td></tr>
        <tr><td style="color: #8a8278; padding: 4px 0;">Experience</td><td style="color: #c9a96e;">${experienceLabel}</td></tr>
        <tr><td style="color: #8a8278; padding: 4px 0;">Phone</td><td style="color: #f5f0e8;">${data.phone}</td></tr>
        <tr><td style="color: #8a8278; padding: 4px 0;">Email</td><td style="color: #f5f0e8;">${data.email}</td></tr>
        ${data.requests ? `<tr><td style="color: #8a8278; padding: 4px 0; vertical-align: top;">Requests</td><td style="color: #f5f0e8;">${data.requests}</td></tr>` : ""}
      </table>
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #2a2824; text-align: center;">
        <p style="color: #5a554f; font-size: 12px; margin: 0;">Crimson Red Wood — Reservations System</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Crimson Red Wood <bookings@crimsonredwood.com>",
      to: RESTAURANT_EMAIL,
      subject: `🍽 New Reservation — ${data.name}, ${formattedDate} (${data.time})`,
      html: restaurantHtml,
    });
  } catch (emailError) {
    console.error("Restaurant email failed:", emailError);
    // Don't throw — reservation is saved, email is supplementary
  }

  // 3. Send confirmation email to guest
  const guestHtml = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 40px; border: 1px solid #2a2824;">
      <div style="text-align: center; border-bottom: 1px solid #c9a96e; padding-bottom: 20px; margin-bottom: 24px;">
        <h1 style="color: #c9a96e; font-size: 22px; letter-spacing: 0.1em; margin: 0;">RESERVATION CONFIRMED</h1>
        <p style="color: #8a8278; font-size: 13px; margin-top: 8px;">Crimson Red Wood</p>
      </div>
      <p style="color: #f5f0e8; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        Dear ${data.name},<br/><br/>
        Your table has been reserved. We look forward to welcoming you.
      </p>
      <div style="background: #111111; border: 1px solid #1e1c18; padding: 24px; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 14px; line-height: 2;">
          <tr><td style="color: #8a8278;">Date</td><td style="color: #f5f0e8; text-align: right;">${formattedDate}</td></tr>
          <tr><td style="color: #8a8278;">Time</td><td style="color: #f5f0e8; text-align: right;">${data.time}</td></tr>
          <tr><td style="color: #8a8278;">Party</td><td style="color: #f5f0e8; text-align: right;">${data.partySize} guest${data.partySize > 1 ? "s" : ""}</td></tr>
          <tr><td style="color: #8a8278;">Experience</td><td style="color: #c9a96e; text-align: right;">${experienceLabel}</td></tr>
        </table>
      </div>
      <p style="color: #5a554f; font-size: 12px; text-align: center; line-height: 1.6;">
        For changes, please call (206) 555-1892.<br/>
        1201 Second Avenue, Seattle, WA 98101
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Crimson Red Wood <bookings@crimsonredwood.com>",
      to: data.email,
      subject: `Your Reservation at Crimson Red Wood — ${formattedDate}`,
      html: guestHtml,
    });
  } catch (emailError) {
    console.error("Guest confirmation email failed:", emailError);
    // Don't throw — reservation is saved
  }

  return { success: true };
}
