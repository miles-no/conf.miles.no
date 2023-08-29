<script lang="ts">
	import type { IConference } from '../../../model/conference';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import darkTheme from '../../../stores/theme-store';
	import IconButton, { Icon } from '@smui/icon-button';

	export let conference: IConference;
	export let email: string;

	let interestedList = conference.employees?.filter((person) => person.status === 'interested');
	let attendingList = conference.employees?.filter((person) => person.status === 'attending');

	let interestedPanelOpen =
		interestedList?.map((employee) => employee.email).includes(email) ?? false;
	let attendingPanelOpen =
		attendingList?.map((employee) => employee.email).includes(email) ?? false;
</script>

<div class={`${$darkTheme ? 'dark-theme-accordion-container' : 'accordion-container'} `}>
	<Accordion>
		<Panel bind:open={interestedPanelOpen} aria-expanded={interestedPanelOpen}>
			<Header>
				<p class="visuallyhidden">{`Antall interessert: ${interestedList?.length ?? 0}`}</p>
				<p aria-hidden={true}>
					{`Interessert (${interestedList?.length ?? 0})`}
				</p>
				<IconButton slot="icon" pressed={interestedPanelOpen} tabindex={-1} aria-hidden="true">
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
		<Panel bind:open={attendingPanelOpen} aria-expanded={attendingPanelOpen}>
			<Header>
				<p class="visuallyhidden">{`Antall påmeldt: ${attendingList?.length ?? 0}`}</p>
				<p aria-hidden={true}>
					{`Påmeldt (${attendingList?.length ?? 0})`}
				</p>
				<IconButton slot="icon" pressed={attendingPanelOpen} tabindex={-1} aria-hidden={true}>
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
