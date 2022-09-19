<script>
	export let secondarySource = 'None';
</script>

<div id="header"><a href= "/">
	<div id="logoheader">
		<img class="primarylogo" alt="Miles logo" src="/logo.png" />
		{#if secondarySource != 'None'}
			<span id="separator">@</span>
			<img class="secondarylogo" alt="Miles logo" src={secondarySource} />
		{/if}
	</div></a>
</div>

<style>
	#header {
		/* position: fixed; */
		width: 100%;
		margin: 50px;
	}
	#logoheader {
		display: flex;
		align-items: center;
		align-content: center;
	}
	#separator {
		font-family: 'Work Sans', sans-serif;
		font-weight: bold;
		color: rgb(184, 38, 28);
		font-size: 30px;
		padding: 5px;
		font-weight: bolder;
	}
	img {
		height: 30px;
	}
	img.primarylogo {
		float: left;
	}
</style>
