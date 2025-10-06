<!-- src/routes/infographic/+page.svelte -->
<script>
  // Static sample data for the infographic
  const candidate = {
    name: 'Jane Mwangi',
    title: 'Marketing & Communications Specialist',
    location: 'Nairobi, Kenya',
    experienceYears: 6,
    education: "B.A. Communication & Media Studies",
    skills: ['SEO', 'Content Strategy', 'Social Media', 'Google Analytics', 'Campaign Management'],
    topAchievements: [
      'Grew Instagram audience by 120% in 12 months',
      'Led regional product launch; +30% sales in 3 months',
      'Managed Ksh. 5M ad budget with 25% improved ROI'
    ],
    weakPoints: [
      'Lack of measurable metrics in some roles',
      'Profile summary is too generic',
      'Long paragraphs instead of concise bullets'
    ],
    opportunities: [
      'Rewrite summary to include 2–3 measurable achievements',
      'Use 3–5 bullets per role with numbers',
      'Remove references section and shorten to 2 pages'
    ],
    keywords: ['digital marketing','brand strategy','social media','SEO','content'],
    score: 7.5
  };

  // Calculate score color
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600';
    if (score >= 6) return 'text-blue-600';
    return 'text-amber-600';
  };

  const getScoreGradient = (score) => {
    if (score >= 8) return 'from-emerald-500 to-teal-500';
    if (score >= 6) return 'from-blue-500 to-cyan-500';
    return 'from-amber-500 to-orange-500';
  };
</script>

