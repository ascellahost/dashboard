<script context="module" lang="ts">
	import GridItem from '$lib/components/GridItem.svelte';
	import type { Load } from '@sveltejs/kit';
	import { do_req } from '$lib/api';
	export const load: Load = async ({ stuff, fetch }) => {
		let domains = (await do_req(fetch, 'domains', {})) as any[];
		return {
			props: {
				user: stuff.user,
				domains: domains?.sort((x) => (x.apex ? -1 : 1))
			}
		};
	};
</script>

<script lang="ts">
	import type { Structs, User } from '$lib/api_types';
	import EmptyGridItem from '$lib/components/EmptyGridItem.svelte';
	import { current_component } from 'svelte/internal';
	export let user: User;
	export let domains: Structs['Domain'][];
	let current_domain: Structs['Domain'] | undefined;
	let current_subdomain: string | undefined;
</script>

<GridItem>
	<div slot="title">Domain</div>
	<div slot="text">{user.domain}</div>
</GridItem>
<GridItem cols={'2'}>
	<div class="flex gap-2">
		<input
			placeholder="subdomain"
			class="input input-accent"
			disabled={!current_domain?.apex}
			bind:value={current_subdomain}
		/>
		<select
			class="select select-accent"
			required
			on:change={(event) => {
				//@ts-ignore
				current_domain = JSON.parse(event?.target?.value);
				if (!current_domain?.apex) {
					current_subdomain = '';
				}
			}}
		>
			<option disabled selected>Domain</option>
			{#each domains as domain}
				<option value={JSON.stringify(domain)}>{domain.domain}</option>
			{/each}
		</select>
	</div>

	<button
		class="btn"
		on:click|preventDefault={async (e) => {
			await fetch('/api/domain', {
				method: 'post',
				body: JSON.stringify({
					auth: user.upload_key,
					domain:
						current_subdomain && current_domain?.apex
							? `${current_subdomain}.${current_domain}`
							: current_domain?.domain
				})
			});
		}}
	>
		Submit
	</button>
</GridItem>
