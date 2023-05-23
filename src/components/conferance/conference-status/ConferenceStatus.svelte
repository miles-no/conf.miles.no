<script lang="ts">
	import Select, { Option } from '@smui/select';
	import { Status, type StatusKeyType } from '../../../enums/status';

	export let selectedStatus: StatusKeyType | undefined = undefined;
	export let onSelectStatus: (event: any) => void;

	const statusEntries = Object.entries(Status);
	let innerWidth = 0;

	$: label = innerWidth > 1234 ? 'Min status:' : 'Status';
</script>

<svelte:window bind:innerWidth />

<div class="conference-status">
	<label for="status">{label}</label>
	<Select
		id="status"
		name="status"
		class="conference-status-select"
		variant="outlined"
		label="Velg status"
		value={selectedStatus}
	>
		<Option value={undefined} />
		{#each statusEntries as [statusKey, statusValue]}
			<Option value={statusKey} on:click={onSelectStatus}>{statusValue}</Option>
		{/each}
	</Select>
</div>

<style lang="scss">
	p {
		margin-bottom: 0;
	}

	.conference-status {
		display: flex;
		gap: 0.7rem;
		align-items: center;
		font-weight: 600;

		:global(.conference-status-select) {
			background-color: #ffcd2957;
			border-radius: 5px;
			:global(.mdc-select__anchor) {
				height: 2.5rem;
			}
			:global(label) {
				color: #000 !important;
				letter-spacing: 1px;
			}
		}
	}
</style>
