<script>
	import Login from './Login.svelte'
	export let settings = [];
	export let authInfo = {};
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
