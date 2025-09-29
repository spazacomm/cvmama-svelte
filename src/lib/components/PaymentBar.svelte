<script lang="ts">

export let resume;

</script>

<div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
  <div class="flex items-center justify-between p-4">
    <div>
      <div class="text-sm text-gray-500">Unlock Your Documents</div>
      <div class="text-lg font-bold text-gray-900">{resume.currency} {resume.amount}</div>
    </div>
    <button
      class="gradient-warning text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span>Pay Now</span>
    </button>
  </div>
    </div>