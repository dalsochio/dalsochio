<script>
	  import { _ } from 'svelte-i18n'

	import { Icon, Sun, Moon } from 'svelte-hero-icons';

	let darkMode = false;

	function handleDarkMode() {
		if (darkMode) document.documentElement.classList.remove('dark');
		else document.documentElement.classList.add('dark');

		darkMode = !darkMode;
	}
</script>

<nav class="sticky top-0 h-16 z-20 backdrop-blur bg-white/20 border-b border-acapulco-100/10">
	<section class="container mx-auto h-full grid grid-cols-3 gap-8 px-8 items-center">
		<button on:click={handleDarkMode} class="h-6 self-center place-self-start">
			{#if darkMode}
				<Icon src={Sun} />
			{:else}
				<Icon src={Moon} />
			{/if}
		</button>
		
		<a
			href="/"
			class="text-center font-black font-inter subpixel-antialiased italic text-xl text-acapulco-900 dark:text-acapulco-100 hover:drop-shadow-[0_10px_35px_rgba(255,255,255,1)]"
		>
			DALSOCHIO
		</a>
		<div class="flex flex-row gap-4 self-center place-self-end">
			<a href="/blog">Blog</a>
			<a href="/projects">{$_('navbar.projects')}</a>
		</div>
	</section>
</nav>
