<script lang="ts">
	import Select, { Option } from '@smui/select';
	import { Status, type StatusKeyType } from '../../../enums/status';
	import Spinner from '../../spinner/spinner.svelte';

	export let title: string = 'Status';
	export let flexType: 'column' | 'row' = 'column';
	export let selectedStatus: StatusKeyType | undefined = undefined;
	export let disabled: boolean = false;

	export let onSelectStatus: (event: any) => void;

	const statusEntries = Object.entries(Status);
</script>

<div class="container">
	<div class={`conference-status ${flexType}`}>
		<label for="status">{title}</label>
		<div class="conference-status-select-container">
			<Select
				id="status"
				class="select-with-background conference-status-select-container-select"
				variant="outlined"
				value={selectedStatus}
				{disabled}
			>
				<Option value={undefined}>Velg status</Option>
				{#each statusEntries as [statusKey, statusValue]}
					<Option value={statusKey} on:click={onSelectStatus}>{statusValue}</Option>
				{/each}
			</Select>
		</div>
	</div>
	{#if disabled}
		<div class="loader-container">
			<Spinner size={22} />
			<p class="grey-text">Oppdatering pågår</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		margin: 0;
		padding: 0;
		.loader-container {
			display: flex;
			align-items: center;
			justify-content: end;
			gap: 0.5rem;
			p {
				font-size: 0.9rem;
				font-weight: bold;
				margin: 0;
			}
		}
		.conference-status {
			display: flex;
			gap: 0.7rem;
			font-weight: 600;
			align-items: center;
		}

		.conference-status-select-container {
			width: 100%;
			:global(.conference-status-select-container-select) {
				border-radius: 5px;

				:global(.mdc-select__anchor) {
					height: 2.5rem;
				}
			}
		}
	}
</style>
