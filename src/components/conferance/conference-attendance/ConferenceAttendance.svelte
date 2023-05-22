<script lang="ts">
	import type { IExternalConference } from '../../../model/external-conference';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';

	export let conference: IExternalConference;

	$: interestedList = conference.employees.filter((person) => person.status === 'interested');
	$: attendingList = conference.employees.filter((person) => person.status === 'attending');
</script>

<div class="conference-attendance">
	<Accordion>
		<Panel>
			<Header>{`Interessert (${interestedList?.length})`}</Header>
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
		<Panel>
			<Header>{`Påmeldt (${attendingList?.length})`}</Header>
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
	ul {
		padding: 0;
		li {
			list-style: none;
		}
	}
</style>
