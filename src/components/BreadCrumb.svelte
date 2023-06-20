<script lang="ts">
	import type { IEvent } from '../model/event';
	import type { ISubmission } from '../model/submission';
	export let event: IEvent;
	export let submission: ISubmission;

	$: path = event._type === 'event' ? `/arrangement/${event.slug}` : `/konferanser/${event.slug}`;
</script>

<div class="breadcrumb-container">
	<nav style="--bs-breadcrumb-divider: '@';" aria-label="breadcrumb">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="/">Miles</a></li>
			{#if event}
				<li
					class="breadcrumb-item"
					class:active={!submission}
					aria-current={submission ? null : 'page'}
				>
					<a href={path}>{event.title}</a>
				</li>
			{/if}
			{#if submission}
				<li class="breadcrumb-item" aria-current="page" class:active={submission}>
					<a href={`${path}/agenda/${submission.slug}`}>{submission.title}</a>
				</li>
			{/if}
		</ol>
	</nav>
</div>

<style>
	.breadcrumb-container {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}
	.breadcrumb {
		justify-content: center;
	}
	.breadcrumb li > a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	.breadcrumb li:before {
		font-weight: 900;
	}
</style>
