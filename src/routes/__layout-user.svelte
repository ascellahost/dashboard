<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import UserIcon from '@inqling/svelte-icons/outline/user.svelte';
	import HomeIcon from '@inqling/svelte-icons/outline/home.svelte';
	import SettingsIcon from '@inqling/svelte-icons/outline/cog.svelte';
	import GalleryIcon from '@inqling/svelte-icons/outline/photograph.svelte';
	import ToolsIcon from '@inqling/svelte-icons/outline/menu.svelte';
	export const load: Load = ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		let user = JSON.parse(JSON.stringify(session))?.user;
		return {
			props: {
				user
			},
			stuff: {
				user
			}
		};
	};
</script>

<script lang="ts">
	import type { User } from '$lib/api_types';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import SidebarLink from '$lib/components/SidebarLink.svelte';
	export let user: User;
</script>

<div class="flex">
	<div
		class="menu bg-base-100 w-64 border-l-8 border-primary text-white text-lg min-h-screen flex flex-col"
	>
		<ul class="pt-4">
			<div class="flex place-items-center font-bold">
				<img src="https://ascella.host/logo.svg" class="h-16 w-16" alt="" /> Ascella.host
			</div>
			<li class="menu-title">
				<span>Dashboard</span>
			</li>
			<SidebarLink icon={HomeIcon} text="Hi" href="/" />
			<SidebarLink icon={UserIcon} text="User" href="/user" />
			<SidebarLink icon={SettingsIcon} text="Settings" href="/settings" />
			<SidebarLink icon={GalleryIcon} text="Gallery" href="/gallery" />
			<SidebarLink icon={ToolsIcon} text="Tools" href="/tools" />
			<li class="menu-title">
				<span class="mt-auto">Links</span>
			</li>
			<ExternalLink href="/" text={'Website'} />
			<ExternalLink href="/" text={'Docs'} />
			<ExternalLink href="/" text={'Discord'} />
			<ExternalLink href="/" text={'Github'} />
		</ul>
	</div>
	<div class="w-full">
		<div class="bg-base-300 flex py-2 px-1"><div class="ml-auto">{user.name}</div></div>
		<div class="md:grid-cols-4 grid-cols-2 grid w-full bg-slate-800 gap-2 pl-2 grid-rows-6 pt-2">
			<slot />
		</div>
	</div>
</div>
