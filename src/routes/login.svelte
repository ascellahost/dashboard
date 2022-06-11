<script context="module" lang="ts">
	// TODO: add random colors
	// TODO: add embed links

	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ session }) => {
		if (session.user?.discord_id) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	let id: string;
	let pass: string;
	let loading = false;
	let failed = false;
</script>

<div class="flex flex-col justify-center items-center">
	<div class="grid place-items-center prose flex-col w-full p-2 md:p-8 ">
		<form class="p-4 rounded-md bg-accent/25 px-20">
			<h3>Log In</h3>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Use /profile in the disscord for your id and password</span>
			</label>
			<div class="flex justify-center flex-col gap-4">
				<input
					bind:value={id}
					type="text"
					placeholder="ID"
					class="input input-bordered input-accent w-full max-w-xs"
				/>
				<input
					bind:value={pass}
					type="password"
					placeholder="Password"
					class="input input-bordered input-accent w-full max-w-xs"
				/>
			</div>
			{#if failed}
				<p>Failed to log in please check your credentials</p>
			{/if}
			<button
				class={`btn glass w-full mt-4 ${loading ? 'loading' : ''}`}
				type="button"
				on:submit|preventDefault={() => {}}
				on:click={async () => {
					loading = true;
					failed = false;
					let res = await fetch('/api/login', {
						method: 'post',
						body: JSON.stringify({
							id,
							pass
						})
					});
					if (res.ok) {
						goto('/');
						window.location.href = "/"
					} else {
						failed = true;
						loading = false;
					}
				}}>Log in</button
			>
		</form>
	</div>
</div>
