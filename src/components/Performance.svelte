<script>
	export let performance;
	export let conference;

	import { intlFormat } from 'date-fns';

	console.log(conference);
</script>

<div class="col-sm-12 col-md-6 col-lg-4" style="padding: 0; maring: 0;">
    <div class="p-3 h-100">
        <a href={`/konferanser/${conference.slug}/agenda/${performance.submission.slug}`}>
	<div class="d-flex flex-column justify-content-between background">
		<div class="top-bar d-flex flex-column justify-content-between">
            <div class="d-flex flex-row justify-content-between">
				<div class="date-text">
					{intlFormat(
						new Date(performance.dateAndTime),
						{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'},
						{ locale: 'nb-NO' }
					)}
				</div>
				<div class="location">
                    {performance.location ?? ""}
                </div>
			</div>
			<div class="title mt-1"> {performance.submission.title}
			</div>	
		</div>
        <div class="duration">
            {performance.submission.submissionType}
            ({performance.submission.duration})
        </div>
		<div class="d-flex align-items-center justify-content-between flex-row mt-1">
                <div class="d-flex flex-row overflow-scroll">
                    {#each performance.submission.authors as author}
                    <div class="d-flex flex-row align-items-center">
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
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.title {
		font-weight: 700;
		font-size: large;
	}
	.author-name {
		font-weight: 300;
		font-size: x-small;
	}
	.author-img {
		height: 32px;
		aspect-ratio: 1/1;
		border-radius: 50%;
	}
	.background {
		height: 100%;
		background-color:  10;
        box-shadow: 4px 4px 8px 0 #b8261c40;
		padding: 1.5em;
	}
    .date-text{
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
</style>
