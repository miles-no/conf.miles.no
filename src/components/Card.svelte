<script>
	export let performance;
	export let conference;
</script>

<div class="p-3">
	<a href="{conference.slug}/agenda/{performance.submission.slug.current}">
		<div class="card milescard">
			<div class="p-2">
				<div class="datelocation">
					<p>{performance.dateAndTime.split('T')[0]} / {performance.dateAndTime.split('T')[1].split('.')[0]} / {performance.location}</p>
				</div>
				<h1>{performance.submission.title}</h1>
				{#each performance.submission.authors as author}
					<h2>{author.name}</h2>
				{/each}
			</div>
		</div>
	</a>
</div>

<style>
	.milescard {
		width: 18rem;
		height: 22rem;
		border: 5px solid #000;
		border-radius: 0%;
	}
	.milescard:hover {
		background-color: rgb(184, 38, 28);
		color: #fff;
	}

	a {
		text-decoration: none;
	}

</style>
