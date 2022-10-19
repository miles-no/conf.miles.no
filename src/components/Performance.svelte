<script>
	export let performance;
	export let conference;
	export let compact = false;
	import { formatDistanceToNowStrict, addMinutes, intlFormat } from 'date-fns';
</script>

<div class="h-100" style={compact ? 'padding: 0.25em' : 'padding: 0.5em'}>
	<a href={`/konferanser/${conference.slug}/agenda/${performance.submission.slug}`}>
		<div
			class="d-flex flex-column justify-content-between background"
			style={compact && 'padding: 1em'}
		>
			<div class="top-bar d-flex flex-column justify-content-between">
				<div class="d-flex flex-row justify-content-between">
					<div class="date-text">
						{#if compact}
							{intlFormat(
								new Date(performance.dateAndTime),
								{ hour: 'numeric', minute: 'numeric' },
								{ locale: 'nb-NO' }
							)}
							-
							{intlFormat(
								addMinutes(new Date(performance.dateAndTime), performance.submission.duration),
								{
									hour: 'numeric',
									minute: 'numeric'
								},
								{ locale: 'nb-NO' }
							)}
						{:else}
							{intlFormat(
								new Date(performance.dateAndTime),
								{
									year: 'numeric',
									month: 'short',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric'
								},
								{ locale: 'nb-NO' }
							)}
						{/if}
					</div>
					<div class="location">
						{performance.location ?? ''}
					</div>
				</div>
				<div class="title mt-1">{performance.submission.title}</div>
			</div>
			{#if !compact}<div class="duration">
					{performance.submission.submissionType}
					({formatDistanceToNowStrict(addMinutes(new Date(), performance.submission.duration), {
						addSuffix: false
					})})
				</div>{/if}
			<div class="d-flex align-items-center justify-content-between flex-row mt-1">
				<div class="overflow styled-scrollbars d-flex flex-row">
					{#each performance.submission.authors as author}
						<div class="d-flex flex-row align-items-center ">
							{#if !compact}
								<img class="author-img me-2" src={author.imageUrl} alt={author.name} />{/if}
							<div class="author-name me-2">
								{author.name}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</a>
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.overflow {
		overflow-y: hidden;
		overflow-x: auto;
	}
	.title {
		font-weight: 700;
		font-size: large;
	}
	.author-name {
		font-weight: 200;
		font-size: x-small;
		white-space: nowrap;
	}
	.author-img {
		filter: grayscale(100%);
		height: 32px;
		aspect-ratio: 1/1;
		border-radius: 50%;
	}
	.background {
		height: 100%;
		padding: 1.5em;
		background-color: white;
		box-shadow: inset -1px -1px 0 2px #ef8181;
		transition: all 0.3s ease-in-out;
	}
	.background:hover {
		box-shadow: inset 2px 2px 3px 1px #ef8181;
		background-color: #ef81810a;
	}
	.date-text {
		font-size: small;
		font-weight: 700;
	}
	.location {
		font-size: small;
		font-weight: 700;
	}
	.duration {
		font-weight: 200;
		font-size: small;
	}
	.styled-scrollbars::-webkit-scrollbar {
		border-bottom: solid 1px #ef8181;
		width: 3px; /* Mostly for vertical scrollbars */
		height: 3px; /* Mostly for horizontal scrollbars */
	}
	.styled-scrollbars::-webkit-scrollbar-thumb {
		/* Foreground */
		background-color: #ef8181;
	}
	.styled-scrollbars::-webkit-scrollbar-track {
		/* Background */
		background: inherit;
	}
</style>
