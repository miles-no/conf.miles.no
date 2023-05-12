<script>
	export let activityType;
	const ColorMapping = {
		Smidig: '#D32F2F',
		Utvikling: '#2E7D32',
		'UX/Design': '#9C27B0'
	};
</script>

<div class="activityTypeTag" style={`border: 1px solid ${ColorMapping[activityType]}`}>
	<div class="mdc-typography--body1" style={`color: ${ColorMapping[activityType]}`}>
		{activityType}
	</div>
</div>

<style>
	.activityTypeTag {
		border-radius: 100px;
		width: auto;
		height: auto;
		border: 1px solid;
		padding: 0.25rem 0.5rem;
	}
</style>
