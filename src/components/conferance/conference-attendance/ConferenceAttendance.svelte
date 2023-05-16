<script lang="ts">
	import type { IExternalConference } from '../../../model/external-conference';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';

	export let externalConference: IExternalConference;

	const interestedPerson = externalConference.employees.filter(
		(person) => person.status === 'interested'
	);
	const registeredPerson = externalConference.employees.filter(
		(person) => person.status !== 'interested'
	);
</script>

<div class="conference-attendance">
	<Accordion>
		<Panel>
			<Header>{`Interessert (${interestedPerson?.length})`}</Header>
			<Content>
				{#if interestedPerson && interestedPerson.length > 0}
					<ul>
						{#each interestedPerson as person}
							<li>{person.email}</li>
						{/each}
					</ul>
				{:else}
					<p>Ingen interesserte</p>
				{/if}
			</Content>
		</Panel>
		<Panel>
			<Header>{`Påmeldt (${registeredPerson?.length})`}</Header>
			<Content>
				{#if registeredPerson && registeredPerson.length > 0}
					<ul>
						{#each registeredPerson as person}
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
