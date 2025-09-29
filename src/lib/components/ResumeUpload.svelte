<script lang="ts">
  import { uploadResume } from '$lib/services/resumeService';

  let file: File | null = null;
  let candidate_name = "";
  let email = "";
  let whatsapp_number = "";
  let uploading = false;
  let success = false;
  let errorMsg = "";
  let dragActive = false;

  // File input reference for programmatic access
  let fileInput: HTMLInputElement;

  async function handleUpload() {
    // Form validation
    if (!candidate_name.trim()) {
      errorMsg = "Please enter your full name.";
      return;
    }
    if (!email.trim()) {
      errorMsg = "Please enter your email address.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMsg = "Please enter a valid email address.";
      return;
    }
    if (!file) {
      errorMsg = "Please select a resume file.";
      return;
    }

    uploading = true;
    errorMsg = "";
    success = false;

    const result = await uploadResume({
      file,
      candidate_name,
      email,
      whatsapp_number
    });

    if (result.success) {
      success = true;
      file = null;
      candidate_name = "";
      email = "";
      whatsapp_number = "";
      fileInput.value = "";
    } else {
      errorMsg = result.error;
    }

    uploading = false;
  }

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0] ?? null;
    
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        errorMsg = 'Please upload a PDF, DOC, or DOCX file';
        target.value = '';
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        errorMsg = 'File size must be less than 5MB';
        target.value = '';
        return;
      }

      file = selectedFile;
      errorMsg = "";
      success = false;
    }
  }

  function handleDrag(event: DragEvent, type: string) {
    event.preventDefault();
    event.stopPropagation();
    
    if (type === 'dragenter' || type === 'dragover') {
      dragActive = true;
    } else if (type === 'dragleave') {
      dragActive = false;
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    dragActive = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        errorMsg = 'Please upload a PDF, DOC, or DOCX file';
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        errorMsg = 'File size must be less than 5MB';
        return;
      }

      file = selectedFile;
      errorMsg = "";
      success = false;
    }
  }

  function removeFile() {
    file = null;
    success = false;
    errorMsg = "";
    fileInput.value = "";
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Clear errors when user starts typing
  $: if (candidate_name || email || whatsapp_number) {
    if (errorMsg && !errorMsg.includes('file')) {
      errorMsg = "";
    }
  }
</script>

<div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Submit Your Resume</h2>
    <p class="text-sm text-gray-600">
      Fill out your details and upload your resume to get started
    </p>
  </div>

  <div class="space-y-4">
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

    <!-- Email Field -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
        Email Address *
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="Enter your email address"
          disabled={uploading}
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cvmama-primary focus:border-cvmama-primary transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
    </div>

    

    <!-- File Upload Area -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Resume File *
      </label>
      <div
        class="relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 {dragActive ? 'border-cvmama-primary bg-blue-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}"
        on:dragenter={(e) => handleDrag(e, 'dragenter')}
        on:dragleave={(e) => handleDrag(e, 'dragleave')}
        on:dragover={(e) => handleDrag(e, 'dragover')}
        on:drop={handleDrop}
        role="button"
        tabindex="0"
      >
        <input
          bind:this={fileInput}
          type="file"
          accept=".pdf,.doc,.docx"
          on:change={handleFileChange}
          disabled={uploading}
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {#if !file}
          <div class="space-y-3">
            <div class="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-700 font-medium">
                {dragActive ? 'Drop your resume here' : 'Click to upload or drag and drop'}
              </p>
              <p class="text-sm text-gray-500 mt-1">
                PDF, DOC, DOCX up to 5MB
              </p>
            </div>
          </div>
        {:else}
          <div class="space-y-3">
            <div class="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-700 font-medium truncate">{file.name}</p>
              <p class="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              on:click={removeFile}
              disabled={uploading}
              class="inline-flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="button"
      on:click={handleUpload}
      disabled={uploading || success}
      class="w-full mt-6 px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F28C7A] {success ? 'bg-green-600 text-white cursor-default' : uploading ? 'bg-[#F28C7A]/60 text-white cursor-not-allowed' : 'bg-[#F28C7A] hover:bg-[#F28C7A]/90 text-white'}"
    >
      <div class="flex items-center justify-center space-x-2">
        {#if uploading}
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Uploading...</span>
        {:else if success}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Submitted Successfully</span>
        {:else}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span>Submit Resume</span>
        {/if}
      </div>
    </button>
  </div>

  <!-- Success Message -->
  {#if success}
    <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-start space-x-3">
        <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-green-800 font-medium">✅ Resume submitted successfully!</p>
          <p class="text-green-700 text-sm mt-1">
            We've received your application and will be in touch soon.
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Error Message -->
  {#if errorMsg}
    <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-start space-x-3">
        <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-red-800 font-medium">Error</p>
          <p class="text-red-700 text-sm mt-1">{errorMsg}</p>
        </div>
      </div>
    </div>
  {/if}
</div>