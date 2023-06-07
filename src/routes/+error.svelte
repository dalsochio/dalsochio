<!-- This page handles any error encountered by the site. -->
<script>
	import { page } from '$app/stores';
</script>

<h2>{$page.status}</h2>
<p class="subhead">{$page.error.message}</p>

<p><strong>Opa!</strong> Que tal tentar outro link?</p>
<ul>
	<li><a href="/">Início</a></li>
</ul>
