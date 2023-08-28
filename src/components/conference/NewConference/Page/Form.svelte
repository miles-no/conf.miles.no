<script>
	import NameUrlLocationRow from './NameUrlLocationRow.svelte';
	import CheckboxRow from '../CheckboxRow.svelte';
	import { pending } from '../stores/stores';
	import DatePickersAndPriceRow from './DatePickersRow.svelte';
	import Description from './Description.svelte';
	import ImageRow from '../ImageRow.svelte';
</script>

<form class="new-conf-edit" class:pending={$pending}>
	<NameUrlLocationRow />
	<ImageRow />
	<DatePickersAndPriceRow />
	<Description />
	<CheckboxRow />
</form>

<style>
	form {
		width: 100%;
		border-right: 1px solid #bcbcbc;
		padding-right: 42px;
	}

	.pending {
		pointer-events: none;
		opacity: 45%;
	}
</style>
