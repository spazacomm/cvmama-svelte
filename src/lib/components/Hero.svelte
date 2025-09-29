<script>

    import ResumeUpload from "./ResumeUpload.svelte";

</script>
<section class="relative min-h-screen flex items-center bg-[#6BB4C9]/50 overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-24 -right-24 w-96 h-96 ai-brain rounded-full opacity-10"></div>
            <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-cvmama-accent rounded-full opacity-5 animate-bounce-slow"></div>
            <div class="absolute top-1/2 right-1/4 w-4 h-4 bg-cvmama-primary rounded-full animate-ping"></div>
            <div class="absolute top-1/4 left-1/4 w-3 h-3 bg-cvmama-secondary rounded-full animate-ping" style="animation-delay: 1s;"></div>
            <div class="absolute bottom-1/4 right-1/3 w-2 h-2 bg-cvmama-accent rounded-full animate-ping" style="animation-delay: 2s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Content -->
                <div class="animate-slide-up">
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="flex -space-x-2">
                            <div class="w-8 h-8 bg-[#6BB4C9] rounded-full border-2 border-white flex items-center justify-center">
                                <span class="text-white text-xs font-bold">AI</span>
                            </div>
                            <div class="w-8 h-8 bg-[#F28C7A] rounded-full border-2 border-white flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div class="w-8 h-8 bg-[#F28C7A] rounded-full border-2 border-white flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </div>
                        <span class="text-cvmama-primary font-semibold">Trusted by 10,000+ job seekers</span>
                    </div>

                    <h1 class="text-5xl lg:text-7xl font-bold text-[#1e293b] mb-6 leading-tight">
                        Land Your 
                        <span class="text-gradient">Dream Job</span> 
                        with AI
                    </h1>
                    
                    <p class="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                        Upload your resume. Our AI finds perfect matches, optimizes your documents, and gets you 
                        <strong class="text-cvmama-primary">interview-ready in minutes</strong>.
                    </p>

                   
                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-cvmama-primary">87%</div>
                            <div class="text-gray-600 text-sm">Get Interviews</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-cvmama-secondary">3.2x</div>
                            <div class="text-gray-600 text-sm">Faster Response</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-cvmama-accent">24hrs</div>
                            <div class="text-gray-600 text-sm">Average Time</div>
                        </div>
                    </div>
                </div>

                <!-- Visual -->
                 <ResumeUpload />
               
                
            </div>
        </div>
    </section>