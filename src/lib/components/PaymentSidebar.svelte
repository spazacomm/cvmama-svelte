<script lang="ts">
export let resume;
</script>

<div class="hidden lg:block">
                <div class="fixed top-20 left-10" >
                    <!-- Pricing Card -->
                    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                        <div class="gradient-primary p-6 text-white text-center">
                            <h3 class="text-xl font-bold mb-2">Unlock Your Documents</h3>
                            <p class="text-blue-100 text-sm mb-4">One-time payment • Instant download</p>
                            <div class="text-4xl font-bold mb-2">{resume.currency} {resume.amount}</div>
                            <!-- <div class="text-blue-100 text-sm line-through">Usually KES 400</div>
                            <div class="bg-[#10b981] text-white px-3 py-1 rounded-full text-xs font-medium mt-2 inline-block">50% Launch Discount</div> -->
                        </div>
                        <div class="p-6">
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-center text-sm">
                                    <svg class="w-4 h-4 mr-3 text-[#10b981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    ATS-optimized resume
                                </li>
                                <li class="flex items-center text-sm">
                                    <svg class="w-4 h-4 mr-3 text-[#10b981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    Personalized cover letter
                                </li>
                                <li class="flex items-center text-sm">
                                    <svg class="w-4 h-4 mr-3 text-[#10b981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    Multiple format options
                                </li>
                                <li class="flex items-center text-sm">
                                    <svg class="w-4 h-4 mr-3 text-[#10b981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    Lifetime access
                                </li>
                            </ul>
                            <button  class="w-full gradient-warning text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <span>Secure Payment</span>
                            </button>
                            <p class="text-xs text-gray-500 text-center mt-3">
                                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                </svg>
                                256-bit SSL encrypted payment
                            </p>
                        </div>
                    </div>

                    <!-- Success Stats -->
                    <!-- <div class="bg-[#2563eb] rounded-xl p-6 text-white text-center mb-6">
                        <h4 class="font-bold mb-4">CVMama Success Rate</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div class="text-2xl font-bold">87%</div>
                                <div class="text-green-100">Get Interviews</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold">3.2x</div>
                                <div class="text-green-100">Higher Response</div>
                            </div>
                        </div>
                    </div> -->

                    <!-- Application Tips -->
                    <!-- <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h4 class="font-semibold text-gray-900 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                            </svg>
                            Pro Application Tips
                        </h4>
                        <ul class="space-y-3 text-sm text-gray-600">
                            <li class="flex items-start">
                                <span class="text-[#10b981] mr-2 font-bold">1.</span>
                                Apply within 48 hours of job posting for maximum visibility
                            </li>
                            <li class="flex items-start">
                                <span class="text-[#10b981] mr-2 font-bold">2.</span>
                                Follow up with a LinkedIn connection request
                            </li>
                            <li class="flex items-start">
                                <span class="text-[#10b981] mr-2 font-bold">3.</span>
                                Customize your application message for each role
                            </li>
                            <li class="flex items-start">
                                <span class="text-[#10b981] mr-2 font-bold">4.</span>
                                Research the company culture and values beforehand
                            </li>
                        </ul>
                    </div> -->
                </div>
    </div>


    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #6BB4C9 0%, #6BB4C9 100%);
        }
        .gradient-primary {
            background: linear-gradient(135deg, #6BB4C9 0%, #6BB4C9 100%);
        }
        .gradient-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        .gradient-warning {
            background: linear-gradient(135deg, #F28C7A 0%, #F28C7A 100%);
        }
        .shimmer-effect {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
        .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.95);
        }
        .document-mock {
            background-image: 
                linear-gradient(to right, #e5e7eb 25%, transparent 25%),
                linear-gradient(to right, #e5e7eb 50%, transparent 50%),
                linear-gradient(to right, #e5e7eb 75%, transparent 75%),
                linear-gradient(to bottom, #f3f4f6 0%, #f3f4f6 100%);
            background-size: 100% 20px, 80% 15px, 90% 15px, 100% 100%;
            background-position: 20px 40px, 20px 70px, 20px 95px, 0 0;
            background-repeat: no-repeat;
        }
</style>
