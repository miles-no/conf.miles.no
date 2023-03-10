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
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanityClient';

	export let event;
	const date = formatConferenceDateRange(event.startDate, event.endDate);

	const builder = imageUrlBuilder(client);

	function urlFor(source) {
		return builder.image(source);
	}
</script>

<div class="card-container">
	<a href="konferanser/{event.slug}">
		<Card>
			<Media class="card-media-16x9" aspectRatio="16x9">
				<MediaContent>
					<img
						style="width: 100%; height: 100%;"
						alt=""
						src={event.imageUrl
							? urlFor(event.imageUrl).size(500, 300).quality(100).url()
							: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
						height="300"
						width="500"
					/>
				</MediaContent>
			</Media>

			<Content>
				<div class="title mdc-typography--headline6">
					{event.title}
				</div>
				<div class="mdc-typography--body1">{date}</div>
			</Content>

			<Actions>
				<ActionButtons>
					<Button on:click={() => console.log('action clicked')} href="konferanser/{event.slug}">
						<Label>Les mer</Label>
					</Button>
				</ActionButtons>
				<!-- <ActionIcons>
				<IconButton
					class="material-icons"
					on:click={() => console.log('share clicked')}
					title="Share">share</IconButton
				>
			</ActionIcons> -->
			</Actions>
		</Card>
	</a>
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	a {
		text-decoration: none;
	}
</style>
