<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';


  // Stores
  const jobs = writable([]);
  const loading = writable(true);
  const error = writable(null);

  // Filters
  let searchTerm = '';
  let selectedJob = null;
  let locationFilter = '';
  let typeFilter = '';
  let categoryFilter = '';
  let sortBy = 'recent';
  let jobsPerPage = 6;
  let currentPage = 1;

  // Fetch jobs from Supabase
  async function fetchJobs() {
    loading.set(true);
    const { data, error: err } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      console.error(err);
      error.set('Failed to load jobs');
    } else {
      jobs.set(data || []);
    }

    loading.set(false);
  }

  onMount(fetchJobs);

  // Reactive derived values
  $: allJobs = $jobs || [];
  $: categories = [...new Set(allJobs.map(job => job.category))];

  $: filteredJobs = allJobs
    .filter(job => {
      const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !locationFilter || job.location?.includes(locationFilter);
      const matchesType = !typeFilter || job.type === typeFilter;
      const matchesCategory = !categoryFilter || job.category === categoryFilter;

      return matchesSearch && matchesLocation && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
      if (sortBy === 'salary') {
        const parseSalary = s => parseInt((s || '').replace(/\D/g, '')) || 0;
        return parseSalary(b.salary) - parseSalary(a.salary);
      }
      return 0; // Most recent is already handled by Supabase order
    });

  $: paginatedJobs = filteredJobs.slice(0, currentPage * jobsPerPage);
  $: hasMore = paginatedJobs.length < filteredJobs.length;

  function selectJob(job) {
    selectedJob = job;
    // document.body.style.overflow = 'hidden';
    goto(`/careers/${job.id}`)
  }

  function closeModal() {
    selectedJob = null;
    document.body.style.overflow = 'auto';
  }

  function setTypeFilterValue(type) {
    typeFilter = type === 'All' ? '' : type;
    currentPage = 1;
  }

  function loadMore() {
    currentPage += 1;
  }

  function resetFilters() {
    searchTerm = '';
    locationFilter = '';
    typeFilter = '';
    categoryFilter = '';
    sortBy = 'recent';
    currentPage = 1;
  }
</script>


<svelte:head>
  <title>Find Your Dream Job - JobBoard Kenya</title>
  <meta name="description" content="Discover amazing job opportunities from top companies in Kenya.">
</svelte:head>

<Header />

