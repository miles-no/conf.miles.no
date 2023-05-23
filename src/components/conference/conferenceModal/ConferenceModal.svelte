<script>
	import ActivityTypeTag from '../ActivityTypeTag.svelte';
	import { formatConferenceDateRange } from '$lib';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanityClient';
	import Button, { Label } from '@smui/button';
	import { PortableText } from '@portabletext/svelte';
	import Dialog, { Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { ConferenceEmployeeStatus } from './conferenceEmployeeStatusEnum';
	/**
	 * @type {boolean}
	 */
	export let open;

	/**
	 * @type {{ startDate: any; endDate: any; employees: any[]; _id: any; imageUrl: any; title: any; location: any; url: any; price: any; categoryTag: any; description: any; }}
	 */
	export let conference;
	export let user;

	const date = formatConferenceDateRange(conference.startDate, conference.endDate);
	const builder = imageUrlBuilder(client);

	function urlFor(source) {
		return builder.image(source);
	}

	function createFormElement(name, value) {
		const element = document.createElement('input');
		element.type = 'hidden';
		element.name = name;
		element.value = value;
		return element;
	}

	let key = conference.employees?.find((e) => e.email === user.email)?.status || 'notGoing';
	$: selected = key;

	async function handleSubmit() {
		const form = document.createElement('form');
		const docId = createFormElement('conferenceId', conference._id);
		const status = createFormElement('status', selected);

		form.appendChild(docId);
		form.appendChild(status);

		let data = new FormData(form);
		let result;

		const response = await fetch('?/updateStatus', {
			method: 'POST',
			body: data
		});
		result = deserialize(await response.text());

		/** @type {import('@sveltejs/kit').ActionResult} */
		if (result) {
			if (result.type === 'success') {
				// re-run all `load` functions, following the successful update
				await invalidateAll();
			}
			applyAction(result);
		}
	}
	const statusEntries = Object.entries(ConferenceEmployeeStatus);
	console.log(statusEntries);
</script>

<Dialog bind:open noContentPadding sheet aria-describedby="sheet-no-padding-content">
	<Content id="sheet-no-padding-content">
		<IconButton action="close" class="material-icons">close</IconButton>
		<div class="imageWrapper">
			<img
				style="width: 100%; height: 100%;"
				alt=""
				src={conference.imageUrl
					? urlFor(conference.imageUrl).size(900, 300).quality(100).url()
					: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
				height="300"
				width="500"
			/>
		</div>
		<div class="content">
			<h1>{conference.title}</h1>
			<div class="compactInfo">
				<div class="info">
					<div class="mdc-typography--body1">{date}</div>
					<div class="mdc-typography--body1">{conference.location}</div>
					<div class="mdc-typography--body1">earlybird 1 mars</div>
					{#if conference.url}
						<a href={conference.url}>{conference.url}</a>
					{/if}
					<div class="mdc-typography--body1">{conference.price}</div>
				</div>
				<div class="tagWrapper">
					{#each conference.categoryTag as activityType}
						<ActivityTypeTag {activityType} />
					{/each}
				</div>
			</div>
			<div>
				{#if conference.description}
					<PortableText value={conference.description} />
				{/if}
			</div>
			<h5>Min status:</h5>
			<div class="actionWrapper">
				<div>
					<select bind:value={selected} on:change={handleSubmit}>
						{#each statusEntries as [statusKey, statusValue]}
							<option value={statusKey}>
								{statusValue}
							</option>
						{/each}
					</select>
				</div>
				<Button variant="raised">
					<Label>Se flere detaljer</Label>
				</Button>
			</div>
		</div>
	</Content>
</Dialog>

<style>
	.imageWrapper {
		height: 200px;
	}
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		padding: 2rem;
	}
	.compactInfo {
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
		padding: 1rem 0.5rem;
	}
	.info {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 2rem;
	}
	.tagWrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-width: 100%;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.actionWrapper {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>