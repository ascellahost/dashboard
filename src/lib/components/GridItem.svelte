<script lang="ts">
	export let cols: string | number = 1;
	export let rows: string | number = 1;
</script>

<div
	class={`bg-base-100 w-full h-full border-base-300 border-4 rounded-md p-4 max-h-4xl`}
	style={`grid-row: span ${rows} / span ${rows};grid-column: span ${cols} / span ${cols}`}
>
	{#if $$slots.title}
		<h3 class="text-2xl text-accent"><slot name="title" /></h3>
		<p class="text-3xl"><slot name="text">Loading...</slot></p>
	{/if}
	<slot />
</div>
