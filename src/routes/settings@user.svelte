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
	export let user: User;
	export let domains: Structs['Domain'][];
	let current_domain: Structs['Domain'] | undefined;
	let current_subdomain: string | undefined;

	let loading = false;
	let error: undefined | string = undefined;

	let title: string;
	let description: string;
	let color: string;
	let author: string;
	let url_append: string;
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
		class={`btn ${loading ? 'loading' : ''}`}
		on:click|preventDefault={async (e) => {
			loading = true;
			await fetch('/api/domain', {
				method: 'post',
				headers: {
					authorization: `${user.upload_key}`
				},
				body: JSON.stringify({
					auth: user.upload_key,
					domain: `https://${
						current_subdomain && current_domain?.apex
							? `${current_subdomain}.${current_domain}`
							: current_domain?.domain
					}`
				})
			});
			loading = false;
		}}
	>
		Submit
	</button>
</GridItem>
<GridItem rows={'2'} cols={'2'}>
	<div class="grid gap-4 grid-cols-2">
		<input
			type="text"
			placeholder="title"
			class="input input-bordered input-secondary col-span-2"
			bind:value={title}
		/>
		<input
			type="text"
			placeholder="description"
			class="input input-bordered input-secondary"
			bind:value={description}
		/>
		<input
			type="text"
			placeholder="color (HEX)"
			class="input input-bordered input-secondary"
			bind:value={color}
		/>
		<input
			type="text"
			placeholder="author"
			class="input input-bordered input-secondary"
			bind:value={author}
		/>
		<input
			type="text"
			placeholder="url apppend"
			class="input input-bordered input-secondary"
			bind:value={url_append}
		/>
	</div>
	<button
		class={`btn mt-4 ${loading ? 'loading' : ''}`}
		on:click={async () => {
			loading = true;
			await do_req(fetch, 'embed', {
				method: 'post',
				headers: {
					authorization: `${user.upload_key}`
				},
				body: JSON.stringify({
					author,
					color,
					description,
					url: url_append,
					title
				})
			});
			loading = false;
		}}>Update</button
	>
</GridItem>
