<script lang="ts">
	import type { IExternalConference } from '../../../model/external-conference';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import darkTheme from '../../../stores/theme-store';
	import IconButton, { Icon } from '@smui/icon-button';

	export let conference: IExternalConference;

	$: interestedList = conference.employees.filter((person) => person.status === 'interested');
	$: attendingList = conference.employees.filter((person) => person.status === 'attending');

	let panel1Open = false;
	let panel2Open = false;
</script>

<div class={`${$darkTheme ? 'dark-theme-accordion-container' : 'accordion-container'} `}>
	<Accordion>
		<Panel bind:open={panel1Open} aria-expanded={panel1Open}>
			<Header>
				<p class="visuallyhidden">{`Antall interessert: ${interestedList?.length}`}</p>
				<p aria-hidden={true}>
					{`Interessert (${interestedList?.length})`}
				</p>
				<IconButton slot="icon" pressed={panel1Open} tabindex={-1} aria-hidden="true">
					<Icon class="material-icons" on aria-label="">expand_less</Icon>
					<Icon class="material-icons" aria-label="">expand_more</Icon>
				</IconButton>
			</Header>
			<Content>
				{#if interestedList && interestedList.length > 0}
					<ul>
						{#each interestedList as person}
							<li>{person.email}</li>
						{/each}
					</ul>
				{:else}
					<p>Ingen interesserte</p>
				{/if}
			</Content>
		</Panel>
		<Panel bind:open={panel2Open} aria-expanded={panel2Open}>
			<Header>
				<p class="visuallyhidden">{`Antall påmeldt: ${attendingList?.length}`}</p>
				<p aria-hidden={true}>
					{`Påmeldt (${attendingList?.length})`}
				</p>
				<IconButton slot="icon" pressed={panel2Open} tabindex={-1} aria-hidden={true}>
					<Icon class="material-icons" on aria-label="">expand_less</Icon>
					<Icon class="material-icons" aria-label="">expand_more</Icon>
				</IconButton>
			</Header>
			<Content>
				{#if attendingList && attendingList.length > 0}
					<ul>
						{#each attendingList as person}
							<li>{person.email}</li>
						{/each}
					</ul>
				{:else}
					<p>Ingen påmeldte</p>
				{/if}
			</Content>
		</Panel>
	</Accordion>
</div>

<style lang="scss">
	@use '../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	.dark-theme-accordion-container {
		@include boxshadow();
	}
	p {
		margin: 0;
	}

	ul {
		padding: 0;
		li {
			list-style: none;
		}
	}
</style>
