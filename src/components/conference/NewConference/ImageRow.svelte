<script lang="ts">
	import JustifiedRow from '../../form/JustifiedRow.svelte';
	import LabeledField from '../../form/LabeledField.svelte';
	import { image } from './stores';

	let files: FileList;

	$: if (files && files.length > 0) {
		const [file] = files;
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				image.set(reader.result as string);
			};
		}
	}

	function removeImageFromStore() {
		image.set('');
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Backspace' || event.key === 'Delete') {
			removeImageFromStore();
		}
	}
</script>

<JustifiedRow>
	<LabeledField label="Bilde" required={false} width="100%">
		{#if $image}
			<div
				class="conference-image-preview"
				title="Fjern bilde"
				role="button"
				tabindex="0"
				on:keydown={onKeyDown}
				on:click={removeImageFromStore}
			>
				<img src={$image} alt="Conference" width="100%" height="100%" />
			</div>
		{:else}
			<input bind:files type="file" id="image" name="img" accept="image/*" />
		{/if}
	</LabeledField>
</JustifiedRow>

<style>
	.conference-image-preview:hover,
	.conference-image-preview:focus {
		opacity: 25%;
	}
	.conference-image-preview img {
		max-width: 100%;
		max-height: 250px;
		height: 0 auto;
		width: 0 auto;
	}
</style>
