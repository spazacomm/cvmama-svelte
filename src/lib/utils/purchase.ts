import { supabase } from "$lib/supabaseClient";

export interface PurchaseOptions {
  itemData: any;
  itemType: "application-docs" | "subscription" | "boost"; // extendable
  currency: string;
  customerData: any;
  onSuccess?: (transaction: any) => void;
  onFailure?: (error: any) => void;
}

export async function handlePurchase({
  itemData,
  itemType,
  currency,
  customerData,
  onSuccess,
  onFailure
}: PurchaseOptions) {
  try {
    

    // 1. Initiate payment with Pesapal
    const redirectUrl = await initiatePesapalPayment(itemData, itemType, currency, customerData);

    const orderReference = new URL(redirectUrl).searchParams.get("OrderTrackingId");
    if (!orderReference) throw new Error("Order reference missing");

    // 2. Create transaction record
    const { error } = await supabase.from("payments").insert({
      resume_id: itemData.id,
      amount: itemData.amount,
      currency: currency,
      status: "pending",
      order_reference: orderReference
    });

    if (error) throw error;

    // 3. Start polling payment
   // startPollingPaymentStatus(orderReference, onSuccess, onFailure);

    return redirectUrl;
  } catch (err) {
    console.error("Purchase error:", err);
    onFailure?.(err);
    throw err;
  }
}

async function initiatePesapalPayment(
  itemData: any,
  itemType: string,
  currency: string,
  customerData: any
): Promise<string> {
  const paymentData = {
    amount: itemData.amount,
    description: 'Job match and application documents',
    phone_number: customerData.phone
  };

  const { data, error } = await supabase.functions.invoke("pesapal-init-payment", {
    body: paymentData
  });

  if (error) throw error;
  if (data?.redirect_url) return data.redirect_url;

  throw new Error("No redirect URL returned from payment API");
}

