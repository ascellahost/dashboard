<script context="module" lang="ts">
	import GridItem from '$lib/components/GridItem.svelte';
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ stuff }) => {
		return {
			props: {
				user: stuff.user
			}
		};
	};
</script>

<script lang="ts">
	import type { User } from '$lib/api_types';
	import EmptyGridItem from '$lib/components/EmptyGridItem.svelte';
	export let user: User;
	import { do_req } from '$lib/api';

	import { onMount } from 'svelte';

	$: images = [] as { id: number; vanity: string }[];
	let page = 0;
	onMount(async () => {
		images = await do_req<'SimpleImages'>(fetch, `images`, {
			method: 'post',
			body: JSON.stringify({ skip: 0 }),
			headers: {
				authorization: `${user.upload_key}`
			}
		});
		console.log(images);
	});
	let updateShit = async () => {
		page += 1;
		images = await do_req<'SimpleImages'>(fetch, `images`, {
			method: 'post',
			body: JSON.stringify({ skip: page * 20 }),
			headers: {
				authorization: `${user.upload_key}`
			}
		});
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	};
</script>

<!-- <div class="flex w-full h-full"> -->
{#each images as image}
	<!-- <div class="h-96 w-96"> -->
	<a href={`https://ascella.host/${image.vanity}`} rel="external" target="_blank">
		<img
			src={`https://ascella.wtf/v2/ascella/view/${image.vanity}.png`}
			alt=""
			class="object-contain w-full h-full max-h-72"
		/>
	</a>

	<!-- </div> -->
{/each}
<!-- </div> -->
<div>
	<button on:click={updateShit} class="btn btn-accent">Next!</button>
</div>
