<script>
	import NameAndUrlRow from './NameAndUrlRow.svelte';
	import DatePickerRow from './DatePickersRow.svelte';
	import ButtonFooterRow from './ButtonFooterRow.svelte';
	import CheckboxRow from '../CheckboxRow.svelte';
	import { pending } from '../stores';
	import ImageRow from '../ImageRow.svelte';

	export let formId;
</script>

<form id={formId} class:pending={$pending}>
	<NameAndUrlRow />
	<ImageRow />
	<DatePickerRow />
	<CheckboxRow />
	<ButtonFooterRow />
</form>

<style>
	form {
		width: 100%;
	}

	.pending {
		pointer-events: none;
		opacity: 45%;
	}
</style>
