<script>
	import { Icon, Sun, Moon } from 'svelte-hero-icons';

	let darkMode = false;

	function handleDarkMode() {
		if (darkMode) document.documentElement.classList.remove('dark');
		else document.documentElement.classList.add('dark');

		darkMode = !darkMode;
	}
</script>

<nav class="sticky top-0 h-16 z-20 backdrop-blur bg-white/20 border-b border-acapulco-100/10">
	<section class="container mx-auto h-full flex flex-row gap-8 px-8 items-center justify-between">
		<a
			href="/"
			class="font-black font-inter subpixel-antialiased italic text-xl text-acapulco-900 dark:text-acapulco-100 hover:drop-shadow-[0_10px_35px_rgba(255,255,255,1)]"
		>
			DALSOCHIO
		</a>
		<div class="flex flex-row gap-4 grow">
			<a href="/blog">Blog</a>
			{#each Array(5) as _, i}
				<a href="/">Link {i}</a>
			{/each}
		</div>
		<button on:click={handleDarkMode} class="h-6">
			{#if darkMode}
				<Icon src={Sun} />
			{:else}
				<Icon src={Moon} />
			{/if}
		</button>
	</section>
</nav>
