<script>
    export let authInfo = {};
</script>

{#if authInfo.isAuthenticated}
Hei {authInfo.name}. |
<a href="/protected">Administrasjon</a> |
<a href="/logout">Logg ut</a>
{:else}
<a href="/login">Login</a>
{/if}