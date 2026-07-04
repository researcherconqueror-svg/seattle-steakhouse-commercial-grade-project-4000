"use server";

export async function bookReservation(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials are not configured.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Booking failed:", errorData);
    throw new Error("Booking failed");
  }
  
  return { success: true };
}
