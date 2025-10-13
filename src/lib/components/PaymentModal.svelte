<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { handlePurchase } from "$lib/utils/purchase";

  export let resume;
  export let modalVisible = false;
  export let modalTitle = "";

  // Country data with currency mapping
  const countries = [
    { code: "KE", name: "Kenya", dialCode: "254", currency: "KES", flag: "🇰🇪" },
    // { code: "US", name: "United States", dialCode: "1", currency: "USD", flag: "🇺🇸" },
    // { code: "GB", name: "United Kingdom", dialCode: "44", currency: "GBP", flag: "🇬🇧" },
    // { code: "IN", name: "India", dialCode: "91", currency: "INR", flag: "🇮🇳" },
    // { code: "AE", name: "United Arab Emirates", dialCode: "971", currency: "AED", flag: "🇦🇪" },
    // { code: "NG", name: "Nigeria", dialCode: "234", currency: "NGN", flag: "🇳🇬" },
    // { code: "ZA", name: "South Africa", dialCode: "27", currency: "ZAR", flag: "🇿🇦" },
    // { code: "GH", name: "Ghana", dialCode: "233", currency: "GHS", flag: "🇬🇭" },
    // { code: "TZ", name: "Tanzania", dialCode: "255", currency: "TZS", flag: "🇹🇿" },
    // { code: "UG", name: "Uganda", dialCode: "256", currency: "UGX", flag: "🇺🇬" },
  ];

  let selectedCountry = countries[0]; // Default to Kenya
  let phone = "";

  let paymentIframeUrl = "";
  let loadingPayment = false;
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("closeModal");
    // reset modal state
    paymentIframeUrl = "";
    loadingPayment = false;
    phone = "";
    selectedCountry = countries[0];
  }

  async function checkout(e: Event) {
    e.preventDefault();

    try {
      loadingPayment = true;

      const customerData = {
        firstName: "Customer", // Generic placeholder
        lastName: selectedCountry.name,
        phone: `0${phone}`,
        country_code: selectedCountry.code
      };

      const redirectUrl = await handlePurchase({
        itemData: resume,
        itemType: "application-docs",
        currency: selectedCountry.currency, // Use country's currency
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

  function handleCountryChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const country = countries.find(c => c.code === target.value);
    if (country) {
      selectedCountry = country;
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
              Select your country and provide phone number.
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
            
            <!-- Country Selector -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select 
                value={selectedCountry.code}
                on:change={handleCountryChange}
                required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:bg-[#F28C7A]/50 focus:outline-none">
                {#each countries as country}
                  <option value={country.code}>
                    {country.flag} {country.name} ({country.currency})
                  </option>
                {/each}
              </select>
              <p class="text-xs text-gray-400 mt-1">
                Payment will be processed in {selectedCountry.currency}
              </p>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div class="flex">
                <div class="flex items-center border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50">
                  <span class="text-lg mr-1">{selectedCountry.flag}</span>
                  <span class="font-medium">+{selectedCountry.dialCode}</span>
                </div>
                <input 
                  type="tel" 
                  bind:value={phone} 
                  required
                  placeholder="712345678"
                  pattern="[0-9]+"
                  class="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:bg-[#F28C7A]/50 focus:outline-none"/>
              </div>
              <p class="text-xs text-gray-400 mt-1">Enter number without leading zero</p>
            </div>

            <!-- Checkout Button -->
            <button 
              type="submit"
              class="w-full bg-[#F28C7A] hover:bg-[#F28C7A]/70 text-white font-semibold py-3 rounded-lg transition">
              Complete Payment ({selectedCountry.currency})
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
          <iframe src={paymentIframeUrl} class="w-full h-[500px] border-0 rounded-lg" title="Payment"></iframe>
        {/if}

      </div>
    </div>
  </div>
{/if}

<style>
  .border {
    border-color: #F28C7A;
  }

  select:focus,
  input:focus {
    border-color: #F28C7A;
  }
</style>