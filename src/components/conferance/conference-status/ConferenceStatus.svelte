<script lang="ts">
	import Select, { Option } from '@smui/select';
	import { Status, type StatusKeyType } from '../../../enums/status';

	export let title: string = 'Status';
	export let flexType: 'column' | 'row' = 'column';
	export let selectedStatus: StatusKeyType | undefined = undefined;
	export let onSelectStatus: (event: any) => void;

	const statusEntries = Object.entries(Status);
</script>

<div class={`conference-status ${flexType}`}>
	<label for="status">{title}</label>
	<div class="conference-status-select-container">
		<Select
			id="status"
			class="select-with-background conference-status-select-container-select"
			variant="outlined"
			value={selectedStatus}
		>
			<Option value={undefined} />
			{#each statusEntries as [statusKey, statusValue]}
				<Option value={statusKey} on:click={onSelectStatus}>{statusValue}</Option>
			{/each}
		</Select>
	</div>
</div>

<style lang="scss">
	p {
		margin-bottom: 0;
	}

	.conference-status {
		display: flex;
		gap: 0.7rem;
		font-weight: 600;
		height: 5rem;
		align-items: center;
	}

	.conference-status-select-container {
		width: 100%;
		:global(.conference-status-select-container-select) {
			// background-color: #ffeeb7;
			border-radius: 5px;
			width: 100%;

			:global(.mdc-select__anchor) {
				height: 2.5rem;
			}
		}
	}
</style>
