<script>
	import '../app.postcss';
	import './styles.css';
	import NavBar from '../lib/components/NavBar.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<NavBar />
<section class="grow container mx-auto">
	<slot />
</section>
<Footer/>

<style>
</style>
