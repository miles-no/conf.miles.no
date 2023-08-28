<!-- TODO: Much of this is copied and only slightly adapted from src/components/conference/conferenceModal/ConferenceModal.svelte .
           In order to DRY, extract and nest a common component?
           Until then, keep them up to date wherever needed. -->

<script lang="ts">
    import {getMinimalPortableText, urlFor} from "../../../../utils/sanityclient-utils.js";
    import ConferenceInformation from "../../conference-information/ConferenceInformation.svelte";
    import ConferenceCategoryTag from "../../../tag/conference-category-tag/ConferenceCategoryTag.svelte";
    import {PortableText} from "@portabletext/svelte";
    import type {IPreviewConference} from "./IPreviewConference";
    import {description, endDate, location, name, selectedCategoryTags, startDate, url, image} from "../stores/stores";

	let conference: IPreviewConference;

	$: conference = {
		title: $name,
		startDate: $startDate?.toDateString(),
		endDate: $endDate?.toDateString(),
		categoryTag: $selectedCategoryTags,
		description: $description,
		location: $location,
		url: $url,
		image: $image
	};

	$: hasCompactInfo =
		!!conference.url ||
		!!conference.location ||
		!!conference.startDate ||
		!!conference.categoryTag.length;
</script>

<div class="new-conf-preview">
	<div class="imageWrapper">
		{#if $image}
			<img class="imagePreview" src={$image} alt="Conference" />
		{:else}
			<div class="previewPlaceholder">Forhåndsvisning</div>
		{/if}
	</div>

	<div class="content">
		<h1 id="modal-heading">{conference.title}</h1>
		{#if hasCompactInfo}
			<div class={'compactInfo'} class:borderTop={!!conference.title}>
				<ConferenceInformation {conference} />
				{#if conference.categoryTag.length}
					<div class="tagWrapper">
						{#each conference.categoryTag as activityType}
							<ConferenceCategoryTag category={activityType} />
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		{#if conference.description}
			<div
				class="description"
				class:borderTop={!!conference.title || hasCompactInfo || !!conference.categoryTag}
			>
				<PortableText value={getMinimalPortableText(conference.description)} />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.new-conf-preview {
		width: 400px;
		border: #000 1px solid;
		border-radius: 7px;
		margin-left: 42px;
		overflow: hidden;
	}

	@media only screen and (max-width: 430px) {
		.new-conf-preview {
			width: 100%;
		}
	}

	.imageWrapper {
		max-height: 200px;
		max-width: 400px;
	}
	.imagePreview {
		max-height: 200px;
		max-width: 400px;
		width: auto;
		height: auto;
	}
	.previewPlaceholder {
		color: #aaa;
		height: 200px;
		background-color: #ddd;
		text-align: center;
		padding-top: 90px;
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 1rem;
	}
	.borderTop {
		border-top: 1px solid grey;
	}
	.compactInfo {
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
	.description {
		padding-top: 20px;
	}
</style>
