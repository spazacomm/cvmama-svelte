<script>
    import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
import { onMount } from 'svelte';
    
    let scrollY = 0;
    let activeReport = 0;
    let emailModal = false;
    let selectedReport = null;
  
    onMount(() => {
      const handleScroll = () => {
        scrollY = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
  
    const whyInsights = [
      {
        icon: 'trending-up',
        title: "Real-time Job Market Data",
        description: "Know which skills are in demand right now and position yourself ahead of the competition."
      },
      {
        icon: 'dollar-sign',
        title: "AI-Driven Salary Insights",
        description: "Benchmark your value in the market with comprehensive salary data across industries."
      },
      {
        icon: 'bar-chart',
        title: "Industry Growth Forecasts",
        description: "See where opportunities are heading and align your career with high-growth sectors."
      },
      {
        icon: 'building',
        title: "Company Hiring Patterns",
        description: "Understand when and where to apply with data-driven hiring trend analysis."
      }
    ];
  
    const featuredReports = [
      {
        title: "Top Tech Hiring Trends 2025",
        tag: "Premium",
        insight: "AI/ML roles up 340% — remote options dominate East Africa",
        price: 250
      },
      {
        title: "Kenya Salary Benchmarks 2025",
        tag: "Premium",
        insight: "Complete salary ranges across 50+ roles and industries",
        price: 250
      },
      {
        title: "Emerging Skills Report",
        tag: "Free",
        insight: "10 skills that will define career success in 2025",
        price: 0
      },
      {
        title: "Remote Work in Africa",
        tag: "Free",
        insight: "How remote-first companies are reshaping the job market",
        price: 0
      }
    ];
  
    const freeReports = [
      {
        title: "Kenya Job Market Overview 2025",
        description: "Comprehensive analysis of hiring trends, top industries, and emerging opportunities.",
        downloads: "2.4k"
      },
      {
        title: "Top Emerging Skills in Finance & Tech",
        description: "Data-driven insights into the most valuable skills employers are seeking.",
        downloads: "1.8k"
      },
      {
        title: "Remote Work Trends in Africa",
        description: "How remote work is transforming career opportunities across the continent.",
        downloads: "3.1k"
      }
    ];
  
    const premiumReports = [
      {
        title: "Complete Salary Benchmarking Report",
        description: "Detailed salary data across 50+ roles, 15+ industries, with experience-based breakdowns.",
        price: 250,
        features: ["50+ job roles analyzed", "Industry comparisons", "Experience-based ranges", "Quarterly updates"]
      },
      {
        title: "AI-Driven Career Path Predictions",
        description: "Personalized career trajectory analysis with growth potential and skill gap identification.",
        price: 350,
        features: ["Personalized analysis", "5-year projections", "Skill recommendations", "Market demand data"]
      },
      {
        title: "Executive Hiring Intelligence",
        description: "Premium insights into C-suite hiring patterns, compensation packages, and market dynamics.",
        price: 500,
        features: ["Executive-level data", "Compensation packages", "Hiring timeline analysis", "Exclusive insights"]
      }
    ];
  
    const testimonials = [
      {
        name: "Sarah Kimani",
        role: "Software Engineer",
        quote: "I used CV Mama Insights to discover fast-growing roles — landed my new job in 3 weeks!",
        avatar: "SK"
      },
      {
        name: "Michael Odhiambo",
        role: "Financial Analyst",
        quote: "The salary benchmarking report gave me the confidence to negotiate a 35% raise.",
        avatar: "MO"
      },
      {
        name: "Grace Wanjiru",
        role: "Marketing Manager",
        quote: "These insights helped me pivot into a high-growth sector. Best career investment I've made.",
        avatar: "GW"
      }
    ];
  
    function handleDownload(report) {
      selectedReport = report;
      emailModal = true;
    }
  
    function closeModal() {
      emailModal = false;
      selectedReport = null;
    }
  </script>
  
  <svelte:head>
    <title>CV Mama Insights - Turn Career Data Into Your Competitive Edge</title>
  </svelte:head>
  
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

    <Header/>
    
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-20 pb-32 px-4 ">
      <div class="absolute inset-0 bg-[#F28C7A]"></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <div class="max-w-6xl mx-auto relative z-10 text-center  ">
        <!-- <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
          <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          AI-Powered Career Intelligence
        </div> -->
        
        <h1 class="text-3xl md:text-7xl font-bold text-white mt-3  mb-6 leading-tight">
          Turn career data into your<br/>
          <span class="text-white">
            competitive edge
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          AI-driven industry and career trend reports helping you make smarter job moves, negotiate better, and stay ahead in your career.
        </p>
        
        
      </div>
    </section>
  
    <!-- Why Insights Matter -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Insights Matter</h2>
          <p class="text-xl text-slate-600">Data-driven intelligence for career success</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each whyInsights as insight, i}
            <div class="group bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100"
                 style="animation: fadeInUp 0.6s ease-out {i * 0.1}s backwards;">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-white">
                {#if insight.icon === 'trending-up'}
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                {:else if insight.icon === 'dollar-sign'}
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                {:else if insight.icon === 'bar-chart'}
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                {:else}
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                {/if}
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">{insight.title}</h3>
              <p class="text-slate-600 leading-relaxed">{insight.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- Featured Reports Carousel -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Featured Reports</h2>
          <p class="text-xl text-slate-300">Curated insights to accelerate your career</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each featuredReports as report}
            <div class="bg-[#F28C7A] border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 group">
              <div class="flex justify-between items-start mb-4">
                <span class="text-xs font-bold px-3 py-1 rounded-full {report.tag === 'Premium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900' : 'bg-green-500 text-white'}">
                  {report.tag}
                </span>
                {#if report.tag === 'Premium'}
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                {/if}
              </div>
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{report.title}</h3>
              <p class="text-slate-400 text-sm mb-6 leading-relaxed">{report.insight}</p>
              <button class="w-full bg-[#6BB4C9] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                {report.tag === 'Premium' ? `Unlock` : 'Download Free'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- Free Reports Section -->
    <section id="free-reports" class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            100% Free Access
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Free Career Reports</h2>
          <p class="text-xl text-slate-600">Start making data-driven career decisions today</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          {#each freeReports as report}
            <div class="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-3">{report.title}</h3>
              <p class="text-slate-600 mb-6 leading-relaxed">{report.description}</p>
              <div class="flex items-center justify-between mb-6">
                <span class="text-sm text-slate-500 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  {report.downloads} downloads
                </span>
              </div>
              <button on:click={() => handleDownload(report)} class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download Now
              </button>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- Premium Insights Section -->
    <section id="premium" class="py-20 px-4 bg-[#6BB4C9]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            Premium Intelligence
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Unlock Premium Insights</h2>
          <p class="text-xl text-slate-300">Exclusive data-heavy reports for serious career advancement</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          {#each premiumReports as report}
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-6">
                  <div class="w-12 h-12 bg-[#F28C7A] rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <!-- <span class="text-2xl font-bold text-[#F28C7A]">KES {report.price}</span> -->
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{report.title}</h3>
                <p class="text-slate-400 mb-6 leading-relaxed">{report.description}</p>
                
                <div class="space-y-3 mb-8">
                  {#each report.features as feature}
                    <div class="flex items-center gap-3 text-slate-300">
                      <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-sm">{feature}</span>
                    </div>
                  {/each}
                </div>
                
                <button class="w-full bg-[#F28C7A] text-slate-900 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Unlock Report
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- Testimonials -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What Professionals Say</h2>
          <p class="text-xl text-slate-600">Real results from real career changers</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          {#each testimonials as testimonial}
            <div class="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 class="font-bold text-slate-900">{testimonial.name}</h4>
                  <p class="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
              <p class="text-slate-700 italic leading-relaxed">"{testimonial.quote}"</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- CTA Banner -->
    <section class="py-24 px-4 bg-gradient-to-r from-[#F28C7A] via-[#F28C7A] to-[#F28C7A] relative overflow-hidden ">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10 mt-5">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to stay ahead in your career?
        </h2>
        <p class="text-xl text-white/90 mb-10">
          Access exclusive reports and unlock data-driven growth opportunities today.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-5">
          <a href="#free-reports" class="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
            View Free Reports
          </a>
          <a href="#premium" class="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
            Upgrade to Premium
          </a>
        </div>
      </div>
    </section>
  
    <!-- Footer -->
    <Footer />
    <!-- <footer class="bg-slate-900 text-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-2">
            <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CV Mama Insights
            </h3>
            <p class="text-slate-400 mb-6 leading-relaxed">
              AI-driven career intelligence platform helping professionals make data-backed decisions for career success.
            </p>
            <div class="flex gap-4">
              <a href="https://cvmama.co.ke" class="text-slate-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-slate-400">
              <li><a href="https://cvmama.co.ke/about" class="hover:text-white transition-colors">About</a></li>
              <li><a href="https://cvmama.co.ke/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="https://cvmama.co.ke/terms" class="hover:text-white transition-colors">Terms</a></li>
              <li><a href="https://cvmama.co.ke/contact" class="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Newsletter</h4>
            <p class="text-slate-400 text-sm mb-4">Get career insights delivered to your inbox</p>
            <form class="flex gap-2">
              <input type="email" placeholder="Your email" class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
              <button type="submit" class="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div class="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2025 CV Mama. All rights reserved. | Powered by AI-driven career intelligence</p>
        </div>
      </div>
    </footer> -->
  
    <!-- Email Modal -->
    {#if emailModal}
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" on:click={closeModal}>
        <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-scaleIn" on:click|stopPropagation>
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-2xl font-bold text-slate-900 mb-2">Download Report</h3>
              <p class="text-slate-600 text-sm">{selectedReport?.title}</p>
            </div>
            <button on:click={closeModal} class="text-slate-400 hover:text-slate-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
              <input type="email" placeholder="your@email.com" class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" required />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
              <input type="text" placeholder="John Doe" class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" required />
            </div>
            
            <div class="flex items-start gap-3">
              <input type="checkbox" id="newsletter" class="mt-1" />
              <label for="newsletter" class="text-sm text-slate-600">
                Send me weekly career insights and new report notifications
              </label>
            </div>
            
            <button type="submit" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download Report
            </button>
          </form>
          
          <p class="text-xs text-slate-500 text-center mt-4">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.3s ease-out;
    }
  </style>