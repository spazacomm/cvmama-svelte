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
            class="bg-gray-50 rounded-lg p-4 mb-4 document-mock min-h-48 cursor-pointer hover:bg-gray-100 transition-colors"
            on:click={() => openModal('Resume Preview', resume.cv_image_url)}
          >
            {#if resume.cv_image_url}
              <img src={resume.cv_image_url} alt="Resume Preview" class="rounded-lg object-contain max-h-48 mx-auto" />
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
          <div
            class="bg-gray-50 rounded-lg p-4 mb-4 document-mock min-h-48 cursor-pointer hover:bg-gray-100 transition-colors"
            on:click={() => openModal('Cover Letter Preview', resume.cover_letter_image_url)}
          >
            {#if resume.cover_letter_image_url}
              <img src={resume.cover_letter_image_url} alt="Cover Letter Preview" class="rounded-lg object-contain max-h-48 mx-auto" />
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
{#if modalVisible}
  <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl max-w-4xl w-full max-h-full overflow-auto">
      <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-xl font-bold text-gray-900">{modalTitle}</h3>
        <button on:click={closeModal} class="text-gray-400 hover:text-gray-600 text-2xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="p-6">
        {#if modalContentUrl}
          <img src={modalContentUrl} alt="Document Preview" class="w-full max-h-[75vh] object-contain rounded-lg mx-auto" />
        {:else}
          <div class="bg-gray-50 rounded-lg p-8 min-h-96 document-mock"></div>
        {/if}
        <p class="text-sm text-gray-500 mt-4 text-center">
          This is a preview of your optimized document. Complete payment to download the full version.
        </p>
      </div>
    </div>
  </div>
{/if}
