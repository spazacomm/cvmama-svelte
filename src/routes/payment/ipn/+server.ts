import { json } from "@sveltejs/kit";

// Called directly by Pesapal
export async function POST({ request }) {
  const body = await request.json();

  // 1️⃣ Security check
  if (body.pesapal_notification_id !== process.env.VITE_PESAPAL_IPN_ID) {
    return new Response("Forbidden", { status: 403 });
  }

  // 2️⃣ Forward to Supabase Edge Function using Service Role Key
  const res = await fetch(
    `${process.env.PUBLIC_SUPABASE_URL}/functions/v1/pesapal-ipn`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    return new Response("Error", { status: 500 });
  }

  return json({ success: true });
}