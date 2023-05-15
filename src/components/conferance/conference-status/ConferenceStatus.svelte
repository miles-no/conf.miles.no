<script lang="ts">
	import Select, { Option } from '@smui/select';
	import { Status, type StatusType } from '../../../enums/status';

	const statusEntries = Object.entries(Status);
	export let selectedStatus: StatusType | undefined = undefined;
</script>

<div class="conference-status">
	<p>Min status:</p>
	<Select
		class="conference-status-select"
		variant="outlined"
		label="Velg status"
		bind:value={selectedStatus}
	>
		<Option value="" />
		{#each statusEntries as [statusKey, statusValue]}
			<Option value={statusKey}>{statusValue}</Option>
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
			width: 70%;
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
