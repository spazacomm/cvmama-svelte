<script lang="ts">
export let resume;
</script>

 <div class="grid lg:grid-cols-2 gap-8 mb-12">
            <!-- Documents Column -->
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
                                <div class="flex items-center space-x-2">
                                    <span class="bg-[#10b981] bg-opacity-10 text-white px-2 py-1 rounded-full text-xs font-medium">{resume.ats_score}% ATS Score</span>
                                    <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4 mb-4 document-mock min-h-48 cursor-pointer hover:bg-gray-100 transition-colors" ></div>
                            <p class="text-gray-600 text-sm mb-4">Your resume has been enhanced with industry-specific keywords, optimized formatting for ATS systems, and tailored content that highlights your most relevant experience for this role.</p>
                            <button class="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2 download-btn" disabled>
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                </svg>
                                <span>Unlock to Download</span>
                            </button>
                        </div>
                    </div>

                    <!-- Cover Letter Card -->
                    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate-float" style="animation-delay: 0.2s">
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
                                <div class="flex items-center space-x-2">
                                    <span class="bg-[#7c3aed] bg-opacity-10 text-white px-2 py-1 rounded-full text-xs font-medium">Perfect Match</span>
                                    <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4 mb-4 document-mock min-h-48 cursor-pointer hover:bg-gray-100 transition-colors" ></div>
                            <p class="text-gray-600 text-sm mb-4">A professionally crafted cover letter that directly addresses TechCorp's requirements, showcases your relevant achievements, and demonstrates genuine interest in their mission and values.</p>
                            <button class="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2 download-btn" disabled>
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                </svg>
                                <span>Unlock to Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>