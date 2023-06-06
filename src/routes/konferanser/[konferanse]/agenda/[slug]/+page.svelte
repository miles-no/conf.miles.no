<script>
	import { CalendarClock, Clock, Megaphone, Zap, Wrench } from 'lucide-svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import { intlFormat, addMinutes } from 'date-fns';
	import Author from '../../../../../components/Author.svelte';
	import BreadCrumb from '../../../../../components/BreadCrumb.svelte';
	import InfoPill from '../../../../../components/InfoPill.svelte';
	export let data = {};
	export let conference = data.conference;
	export let performance = data.performance;
	export let submission = data.submission;

	let submissionTranslation = {
		presentation: 'Foredrag',
		lightningTalk: 'Lyntale',
		workshop: 'Workshop'
	};

	let submissionTypeIcon = {
		presentation: Megaphone,
		lightningTalk: Zap,
		workshop: Wrench
	};
</script>

<div class="container-fluid">
	<BreadCrumb {conference} {submission} />
	<div class="container-lg">
		<LayoutGrid>
			<Cell
				spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
				style="display:flex; flex-direction:column; gap: 1rem; margin-right:2rem;"
			>
				<h1 class="title mdc-typography--headline5">{submission.title}</h1>

				<div class="submission-details">
					<InfoPill
						text={submissionTranslation[`${submission.submissionType}`]}
						PillIcon={submissionTypeIcon[`${submission.submissionType}`]}
					/>
					<div class="mb-2 d-flex">
						<span class="me-3 time-date">
							<CalendarClock />
							<span>
								{intlFormat(
									new Date(performance.dateAndTime),
									{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
									{ locale: 'nb-NO' }
								)}
							</span>
						</span>
						<span class="time-date">
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
				</div>
				<div class="submission-description mdc-typography--body1">
					{submission.description[0].children[0].text}
				</div></Cell
			>
			<Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
				<div class="author-section">
					{#each submission.authors as author}
						<Author {author} />
					{/each}
				</div>
			</Cell>
		</LayoutGrid>
	</div>
</div>

<style>
	.title {
		font-weight: 700;
	}
	.submission-heading {
		background: #d76e6e;
		padding: clamp(0.5em, 3vh, 3em) clamp(1em, 2vw, 8em);
		color: white;
	}

	.submission-description {
		line-height: 2em;
	}

	.time-date {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.submission-details {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-bottom: 1.5rem;
		font-weight: 700;
		border-bottom: 1px solid black;
	}

	.submission-resource {
		color: inherit;
		text-decoration: none;
	}

	.author-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
