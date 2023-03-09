<script>
	import { Icon, Label } from '@smui/common';
	import { Megaphone } from 'lucide-svelte';

	export let text = '';
	export let PillIcon = Megaphone;
</script>

<div class="info-pill"><PillIcon /><Label>{text}</Label></div>

<style>
	.info-pill {
		padding: 0.5rem;
		border: 1px solid black;
		width: fit-content;
		display: flex;
		gap: 0.5rem;
		border-radius: 15px;
	}
</style>
