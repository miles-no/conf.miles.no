<script>
	import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
	import Card, { Content } from '@smui/card';
	export let information = {};

	// console.log(information);
</script>

<Card padded>
	<LayoutGrid style=" margin:0; ">
		{#each Object.entries(information) as value}
			<Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
				<InnerGrid>
					<Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}><div>{value[0]}:</div></Cell>
					<Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
						><div class="dataField">{value[1]}</div></Cell
					>
				</InnerGrid>
			</Cell>
		{/each}
	</LayoutGrid>
</Card>

<style>
	.dataField {
		text-align: end;
		font-weight: bold;
	}
</style>
