<script>
  import Hero from "$lib/components/Hero.svelte";
  import Works from "$lib/components/Works.svelte";
  import Cta from "$lib/components/Cta.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Pricing from "$lib/components/Pricing.svelte";
  import Stories from "$lib/components/Stories.svelte";
  import Upload from "$lib/components/Upload.svelte";
  import Header from "$lib/components/Header.svelte";

  let showDetails = false;

  function scrollToUpload() {
    const el = document.getElementById("upload-section");
    el?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <!-- Primary Meta -->
  <title>CV Mama | AI-Powered Resume Builder for Kenyan Job Seekers</title>
  <meta
    name="description"
    content="CV Mama helps Kenyan job seekers create professional AI-optimized resumes and cover letters. Upload your CV and get tailored applications instantly."
  />
  <meta name="keywords" content="resume builder Kenya, CV Mama, AI resume, CV optimization, job seekers Kenya" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="CV Mama" />

  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="CV Mama | AI-Powered Resume Builder for Kenyan Job Seekers" />
  <meta
    property="og:description"
    content="Create AI-optimized resumes and cover letters tailored to Kenyan job opportunities. Upload your CV now."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cvmama.co.ke" />
  <meta property="og:image" content="https://cvmama.co.ke/og-preview.png" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CV Mama | AI-Powered Resume Builder" />
  <meta
    name="twitter:description"
    content="Upload your CV and generate AI-optimized resumes and cover letters instantly. Designed for Kenyan job seekers."
  />
  <meta name="twitter:image" content="https://cvmama.co.ke/og-preview.png" />

  <!-- Canonical -->
  <link rel="canonical" href="https://cvmama.co.ke" />

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CV Mama",
      "url": "https://cvmama.co.ke",
      "logo": "https://cvmama.co.ke/logo.png",
      "sameAs": [
        "https://twitter.com/cvmama",
        "https://linkedin.com/company/cvmama"
      ],
      "description": "CV Mama helps Kenyan job seekers create AI-optimized resumes and cover letters tailored for job applications."
    }
  </script>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://cvmama.co.ke",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://cvmama.co.ke/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  </script>
</svelte:head>

<Header />

<main>
  <!-- Hero Section -->
  <section id="hero">
    <Hero />
  </section>

  <!-- How It Works Section -->
  <section id="works">
    <Works />
  </section>

  <!-- Upload Section -->
  <section id="upload-section">
    <Upload />
  </section>

  <!-- Pricing Section -->
  <section id="pricing">
    <Pricing />
  </section>

  <!-- Success Stories -->
  <section id="stories">
    <Stories />
  </section>

  <!-- FAQ Section -->
  <section id="faq">
    <Faq />
  </section>

  <!-- CTA Section -->
  <section id="cta">
    <Cta />
  </section>
</main>

<!-- Footer -->
<Footer />
