<script>
  import { page } from '$app/stores';
 

  import JobMatchCard from '$lib/components/JobMatchCard.svelte';
  import Documents from '$lib/components/Documents.svelte';
  import PaymentBar from '$lib/components/PaymentBar.svelte';
  import PaymentSidebar from '$lib/components/PaymentSidebar.svelte';

  
   export let data;
  let resume = data.resume;
  let job = resume?.jobs;
  let profile = resume?.profiles;
</script>

    <main class="max-w-6xl mx-auto px-6 py-1">
        <!-- Success Header -->
        <div class="text-center mb-12 animate-slide-up">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-success rounded-full mb-6 animate-pulse-glow">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
                <strong>{profile.candidate_name}</strong>, Your Documents Are Ready!
            </h1>
            {#if job && profile}
      <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Our AI has analyzed, optimized, and tailored your application materials
        for the
        <strong class="text-[#F28C7A]">
          {job.title} </strong> role at <strong class="text-[#F28C7A]"> {job.company}
        </strong>
        
      </p>
    {/if}
        </div>

        <JobMatchCard />

        <!-- Documents Grid -->
       <Documents />

      
    </main>

 
    <!-- Payment Sidebar -->
    <PaymentSidebar />
      

    <!-- Sticky Bottom Payment Bar (for mobile & tablet) -->
    <PaymentBar />


<style>
        .gradient-bg {
            background: linear-gradient(135deg, #6BB4C9 0%, #6BB4C9 100%);
        }
        .gradient-primary {
            background: linear-gradient(135deg, #6BB4C9 0%, #6BB4C9 100%);
        }
        .gradient-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        .gradient-warning {
            background: linear-gradient(135deg, #F28C7A 0%, #F28C7A 100%);
        }
        .shimmer-effect {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
        .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.95);
        }
        .document-mock {
            background-image: 
                linear-gradient(to right, #e5e7eb 25%, transparent 25%),
                linear-gradient(to right, #e5e7eb 50%, transparent 50%),
                linear-gradient(to right, #e5e7eb 75%, transparent 75%),
                linear-gradient(to bottom, #f3f4f6 0%, #f3f4f6 100%);
            background-size: 100% 20px, 80% 15px, 90% 15px, 100% 100%;
            background-position: 20px 40px, 20px 70px, 20px 95px, 0 0;
            background-repeat: no-repeat;
        }
</style>
