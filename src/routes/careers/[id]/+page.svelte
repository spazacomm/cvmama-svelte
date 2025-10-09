<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
  
    let job = null;
    let loading = true;
    let error = null;
  
    // Get job ID from URL
    const id = get(page).params.id;

   
  
    // Fetch job by ID
    async function fetchJob() {
      loading = true;
      const { data, error: err } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
  
      if (err) {
        console.error(err);
        error = 'Failed to load job details';
      } else {
        job = data;
  
        // Increment job view count
        await supabase.rpc('increment_job_views', { job_id: id });
      }
  
      loading = false;
    }
  
    onMount(fetchJob);
  </script>
  
  <svelte:head>
    <title>{job ? `${job.title} at ${job.company} - JobBoard Kenya` : 'Job Details'}</title>
    <meta name="description" content={job ? job.description : 'Job details and application information.'} />
  </svelte:head>
  
  <Header />
  
  <section class="bg-[#6BB4C9] text-white py-12 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
    </div>
    
    <div class="max-w-5xl mx-auto px-4 relative z-10 text-center">
      {#if loading}
        <h1 class="text-4xl font-bold">Loading job...</h1>
      {:else if error}
        <h1 class="text-3xl font-bold text-red-500">{error}</h1>
      {:else if job}
        <h1 class="text-5xl font-bold mb-2">{job.title}</h1>
        <p class="text-xl text-white/90 mb-2">{job.company}</p>
        <p class="text-white/80">{job.location} • {job.type} • {job.experience}</p>
      {/if}
    </div>
  </section>
  
  {#if job}
    <section class="max-w-5xl mx-auto px-4 py-10 space-y-8 bg-white">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div class="flex items-center gap-3 text-gray-600">
          <span class="bg-gray-100 px-4 py-1 rounded-full font-medium">{job.category}</span>
          <span class="font-semibold text-[#F28C7A]">{job.salary}</span>
        </div>
        <div class="text-sm text-gray-500">
          Posted {job.posted} • {job.views} views • {job.applicants} applicants
        </div>
      </div>
  
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Job Description</h2>
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
      </div>
  
      {#if job.requirements?.length}
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Requirements</h2>
          <ul class="space-y-2">
            {#each job.requirements as req}
              <li class="flex items-start gap-2 text-gray-700">
                <svg class="w-5 h-5 text-[#6BB4C9] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {req}
              </li>
            {/each}
          </ul>
        </div>
      {/if}
  
      {#if job.responsibilities?.length}
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Responsibilities</h2>
          <ul class="space-y-2">
            {#each job.responsibilities as res}
              <li class="flex items-start gap-2 text-gray-700">
                <svg class="w-5 h-5 text-[#F28C7A] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {res}
              </li>
            {/each}
          </ul>
        </div>
      {/if}
  
      {#if job.benefits?.length}
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Benefits</h2>
          <ul class="space-y-2">
            {#each job.benefits as ben}
            
              <li class="flex items-start gap-2 text-gray-700">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {ben}
              </li>
            {/each}
          </ul>
        </div>
      {/if}
  
      <div class="pt-6 border-t border-gray-200">
        <a
          href={job.apply_url || '#'}
          class="inline-block bg-gradient-to-r from-[#F28C7A] to-[#F07B67] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all"
          target="_blank"
        >
          Apply Now
        </a>
      </div>
    </section>
  {/if}
  
  <Footer />
  