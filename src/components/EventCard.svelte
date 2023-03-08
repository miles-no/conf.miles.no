<script>
	import { formatConferenceDateRange } from '$lib';
	import Card, {
		Content,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionButtons,
		ActionIcons
	} from '@smui/card';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';

	export let event;
	const date = formatConferenceDateRange(event.startDate, event.endDate);
</script>

<div class="card-container">
	<Card href="konferanser/{event.slug}">
		<Media class="card-media-16x9" aspectRatio="16x9">
			<MediaContent
				><img
					style="width: 100%;"
					src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"
					alt=""
				/></MediaContent
			>
		</Media>

		<Content>
			<div class="title mdc-typography--headline6">{event.title}</div>
			<div class="mdc-typography--body1">{date}</div>
		</Content>

		<Actions>
			<ActionButtons>
				<Button on:click={() => console.log('action clicked')} href="konferanser/{event.slug}">
					<Label>Les mer</Label>
				</Button>
			</ActionButtons>
			<ActionIcons>
				<IconButton
					class="material-icons"
					on:click={() => console.log('share clicked')}
					title="Share">share</IconButton
				>
			</ActionIcons>
		</Actions>
	</Card>
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
