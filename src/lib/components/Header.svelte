<script lang="ts">
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    // Prevent body scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // Close menu on navigation
  function handleNavClick() {
    closeMobileMenu();
  }
</script>

<svelte:window on:resize={() => {
  if (window.innerWidth >= 768 && mobileMenuOpen) {
    closeMobileMenu();
  }
}} />

<!-- Header -->
<header class="glass-effect shadow-sm border-b border-gray-200 sticky top-0 z-40">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
    <div class="flex items-center justify-between">
      <!-- Logo + Brand -->
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <!-- Logo image -->
          <img 
            src="/cvmama-logo-color.png" 
            alt="CVMama Logo" 
            class="h-8 sm:h-10 w-32 sm:w-40 object-contain"
            loading="eager"
          />
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6 lg:space-x-8">
        <a href="/matching" class="text-gray-600 hover:text-cvmama-primary transition-colors font-medium text-sm lg:text-base">
          Job Match
        </a>
        <a href="/careers" class="text-gray-600 hover:text-cvmama-primary transition-colors font-medium text-sm lg:text-base">
          Careers
        </a>
        <a href="/insights" class="text-gray-600 hover:text-cvmama-primary transition-colors font-medium text-sm lg:text-base">
          Insights
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        on:click={toggleMobileMenu}
        class="md:hidden text-gray-600 hover:text-cvmama-primary transition-colors p-2 -mr-2 touch-manipulation"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {#if mobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        {/if}
      </button>
    </div>
  </div>
</header>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
  <div 
    class="fixed inset-0 z-50 md:hidden"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      on:click={closeMobileMenu}
      transition:fade={{ duration: 200 }}
    ></div>
    
    <!-- Menu Panel -->
    <div 
      class="absolute top-0 right-0 bottom-0 w-64 bg-white shadow-2xl"
      transition:fly={{ x: 300, duration: 300, opacity: 1 }}
    >
      <!-- Menu Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <img 
          src="/cvmama-logo-color.png" 
          alt="CVMama Logo" 
          class="h-8 w-32 object-contain"
        />
        <button 
          on:click={closeMobileMenu}
          class="text-gray-600 hover:text-gray-900 p-2 -mr-2 touch-manipulation"
          aria-label="Close menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Menu Items -->
      <nav class="flex flex-col p-4 space-y-1">
        <a 
          href="/matching" 
          on:click={handleNavClick}
          class="text-gray-700 hover:text-cvmama-primary hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-all touch-manipulation active:scale-95"
        >
          Job Match
        </a>
        <a 
          href="/careers" 
          on:click={handleNavClick}
          class="text-gray-700 hover:text-cvmama-primary hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-all touch-manipulation active:scale-95"
        >
          Careers
        </a>
        <a 
          href="/insights" 
          on:click={handleNavClick}
          class="text-gray-700 hover:text-cvmama-primary hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-all touch-manipulation active:scale-95"
        >
          Insights
        </a>
      </nav>

      <!-- Optional: Add CTA button in mobile menu -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <a 
          href="/matching" 
          on:click={handleNavClick}
          class="block text-center gradient-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg touch-manipulation active:scale-95 transition-transform"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .glass-effect {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* Smooth transitions */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Prevent scroll when menu is open on mobile */
  :global(body.menu-open) {
    overflow: hidden;
  }

  /* Improve gradient primary if not defined */
  .gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* Better hover states for mobile */
  @media (hover: none) {
    a:hover {
      background-color: transparent;
    }
    a:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
</style>