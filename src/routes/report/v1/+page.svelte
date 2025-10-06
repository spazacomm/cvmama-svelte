<script>
    import { onMount } from "svelte";
  
    // Lazy load charts (to avoid SSR "window is not defined" error)
    let ApexCharts;
    let mounted = false;
  
    onMount(async () => {
      const module = await import("svelte-apexcharts");
      ApexCharts = module.default;
      mounted = true;
    });
  
    // Chart configs
    const radarOptions = {
      chart: { type: "radar" },
      xaxis: { categories: ["Branding", "Experience", "Skills", "Education", "Progression"] },
      stroke: { width: 2 },
      fill: { opacity: 0.2 }
    };
  
    const radarSeries = [
      {
        name: "Jane Mwangi",
        data: [6, 7, 6, 5, 7] // sample scores out of 10
      }
    ];
  
    const scoreOptions = {
      chart: { type: "radialBar" },
      plotOptions: {
        radialBar: {
          hollow: { size: "60%" },
          dataLabels: {
            value: { fontSize: "22px", show: true },
            name: { show: false }
          }
        }
      },
      labels: ["Readiness Score"]
    };
  
    const scoreSeries = [73]; // readiness = 7.3/10
  </script>
  
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800">Career Profile Review</h1>
      <p class="text-gray-500">Candidate: Jane Mwangi · October 3, 2025</p>
      <p class="text-lg mt-2">Current Role: Customer Support Associate · Financial Services</p>
    </div>
  
    <!-- Snapshot -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl shadow p-6">
        <h2 class="font-semibold text-gray-700 mb-4">Career Snapshot</h2>
        <ul class="space-y-2 text-gray-600">
          <li><strong>Stage:</strong> Mid-Level Professional</li>
          <li><strong>Experience:</strong> 6 years in customer support</li>
          <li><strong>Top Skills:</strong> Client communication, CRM systems, problem-solving</li>
          <li><strong>Target Roles:</strong> CX Lead, Operations Manager</li>
        </ul>
      </div>
      <div class="flex items-center justify-center bg-white rounded-2xl shadow p-6">
        {#if mounted && ApexCharts}
          <ApexCharts options={scoreOptions} series={scoreSeries} type="radialBar" height="250" />
        {:else}
          <p class="text-gray-400">Loading chart...</p>
        {/if}
      </div>
    </div>
  
    <!-- Strengths & Gaps -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-green-50 rounded-2xl p-6 shadow">
        <h2 class="font-semibold text-green-700 mb-3">Strengths</h2>
        <ul class="list-disc pl-5 space-y-1 text-green-800">
          <li>Strong customer service achievements</li>
          <li>Hands-on with CRM tools (Zendesk, Salesforce)</li>
          <li>Career progression within financial services</li>
          <li>Recognized for mentoring juniors</li>
        </ul>
      </div>
      <div class="bg-red-50 rounded-2xl p-6 shadow">
        <h2 class="font-semibold text-red-700 mb-3">Development Areas</h2>
        <ul class="list-disc pl-5 space-y-1 text-red-800">
          <li>Limited leadership exposure</li>
          <li>Lacks advanced data/analytics skills</li>
          <li>No certifications</li>
          <li>LinkedIn profile incomplete</li>
        </ul>
      </div>
    </div>
  
    <!-- Section Review -->
    <div class="bg-white rounded-2xl shadow p-6">
      <h2 class="font-semibold text-gray-700 mb-4">Section-by-Section Review</h2>
      {#if mounted && ApexCharts}
        <ApexCharts options={radarOptions} series={radarSeries} type="radar" height="350" />
      {:else}
        <p class="text-gray-400">Loading chart...</p>
      {/if}
    </div>
  
    <!-- Roadmap -->
    <div class="bg-blue-50 rounded-2xl shadow p-6">
      <h2 class="font-semibold text-blue-700 mb-4">Career Roadmap</h2>
      <div class="space-y-4 text-gray-700">
        <div>
          <h3 class="font-semibold">Short-term (0–3 months)</h3>
          <ul class="list-disc pl-5">
            <li>Update LinkedIn with achievements</li>
            <li>Add quantified results to CV</li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold">Medium-term (3–12 months)</h3>
          <ul class="list-disc pl-5">
            <li>Enroll in Customer Experience / Data Analytics certification</li>
            <li>Seek team lead opportunities</li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold">Long-term (12–24 months)</h3>
          <ul class="list-disc pl-5">
            <li>Target CX Lead / Ops Manager roles</li>
            <li>Expand into fintech/digital services</li>
          </ul>
        </div>
      </div>
    </div>
  
    <!-- Closing -->
    <div class="text-center bg-white rounded-2xl shadow p-6">
      <p class="text-lg text-gray-700">
        You have strong foundations in customer service and client relations.  
        With targeted upskilling and leadership exposure, you’re ready for senior roles.
      </p>
      <a href="/upload" class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700" aria-label="Optimize CV with CVMama">
        Optimize My CV with CVMama
      </a>
    </div>
  </div>
  