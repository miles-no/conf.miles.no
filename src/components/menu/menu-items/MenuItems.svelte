<script lang="ts">
	import { page } from '$app/stores';
	import menuItems from '../../../constant/menu-items';
	import classNames from 'classnames';

	export let className: string | undefined = undefined;
	$: currentRoute = $page.route.id;
</script>

<ul class={classNames('menu-items-container', className)}>
	{#each menuItems as navItem}
		<li class={currentRoute === navItem.href ? 'menu-item--active' : ''}>
			<a href={navItem.href}>{navItem.label}</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.menu-items-container {
		display: flex;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			padding-right: 0.5rem;
			border-right: 1px solid lightgray;
		}

		.menu-item--active {
			font-weight: 600;
		}
	}
</style>
