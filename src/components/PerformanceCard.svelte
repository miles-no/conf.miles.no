<script lang="ts">
	import type { IPerformance } from '../model/event';
	import Card from '@smui/card';
	export let rootSlug: string;
	export let performance: IPerformance;
</script>

<div class="card-container">
	<a href={`/arrangement/${rootSlug}/agenda/${performance.submission.slug}`}>
		<Card padded style="height:100%;">
			<h2 class="submission-title mdc-typography--headline6">
				{performance.submission.title}
			</h2>

			{#each performance.submission.authors as author}
				<div class="author-wrapper">
					<img
						class="author-img me-2 rounded-circle"
						src={author.imageUrl}
						alt={author.name}
						height="75"
						width="75"
					/>
					<div style="display:flex; flex-direction: column; jusitfy-content:center;">
						<h3 class="mdc-typography--subtitle2" style="margin-bottom: 0;">{author.name}</h3>
						<p class="mdc-typography--caption" style="margin-bottom: 0;">
							{author.title ? author.title : ''}
						</p>
					</div>
				</div>
			{/each}
		</Card>
	</a>
</div>

<style>
	a {
		text-decoration: none;
	}
	.submission-title {
		font-size: 1rem;
		line-height: 24px;
	}

	.author-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
