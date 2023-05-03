<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { Location } from '../../../enums/location';
	import type { LocationType } from '../../../enums/location';

	export let selectedCity: LocationType | undefined = undefined;
	const locations: LocationType[] = Object.values(Location);
</script>

<div class="location-button-group-container">
	<p>Lokasjon</p>
	<div class="location-button-group-container-options">
		{#each locations as city}
			<Button
				ripple={false}
				variant="outlined"
				class="location-button-group-container-options-btn button-shaped-round"
				on:click={() => (selectedCity = city)}
			>
				<Label>{city}</Label>
			</Button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../styles/colors' as *;
	.location-button-group-container {
		display: flex;
		align-self: flex-end;
		gap: 2rem;
		width: 50%;

		p {
			letter-spacing: 1.3px;
			font-weight: 600;
		}
	}

	.location-button-group-container-options {
		display: flex;
		gap: 0.4rem;
	}

	* :global(.location-button-group-container-options-btn) {
		border-color: $red;
		color: $red;
		text-transform: none;
	}
</style>
