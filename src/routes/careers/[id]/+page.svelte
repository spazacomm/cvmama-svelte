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
  
    // Form state
    let showApplyModal = false;
    let name = '';
    let email = '';
    let phone = '';
    let linkedin = '';
    let additionalMessage = '';
  
    // Consent state - must be initialized as false
    let consentDataProcessing = false;
    let consentCommunication = false;
    let consentTerms = false;
    let marketingConsent = false;
    
    let resumeFile;
    let isSubmitting = false;
  
    // Notification state
    let notification = {
      show: false,
      type: '', // 'success', 'error', 'warning'
      message: ''
    };
  
    // Form validation errors
    let formErrors = {
      resume: '',
      consents: '',
      fileSize: '',
      fileType: ''
    };
  
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
  
    function showNotification(type, message) {
      notification = { show: true, type, message };
      setTimeout(() => {
        notification.show = false;
      }, 5000);
    }
  
    function clearFormErrors() {
      formErrors = {
        resume: '',
        consents: '',
        fileSize: '',
        fileType: ''
      };
    }
  
    async function submitApplication() {
      try {
        isSubmitting = true;
        clearFormErrors();
  
        // Validate resume file
        if (!resumeFile || resumeFile.length === 0) {
          formErrors.resume = 'Please upload your resume to continue.';
          isSubmitting = false;
          return;
        }
  
        // Validate required consents
        if (!consentDataProcessing || !consentCommunication || !consentTerms) {
          formErrors.consents = 'Please accept all required terms and consents marked with *.';
          isSubmitting = false;
          return;
        }
  
        const file = resumeFile[0];
        
        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          formErrors.fileSize = 'File size must be less than 5MB. Please upload a smaller file.';
          isSubmitting = false;
          return;
        }
  
        // Validate file type
        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const fileExt = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExt)) {
          formErrors.fileType = 'Please upload a PDF, DOC, or DOCX file only.';
          isSubmitting = false;
          return;
        }
  
        const filePath = `resumes/${crypto.randomUUID()}.${fileExt}`;
  
        // Upload resume to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, file);
  
        if (uploadError) {
          console.error('Upload error:', uploadError);
          showNotification('error', 'Failed to upload resume. Please try again.');
          isSubmitting = false;
          return;
        }
  
        const { data: publicUrlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);
  
        // Save to leads table with all fields
        const { error: insertError } = await supabase
          .from('leads')
          .insert({
            job_description: '',
            lead_name: name,
            email,
            phone: phone || null,
            linkedin: linkedin || null,
            additional_message: additionalMessage || null,
            resume_file: publicUrlData.publicUrl,
            job_id: id,
            service: 'tailor',
            status: 'pending',
            consent_data_processing: consentDataProcessing,
            consent_communication: consentCommunication,
            consent_terms: consentTerms,
            marketing_consent: marketingConsent,
            created_at: new Date().toISOString()
          });
  
        if (insertError) {
          console.error('Insert error:', insertError);
          showNotification('error', 'Failed to submit application. Please try again.');
          isSubmitting = false;
          return;
        }
  
        // Success
        showNotification('success', 'Application submitted successfully! We\'ll tailor your CV and cover letter to match this job and send them to your email within 24 hours.');
        
        // Reset form and close modal after a short delay
        setTimeout(() => {
          resetForm();
          showApplyModal = false;
        }, 2000);
  
      } catch (err) {
        console.error('Application error:', err);
        showNotification('error', 'Something went wrong. Please try again.');
        isSubmitting = false;
      }
    }
  
    function resetForm() {
      name = '';
      email = '';
      phone = '';
      linkedin = '';
      additionalMessage = '';
      resumeFile = null;
      consentDataProcessing = false;
      consentCommunication = false;
      consentTerms = false;
      marketingConsent = false;
      clearFormErrors();
      isSubmitting = false;
    }
  
    onMount(fetchJob);
  </script>
  
  <svelte:head>
    <title>{job ? `${job.title} at ${job.company} - JobBoard Kenya` : 'Job Details'}</title>
    <meta name="description" content={job ? job.description : 'Job details and application information.'} />
  </svelte:head>
  
  <Header />
  
  <!-- Global Notification Toast -->
  {#if notification.show}
  <div class="fixed top-4 right-4 z-[60] animate-slideIn">
    <div class="bg-white rounded-lg shadow-2xl border-l-4 {notification.type === 'success' ? 'border-green-500' : notification.type === 'error' ? 'border-red-500' : 'border-yellow-500'} p-4 max-w-md">
      <div class="flex items-start gap-3">
        {#if notification.type === 'success'}
          <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        {:else if notification.type === 'error'}
          <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        {:else}
          <svg class="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        {/if}
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">{notification.type === 'success' ? 'Success!' : notification.type === 'error' ? 'Error' : 'Warning'}</p>
          <p class="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
        <button
          on:click={() => notification.show = false}
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  {/if}
  
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
  <section class="max-w-5xl mx-auto px-4 py-10 space-y-8 bg-white relative">
    <!-- Job Overview -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
      <div class="flex items-center gap-3 text-gray-600">
        <span class="bg-gray-100 px-4 py-1 rounded-full font-medium">{job.category}</span>
        <span class="font-semibold text-[#F28C7A]">{job.salary}</span>
      </div>
      <div class="text-sm text-gray-500">
        Posted {job.posted} • {job.views} views • {job.applicants} applicants
      </div>
    </div>
  
    <!-- Job Description -->
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
  
    <!-- How to Apply -->
    <div class="pt-8 border-t border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">How to Apply</h2>
      <p class="text-gray-700 mb-4">
        You can apply directly on the employer's website or apply through CVMama for a better chance at success.
      </p>
  
      <div class="flex flex-col md:flex-row gap-4">
        {#if job.application_link}
          <a
            href={job.application_link}
            class="flex-1 text-center bg-gray-100 text-gray-800 font-semibold px-8 py-3 rounded-xl hover:bg-gray-200 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply on Company Site
          </a>
        {/if}
  
        <button
          on:click={() => showApplyModal = true}
          class="flex-1 text-center bg-gradient-to-r from-[#F28C7A] to-[#F07B67] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all"
        >
          Apply with CVMama
        </button>
      </div>
    </div>
  </section>
  {/if}
  
  <!-- Apply Modal -->
  {#if showApplyModal}
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-gradient-to-r from-[#6BB4C9] to-[#5CA4B8] text-white p-6 rounded-t-2xl z-10">
        <button
          type="button"
          class="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
          on:click={() => { showApplyModal = false; resetForm(); }}
          aria-label="Close modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 class="text-2xl font-bold mb-1">Apply with CVMama</h3>
        <p class="text-white/90 text-sm">
          Let us craft your perfect application package
        </p>
      </div>
  
      <!-- Content -->
      <div class="p-8">
        <!-- Info Banner -->
        <div class="bg-blue-50 border-l-4 border-[#6BB4C9] p-4 mb-6 rounded-r-lg">
          <div class="flex">
            <svg class="w-5 h-5 text-[#6BB4C9] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div class="text-sm text-gray-700">
              <p class="font-semibold mb-1">What happens next?</p>
              <ul class="space-y-1 text-gray-600">
                <li>• Your resume will be analyzed and optimized</li>
                <li>• A tailored CV matching the job requirements will be created</li>
                <li>• A compelling cover letter will be generated</li>
                <li>• You'll receive your application package within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Form Errors Display -->
        {#if formErrors.resume || formErrors.consents || formErrors.fileSize || formErrors.fileType}
          <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="flex-1">
                <p class="text-sm font-semibold text-red-800 mb-1">Please fix the following errors:</p>
                <ul class="text-sm text-red-700 space-y-1">
                  {#if formErrors.resume}<li>• {formErrors.resume}</li>{/if}
                  {#if formErrors.fileSize}<li>• {formErrors.fileSize}</li>{/if}
                  {#if formErrors.fileType}<li>• {formErrors.fileType}</li>{/if}
                  {#if formErrors.consents}<li>• {formErrors.consents}</li>{/if}
                </ul>
              </div>
            </div>
          </div>
        {/if}
  
        <!-- Form -->
        <form on:submit|preventDefault={submitApplication} class="space-y-5">
          <!-- Personal Information Section -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-[#6BB4C9]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              Personal Information
            </h4>
            
            <div class="space-y-4">
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  bind:value={name}
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6BB4C9] focus:border-transparent transition-all outline-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
  
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  bind:value={email}
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6BB4C9] focus:border-transparent transition-all outline-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
  
              <!-- <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span class="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+254 700 000 000"
                  bind:value={phone}
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6BB4C9] focus:border-transparent transition-all outline-none"
                  disabled={isSubmitting}
                />
              </div> -->
  
              <!-- <div>
                <label for="linkedin" class="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile <span class="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                  bind:value={linkedin}
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6BB4C9] focus:border-transparent transition-all outline-none"
                  disabled={isSubmitting}
                />
              </div>
               -->
            </div>
          </div>
  
          <!-- Resume Upload Section -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-[#6BB4C9]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
              </svg>
              Resume Upload
            </h4>
            
            <div>
              <label for="resume" class="block text-sm font-medium text-gray-700 mb-1">
                Upload Your Resume <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  bind:files={resumeFile}
                  on:change={clearFormErrors}
                  class="w-full border {formErrors.resume || formErrors.fileSize || formErrors.fileType ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6BB4C9]/10 file:text-[#6BB4C9] hover:file:bg-[#6BB4C9]/20 file:cursor-pointer transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <p class="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>
          </div>
  
          <!-- Additional Information -->
          <!-- <div>
            <label for="coverLetter" class="block text-sm font-medium text-gray-700 mb-1">
              Additional Message <span class="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              id="coverLetter"
              placeholder="Tell us anything specific you'd like us to highlight in your application..."
              bind:value={additionalMessage}
              rows="4"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6BB4C9] focus:border-transparent transition-all outline-none resize-none"
              disabled={isSubmitting}
            ></textarea>
          </div>
   -->
          <!-- Consent Section -->
          <div class="bg-gray-50 rounded-lg p-5 space-y-3 {formErrors.consents ? 'ring-2 ring-red-500' : ''}">
            <h4 class="text-sm font-semibold text-gray-800 mb-3">Terms & Consent</h4>
            
            <label class="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                bind:checked={consentDataProcessing}
                on:change={clearFormErrors}
                class="mt-1 w-4 h-4 text-[#6BB4C9] border-gray-300 rounded focus:ring-2 focus:ring-[#6BB4C9] cursor-pointer"
                required
                disabled={isSubmitting}
              />
              <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                I consent to CVMama processing my personal data and resume to create tailored application materials. <span class="text-red-500">*</span>
              </span>
            </label>
  
            <label class="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                bind:checked={consentCommunication}
                on:change={clearFormErrors}
                class="mt-1 w-4 h-4 text-[#6BB4C9] border-gray-300 rounded focus:ring-2 focus:ring-[#6BB4C9] cursor-pointer"
                required
                disabled={isSubmitting}
              />
              <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                I agree to receive email communications regarding my application status and CVMama services. <span class="text-red-500">*</span>
              </span>
            </label>
  
            <label class="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                bind:checked={consentTerms}
                on:change={clearFormErrors}
                class="mt-1 w-4 h-4 text-[#6BB4C9] border-gray-300 rounded focus:ring-2 focus:ring-[#6BB4C9] cursor-pointer"
                required
                disabled={isSubmitting}
              />
              <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                I have read and agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" class="text-[#6BB4C9] hover:underline font-medium">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" class="text-[#6BB4C9] hover:underline font-medium">Privacy Policy</a>. <span class="text-red-500">*</span>
              </span>
            </label>
  
            <label class="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                bind:checked={marketingConsent}
                class="mt-1 w-4 h-4 text-[#6BB4C9] border-gray-300 rounded focus:ring-2 focus:ring-[#6BB4C9] cursor-pointer"
                disabled={isSubmitting}
              />
              <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                I would like to receive updates about new features, career tips, and promotional offers from CVMama.
              </span>
            </label>
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-gradient-to-r from-[#F28C7A] to-[#F07B67] text-white font-semibold px-6 py-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
          >
            {#if isSubmitting}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Application...
            {:else}
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submit Application
            {/if}
          </button>
  
          <p class="text-xs text-center text-gray-500">
            By submitting this form, you acknowledge that your information will be securely processed and stored in accordance with our privacy policy.
          </p>
        </form>
      </div>
    </div>
  </div>
  {/if}
  
  <Footer />
  
  <style>
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  
    .animate-slideIn {
      animation: slideIn 0.3s ease-out;
    }
  </style>