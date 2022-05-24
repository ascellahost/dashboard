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
	import { do_req } from '$lib/api';
	import EmptyGridItem from '$lib/components/EmptyGridItem.svelte';
	let stats = do_req<'AscellaStats'>(fetch, 'stats.json', { method: 'get' });
	export let user: User;
</script>

<GridItem cols={'2'} rows={'1'}>
	<div slot="title">MOTD</div>
	<div slot="text">Stay awesome</div>
</GridItem>
<GridItem cols={'2'} rows={'1'}>
	<div slot="title">Welcome</div>
	<div slot="text">{user.name}</div>
</GridItem>
{#await stats}
	<GridItem cols={'2'} rows={'2'}>
		<div slot="title">Loading stats</div>
	</GridItem>
{:then result}
	<GridItem>
		<div slot="title">Total Users</div>
		<div slot="text">{result.total_users}</div>
	</GridItem>
	<GridItem>
		<div slot="title">Domain Count</div>
		<div slot="text">{result.total_domains}</div>
	</GridItem>

	<EmptyGridItem cols="2" rows="2" />
	<GridItem>
		<div slot="title">Total Uploads</div>
		<div slot="text">{result.total_uploads}</div>
	</GridItem>
	<GridItem>
		<div slot="title">Total Image Views</div>
		<div slot="text">{result.total_views}</div>
	</GridItem>
{/await}
