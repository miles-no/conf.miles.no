<script lang="ts">
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	export let settings = [];
	export let authInfo = {};
	export let isDarkTheme: boolean | undefined = undefined;
</script>

<header class="header-container">
	<div class="header-container-logo">
		<a href="/">
			<img class="miles-brand" src={settings.siteLogo} alt={settings.siteName} />
		</a>
	</div>
	<div class="header-container-nav-theme">
		<nav>
			{#if authInfo.isAuthenticated}
				<span class="name">Hei {authInfo.name}. </span>
				<ul>
					<li>
						<a href="/konferanser">Konferanser</a>
					</li>
					<li>
						<a href="/logout">Logg ut</a>
					</li>
				</ul>
			{:else}
				<a class="login__link" href="/login">Login</a>
			{/if}
		</nav>
		<Button class="header-container-nav-theme-btn" on:click={() => (isDarkTheme = !isDarkTheme)}>
			<Label>{isDarkTheme ? 'Light mode' : 'Dark mode'}</Label>
		</Button>
		<IconButton
			class="material-icons theme-icon-button"
			aria-label={isDarkTheme ? 'Lys tema' : 'Mørk tema'}
			on:click={() => (isDarkTheme = !isDarkTheme)}
			>{isDarkTheme ? 'light_mode' : 'nightlight'}</IconButton
		>
	</div>
</header>

<style lang="scss">
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		.header-container-logo {
			img {
				width: 5rem;
			}
		}

		.header-container-nav-theme {
			display: flex;
			gap: 0.5rem;
			// align-items: end;

			.name {
				display: none;
			}

			nav {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}

			ul {
				display: flex;
				gap: 0.5rem;
				list-style: none;
				padding: 0;
				margin: 0;
			}

			li,
			.login__link {
				padding-right: 0.5rem;
				border-right: 1px solid lightgray;
			}
		}

		:global(.header-container-nav-theme-btn) {
			display: none;
		}

		:global(.theme-icon-button) {
			display: flex;
			width: 2rem;
		}
	}

	@media (min-width: 900px) {
		.header-container-logo img {
			width: 8rem !important;
		}

		.name {
			display: unset !important;
			padding-right: 0.5rem;
			border-right: 1px solid lightgray;
		}

		:global(.header-container-nav-theme-btn) {
			display: unset !important;
		}

		:global(.theme-icon-button) {
			display: none !important;
		}
	}

	/* .header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		height: 4em;
	} */

	/* .miles-brand {
		max-height: 30px;
	} */

	/* .header-container-nav-theme {
		display: flex;
		align-items: center;
	} */

	/* * :global(.header-container-nav-theme-btn) {
		text-transform: none;
	} */
</style>
