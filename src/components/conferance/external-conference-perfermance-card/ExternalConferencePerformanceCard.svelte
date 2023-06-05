<script lang="ts">
	import Card, { Content } from '@smui/card';
	import type { IPerformance } from '../../../model/conference';

	export let performance: IPerformance;
</script>

<div class="card-container">
	<Card padded>
		<Content>
			<p>{performance.submission.title}</p>
		</Content>
	</Card>
</div>
