<script>
	import Login from './Login.svelte'
	import { user } from '../stores';
	export let settings = [];
	export let authInfo = {};
	const signOut = () => {
		$user = false;
		location.reload();
	};
</script>

<header class="miles-nav">
	<div class="brand">
		<a href="/">
			<img class="miles-brand" src={settings.siteLogo} alt={settings.siteName} />
		</a>
	</div>
	<nav>
		<div class="links">
			<ul class="navbar-nav m-0">
				<!-- {#if $user}
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img height="35" src={$user.picture} alt={$user.name} style={'border-radius: 50px'} />
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li class="px-2">{$user.name}</li>
							<li><hr class="dropdown-divider" /></li>
							<li class="px-2 miles-nav-item" on:click={signOut}>Sign Out</li>
						</ul>
					</li>
				{:else}
					<li class="nav-item">
						<div id="signin" />
					</li>
				{/if} -->
				<li class="nav-item">
					<Login {authInfo} />
				</li>
			</ul>
		</div>
	</nav>
</header>

<style>
	.miles-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		height: 4em;
	}

	.miles-nav-item {
		cursor: pointer;
		color: rgb(184, 38, 28);
	}

	.dropdown-toggle::after {
		display: none !important;
	}

	.miles-brand {
		max-height: 30px;
	}

  .nav-link {
    padding: 0;
  }
</style>
