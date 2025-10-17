<script>
    import { supabase } from '$lib/supabaseClient';
  
    let cvFile = null;
    let jobDescription = '';
    let email = '';
    let termsAccepted = false;
    let privacyAccepted = false;
    let uploading = false;
    let success = false;
    let error = '';
    let dragActive = false;
    let fileInput;
    let candidate_name = "";
    let step = 1; // 1 = CV & Job Description, 2 = Email & Consent
  
    function handleDrag(e, entering) {
      e.preventDefault();
      e.stopPropagation();
      dragActive = entering;
    }
  
    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      dragActive = false;
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
          cvFile = file;
          error = '';
        }
      }
    }
  
    function validateFile(file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB
  
      if (!validTypes.includes(file.type)) {
        error = 'Please upload a PDF or Word document';
        return false;
      }
      if (file.size > maxSize) {
        error = 'File size must be less than 5MB';
        return false;
      }
      return true;
    }
  
    function handleFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (validateFile(file)) {
          cvFile = file;
          error = '';
        }
      }
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    function goToStep2() {
      // Validation for step 1
      if (!cvFile) {
        error = 'Please upload your CV';
        return;
      }
      if (!jobDescription.trim()) {
        error = 'Please paste the job description';
        return;
      }
  
      error = '';
      step = 2;
    }
  
    function goBackToStep1() {
      step = 1;
      error = '';
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      
      // Validation for step 2
      if (!email.trim()) {
        error = 'Please provide your email address';
        return;
      }
      if (!validateEmail(email)) {
        error = 'Please provide a valid email address';
        return;
      }
      if (!termsAccepted) {
        error = 'Please accept the Terms and Conditions';
        return;
      }
      if (!privacyAccepted) {
        error = 'Please accept the Privacy Policy';
        return;
      }
  
      uploading = true;
      error = '';
  
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  
        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, cvFile, {
            cacheControl: '3600',
            upsert: false
          });
  
        if (uploadError) throw uploadError;
  
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
  
        // Insert lead data into database
        const { data: leadData, error: leadError } = await supabase
          .from('leads')
          .insert([
            {
              service: 'tailor',
              resume_file: publicUrl,
              job_description: jobDescription,
              email: email,
              lead_name: candidate_name,
              created_at: new Date().toISOString()
            }
          ])
          .select();
  
        if (leadError) throw leadError;
  
        // Success!
        uploading = false;
        success = true;
  
      } catch (err) {
        uploading = false;
        error = err.message || 'An error occurred while uploading. Please try again.';
        console.error('Upload error:', err);
      }
    }
  
    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
  
    function removeFile() {
      cvFile = null;
      if (fileInput) fileInput.value = '';
    }
  
    function resetForm() {
      cvFile = null;
      jobDescription = '';
      candidate_name = '';
      email = '';
      termsAccepted = false;
      privacyAccepted = false;
      success = false;
      error = '';
      step = 1;
      if (fileInput) fileInput.value = '';
    }
  </script>
  
  <section id="upload" class="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Background decorations -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style="animation-delay: 1s;"></div>
  
    <div class="max-w-4xl mx-auto px-4 relative z-10">
      {#if !success}
        <!-- Header -->
        <div class="text-center mb-12">
          
          <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-[#F28C7A] to-[#e67a66] bg-clip-text text-transparent">
            Get Your ATS Report
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your current CV and the job description you're targeting. Our AI will analyze and generate a comprehensive report.
          </p>
        </div>
  
        
  
        <!-- Features -->
        <div class="grid grid-cols-3 md:grid-cols-3 gap-4 mb-10">
          <div class="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex-shrink-0 w-10 h-10 bg-[#F28C7A]/10 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-[#F28C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Fast Processing</p>
              <p class="text-xs text-gray-500">Results within 2 hours</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">100% Secure</p>
              <p class="text-xs text-gray-500">Your data is protected</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">AI-Powered</p>
              <p class="text-xs text-gray-500">Smart optimization</p>
            </div>
          </div>
        </div>
  
        <!-- Form Container -->
        <div class="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 mt-5">
          {#if step === 1}
            <!-- Step 1: CV Upload & Job Description -->
            <div class="space-y-8 ">
              <!-- CV Upload -->
              <div class="mb-5">
                <label class="block text-gray-800 font-semibold mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-[#F28C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Upload Your CV *
                </label>
                <div
                  class="relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 {dragActive ? 'border-[#F28C7A] bg-[#F28C7A]/5' : cvFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-[#F28C7A] hover:bg-[#F28C7A]/5'}"
                  on:dragenter={(e) => handleDrag(e, true)}
                  on:dragleave={(e) => handleDrag(e, false)}
                  on:dragover={(e) => handleDrag(e, true)}
                  on:drop={handleDrop}
                  role="button"
                  tabindex="0"
                >
                  <input
                    bind:this={fileInput}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    on:change={handleFileChange}
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {#if cvFile}
                    <div class="text-center">
                      <svg class="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p class="text-gray-900 font-medium mb-1">{cvFile.name}</p>
                      <p class="text-sm text-gray-500">{formatFileSize(cvFile.size)}</p>
                      <button
                        type="button"
                        on:click|stopPropagation={removeFile}
                        class="mt-3 text-sm text-[#F28C7A] hover:text-[#e67a66] font-medium"
                      >
                        Choose different file
                      </button>
                    </div>
                  {:else}
                    <div class="text-center">
                      <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p class="text-gray-700 font-medium mb-1">
                        Drop your CV here or click to browse
                      </p>
                      <p class="text-sm text-gray-500">
                        Supports PDF, DOC, DOCX (max 5MB)
                      </p>
                    </div>
                  {/if}
                </div>
              </div>
  
              <!-- Job Description -->
              <div class="mb-5 mt-5">
                <label class="block text-gray-800 font-semibold mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-[#F28C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Job Description *
                </label>
                <textarea
                  bind:value={jobDescription}
                  rows="8"
                  placeholder="Paste the complete job description here...&#10;&#10;Include:&#10;• Job title and responsibilities&#10;• Required skills and qualifications&#10;• Company information&#10;• Any other relevant details"
                  class="w-full border-2 border-gray-300 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#F28C7A] focus:border-[#F28C7A] outline-none transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
                ></textarea>
                <p class="mt-2 text-sm text-gray-500 flex items-center">
                  <span class="inline-block w-2 h-2 bg-[#F28C7A] rounded-full mr-2"></span>
                  Detailed descriptions yield better results
                </p>
              </div>
  
              <!-- Error Message -->
              {#if error}
                <div class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                  <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-sm text-red-700">{error}</p>
                </div>
              {/if}
  
              <!-- Continue Button -->
              <button
                type="button"
                on:click={goToStep2}
                class="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-[#F28C7A] hover:bg-[#e67a66] text-white shadow-lg shadow-[#F28C7A]/20 hover:shadow-xl hover:shadow-[#F28C7A]/30 transform hover:scale-[1.02] focus:ring-[#F28C7A]/30"
              >
                <span class="flex items-center justify-center">
                  Continue 
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </button>
            </div>
          {:else}
            <!-- Step 2: Email & Consent -->
            <form on:submit={handleSubmit} class="space-y-8">
  
              <!-- Name Field -->
      <div>
        <label for="candidate_name" class="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <input
            id="candidate_name"
            type="text"
            bind:value={candidate_name}
            placeholder="Enter your full name"
            disabled={uploading}
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cvmama-primary focus:border-cvmama-primary transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>
  
  
              <!-- Email Address -->
              <div class="mb-5 mt-3">
                <label class="block text-gray-800 font-semibold mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-[#F28C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Email Address *
                </label>
                <input
                  type="email"
                  bind:value={email}
                  placeholder="your.email@example.com"
                  class="w-full border-2 border-gray-300 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#F28C7A] focus:border-[#F28C7A] outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <p class="mt-2 text-sm text-gray-500">
                  We'll send your optimized CV to this email address within 2 hours
                </p>
              </div>
  
              
              <!-- Consent Checkboxes -->
              <div class="space-y-4 mb-5">
                <div class="flex items-start">
                  <div class="flex items-center h-5 mt-1 ">
                    <input
                      id="terms"
                      type="checkbox"
                      bind:checked={termsAccepted}
                      class="w-5 h-5  border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#F28C7A] text-[#F28C7A] cursor-pointer"
                    />
                  </div>
                  <label for="terms" class="ml-3 text-sm text-gray-700 cursor-pointer px-3">
                    I agree to the <a href="/terms" target="_blank" class="text-[#F28C7A] hover:text-[#e67a66] font-medium underline">Terms and Conditions</a> *
                  </label>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5 mt-1">
                    <input
                      id="privacy"
                      type="checkbox"
                      bind:checked={privacyAccepted}
                      class="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#F28C7A] text-[#F28C7A] cursor-pointer"
                    />
                  </div>
                  <label for="privacy" class="ml-3 text-sm text-gray-700 cursor-pointer px-3">
                    I accept the <a href="/privacy" target="_blank" class="text-[#F28C7A] hover:text-[#e67a66] font-medium underline">Privacy Policy</a> and consent to the processing of my personal data and documents for CV optimization purposes *
                  </label>
                </div>
              </div>
  
              <!-- Error Message -->
              {#if error}
                <div class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                  <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-sm text-red-700">{error}</p>
                </div>
              {/if}
  
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 mt-3 mb-5">
                <button
                  type="button"
                  on:click={goBackToStep1}
                  class="sm:w-1/3 py-4 px-3 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-white border-2 border-gray-300 hover:border-[#F28C7A] text-gray-700 hover:text-[#F28C7A] focus:ring-[#F28C7A]/30"
                >
                  <span class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                    </svg>
                    Back
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  class="sm:w-2/3 py-4 px-3 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 {uploading ? 'bg-[#F28C7A]/60 text-white cursor-not-allowed' : 'bg-[#F28C7A] hover:bg-[#e67a66] text-white shadow-lg shadow-[#F28C7A]/20 hover:shadow-xl hover:shadow-[#F28C7A]/30 transform hover:scale-[1.02]'} focus:ring-[#F28C7A]/30"
                >
                  {#if uploading}
                    <span class="flex items-center justify-center">
                      <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading & Processing...
                    </span>
                  {:else}
                    <span class="flex items-center justify-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                      </svg>
                      Submit & Tailor My CV
                    </span>
                  {/if}
                </button>
              </div>
  
              <!-- Security Note -->
              <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <p>Your files are encrypted and never shared with third parties</p>
              </div>
            </form>
          {/if}
        </div>
  
        <!-- Additional Info (only show when not success) -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Need help? Check our{' '}
            <a href="#faq" class="text-[#F28C7A] hover:text-[#e67a66] font-medium underline">
              FAQ section
            </a>{' '}
            or{' '}
            <a href="#contact" class="text-[#F28C7A] hover:text-[#e67a66] font-medium underline">
              contact support
            </a>
          </p>
        </div>
      {:else}
        <!-- Success Message -->
        <div class="bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-gray-100 text-center">
          
          
          <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-5">
            Successfully Submitted!
          </h3>
          
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your CV has been added to our processing queue. We'll analyze it and share your ATS Report.
          </p>
  
          <div class="bg-[#F28C7A]/5 border-2 border-[#F28C7A]/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-[#F28C7A] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-left">
                <p class="font-semibold text-gray-900 mb-2">What happens next?</p>
                <ul class="text-sm text-gray-700 space-y-2">
                  <li class="flex items-start">
                    <span class="inline-block w-1.5 h-1.5 bg-[#F28C7A] rounded-full mr-2 mt-1.5"></span>
                    <span>Your CV will be processed within the next <strong>2 hours</strong></span>
                  </li>
                  <li class="flex items-start">
                    <span class="inline-block w-1.5 h-1.5 bg-[#F28C7A] rounded-full mr-2 mt-1.5"></span>
                    <span>You'll receive your oATS Report via email at <strong>{email}</strong></span>
                  </li>
                  <li class="flex items-start">
                    <span class="inline-block w-1.5 h-1.5 bg-[#F28C7A] rounded-full mr-2 mt-1.5"></span>
                    <span>Check your spam folder if you don't see it in your inbox</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
         
  
          <p class="mt-8 text-sm text-gray-500 mb-5">
            Questions? <a href="#contact" class="text-[#F28C7A] hover:text-[#e67a66] font-medium underline">Contact our support team</a>
          </p>
        </div>
      {/if}
    </div>
  </section>
  
  <style>
    @keyframes pulse {
      0%, 100% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.2;
      }
    }
  
    .animate-pulse {
      animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  </style>