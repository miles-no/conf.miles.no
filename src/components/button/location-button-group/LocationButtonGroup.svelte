<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { Location } from '../../../enums/location';
	import type { LocationType } from '../../../enums/location';

	export let selectedCity: LocationType | undefined = undefined;
	const locations: LocationType[] = Object.values(Location);
</script>

<div class="location-btn-group-container">
	<span>Lokasjon</span>
	<div class="location-btn-group-container-options">
		{#each locations as city}
			<Button
				variant="outlined"
				class={`location-btn-group-container-options-btn button-shaped-round ${
					selectedCity === city ? 'mdc-ripple-upgraded--background-focused' : ''
				}`}
				on:click={() => (selectedCity = city)}
				selected={selectedCity === city}
			>
				<Label>{city}</Label>
			</Button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../styles/colors' as *;
	.location-btn-group-container {
		display: flex;
		align-self: flex-end;
		align-items: center;
		gap: 2rem;
		width: 50%;

		span {
			letter-spacing: 1.3px;
			font-weight: 600;
		}

		.location-btn-group-container-options {
			display: flex;
			gap: 0.4rem;
		}
	}
</style>
