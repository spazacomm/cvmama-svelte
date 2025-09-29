<script>
    import Hero from "$lib/components/Hero.svelte";
    import Works from "$lib/components/Works.svelte";
    import Cta from "$lib/components/Cta.svelte";
    import Faq from "$lib/components/Faq.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Pricing from "$lib/components/Pricing.svelte";
    import Stories from "$lib/components/Stories.svelte";
    import Upload from "$lib/components/Upload.svelte";


  let showDetails = false;

  function scrollToUpload() {
    const el = document.getElementById('upload-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

    <!-- Hero Section -->
    <Hero />

    <!-- How It Works Section -->
    <Works />

    <!-- Upload Section -->
    <Upload />

    <!-- Pricing Section -->
    <Pricing />

    <!-- Success Stories -->
    <Stories />

    <!-- FAQ Section -->
    <Faq />

    <!-- CTA Section -->
   <Cta />

    <!-- Footer -->
   <Footer />


    
