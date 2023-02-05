<script>
	export let data = {};
	const settings = data.settings;
	let authInfo = { isAuthenticated: false };
	if(data.user) {
		authInfo = data.user;
	}
</script>

{#if authInfo.isAuthenticated}
<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/protected">Administrasjon</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="/protected/conferences">Konferanser</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
{/if}

<div class="container">
	<slot />
</div>