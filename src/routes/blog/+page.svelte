<script>
	export let data;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>


<section class="z-10 p-8 backdrop-blur bg-white/20 border border-acapulco-100/10 rounded-md">
	Blog <a href="/blog/category/">Categorias</a>

	<div class="mt-8 flex flex-col">
		{#each data.posts as post}
			<a href={`/blog/${post.slug}`}>{post.title}</a>
		{/each}
	</div>
</section>
