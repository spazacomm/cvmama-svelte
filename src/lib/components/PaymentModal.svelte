<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { handlePurchase } from "$lib/utils/purchase";
  
    export let resume;
    export let modalVisible = false;
    export let modalTitle = "";
  
    let firstName = "";
    let lastName = "";
    let countryCode = "254";
    let phone = "";
  
    let paymentIframeUrl = "";
    let loadingPayment = false; // loader state
    const dispatch = createEventDispatcher();
  
    function closeModal() {
      dispatch("closeModal");
      // reset modal state
      paymentIframeUrl = "";
      loadingPayment = false;
      firstName = "";
      lastName = "";
      phone = "";
    }
  
    async function checkout(e: Event) {
      e.preventDefault(); // prevent form refresh
  
      try {
        loadingPayment = true;
  
        const customerData = {
          firstName,
          lastName,
          phone: `${countryCode}${phone}`,
        };
  
        const redirectUrl = await handlePurchase({
          itemData: resume,
          itemType: "application-docs",
          currency: resume?.currency,
          customerData,
          onSuccess: () => {
            console.log("✅ Payment successful!");
            closeModal();
          },
          onFailure: () => {
            console.log("❌ Payment failed.");
          },
        });
  
        paymentIframeUrl = redirectUrl;
      } catch (err) {
        console.error("Payment initiation failed.", err);
      } finally {
        loadingPayment = false;
      }
    }
  </script>
  
  {#if modalVisible}
    <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-xl overflow-hidden">
  
        <!-- Header -->
        <div class="p-3 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900">{modalTitle}</h3>
            <p class="text-sm text-gray-600">
              {#if !paymentIframeUrl}
                Please provide your details to complete payment.
              {:else}
                Secure Payment powered by PesaPal.
              {/if}
            </p>
          </div>
          <button on:click={closeModal} class="text-gray-400 hover:text-gray-600 text-2xl">
            ✕
          </button>
        </div>
  
        <!-- Body -->
        <div class="p-6">
  
          <!-- STEP 1: Checkout Form -->
          {#if !paymentIframeUrl && !loadingPayment}
            <form on:submit|preventDefault={checkout} class="space-y-5">
              <!-- First & Last Name -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" bind:value={firstName} required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2  focus:bg-[#F28C7A]/50 "/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" bind:value={lastName} required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2  focus:bg-[#F28C7A]/50 "/>
                </div>
              </div>
  
              <!-- Phone Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div class="flex">
                  <select bind:value={countryCode} required
                    class="border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50  focus:bg-[#F28C7A]/50 ">
                    <option value="1">🇺🇸 +1</option>
                    <option value="44">🇬🇧 +44</option>
                    <option value="91">🇮🇳 +91</option>
                    <option value="254">🇰🇪 +254</option>
                    <option value="971">🇦🇪 +971</option>
                  </select>
                  <input type="tel" bind:value={phone} required
                    placeholder="712345678"
                    class="flex-1 border border-gray-300 rounded-r-lg px-3 py-2  focus:bg-[#F28C7A]/50 "/>
                </div>
                <p class="text-xs text-gray-400 mt-1">Enter number without leading zero</p>
              </div>
  
              <!-- Checkout Button -->
              <button type="submit"
                class="w-full bg-[#F28C7A] hover:bg-[#F28C7A]/70 text-white font-semibold py-3 rounded-lg transition">
                Complete Payment
              </button>
            </form>
          {/if}
  
          <!-- STEP 2: Loader -->
          {#if loadingPayment}
            <div class="flex flex-col items-center justify-center py-12 space-y-4">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#F28C7A] border-t-transparent"></div>
              <p class="text-sm text-gray-600">Redirecting to secure payment...</p>
            </div>
          {/if}
  
          <!-- STEP 3: Payment Iframe -->
          {#if paymentIframeUrl && !loadingPayment}
            <iframe src={paymentIframeUrl} class="w-full h-[500px] border-0 rounded-lg"></iframe>
          {/if}
  
        </div>
      </div>
    </div>
  {/if}
  

  <style>

    .border {
        border-color: #F28C7A;
    }

    :focus .border {
        border-color: #F28C7A;
    }
  </style>