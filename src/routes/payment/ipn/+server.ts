import { json } from "@sveltejs/kit";
import { env } from '$env/dynamic/private'; // ✅ For private server env vars

export async function POST(event) {
  const body = await event.request.json();

  // ✅ Optional: security check
  // if (body.pesapal_notification_id !== env.VITE_PESAPAL_IPN_ID) {
  //   return new Response("Forbidden", { status: 403 });
  // }

  // ✅ Use event.fetch instead of global fetch
  const res = await event.fetch(
    `${env.VITE_SUPABASE_URL}/functions/v1/pesapal-ipn`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    return new Response("Error forwarding to Supabase", { status: 500 });
  }

  return json({ success: true });
}
