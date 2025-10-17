<script lang="ts">
	import ATSForm from "$lib/components/ATSForm.svelte";
	import Faq from "$lib/components/Faq.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import JobMatchingForm from "$lib/components/JobMatchingForm.svelte";
	import Pricing from "$lib/components/Pricing.svelte";
	import Stories from "$lib/components/Stories.svelte";

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
        Get Your Resume Past the ATS — Instantly.
      </h1>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Upload your CV and get a real-time ATS compatibility score powered by AI + Recruiter Intelligence.
Find out why your CV isn’t landing interviews — and how to fix it, line by line.
      </p>

      <div class="flex justify-center gap-4">
        <a
          href="#upload"
          class="bg-[#F28C7A] text-white font-semibold px-6 py-3 rounded-full transition"
          >Upload CV </a
        >
        <a
          href="#how"
          class="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full font-semibold transition"
          >See How It Works</a
        >
      </div>
    </section>

    <ATSForm />

 <!-- <Pricing /> -->

  <!-- <Faq /> -->
  <!-- <Stories /> -->

  <Footer />