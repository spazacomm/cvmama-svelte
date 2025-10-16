<script>
    import Header from '$lib/components/Header.svelte';
import { onMount } from 'svelte';
    
    let activeCategory = 'getting-started';
    let searchQuery = '';
    let expandedFAQ = null;
    let formData = {
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    };
    let formSubmitted = false;
    let formError = false;
    
    const categories = [
      { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
      { id: 'account', label: 'Account & Billing', icon: '💳' },
      { id: 'services', label: 'Our Services', icon: '⚙️' },
      { id: 'technical', label: 'Technical Issues', icon: '🔧' },
      { id: 'privacy', label: 'Privacy & Security', icon: '🔒' }
    ];
    
    const faqs = {
      'getting-started': [
        {
          q: 'How do I get started with CV Mama?',
          a: 'Getting started is easy! Simply upload your current resume (PDF, DOC, or DOCX up to 5MB) on our homepage. Our AI will instantly analyze it and show you a preview of improvements. You can then browse job matches and purchase optimized documents for opportunities that interest you.'
        },
        {
          q: 'What file formats do you accept?',
          a: 'We accept PDF, DOC, and DOCX files up to 5MB in size. These are the most common resume formats and ensure our AI can properly parse and analyze your information.'
        },
        {
          q: 'How long does the process take?',
          a: 'Initial analysis is instant! Once you purchase a match, our AI generates your tailored documents within minutes. Human proofreaders then validate the content, and you typically receive your final documents within 2-4 hours.'
        },
        {
          q: 'Do I need to create an account?',
          a: 'Yes, creating an account allows you to save your profile, access purchased documents anytime, receive job match notifications, and track your application history.'
        }
      ],
      'account': [
        {
          q: 'How much does CV Mama cost?',
          a: 'We offer a free tier that includes resume upload, AI analysis, and job match previews. Our paid service is per perfect match (currently 50% off launch price) and includes an ATS-optimized resume, personalized cover letter, multiple formats, and lifetime access. No subscriptions or hidden fees!'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major payment methods through our secure payment provider Pesapal, including credit/debit cards and mobile money (M-Pesa, Airtel Money). All payments are processed in Kenyan Shillings (KES).'
        },
        {
          q: 'What is your refund policy?',
          a: 'We offer a 30-day money-back guarantee. If you\'re unsatisfied with your documents for any reason, or if there are quality issues, contact us within 30 days for a full refund. Refunds are not available if you\'ve already used the documents extensively or after 30 days.'
        },
        {
          q: 'How do I update my account information?',
          a: 'Log into your account and navigate to Settings. There you can update your personal information, contact details, career preferences, and notification settings.'
        },
        {
          q: 'Can I get a receipt for my purchase?',
          a: 'Yes! Receipts are automatically sent to your email after each purchase and are also available in your account dashboard under "Order History".'
        }
      ],
      'services': [
        {
          q: 'How does the AI job matching work?',
          a: 'Our AI agents periodically scrape job sites (LinkedIn, Indeed, Glassdoor, company career pages) and freelance platforms (Upwork, Fiverr) to find opportunities matching your skills, experience, and preferences. You receive notifications when relevant matches are found.'
        },
        {
          q: 'What makes your resumes ATS-optimized?',
          a: 'ATS (Applicant Tracking System) optimization means your resume is formatted and structured to pass through automated screening systems used by employers. We use clean formatting, proper keyword placement, standard section headers, and compatible file formats.'
        },
        {
          q: 'Do humans review the AI-generated documents?',
          a: 'Yes! All AI-generated content undergoes human proofreading and validation by professional editors. This ensures accuracy, proper grammar, and that your documents effectively represent your qualifications.'
        },
        {
          q: 'Can I request revisions?',
          a: 'Yes! If you notice any inaccuracies or want adjustments to your documents, contact our support team. We\'ll work with you to ensure your documents meet your expectations.'
        },
        {
          q: 'How many jobs will you match me with?',
          a: 'The number of matches depends on your profile and available opportunities. Our AI continuously searches for relevant positions and notifies you as they become available. You only pay for matches you choose to pursue.'
        },
        {
          q: 'Do you guarantee I\'ll get a job?',
          a: 'No, we cannot guarantee job placement as hiring decisions are made by employers. However, we significantly improve your chances by providing professional, tailored application materials that stand out to recruiters and pass ATS screening.'
        }
      ],
      'technical': [
        {
          q: 'Why won\'t my resume upload?',
          a: 'Common reasons include: file size exceeds 5MB, unsupported file format (only PDF, DOC, DOCX accepted), corrupted file, or browser issues. Try compressing your file, converting to a supported format, or using a different browser.'
        },
        {
          q: 'I\'m not receiving email notifications',
          a: 'Check your spam/junk folder first. Add notifications@cvmama.co.ke to your contacts. Also verify your email address in account settings and check that notifications are enabled in your preferences.'
        },
        {
          q: 'The website is loading slowly',
          a: 'This could be due to internet connection issues, browser cache, or high traffic. Try clearing your browser cache, using a different browser, or checking your internet connection. If problems persist, contact support.'
        },
        {
          q: 'I can\'t download my documents',
          a: 'Ensure you\'re logged in and have purchased the documents. Check your browser\'s download settings and popup blocker. Try a different browser or device. If issues continue, contact support for direct delivery.'
        },
        {
          q: 'My payment failed',
          a: 'Payment failures can occur due to insufficient funds, bank restrictions, incorrect card details, or technical issues. Verify your payment information and try again. If problems persist, contact Pesapal support or try an alternative payment method.'
        }
      ],
      'privacy': [
        {
          q: 'Is my personal information secure?',
          a: 'Yes! We use industry-standard encryption (SSL/TLS for transmission, AES-256 for storage), secure servers, access controls, and regular security audits. We never sell your personal information to third parties.'
        },
        {
          q: 'Who can see my resume?',
          a: 'Your resume is only accessible to you and our authorized team members (AI processors and human proofreaders bound by confidentiality). We never share your documents with employers or third parties without your explicit permission.'
        },
        {
          q: 'How do you use my data?',
          a: 'We use your data to provide our services: analyzing resumes, matching jobs, generating documents, and improving our AI. See our Privacy Policy for complete details on data collection and usage.'
        },
        {
          q: 'Can I delete my account and data?',
          a: 'Yes! You can request account deletion at any time. We\'ll delete your personal information within 30 days, except for data we\'re legally required to retain (payment records for tax purposes). Purchased documents remain accessible until deletion.'
        },
        {
          q: 'Do you track my job applications?',
          a: 'We only track matches we provide and whether you downloaded the documents. We don\'t track external applications unless you choose to share that information with us for success stories or feedback.'
        }
      ]
    };
    
    function toggleFAQ(index) {
      expandedFAQ = expandedFAQ === index ? null : index;
    }
    
    function handleSubmit() {
      if (!formData.name || !formData.email || !formData.message) {
        formError = true;
        return;
      }
      
      // Simulate form submission
      formSubmitted = true;
      formError = false;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        formSubmitted = false;
        formData = {
          name: '',
          email: '',
          subject: '',
          message: '',
          category: 'general'
        };
      }, 3000);
    }
    
    function filterFAQs(category) {
      if (!searchQuery) return faqs[category];
      
      return faqs[category].filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  </script>
  
  <svelte:head>
    <title>Help Center - CV Mama</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </svelte:head>
  
  <div class="min-h-screen bg-gray-50" style="font-family: 'Plus Jakarta Sans', sans-serif;">
    <!-- Header -->
    <Header />
    <header class="bg-[#6BB4C9] text-white py-16 mb-5">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-4">How Can We Help You?</h1>
          <p class="text-xl text-purple-100 mb-8">Search our knowledge base or get in touch with our support team</p>
          
          <!-- Search Bar -->
          <div class="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              bind:value={searchQuery}
              placeholder="Search for answers..."
              class="w-full px-6 py-4 pl-14 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-xl mx-3"
            />
           
          </div>
        </div>
      </div>
    </header>
  
    <!-- Quick Links -->
    <div class="container mx-auto px-4 -mt-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-4">
          <a href="#faq" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📚</div>
            <h3 class="font-semibold text-gray-900">Knowledge Base</h3>
            <p class="text-sm text-gray-600 mt-1">Browse FAQs</p>
          </a>
          
          <a href="#contact" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
            <h3 class="font-semibold text-gray-900">Contact Support</h3>
            <p class="text-sm text-gray-600 mt-1">Send us a message</p>
          </a>
          
          <a href="https://cvmama.co.ke" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🏠</div>
            <h3 class="font-semibold text-gray-900">Back to Home</h3>
            <p class="text-sm text-gray-600 mt-1">Return to main site</p>
          </a>
          
          <a href="/legal" class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📄</div>
            <h3 class="font-semibold text-gray-900">Legal Docs</h3>
            <p class="text-sm text-gray-600 mt-1">Terms & Privacy</p>
          </a>
        </div>
      </div>
    </div>
  
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-6xl mx-auto">
        
        <!-- FAQ Section -->
        <section id="faq" class="mb-5">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p class="text-xl text-gray-600">Find quick answers to common questions</p>
          </div>
  
          <!-- Category Tabs -->
          <div class="flex flex-wrap justify-center gap-3 mb-8">
            {#each categories as category}
              <button
                on:click={() => { activeCategory = category.id; expandedFAQ = null; }}
                class="px-6 py-3 rounded-lg font-semibold transition-all {activeCategory === category.id ? 'bg-[#F28C7A] text-white shadow-lg scale-105' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}"
              >
                <span class="mr-2">{category.icon}</span>
                {category.label}
              </button>
            {/each}
          </div>
  
          <!-- FAQ List -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            {#if filterFAQs(activeCategory).length === 0}
              <div class="text-center py-12">
                <div class="text-6xl mb-4">🔍</div>
                <p class="text-xl text-gray-600">No results found for "{searchQuery}"</p>
                <p class="text-gray-500 mt-2">Try a different search term or browse categories</p>
              </div>
            {:else}
              <div class="space-y-4">
                {#each filterFAQs(activeCategory) as faq, index}
                  <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      on:click={() => toggleFAQ(`${activeCategory}-${index}`)}
                      class="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span class="font-semibold text-gray-900 text-left">{faq.q}</span>
                      <svg 
                        class="w-6 h-6 text-purple-600 transform transition-transform {expandedFAQ === `${activeCategory}-${index}` ? 'rotate-180' : ''}"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {#if expandedFAQ === `${activeCategory}-${index}`}
                      <div class="px-6 py-4 bg-white border-t border-gray-200">
                        <p class="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </section>
  
        <!-- Contact Section -->
        <section id="contact" class="mt-5 mb-5">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4 mt-3">Still Need Help?</h2>
            <p class="text-xl text-gray-600">Our support team is here to assist you</p>
          </div>
  
          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Contact Form -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              {#if formSubmitted}
                <div class="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                  <div class="text-green-600 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 class="text-xl font-bold text-green-900 mb-2">Message Sent!</h4>
                  <p class="text-green-800">We'll get back to you within 24 hours.</p>
                </div>
              {:else}
                <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name"
                      bind:value={formData.name}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
  
                  <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email"
                      bind:value={formData.email}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
  
                  <div>
                    <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select 
                      id="category"
                      bind:value={formData.category}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
  
                  <div>
                    <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      bind:value={formData.subject}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="How can we help?"
                    />
                  </div>
  
                  <div>
                    <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea 
                      id="message"
                      bind:value={formData.message}
                      rows="5"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell us more about your question or issue..."
                      required
                    ></textarea>
                  </div>
  
                  {#if formError}
                    <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                      <p class="text-red-800 text-sm">Please fill in all required fields.</p>
                    </div>
                  {/if}
  
                  <button 
                    type="submit"
                    class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
                  >
                    Send Message
                  </button>
                </form>
              {/if}
            </div>
  
            <!-- Contact Information -->
            <div class="space-y-6">
              <!-- Contact Cards -->
              <div class="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
                <h3 class="text-2xl font-bold mb-6">Get in Touch</h3>
                
                <div class="space-y-6">
                  <div class="flex items-start">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold mb-1">Email Support</p>
                      <a href="mailto:support@cvmama.co.ke" class="text-purple-100 hover:text-white">support@cvmama.co.ke</a>
                      <p class="text-sm text-purple-200 mt-1">Response time: Within 24 hours</p>
                    </div>
                  </div>
  
                  <div class="flex items-start">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold mb-1">Phone Support</p>
                      <a href="tel:+254700000000" class="text-purple-100 hover:text-white">+254 782 564 066</a>
                      <p class="text-sm text-purple-200 mt-1">Mon-Fri: 9AM - 6PM EAT</p>
                    </div>
                  </div>
  
                  <div class="flex items-start">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold mb-1">Office Location</p>
                      <p class="text-purple-100">Nairobi, Kenya</p>
                      <p class="text-sm text-purple-200 mt-1">Visit by appointment</p>
                    </div>
                  </div>
  
                  <div class="flex items-start">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold mb-1">Business Hours</p>
                      <p class="text-purple-100">Monday - Friday</p>
                      <p class="text-sm text-purple-200 mt-1">9:00 AM - 6:00 PM EAT</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Response Time Card -->
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h4 class="font-bold text-gray-900 mb-4">Average Response Times</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Email Support</span>
                    <span class="font-semibold text-purple-600">24 hours</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Phone Support</span>
                    <span class="font-semibold text-purple-600">Immediate</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Technical Issues</span>
                    <span class="font-semibold text-purple-600">48 hours</span>
                  </div>
                </div>
              </div>
  
              <!-- Social Media -->
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h4 class="font-bold text-gray-900 mb-4">Follow Us</h4>
                <div class="flex gap-4">
                  <a href="#" class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" class="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" class="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" class="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Additional Resources -->
        <section class="mb-5 mt-5">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p class="text-xl text-gray-600">More ways to get the most out of CV Mama</p>
          </div>
  
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">User Guide</h3>
              <p class="text-gray-600 mb-4">Comprehensive documentation on using CV Mama effectively</p>
              <a href="#" class="text-purple-600 font-semibold hover:text-purple-700">Read Guide →</a>
            </div>
  
            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Video Tutorials</h3>
              <p class="text-gray-600 mb-4">Step-by-step video guides for all features</p>
              <a href="#" class="text-purple-600 font-semibold hover:text-purple-700">Watch Videos →</a>
            </div>
  
            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Career Tips</h3>
              <p class="text-gray-600 mb-4">Expert advice on job hunting and career growth</p>
              <a href="#" class="text-purple-600 font-semibold hover:text-purple-700">Read Tips →</a>
            </div>
          </div>
        </section>
  
        
      </div>
    </div>
  
    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-white font-bold text-lg mb-4">CV Mama</h3>
              <p class="text-sm text-gray-400">AI-powered career services helping professionals land their dream jobs.</p>
            </div>
            
            <div>
              <h4 class="text-white font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
                <li><a href="/contact" class="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/terms" class="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-white font-semibold mb-4">Services</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/" class="hover:text-white transition-colors">Resume Analysis</a></li>
                <li><a href="/matching" class="hover:text-white transition-colors">Job Matching</a></li>
                <li><a href="/" class="hover:text-white transition-colors">Document Generation</a></li>
                <li><a href="/insights" class="hover:text-white transition-colors">Career Insights</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-white font-semibold mb-4">Support</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="mailto:support@cvmama.co.ke" class="hover:text-white transition-colors">support@cvmama.co.ke</a></li>
                <li><a href="tel:+254700000000" class="hover:text-white transition-colors">+254 782 564 066</a></li>
                <li class="text-gray-400">Mon-Fri: 9AM - 6PM EAT</li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-gray-400 mb-4 md:mb-0">© 2025 CV Mama Career Services. All rights reserved.</p>
            <div class="flex gap-6 text-sm">
              <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" class="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  </style>