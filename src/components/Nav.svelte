<script>
	export let conference;
</script>

<nav id="nav" class="navbar-expand-lg navbar-light">
	<div class="container-fluid">
		<button
			type="button"
			class="navbar-toggler"
			data-bs-toggle="collapse"
			data-bs-target="#navbarCollapse"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarCollapse">
			<div class="navbar-nav">
				<a href="https://miles.no/" class="nav-item nav-link btn">Gå til Miles &gt;&gt;</a>
				{#if conference}
					<a href={conference.link} class="nav-item nav-link btn">Gå til {conference.title} &gt;&gt;</a>
				{/if}
			</div>
		</div>
	</div>
</nav>

<!-- <div id="nav">
    <a class="btn" href="https://miles.no/">Gå til Miles  &gt;&gt;</a>
    <a class="btn" href="https://2022.boosterconf.no/">Gå til Booster  &gt;&gt;</a>
</div> -->
<style>
	#nav {
        position: fixed;
		margin-top: 50px;
		margin-right: 10px;
		right: 0;
		top: 0;
	}
	a.btn {
		font-size: 0.75em;
		border: 1px solid #000;
		background-color: #fff;
		border-radius: 40px;
		-moz-border-radius: 40px;
		-webkit-border-radius: 40px;
		padding: 5px;
		margin: 5px;
	}
</style>
