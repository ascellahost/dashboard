<script lang="ts">
	import { page } from '$app/stores';

	export let icon: any;
	export let href: string;
	export let text: string;
	$: active = $page.url.pathname == href;
</script>

<li class="hover-bordered">
	<a {href} class={`link no-underline link-hover ${active ? 'link-secondary' : ''}`}>
		<svelte:component this={icon} height={'1em'} />
		{text}
	</a>
</li>
