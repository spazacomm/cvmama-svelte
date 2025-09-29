<script lang="ts">
	import ResumeUpload from "./ResumeUpload.svelte";


</script>

 <section id="upload" class="py-20 bg-[#F28C7A]">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <div class="shimmer-effect absolute inset-0 opacity-20"></div>
            <div class="relative z-10">
                <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Find Your Dream Job?
                </h2>
                <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Upload your resume and let our AI do the heavy lifting. Get matched with perfect opportunities in minutes.
                </p>

                <!-- Upload Area -->
                <div class=" rounded-3xl  p-8 lg:p-12 max-w-2xl mx-auto">
                    <ResumeUpload/>
                    
                    <div class="mt-8 text-center">
                        <div class="flex items-center justify-center space-x-2 text-white text-sm mb-4">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                            </svg>
                            <span>100% secure & confidential</span>
                        </div>
                        <p class="text-xs text-white">
                            Your data is encrypted and never shared with third parties
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>