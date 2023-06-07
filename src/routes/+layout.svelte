<script>
	import '../app.postcss';
	import NavBar from '../lib/components/NavBar.svelte';
	import './styles.css';
</script>

<NavBar />
<section class="mt-8 container mx-auto">
	<slot />
</section>

<style>
</style>
