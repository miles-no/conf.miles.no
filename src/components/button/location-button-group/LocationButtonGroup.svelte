<script lang="ts">
	import Chip, { Set, Text } from '@smui/chips';
	import { Location } from '../../../enums/location';
	import type { LocationType } from '../../../enums/location';
	export let selectedCity: LocationType | undefined = undefined;
	const locations: LocationType[] = Object.values(Location);
</script>

<div class="location-chips-container">
	<span>Lokasjon</span>
	<div class="location-chips-container-options">
		<Set chips={locations} let:chip>
			<Chip
				{chip}
				ripple={false}
				class={`chip-container ${selectedCity === chip ? 'chip--selected' : ''}`}
				selected={selectedCity === chip}
				on:click={() => (selectedCity = chip)}
			>
				<Text>{chip}</Text>
			</Chip>
		</Set>
	</div>
</div>

<style lang="scss">
	@use '../../../styles/colors' as *;
	.location-chips-container {
		display: flex;
		align-self: flex-end;
		align-items: center;
		gap: 2rem;
		width: 50%;

		span {
			letter-spacing: 1.3px;
			font-weight: 600;
		}
	}
</style>
