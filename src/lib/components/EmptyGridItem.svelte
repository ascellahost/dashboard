<script lang="ts">
	export let cols: string | number = 1;
	export let rows: string | number = 1;
</script>

<div style={`grid-row: span ${rows} / span ${rows};grid-column: span ${cols} / span ${cols}`} />
