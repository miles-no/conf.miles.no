<script lang="ts">
	import type { Auth } from "$lib/types/auth";

    export let authInfo: Auth;
</script>

{#if authInfo.isAuthenticated}
Hei {authInfo.name}. |
<!-- Kommenterer ut denne til blir mer ferdig med denne delen -->
<!-- <a href="/protected">Administrasjon</a> | -->
<a href="/logout">Logg ut</a>
{:else}
<a href="/login">Login</a>
{/if}