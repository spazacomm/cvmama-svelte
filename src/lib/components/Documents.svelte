<script lang="ts">
  export let resume;
  export let job;

  let modalVisible = false;
  let modalTitle = '';
  let modalContentUrl: string | null = null;

  function openModal(title: string, previewUrl: string) {
    modalVisible = true;
    modalTitle = title;
    modalContentUrl = previewUrl;
  }

  function closeModal() {
    modalVisible = false;
    modalTitle = '';
    modalContentUrl = null;
  }

  function handleDownload(type: "resume" | "coverLetter") {

        console.log('handling download');
		// check if unlocked
		if (resume?.is_paid) {
			// Construct the download URL (from Supabase Storage, API, etc.)
			let fileUrl =
				type === "resume"
					? resume.cv_pdf_url
					: resume.cover_letter_pdf_url;

			if (!fileUrl) {
				console.log("File not available.");
				return;
			}

			// Trigger download
			const link = document.createElement("a");
			link.href = fileUrl;
      link.target = '_blank';
			link.download = `${type}-${job.title || "document"}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			// Not unlocked → show modal or redirect to checkout
			//openModal(type);
		}
	}

</script>

<div class="grid lg:grid-cols-2 gap-8 mb-12">
  <div class="lg:col-span-2">
    <h2 class="text-2xl font-bold text-[#1e293b] mb-6 flex items-center">
      <svg class="w-6 h-6 mr-3 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      Your Optimized Documents
    </h2>
    
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Resume Card -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate-float">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Optimized Resume</h3>
                <p class="text-sm text-gray-500">ATS-optimized • Keyword enhanced</p>
              </div>
            </div>
            <span class="bg-[#10b981] bg-opacity-10 text-white px-2 py-1 rounded-full text-xs font-medium">
              {resume.ats_score}% ATS Score
            </span>
          </div>

          <!-- Preview -->
          <div
          class="bg-gray-50 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center"
          on:click={() => openModal('Resume Preview', resume.cv_image_url)}
        >
          {#if resume.cv_image_url}
            <div class="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-lg shadow-sm bg-white">
              <img
                src={resume.cv_image_url}
                alt="Resume Preview"
                class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>
          {/if}
        </div> 
  

        

          <p class="text-gray-600 text-sm mb-4">
            Your resume has been enhanced with industry-specific keywords, optimized formatting for ATS systems,
            and tailored content that highlights your most relevant experience for this role.
          </p>

          {#if resume.is_paid}
            <button on:click={() => handleDownload("resume")}  class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#1d4ed8] transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm3 4a1 1 0 000 2h6a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span>Download Resume</span>s
            </button>
          {:else}
            <button class="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2" disabled>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <span>Unlock to Download</span>
            </button>
          {/if}
        </div>
      </div>

      <!-- Cover Letter Card -->
      <div class="bg-white mb-5 rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate-float" style="animation-delay: 0.2s">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Tailored Cover Letter</h3>
                <p class="text-sm text-gray-500">Company-specific • Personalized</p>
              </div>
            </div>
            <span class="bg-[#7c3aed] bg-opacity-10 text-white px-2 py-1 rounded-full text-xs font-medium">Perfect Match</span>
          </div>

          <!-- Preview -->
          <!-- <div
            class="bg-gray-50 rounded-lg p-4 mb-4 document-mock min-h-48 cursor-pointer hover:bg-gray-100 transition-colors"
            on:click={() => openModal('Cover Letter Preview', resume.cover_letter_image_url)}
          >
            {#if resume.cover_letter_image_url}
              <img src={resume.cover_letter_image_url} alt="Cover Letter Preview" class="rounded-lg object-contain max-h-48 mx-auto" />
            {/if}
          </div> -->
          <div
  class="bg-gray-50 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center"
  on:click={() => openModal('Resume Preview', resume.cover_letter_image_url)}
>
  {#if resume.cover_letter_image_url}
    <div class="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-lg shadow-sm bg-white">
      <img
        src={resume.cover_letter_image_url}
        alt="Resume Preview"
        class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
      />
    </div>
  {/if}
</div>


          <p class="text-gray-600 text-sm mb-4">
            A professionally crafted cover letter that directly addresses the job’s requirements, showcases your relevant
            achievements, and demonstrates genuine interest in the company’s mission and values.
          </p>

          {#if resume.is_paid}
            <button on:click={() => handleDownload("coverLetter")} download class="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#1d4ed8] transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm3 4a1 1 0 000 2h6a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span>Download Cover Letter</span>
            </button>
          {:else}
            <button class="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2" disabled>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <span>Unlock to Download</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Document Preview Modal -->
<!-- Document Preview Modal -->
{#if modalVisible}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity duration-300"
  >
    <!-- Modal container -->
    <div
      class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50">
        <h3 class="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {modalTitle}
        </h3>
        <button
          on:click={closeModal}
          class="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
          aria-label="Close preview"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-6 mt-3">
        {#if modalContentUrl}
          <div
            class="relative w-full max-w-3xl aspect-[3/4] bg-white  overflow-hidden shadow-xl border border-gray-100 mt-100"
          >
            <img
              src={modalContentUrl}
              alt="Document Preview"
              class="absolute inset-0 w-full object-contain object-top "
              
              draggable="false"
            />
          </div>
        {:else}
          <div
            class="bg-gray-100 rounded-xl w-full max-w-3xl aspect-[3/4] flex items-center justify-center text-gray-400"
          >
            <span>No preview available</span>
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div class="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
        This is a preview of your optimized document.<br class="hidden sm:block" />
        <span class="text-gray-700 font-medium">Complete payment to download the full version.</span>
      </div>
    </div>
  </div>
{/if}

