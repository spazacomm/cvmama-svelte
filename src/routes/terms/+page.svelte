<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
    import { onMount } from 'svelte';
    
    let activeTab = 'privacy';
    let scrollY = 0;
    
    function showTab(tab) {
      activeTab = tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    onMount(() => {
      const handleScroll = () => {
        scrollY = window.scrollY;
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
    
    const privacySections = [
      { id: 'privacy-intro', label: 'Introduction' },
      { id: 'privacy-collection', label: 'Information Collection' },
      { id: 'privacy-usage', label: 'How We Use Data' },
      { id: 'privacy-legal', label: 'Legal Basis' },
      { id: 'privacy-sharing', label: 'Data Sharing' },
      { id: 'privacy-retention', label: 'Data Retention' },
      { id: 'privacy-security', label: 'Data Security' },
      { id: 'privacy-rights', label: 'Your Rights' },
      { id: 'privacy-cookies', label: 'Cookies' },
      { id: 'privacy-ai', label: 'AI & Automation' },
      { id: 'privacy-contact', label: 'Contact Us' }
    ];
    
    const termsSections = [
      { id: 'terms-agreement', label: 'Agreement to Terms' },
      { id: 'terms-eligibility', label: 'Eligibility' },
      { id: 'terms-account', label: 'Account Security' },
      { id: 'terms-services', label: 'Our Services' },
      { id: 'terms-conduct', label: 'User Conduct' },
      { id: 'terms-ip', label: 'Intellectual Property' },
      { id: 'terms-payment', label: 'Payment Terms' },
      { id: 'terms-refund', label: 'Refund Policy' },
      { id: 'terms-ai', label: 'AI Technology' },
      { id: 'terms-disclaimers', label: 'Disclaimers' },
      { id: 'terms-liability', label: 'Liability' },
      { id: 'terms-disputes', label: 'Dispute Resolution' }
    ];
  </script>
  
  <svelte:head>
    <title>Legal Documents - CV Mama</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </svelte:head>
  
  <div class="min-h-screen bg-gray-50" style="font-family: 'Plus Jakarta Sans', sans-serif;">
    <!-- Header -->
  <Header />
  
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-7xl mx-auto">
        <!-- Tab Navigation -->
        <div class="bg-white rounded-xl shadow-sm p-2 mb-8 flex gap-2">
          <button 
            on:click={() => showTab('privacy')}
            class="flex-1 px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'privacy' ? 'bg-[#F28C7A] text-white' : 'text-gray-600 hover:bg-gray-50'}"
          >
            Privacy Policy
          </button>
          <button 
            on:click={() => showTab('terms')}
            class="flex-1 px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'terms' ? 'bg-[#F28C7A] text-white' : 'text-gray-600 hover:bg-gray-50'}"
          >
            Terms of Service
          </button>
        </div>
  
        <div class="flex gap-8">
          <!-- Table of Contents - Sticky Sidebar -->
          <aside class="hidden lg:block w-64 flex-shrink-0">
            <div class="sticky top-5 bg-white rounded-xl shadow-sm p-6">
              <h3 class="font-bold text-gray-900 mb-4">Quick Navigation</h3>
              <nav class="space-y-2">
                {#if activeTab === 'privacy'}
                  {#each privacySections as section}
                    <a 
                      href="#{section.id}" 
                      class="block text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {section.label}
                    </a>
                  {/each}
                {:else}
                  {#each termsSections as section}
                    <a 
                      href="#{section.id}" 
                      class="block text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {section.label}
                    </a>
                  {/each}
                {/if}
              </nav>
            </div>
          </aside>
  
          <!-- Content Area -->
          <main class="flex-1 bg-white rounded-xl shadow-sm p-8 lg:p-12">
            {#if activeTab === 'privacy'}
              <!-- Privacy Policy Content -->
              <div class="prose max-w-none">
                <div class="mb-8">
                  <h1 class="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                  <p class="text-gray-500">Last Updated: October 16, 2025</p>
                </div>
  
                <div id="privacy-intro" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Welcome to CV Mama Career Services ("CV Mama," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website at cvmama.co.ke (the "Platform") and our AI-powered job application optimization services.
                  </p>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    By using our Platform, you consent to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our services.
                  </p>
                  <div class="bg-purple-50 border-l-4 border-purple-600 p-4 mt-4 rounded-lg">
                    <p class="font-semibold text-purple-900 mb-2">Contact Information:</p>
                    <p class="text-purple-800 text-sm">Website: https://cvmama.co.ke</p>
                    <p class="text-purple-800 text-sm">Location: Kenya</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-collection" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
                  
                  <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">2.1 Information You Provide Directly</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">When you use our services, we collect:</p>
                  <ul class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li><strong>Personal Identification:</strong> Full name, email address, phone number, physical address</li>
                    <li><strong>Professional Information:</strong> Resume/CV content including work history, education, skills, certifications</li>
                    <li><strong>Career Preferences:</strong> Job titles of interest, preferred locations, salary expectations</li>
                    <li><strong>Payment Information:</strong> Billing details processed through Pesapal</li>
                  </ul>
  
                  <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">2.2 Information Collected Automatically</h3>
                  <ul class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li>Usage data, device information, IP address</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
  
                  <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">2.3 Information from Third Parties</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    We periodically scrape publicly available job postings from various platforms including LinkedIn, Indeed, Glassdoor, company career pages, Upwork, and Fiverr to match opportunities with your profile.
                  </p>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-usage" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
                  
                  <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-indigo-50 p-6 rounded-lg">
                      <h4 class="font-semibold text-indigo-900 mb-2">Service Delivery</h4>
                      <p class="text-indigo-800 text-sm">AI-powered CV analysis, document generation, job matching, and human proofreading services</p>
                    </div>
                    <div class="bg-purple-50 p-6 rounded-lg">
                      <h4 class="font-semibold text-purple-900 mb-2">Job Matching</h4>
                      <p class="text-purple-800 text-sm">Search job sites and career pages for relevant opportunities matching your profile</p>
                    </div>
                    <div class="bg-pink-50 p-6 rounded-lg">
                      <h4 class="font-semibold text-pink-900 mb-2">Payment Processing</h4>
                      <p class="text-pink-800 text-sm">Process payments securely through Pesapal and manage transactions</p>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-lg">
                      <h4 class="font-semibold text-blue-900 mb-2">Platform Improvement</h4>
                      <p class="text-blue-800 text-sm">Enhance AI algorithms and optimize service quality</p>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-legal" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">4. Legal Basis for Processing</h2>
                  <p class="text-gray-600 leading-relaxed mb-4">We process your personal data based on:</p>
                  <ul class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li><strong>Consent:</strong> Clear consent for specific purposes</li>
                    <li><strong>Contract Performance:</strong> Providing requested services</li>
                    <li><strong>Legitimate Interests:</strong> Service improvement and fraud prevention</li>
                    <li><strong>Legal Obligations:</strong> Compliance with legal requirements</li>
                  </ul>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-sharing" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">5. How We Share Your Information</h2>
                  
                  <div class="bg-green-50 border-l-4 border-green-600 p-4 mb-6 rounded-lg">
                    <p class="font-semibold text-green-900">We DO NOT Sell Your Personal Information</p>
                    <p class="text-green-800 text-sm mt-1">We never sell, rent, or trade your data to third parties for marketing purposes.</p>
                  </div>
  
                  <h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">Service Providers</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">We share information with trusted partners:</p>
                  <ul class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li><strong>Pesapal:</strong> Payment processing</li>
                    <li><strong>AI Providers:</strong> Cloud computing and document generation</li>
                    <li><strong>Human Proofreaders:</strong> Quality validation (bound by confidentiality)</li>
                    <li><strong>Analytics Services:</strong> Platform usage insights</li>
                  </ul>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-retention" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
                  <div class="space-y-4">
                    <div class="flex items-start">
                      <div class="bg-purple-100 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Active Users</p>
                        <p class="text-gray-600 text-sm">Data retained while account is active</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="bg-purple-100 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Inactive Accounts</p>
                        <p class="text-gray-600 text-sm">Retained for 3 years after last activity, then deleted</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="bg-purple-100 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Generated Documents</p>
                        <p class="text-gray-600 text-sm">Lifetime access to purchased documents</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-security" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">7. Data Security</h2>
                  <p class="text-gray-600 leading-relaxed mb-6">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  
                  <div class="grid md:grid-cols-3 gap-4 mb-6">
                    <div class="border border-gray-200 p-4 rounded-lg">
                      <div class="text-purple-600 mb-2">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <h4 class="font-semibold text-gray-900 mb-1">Encryption</h4>
                      <p class="text-gray-600 text-sm">SSL/TLS in transit, AES-256 at rest</p>
                    </div>
                    <div class="border border-gray-200 p-4 rounded-lg">
                      <div class="text-purple-600 mb-2">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <h4 class="font-semibold text-gray-900 mb-1">Access Controls</h4>
                      <p class="text-gray-600 text-sm">Role-based employee access limits</p>
                    </div>
                    <div class="border border-gray-200 p-4 rounded-lg">
                      <div class="text-purple-600 mb-2">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                        </svg>
                      </div>
                      <h4 class="font-semibold text-gray-900 mb-1">Secure Servers</h4>
                      <p class="text-gray-600 text-sm">Regular updates and backups</p>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-rights" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">8. Your Privacy Rights</h2>
                  <p class="text-gray-600 leading-relaxed mb-6">You have the following rights regarding your personal information:</p>
                  
                  <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="font-semibold text-gray-900 mb-2">✓ Right to Access & Portability</h4>
                      <p class="text-gray-600 text-sm">Request a copy of your personal data in a structured format</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="font-semibold text-gray-900 mb-2">✓ Right to Correction & Deletion</h4>
                      <p class="text-gray-600 text-sm">Correct inaccurate information or request data deletion</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="font-semibold text-gray-900 mb-2">✓ Right to Object & Restrict</h4>
                      <p class="text-gray-600 text-sm">Object to processing or restrict how we use your data</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="font-semibold text-gray-900 mb-2">✓ Right to Withdraw Consent</h4>
                      <p class="text-gray-600 text-sm">Withdraw consent at any time (doesn't affect prior processing)</p>
                    </div>
                  </div>
  
                  <div class="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6 rounded-lg">
                    <p class="font-semibold text-blue-900 mb-1">To Exercise Your Rights</p>
                    <p class="text-blue-800 text-sm">Contact us via email or phone. We will respond within 30 days.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-cookies" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">9. Cookies and Tracking</h2>
                  <p class="text-gray-600 leading-relaxed mb-4">We use cookies for:</p>
                  <ul class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                    <li><strong>Analytics Cookies:</strong> Understand user interactions</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings</li>
                  </ul>
                  <p class="text-gray-600 leading-relaxed">
                    You can configure your browser to block cookies, though this may affect functionality.
                  </p>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-ai" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">10. AI and Automated Decision-Making</h2>
                  
                  <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg mb-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">AI Usage</h3>
                    <p class="text-gray-600 leading-relaxed mb-4">We use artificial intelligence for:</p>
                    <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Resume analysis and review</li>
                      <li>Job matching algorithms</li>
                      <li>Document optimization and generation</li>
                      <li>ATS compatibility scoring</li>
                    </ul>
                  </div>
  
                  <div class="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
                    <p class="font-semibold text-yellow-900 mb-2">Human Oversight</p>
                    <p class="text-yellow-800 text-sm">All AI-generated content undergoes human proofreading and validation. You can request human review of any AI decisions.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="privacy-contact" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
                  <div class="bg-white p-8 rounded-xl">
                    <h3 class="text-2xl font-bold mb-4">Get in Touch</h3>
                    <p class="mb-4">For questions, concerns, or to exercise your privacy rights:</p>
                    <div class="space-y-2">
                      <p><strong>Website:</strong> https://cvmama.co.ke</p>
                      <p><strong>Location:</strong> Kenya</p>
                    </div>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Terms of Service Content -->
              <div class="prose max-w-none">
                <div class="mb-8">
                  <h1 class="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                  <p class="text-gray-500">Last Updated: October 16, 2025</p>
                </div>
  
                <div id="terms-agreement" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Welcome to CV Mama Career Services. These Terms of Service ("Terms") constitute a legally binding agreement between you and CV Mama Career Services regarding your use of our website at cvmama.co.ke and our AI-powered job application optimization services.
                  </p>
                  <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                    <p class="font-semibold text-red-900">Important Notice</p>
                    <p class="text-red-800 text-sm mt-1">BY ACCESSING OR USING OUR PLATFORM, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE OUR SERVICES.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-eligibility" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility</h2>
                  <div class="grid md:grid-cols-3 gap-4">
                    <div class="bg-purple-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-purple-600 mb-2">18+</div>
                      <p class="text-gray-700 text-sm">Minimum age requirement</p>
                    </div>
                    <div class="bg-indigo-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-indigo-600 mb-2">✓</div>
                      <p class="text-gray-700 text-sm">Legal capacity to contract</p>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                      <div class="text-3xl font-bold text-blue-600 mb-2">🌍</div>
                      <p class="text-gray-700 text-sm">Comply with local laws</p>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-account" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">3. Account Security</h2>
                  <p class="text-gray-600 leading-relaxed mb-4">You are responsible for:</p>
                  <ul class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4">
                    <li>Maintaining confidentiality of account credentials</li>
                    <li>All activities under your account</li>
                    <li>Notifying us of unauthorized access</li>
                    <li>Keeping information accurate and up-to-date</li>
                  </ul>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-services" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">4. Our Services</h2>
                  
                  <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <div class="border-2 border-purple-200 p-6 rounded-xl">
                      <div class="text-purple-600 mb-3">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold text-gray-900 mb-2">Resume Analysis</h3>
                      <p class="text-gray-600 text-sm">AI-powered analysis, ATS scoring, and improvement suggestions</p>
                    </div>
                    
                    <div class="border-2 border-indigo-200 p-6 rounded-xl">
                      <div class="text-indigo-600 mb-3">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold text-gray-900 mb-2">Document Generation</h3>
                      <p class="text-gray-600 text-sm">Tailored resumes and cover letters in multiple formats</p>
                    </div>
                    
                    <div class="border-2 border-blue-200 p-6 rounded-xl">
                      <div class="text-blue-600 mb-3">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold text-gray-900 mb-2">Job Matching</h3>
                      <p class="text-gray-600 text-sm">Automated job discovery from multiple platforms</p>
                    </div>
                    
                    <div class="border-2 border-green-200 p-6 rounded-xl">
                      <div class="text-green-600 mb-3">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold text-gray-900 mb-2">Human Validation</h3>
                      <p class="text-gray-600 text-sm">Professional proofreading and quality assurance</p>
                    </div>
                  </div>
  
                  <div class="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
                    <p class="font-semibold text-yellow-900 mb-2">Service Limitations</p>
                    <p class="text-yellow-800 text-sm">We do NOT guarantee job placement, interviews, specific salaries, or employer responses. We provide optimization tools—your success depends on multiple factors beyond our control.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-conduct" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">5. User Conduct</h2>
                  
                  <div class="mb-6">
                    <h3 class="text-xl font-semibold text-green-700 mb-3">✓ Acceptable Use</h3>
                    <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Provide accurate, truthful information</li>
                      <li>Use services for legitimate job-seeking</li>
                      <li>Respect intellectual property rights</li>
                      <li>Comply with all applicable laws</li>
                    </ul>
                  </div>
  
                  <div class="bg-red-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold text-red-700 mb-3">✗ Prohibited Activities</h3>
                    <div class="grid md:grid-cols-2 gap-4">
                      <ul class="list-disc list-inside text-red-700 space-y-2 text-sm">
                        <li>Provide false information</li>
                        <li>Impersonate others</li>
                        <li>Upload illegal content</li>
                        <li>Spam employers</li>
                        <li>Circumvent payments</li>
                      </ul>
                      <ul class="list-disc list-inside text-red-700 space-y-2 text-sm">
                        <li>Reverse engineer platform</li>
                        <li>Share account access</li>
                        <li>Create multiple accounts</li>
                        <li>Use automated bots</li>
                        <li>Resell our services</li>
                      </ul>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-ip" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
                  
                  <div class="space-y-6">
                    <div class="bg-purple-50 p-6 rounded-lg">
                      <h3 class="text-lg font-semibold text-purple-900 mb-2">Our Property</h3>
                      <p class="text-purple-800 text-sm">All platform content, AI algorithms, templates, and branding are owned by CV Mama and protected by intellectual property laws.</p>
                    </div>
  
                    <div class="bg-blue-50 p-6 rounded-lg">
                      <h3 class="text-lg font-semibold text-blue-900 mb-2">Your Content</h3>
                      <p class="text-blue-800 text-sm mb-2">You retain ownership of your original content. By uploading, you grant us license to use it to provide services.</p>
                    </div>
  
                    <div class="bg-green-50 p-6 rounded-lg">
                      <h3 class="text-lg font-semibold text-green-900 mb-2">Generated Documents</h3>
                      <p class="text-green-800 text-sm">You own the documents you purchase with full rights to use, modify, and distribute with lifetime access.</p>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-payment" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">7. Payment Terms</h2>
                  
                  <div class="bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-xl mb-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Pricing Structure</h3>
                    <div class="grid md:grid-cols-2 gap-6">
                      <div class="bg-white p-6 rounded-lg shadow-sm">
                        <div class="text-green-600 font-bold text-lg mb-2">FREE TIER</div>
                        <ul class="text-gray-600 text-sm space-y-2">
                          <li>✓ Resume upload & preview</li>
                          <li>✓ AI analysis</li>
                          <li>✓ Sample improvements</li>
                          <li>✓ Limited job matches</li>
                        </ul>
                      </div>
                      <div class="bg-white p-6 rounded-lg shadow-sm border-2 border-purple-300">
                        <div class="text-purple-600 font-bold text-lg mb-2">PAID SERVICE</div>
                        <div class="text-3xl font-bold text-gray-900 mb-1">
                          <span class="text-lg line-through text-gray-400">KES XXX</span> 50% OFF
                        </div>
                        <p class="text-sm text-gray-600 mb-3">Per perfect match</p>
                        <ul class="text-gray-600 text-sm space-y-2">
                          <li>✓ ATS-optimized resume</li>
                          <li>✓ Personalized cover letter</li>
                          <li>✓ Multiple formats (PDF, Word)</li>
                          <li>✓ Lifetime access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
  
                  <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Payment Processing</h3>
                    <ul class="text-gray-600 space-y-2">
                      <li><strong>Provider:</strong> Pesapal (secure third-party processor)</li>
                      <li><strong>Methods:</strong> Credit/debit cards, mobile money</li>
                      <li><strong>Currency:</strong> Kenyan Shillings (KES)</li>
                      <li><strong>Billing:</strong> No subscriptions or hidden fees</li>
                    </ul>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-refund" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">8. 30-Day Money-Back Guarantee</h2>
                  
                  <div class="bg-green-50 border-2 border-green-300 p-6 rounded-xl mb-6">
                    <div class="flex items-start">
                      <div class="text-green-600 mr-4">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 class="text-xl font-semibold text-green-900 mb-2">Full Refund Available If:</h3>
                        <ul class="text-green-800 space-y-1 text-sm">
                          <li>• Documents don't meet quality standards</li>
                          <li>• Documents contain factual errors after validation</li>
                          <li>• Technical issues prevent delivery</li>
                          <li>• You're dissatisfied for any reason</li>
                        </ul>
                      </div>
                    </div>
                  </div>
  
                  <div class="bg-red-50 p-6 rounded-lg">
                    <h3 class="text-lg font-semibold text-red-900 mb-2">Refund Exclusions</h3>
                    <p class="text-red-800 text-sm">No refunds if you've used documents to apply, after 30 days, or if you violated Terms.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-ai" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">9. AI Technology</h2>
                  
                  <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">How We Use AI</h3>
                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="flex items-start">
                        <span class="text-purple-600 mr-2">→</span>
                        <p class="text-gray-700 text-sm">Resume analysis and optimization</p>
                      </div>
                      <div class="flex items-start">
                        <span class="text-purple-600 mr-2">→</span>
                        <p class="text-gray-700 text-sm">Job matching algorithms</p>
                      </div>
                      <div class="flex items-start">
                        <span class="text-purple-600 mr-2">→</span>
                        <p class="text-gray-700 text-sm">Document generation</p>
                      </div>
                      <div class="flex items-start">
                        <span class="text-purple-600 mr-2">→</span>
                        <p class="text-gray-700 text-sm">ATS compatibility scoring</p>
                      </div>
                    </div>
                  </div>
  
                  <div class="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-lg mb-4">
                    <p class="font-semibold text-orange-900 mb-2">AI Limitations</p>
                    <p class="text-orange-800 text-sm">AI is not perfect and may make errors. All content undergoes human proofreading, but you must review documents before use and verify accuracy.</p>
                  </div>
  
                  <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="font-semibold text-blue-900 mb-2">Your Responsibility</p>
                    <p class="text-blue-800 text-sm">You must verify all information in generated documents represents your qualifications accurately. We are not liable for misrepresentations if you provided inaccurate content.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-disclaimers" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">10. Disclaimers & Warranties</h2>
                  
                  <div class="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
                    <p class="text-gray-700 font-semibold mb-4">SERVICES PROVIDED "AS IS"</p>
                    <p class="text-gray-600 text-sm mb-4">We provide our services without warranties of any kind. We do NOT guarantee:</p>
                    <div class="grid md:grid-cols-2 gap-3">
                      <div class="bg-white p-3 rounded">
                        <p class="text-gray-700 text-sm">✗ Job offers or employment</p>
                      </div>
                      <div class="bg-white p-3 rounded">
                        <p class="text-gray-700 text-sm">✗ Employer responses</p>
                      </div>
                      <div class="bg-white p-3 rounded">
                        <p class="text-gray-700 text-sm">✗ Interview invitations</p>
                      </div>
                      <div class="bg-white p-3 rounded">
                        <p class="text-gray-700 text-sm">✗ Specific salary outcomes</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-liability" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">11. Limitation of Liability</h2>
                  
                  <div class="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
                    <h3 class="text-xl font-semibold text-red-900 mb-3">Liability Cap</h3>
                    <p class="text-red-800 mb-4">CV Mama's total liability shall not exceed the amount you paid in the 6 months preceding the claim, or KES 10,000, whichever is less.</p>
                    
                    <h3 class="text-lg font-semibold text-red-900 mb-2">We Are NOT Liable For:</h3>
                    <ul class="text-red-800 space-y-1 text-sm">
                      <li>• Lost profits or business opportunities</li>
                      <li>• Failure to secure employment</li>
                      <li>• Damage to professional reputation</li>
                      <li>• Missed job opportunities</li>
                      <li>• Indirect or consequential damages</li>
                    </ul>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div id="terms-disputes" class="mb-12 scroll-mt-24">
                  <h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">12. Dispute Resolution</h2>
                  
                  <div class="space-y-4">
                    <div class="flex items-start">
                      <div class="bg-purple-100 rounded-full p-2 mr-4 flex-shrink-0">
                        <span class="text-purple-600 font-bold">1</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900">Informal Resolution</h4>
                        <p class="text-gray-600 text-sm">Contact us first to seek amicable resolution within 30 days</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="bg-purple-100 rounded-full p-2 mr-4 flex-shrink-0">
                        <span class="text-purple-600 font-bold">2</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900">Governing Law</h4>
                        <p class="text-gray-600 text-sm">Terms governed by laws of Kenya</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="bg-purple-100 rounded-full p-2 mr-4 flex-shrink-0">
                        <span class="text-purple-600 font-bold">3</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900">Jurisdiction</h4>
                        <p class="text-gray-600 text-sm">Legal actions brought exclusively in Kenyan courts</p>
                      </div>
                    </div>
                  </div>
  
                  <div class="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-6 rounded-lg">
                    <p class="font-semibold text-yellow-900">Time Limitation</p>
                    <p class="text-yellow-800 text-sm">Claims must be filed within 1 year after cause of action arises.</p>
                  </div>
                </div>
  
                <div class="border-t-2 border-gray-200 my-8"></div>
  
                <div class="bg-white  p-8 rounded-xl">
                  <h2 class="text-3xl font-bold mb-4">Questions About Terms?</h2>
                  <p class="mb-6">Contact CV Mama Career Services for clarification or concerns.</p>
                  <div class="space-y-2">
                    <p><strong>Website:</strong> https://cvmama.co.ke</p>
                    <p><strong>Location:</strong> Kenya</p>
                  </div>
                </div>
              </div>
            {/if}
          </main>
        </div>
      </div>
    </div>
  
    <!-- Footer -->
    <Footer />
  </div>
  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
    
    .scroll-mt-24 {
      scroll-margin-top: 6rem;
    }
  </style>