<section class="bg-[#6BB4C9]  text-white py-12 pt-8 relative overflow-hidden">
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <div class="text-center mb-8">
      <h1 class="text-5xl md:text-6xl font-bold mb-4 leading-tight">Find Your Dream Job</h1>
      <p class="text-xl md:text-2xl text-white/90 mb-2">Discover amazing opportunities from top companies in Kenya</p>
      <p class="text-white/80">Over {jobs.length} active job listings across multiple industries</p>
    </div>
    
    <div class="bg-white rounded-2xl p-4 shadow-2xl max-w-4xl mx-auto">
      <div class="flex flex-col md:flex-row gap-3">
        <div class="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Job title, company, or keywords"
            bind:value={searchTerm}
            class="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
          />
          {#if searchTerm}
            <button on:click={() => searchTerm = ''} class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
        <div class="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 md:w-48">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <select
            bind:value={locationFilter}
            class="flex-1 bg-transparent outline-none text-gray-900 cursor-pointer"
          >
            <option value="">All Locations</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <button class="bg-gradient-to-r from-[#F28C7A] to-[#F07B67] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all md:w-auto hover:scale-105">
          Search Jobs
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-3xl font-bold">{jobs.length}+</div>
        <div class="text-white/80 text-sm">Active Jobs</div>
      </div>
      <!-- <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-3xl font-bold">{new Set(jobs.map(j => j.company)).size}+</div>
        <div class="text-white/80 text-sm">Companies</div>
      </div> -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-3xl font-bold">{categories.length}</div>
        <div class="text-white/80 text-sm">Categories</div>
      </div>
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-3xl font-bold">New</div>
        <div class="text-white/80 text-sm">Daily Updates</div>
      </div>
    </div>
  </div>
</section>

<section class="max-w-7xl mx-auto px-4 py-8 bg-white">
  <div class="flex flex-col lg:flex-row gap-4 mb-6">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-gray-600 font-medium whitespace-nowrap">Job Type:</span>
      <div class="flex gap-2 flex-wrap">
        {#each ['All', 'Full-time', 'Contract', 'Part-time'] as type}
          <button
            on:click={() => setTypeFilterValue(type)}
            class="px-4 py-2 rounded-lg font-medium transition-all {(type === 'All' && !typeFilter) || typeFilter === type ? 'bg-[#6BB4C9] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
          >
            {type}
          </button>
        {/each}
      </div>
    </div>
    
    <div class="flex items-center gap-2 flex-1">
      <span class="text-gray-600 font-medium whitespace-nowrap">Category:</span>
      <select
        bind:value={categoryFilter}
        class="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6BB4C9] transition-all cursor-pointer"
      >
        <option value="">All Categories</option>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
    
    <div class="flex items-center gap-2">
      <span class="text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
      <select
        bind:value={sortBy}
        class="px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6BB4C9] transition-all cursor-pointer"
      >
        <option value="recent">Most Recent</option>
        <option value="popular">Most Popular</option>
        <option value="salary">Highest Salary</option>
      </select>
    </div>
  </div>

  <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
    <div>
      <p class="text-gray-600">
        Showing <strong class="text-[#6BB4C9] text-lg">{paginatedJobs.length}</strong> of <strong class="text-[#6BB4C9] text-lg">{filteredJobs.length}</strong> jobs
        {#if searchTerm || locationFilter || typeFilter || categoryFilter}
          <button on:click={resetFilters} class="ml-3 text-[#F28C7A] hover:text-[#F07B67] font-medium underline">
            Clear all filters
          </button>
        {/if}
      </p>
    </div>
    
    {#if filteredJobs.some(job => job.featured)}
      <div class="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1">
        <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span class="text-sm font-medium text-yellow-700">Featured jobs available</span>
      </div>
    {/if}
  </div>

  {#if paginatedJobs.length > 0}
    <div class="grid gap-6">
      {#each paginatedJobs as job}
        <div 
          on:click={() => selectJob(job)}
          on:keydown={(e) => e.key === 'Enter' && selectJob(job)}
          role="button"
          tabindex="0"
          class="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6BB4C9] transition-all duration-300 cursor-pointer hover:shadow-xl group relative overflow-hidden"
        >
          {#if job.featured}
            <div class="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              FEATURED
            </div>
          {/if}

          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start gap-4 flex-1">
              <div class="w-14 h-14 bg-gradient-to-br from-[#6BB4C9] to-[#5AA3B8] rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                {job.logo}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-[#6BB4C9] transition-colors mb-1 truncate">
                  {job.title}
                </h3>
                <p class="text-[#6BB4C9] font-semibold mb-2">{job.company}</p>
                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span class="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
                  <span class="bg-gray-100 px-3 py-1 rounded-full">{job.experience}</span>
                  <span class="font-semibold text-[#F28C7A]">{job.salary}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p class="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {job.views} views
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {job.applicants} applicants
              </span>
              <span class="text-gray-400">•</span>
              <span>{job.posted}</span>
            </div>
            <button class="bg-[#6BB4C9] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#5AA3B8] transition-all group-hover:scale-105" on:click={() => goto(`/careers/${job.id}`)}>
              View Details
            </button>
          </div>
        </div>
      {/each}
    </div>

    {#if hasMore}
      <div class="text-center mt-8">
        <button
          on:click={loadMore}
          class="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all hover:scale-105"
        >
          Load More Jobs
        </button>
      </div>
    {/if}
  {:else}
    <div class="text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
      <button
        on:click={resetFilters}
        class="bg-[#6BB4C9] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5AA3B8] transition-all"
      >
        Clear all filters
      </button>
    </div>
  {/if}
</section>



<Footer />