<script lang="ts">
	import Faq from "$lib/components/Faq.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import JobMatchingForm from "$lib/components/JobMatchingForm.svelte";
	import Pricing from "$lib/components/Pricing.svelte";

     let uploading = false
     let success = false
</script>

<Header />

  <!-- Hero Section -->
    <section
      id="hero"
      class="text-center py-20 px-6 bg-[#6BB4C9]/50"
    >
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Tailor Your CV for Any Job Instantly
      </h1>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Upload your CV and the job description — CVMama will optimize your CV
        with the right keywords, phrasing, and structure to get you noticed.
      </p>

      <div class="flex justify-center gap-4">
        <a
          href="#upload"
          class="bg-[#F28C7A] text-white font-semibold px-6 py-3 rounded-full transition"
          >Upload CV & Job Description</a
        >
        <a
          href="#how"
          class="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full font-semibold transition"
          >See How It Works</a
        >
      </div>
    </section>

    <JobMatchingForm />

 <Pricing />

  <Faq />

  <Footer />