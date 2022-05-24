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
	export let user: User;
</script>

<!-- <GridItem>
	<div slot="title">Language</div>
	<div slot="text">{user.lang}</div>
</GridItem> -->

<GridItem cols={'3'} rows={'2'}>
	<div class="flex flex-col justify-center items-center">
		<img
			class="w-24 mask mask-squircle"
			src="https://cdn.discordapp.com/avatars/336465356304678913/f21cf50bc5e81ddc96689161175cfe78.jpg?size=2048"
			alt=""
		/>
		<div>{user.name}</div>
		<hr />
		<p>Upload key</p>
		<pre>{user.upload_key}</pre>
		<hr />
		<p>Language {user.lang}</p>
		<p>Invite Code {user.invite_code}</p>
		<p>Domain {user.domain}</p>
		<p>Discord Id {user.discord_id}</p>
	</div>
</GridItem>
