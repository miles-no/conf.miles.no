<script lang="ts">
	import type { Auth } from '$lib/types/auth';

	export let authInfo: Auth;
</script>

{#if authInfo.isAuthenticated}
	<span>Hei {authInfo.name}.</span>
	<span aria-hidden={true} class="splitter">|</span>
	<!-- Kommenterer ut denne til blir mer ferdig med denne delen -->
	<!-- <a href="/protected">Administrasjon</a> | -->
	<a href="/konferanser">Konferanser</a>
	<span aria-hidden={true} class="splitter">|</span>
	<a href="/logout">Logg ut</a>
{:else}
	<a href="/login">Login</a>
{/if}
<span aria-hidden={true} class="splitter">|</span>

<style>
	.splitter {
		padding: 0 0.8rem;
	}
</style>
