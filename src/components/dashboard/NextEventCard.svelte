<script lang="ts">
	import { intlFormat } from 'date-fns';
	import type { IConference } from '../../model/conference';
	import Tag from '../tag/Tag.svelte';
	import { Icon } from '@smui/button';

	export let myNextEvent: IConference;
	export let handleModal: () => void;

	$: startDate = intlFormat(
		Date.parse(myNextEvent.startDate),
		{ day: '2-digit', month: 'short', year: 'numeric' },
		{ locale: 'nb-NO' }
	);
</script>

<div class="your-next-event">
	<button on:click={handleModal}>
		<div class="your-next-event-content">
			<div class="information">
				<p class="title">{myNextEvent.title}</p>
				<div>
					<p class="startdate">
						{startDate}
					</p>
					<p class="location">
						<Icon class="material-icons">business</Icon>
						{myNextEvent.visibleTo}
					</p>
				</div>
			</div>
			<div class="status" aria-hidden={true}>
				<p>Status:</p>
				<Tag color="success" ariaHidden={true}>Påmeldt</Tag>
			</div>
		</div>
	</button>
</div>

<style lang="scss">
	@use '../../styles/colors' as *;

	.your-next-event {
		display: flex;
		flex-direction: column;

		p {
			margin-bottom: 0.3rem;
			letter-spacing: 0.3px;
		}

		button {
			border: 1px solid black;
			border-radius: 0.5rem;
			background-color: #fff;
			padding: 0.4rem;
		}

		.your-next-event-content {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			border-radius: 0.5rem;
			background-color: $light-gray;
			padding: 1rem 1rem 2.5rem 1rem;

			.information {
				display: flex;
				justify-content: space-between;
				gap: 5rem;
				.title {
					font-weight: 600;
				}

				.startdate {
					text-decoration: underline;
				}

				.location {
					display: flex;
					align-items: center;
					font-size: min(3vw, 14px);
				}
			}

			.status {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				gap: 0.5rem;
			}
		}
	}
</style>
