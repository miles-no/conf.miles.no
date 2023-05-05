<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Login from './Login.svelte';

	export let settings = [];
	export let authInfo = {};
	export let darkTheme: MediaQueryList | boolean | undefined = undefined;
</script>

<header class="header-container">
	<div class="header-container-logo">
		<a href="/">
			<img class="miles-brand" src={settings.siteLogo} alt={settings.siteName} />
		</a>
	</div>
	<div class="header-container-nav-theme">
		<nav>
			<div class="links">
				<ul class="navbar-nav m-0">
					<li class="nav-item">
						<Login {authInfo} />
					</li>
				</ul>
			</div>
		</nav>
		<Button class="header-container-nav-theme-btn" on:click={() => (darkTheme = !darkTheme)}>
			<Label>{darkTheme ? 'Light mode' : 'Dark mode'}</Label>
		</Button>
	</div>
</header>

<style>
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		height: 4em;
	}

	.miles-brand {
		max-height: 30px;
	}

	.header-container-nav-theme {
		display: flex;
		align-items: center;
	}

	* :global(.header-container-nav-theme-btn) {
		text-transform: none;
	}
</style>
