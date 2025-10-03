<!-- +layout.svelte -->
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- PDF optimization meta tags -->
	<style>
		/* Global print-optimized styles */
		* {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			color-adjust: exact;
		}
		
		html, body {
			margin: 0;
			padding: 0;
			
		}
		
		@page {
			size: A4;
			margin: 15mm;
		}
		
		/* Remove any default margins/padding that might interfere */
		body {
			overflow-x: hidden;
		}
	</style>
</svelte:head>

{@render children?.()}

<style>
	:global(html) {
		box-sizing: border-box;
	}
	
	:global(*, *::before, *::after) {
		box-sizing: inherit;
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
		background: #ffffff;
	}
</style>