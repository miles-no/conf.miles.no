<script lang="ts">
	import BreadCrumb from '../BreadCrumb.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import InfoPill from '../InfoPill.svelte';
	import { intlFormat, addMinutes } from 'date-fns';
	import { CalendarClock, Clock, Megaphone, Zap, Wrench } from 'lucide-svelte';
	import Author from '../Author.svelte';
	import type { ISubmission } from '../../model/submission';
	import type { IEvent, IPerformance } from '../../model/event';
	import { Submission } from '../../enums/submission-type';
	import type { Cv } from '$lib/types/cv';

	export let submission: ISubmission;
	export let event: IEvent;
	export let performance: IPerformance;
	export let cvs: Cv[] = [];

	let submissionTypeIcon = {
		presentation: Megaphone,
		lightningTalk: Zap,
		workshop: Wrench
	};

	const authorsLength = submission?.authors?.length || 0;
</script>

<div class="container-fluid">
	<BreadCrumb {event} {submission} />
	<div class="container-lg">
		<LayoutGrid>
			<Cell
				spanDevices={{ desktop: authorsLength > 1 ? 12 : 7, tablet: 8, phone: 4 }}
				style="display:flex; flex-direction:column; gap: 1rem; margin-right:2rem;"
			>
				<h1 class="title mdc-typography--headline5">{submission.title}</h1>

				<div class="submission-details">
					<InfoPill
						text={Submission[submission.submissionType]}
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
			<Cell spanDevices={{ desktop: authorsLength > 1 ? 12 : 5, tablet: 8, phone: 4 }}>
				<LayoutGrid>
					{#each cvs as author}
					<Cell spanDevices={{ desktop: authorsLength > 1 ? 4 : 12, tablet: 8, phone: 4 }}>
						<Author {author} />					
					</Cell>
					{/each}
				</LayoutGrid>
			</Cell>
		</LayoutGrid>
	</div>
</div>

<style lang="scss">
	.title {
		font-weight: 700;
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
</style>
