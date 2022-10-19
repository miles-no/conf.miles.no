<script>
	export let performance;
	export let conference;

	import { formatDistanceToNowStrict, addMinutes, intlFormat } from 'date-fns';
</script>

<div class="p-3 h-100">
	<a href={`/konferanser/${conference.slug}/agenda/${performance.submission.slug}`}>
		<div class="d-flex flex-column justify-content-between background">
			<div class="top-bar d-flex flex-column justify-content-between">
				<div class="d-flex flex-row justify-content-between">
					<div class="date-text">
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
					</div>
					<div class="location">
						{performance.location ?? ''}
					</div>
				</div>
				<div class="title mt-1">{performance.submission.title}</div>
			</div>
			<div class="duration">
				{performance.submission.submissionType}
				({formatDistanceToNowStrict(addMinutes(new Date(), performance.submission.duration), {
					addSuffix: false
				})})
			</div>
			<div class="d-flex align-items-center justify-content-between flex-row mt-1">
				<div class="overflow styled-scrollbars d-flex flex-row">
					{#each performance.submission.authors as author}
						<div class="d-flex flex-row align-items-center ">
							<img class="author-img" src={author.imageUrl} alt={author.name} />
							<div class="author-name mx-2">
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
		background-color: 10;
		box-shadow: 1px 1px 0 2px #ef8181;
		padding: 1.5em;
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
