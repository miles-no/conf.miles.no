<script lang="ts">
	import type { IAuthor } from '../../../model/author';
	import Avatar from '../Avatar.svelte';

	export let authorList: IAuthor[];
</script>

<ul class="stack-avatars">
	{#each authorList as author}
		<li class="stack-avatars-tooltip">
			<Avatar imageUrl={author.imageUrl} alt={author.image.alt} />
			<span class="tooltiptext">{author.name}</span>
		</li>
	{/each}
</ul>

<style lang="scss">
	.stack-avatars {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.stack-avatars-tooltip {
		position: relative;
		display: inline-block;
	}

	.stack-avatars-tooltip .tooltiptext {
		visibility: hidden;
		min-width: 12rem;
		background-color: #fff;
		color: #000;
		text-align: center;
		border-radius: 6px;
		padding: 0.3rem;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		margin-left: -60px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #fff transparent transparent transparent;
	}

	.stack-avatars-tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}
</style>