<svelte:head>
  <title>CV Analysis Report - {candidate.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    
    <!-- Header Card -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border border-slate-200">
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
              <span class="text-3xl font-bold text-white">{candidate.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div class="text-white">
              <h1 class="text-2xl lg:text-3xl font-bold mb-1">{candidate.name}</h1>
              <p class="text-blue-100 text-lg mb-1">{candidate.title}</p>
              <div class="flex flex-wrap items-center gap-3 text-sm text-blue-50">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {candidate.location}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {candidate.experienceYears} years experience
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                  {candidate.education}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
            <div class="text-blue-100 text-xs uppercase tracking-wide mb-1">CVMama Review</div>
            <div class="text-white font-semibold text-lg">October 3, 2025</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      
      <!-- Left Column - Main Content -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Overall Score Card - Featured -->
        <div class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-8 border border-slate-200">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-slate-800">Overall CV Score</h2>
            <div class="px-4 py-2 bg-blue-100 rounded-lg">
              <span class="text-sm font-medium text-blue-700">Expert Analysis</span>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row items-center gap-8">
            <div class="flex-shrink-0">
              <div class="relative w-40 h-40">
                <svg class="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="#e2e8f0" stroke-width="12" fill="none"/>
                  <circle cx="80" cy="80" r="70" stroke="url(#scoreGradient)" stroke-width="12" fill="none"
                          stroke-dasharray="{2 * Math.PI * 70}" 
                          stroke-dashoffset="{2 * Math.PI * 70 * (1 - candidate.score / 10)}"
                          stroke-linecap="round"
                          class="transition-all duration-1000"/>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#3b82f6"/>
                      <stop offset="100%" style="stop-color:#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-5xl font-bold {getScoreColor(candidate.score)}">{candidate.score}</span>
                  <span class="text-slate-500 text-sm font-medium">out of 10</span>
                </div>
              </div>
            </div>
            
            <div class="flex-1 space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-slate-700">Clarity & Structure</span>
                  <span class="text-sm font-bold text-slate-900">8.0</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style="width: 80%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-slate-700">Metrics & Impact</span>
                  <span class="text-sm font-bold text-slate-900">7.5</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-slate-700">Keyword Optimization</span>
                  <span class="text-sm font-bold text-slate-900">7.0</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style="width: 70%"></div>
                </div>
              </div>
              
              <p class="text-sm text-slate-600 mt-4 pt-4 border-t border-slate-200">
                Your CV shows strong potential with measurable achievements. Focus on adding more metrics and optimizing keyword placement to reach an 8.5+ score.
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-xl shadow-md p-5 border border-blue-100 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-3xl font-bold text-blue-600">{candidate.experienceYears}</span>
            </div>
            <div class="text-sm font-medium text-slate-600">Years Experience</div>
            <div class="text-xs text-slate-500 mt-1">Professional background</div>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-5 border border-emerald-100 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span class="text-3xl font-bold text-emerald-600">{candidate.skills.length}</span>
            </div>
            <div class="text-sm font-medium text-slate-600">Core Skills</div>
            <div class="text-xs text-slate-500 mt-1">Technical expertise</div>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-5 border border-purple-100 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <span class="text-3xl font-bold text-purple-600">GA</span>
            </div>
            <div class="text-sm font-medium text-slate-600">Top Certification</div>
            <div class="text-xs text-slate-500 mt-1">Google Analytics</div>
          </div>
        </div>

        <!-- Strengths -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-800">Key Strengths</h2>
          </div>
          <div class="space-y-3">
            {#each candidate.topAchievements as achievement, i}
              <div class="flex gap-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                <span class="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <p class="text-slate-700 leading-relaxed">{achievement}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- Weak Points -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-rose-500">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-800">Areas for Improvement</h2>
          </div>
          <ul class="space-y-3">
            {#each candidate.weakPoints as weakness}
              <li class="flex gap-3 p-3 bg-rose-50 rounded-lg">
                <svg class="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <p class="text-slate-700 leading-relaxed">{weakness}</p>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Opportunities -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-slate-800">Recommended Actions</h2>
          </div>
          <ol class="space-y-3">
            {#each candidate.opportunities as opportunity, i}
              <li class="flex gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <p class="text-slate-700 leading-relaxed">{opportunity}</p>
              </li>
            {/each}
          </ol>
        </div>

      </div>

      <!-- Right Column - Sidebar -->
      <div class="space-y-6">
        
        <!-- Keywords -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 sticky top-6">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <h3 class="text-lg font-bold text-slate-800">Industry Keywords</h3>
          </div>
          <p class="text-xs text-slate-500 mb-4">Optimized for Kenya market</p>
          <div class="flex flex-wrap gap-2">
            {#each candidate.keywords as keyword}
              <span class="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 hover:border-indigo-300 transition-colors">
                {keyword}
              </span>
            {/each}
          </div>
        </div>

        <!-- Quick Tips -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-amber-200">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <h3 class="text-lg font-bold text-slate-800">Pro Tips</h3>
          </div>
          <ul class="space-y-3">
            <li class="flex gap-2 text-sm text-slate-700">
              <svg class="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Use numbers for all achievements
            </li>
            <li class="flex gap-2 text-sm text-slate-700">
              <svg class="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Keep roles concise (3–5 bullets)
            </li>
            <li class="flex gap-2 text-sm text-slate-700">
              <svg class="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Match keywords to job postings
            </li>
            <li class="flex gap-2 text-sm text-slate-700">
              <svg class="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Tailor CV for each application
            </li>
          </ul>
        </div>

        <!-- CTA Card -->
        <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white">
          <h3 class="text-xl font-bold mb-2">Ready to Optimize?</h3>
          <p class="text-blue-100 text-sm mb-4">Let CVMama help you create the perfect CV that gets interviews.</p>
          <a href="/optimize" class="block w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl text-center hover:bg-blue-50 transition-colors mb-3">
            Optimize This CV
          </a>
          <button class="block w-full bg-blue-700 border border-blue-500 text-white font-medium py-2 px-4 rounded-xl text-center hover:bg-blue-800 transition-colors text-sm">
            Download PDF Report
          </button>
          <p class="text-xs text-blue-200 text-center mt-3">Full analysis with ATS scoring included</p>
        </div>

        <!-- Social Share -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 class="text-sm font-bold text-slate-800 mb-3">Share Your Results</h3>
          <div class="flex gap-2">
            <button class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              LinkedIn
            </button>
            <button class="flex-1 bg-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors">
              Twitter
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center">
      <div class="inline-block bg-white rounded-xl shadow-md px-6 py-3 border border-slate-200">
        <p class="text-sm text-slate-600">
          <span class="font-semibold text-slate-800">Generated by CVMama</span> • 
          Powered by AI • 
          <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
        </p>
      </div>
    </div>

  </div>
</div>