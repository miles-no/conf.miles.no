<script>
	import Card, { Media, MediaContent } from '@smui/card';
	export let performance;
</script>

<div class="card-container">
	<Card padded style="height:100%;">
		<h2 class="submission-title mdc-typography--headline6">
			{performance.submission.title}
		</h2>

		{#each performance.submission.authors as author}
			<div class="author-wrapper">
				<img
					src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"
					alt=""
				/>
				<div style="display:flex; flex-direction: column; jusitfy-content:center;">
					<h3 class="mdc-typography--subtitle2" style="margin-bottom: 0;">{author.name}</h3>
					<p class="mdc-typography--caption" style="margin-bottom: 0;">{author.title}</p>
				</div>
			</div>
		{/each}
		<!-- {performance.submission.description[0].children[0].text} -->
	</Card>
</div>

<style>
	.submission-title {
		font-size: 1rem;
		line-height: 24px;
	}

	.author-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	img {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
	}
</style>
