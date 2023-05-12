<script>
	import LayoutGrid from '@smui/layout-grid';
	import Button, { Icon, Label } from '@smui/button';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import ConferenceCard from '../../components/conference/ConferenceCard/ConferenceCard.svelte';
	import Textfield from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
    import NewConferenceModal from "../../components/conference/NewConferenceModal/NewConferenceModal.svelte";

	export let data = {};
	export let externalConferences = data.externalConferences;
	let user = data.user;
	let selected = [];

	$: searchTerm = '';
	$: filterByTags =
		selected.length > 0
			? externalConferences.filter((conf) => conf.categoryTag.some((tag) => selected.includes(tag)))
			: externalConferences;

	$: filteredConferences = filterByTags.filter((conf) =>
		conf.title.toLowerCase().includes(searchTerm)
	);

	let options = [
		{
			name: 'Utvikling',
			disabled: false
		},
		{
			name: 'UX/Design',
			disabled: false
		},
		{
			name: 'Smidig',
			disabled: false
		}
	];

    let showModal = false
    function toggleShowModal() {
        console.log("!visible")
        showModal = !showModal;
    }
</script>

<div class="container">
    {#if showModal}
        <NewConferenceModal on:toggleNewConferenceModal={toggleShowModal} />
    {/if}
	<div class="topRow">
		<h1>Konferanser</h1>
		<Button variant="raised" on:click={toggleShowModal}>
			<Label>Registrer ny</Label>
		</Button>
	</div>
	<div class="filters">
		<div>
			<Textfield variant="outlined" bind:value={searchTerm} label="Søk etter konferanse">
				<Icon class="material-icons" slot="trailingIcon">search</Icon>
			</Textfield>
		</div>
		<div class="tagWrapper">
			{#each options as option}
				<div>
					<FormField>
						<Checkbox bind:group={selected} value={option.name} disabled={option.disabled} />
						<span slot="label">{option.name}{option.disabled ? ' (disabled)' : ''}</span>
					</FormField>
				</div>
			{/each}
		</div>
	</div>
	<div class="contentRow">
		<LayoutGrid>
			{#each filteredConferences as conference, index}
				<Cell>
					<ConferenceCard {conference} {index} {user} />
				</Cell>
			{/each}
		</LayoutGrid>
	</div>
</div>

<style>
	.container {
		max-width: 1320px;
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.topRow {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.filters {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
	}
	.tagWrapper {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.contentRow {
		height: auto;
		width: 100%;
		border: 1px solid red;
		padding: 1rem;
		border-radius: 1rem;
	}
</style>
