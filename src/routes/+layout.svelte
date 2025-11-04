<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';

	import { browser } from '$app/environment';

	if (browser) {
		// Dynamically load GA only in the browser
		(function(){
		const script1 = document.createElement('script');
		script1.async = true;
		script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-V23BCPS7YQ';
		document.head.appendChild(script1);

		window.dataLayer = window.dataLayer || [];
		function gtag(){ dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', 'G-V23BCPS7YQ');
		})();
	}

	let { children } = $props();
</script>

<svelte:head>

	<title>cvmama — Find Jobs & Get Hired Fast in Kenya</title>
	<meta name="description" content="cvmama helps job seekers in Kenya find verified jobs, optimize their CVs, and apply faster using AI.">
	<meta name="keywords" content="jobs in Kenya, CV writing, job search, AI job matching, Kenyan careers">
	<meta name="robots" content="index, follow">

	<!-- Open Graph -->
	<meta property="og:title" content="cvmama — Find Jobs & Get Hired Fast in Kenya">
	<meta property="og:description" content="Find verified jobs in Kenya and get AI help to improve your CV. Join CV Mama today.">
	<meta property="og:image" content="https://cvmama.co.ke/og-image.jpg">
	<meta property="og:url" content="https://cvmama.co.ke/">
	<meta property="og:type" content="website">

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="cvmama — Find Jobs & Get Hired Fast in Kenya">
	<meta name="twitter:description" content="Find verified jobs in Kenya and get AI help to improve your CV.">
	<meta name="twitter:image" content="https://cvmama.co.ke/og-image.jpg">

	<link rel="canonical" href="https://cvmama.co.ke/">
	

	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="cvmama" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>



{@render children?.()}
