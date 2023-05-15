<script lang="ts">
	import type { IExternalConference } from '../../../model/external-conference';
	import Paper from '@smui/paper';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';

	export let externalConference: IExternalConference;

	const interestedPerson = externalConference.employees.filter(
		(person) => person.status === 'interested'
	);
	const registeredPerson = externalConference.employees.filter(
		(person) => person.status !== 'interested'
	);

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<div class="conference-attendance">
	{#if innerWidth < 1166}
		<div class="accordion-container">
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
						{/if}
					</Content>
				</Panel>
				<Panel>
					<Content>
						{#if registeredPerson && registeredPerson.length > 0}
							<Header>{`Påmeldt (${registeredPerson?.length})`}</Header>
							<ul>
								{#each registeredPerson as person}
									<li>{person.email}</li>
								{/each}
							</ul>
						{/if}
					</Content>
				</Panel>
			</Accordion>
		</div>
	{:else}
		<div class="paper-container">
			<Paper class="paper" square variant="outlined">
				<h2>{`Interessert (${interestedPerson?.length})`}</h2>
				<Content>
					{#if interestedPerson && interestedPerson.length > 0}
						<ul>
							{#each interestedPerson as person}
								<li>{person.email}</li>
							{/each}
						</ul>
					{/if}
				</Content>
			</Paper>
			<Paper class="paper" square variant="outlined">
				<Content>
					<h2>{`Påmeldt (${registeredPerson?.length})`}</h2>
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
			</Paper>
		</div>
	{/if}
</div>

<style lang="scss">
	h2 {
		font-size: 1rem;
		font-weight: 600;
	}

	ul {
		padding: 0;
		li {
			list-style: none;
		}
	}

	.paper-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		:global(.paper) {
			padding: 0 1rem;
		}
	}
</style>
