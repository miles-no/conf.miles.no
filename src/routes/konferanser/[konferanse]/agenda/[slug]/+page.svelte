<script>
	import { PortableText } from '@portabletext/svelte';
	import { CalendarClock, Clock, MapPin, Tags } from 'lucide-svelte';
	import { intlFormat, addMinutes } from 'date-fns';
	import Author from '../../../../../components/Author.svelte';
  	import BreadCrumb from '../../../../../components/BreadCrumb.svelte';
	export let data = {};
	export let conference = data.conference;
  	export let performance = data.performance;
	export let submission = data.submission;
</script>

<div class="container-fluid">
  <BreadCrumb {conference} {submission} />
	<div class="container-lg">
		<div class="submission-heading">
			<h1 class="mb-4">{submission.title}</h1>
			<h4>
				{submission.authors.map((author) => author.name).join(' | ')}
			</h4>
		</div>
		<div class="submission-content">
			<div class="submission-details">
				<div class="mb-2">
					<span class="me-3">
						<CalendarClock />
						<span>
							{intlFormat(
								new Date(performance.dateAndTime),
								{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
								{ locale: 'nb-NO' }
							)}
						</span>
					</span>
					<span>
						<Clock />
						<span>
							{intlFormat(
								new Date(performance.dateAndTime),
								{ hour: 'numeric', minute: 'numeric' },
								{ locale: 'nb-NO' }
							)} -
							{intlFormat(
								addMinutes(new Date(performance.dateAndTime), submission.duration),
								{ hour: 'numeric', minute: 'numeric' },
								{ locale: 'nb-NO' }
							)}
						</span>
					</span>
				</div>
				<div class="mb-3">
					<span class="me-3">
						<MapPin /> <span>{performance.location}</span>
					</span>

          {#if submission.keywords && submission.keywords.length > 0}
            <span>
              <Tags /> <span>{submission.keywords.join(', ')}</span>
            </span>
          {/if}
				</div>
			</div>

			<div>
				<PortableText value={submission.description} />
			</div>

      {#if performance.performanceUrls && performance.performanceUrls.length > 0}
        <div class="d-flex flex-column submission-details">
          {#each performance.performanceUrls as url}
            <a class="submission-resource" href={url.url}>{url.urlText}</a>
          {/each}
        </div>
      {/if}
		</div>

    <div>
			{#each submission.authors as author}
				<Author {author} />
			{/each}
		</div>
	</div>
</div>

<style>
	.submission-heading {
		background: #D76E6E;
		padding: clamp(0.5em, 3vh, 3em) clamp(1em, 2vw, 8em);
		color: white;
	}

	.submission-content {
		padding: clamp(0.5em, 3vh, 3em) clamp(1em, 5vw, 8em);
		line-height: 2em;
	}

	.submission-details {
		font-weight: 700;
	}

  .submission-resource {
    color: inherit;
    text-decoration: none;
  }
</style>
