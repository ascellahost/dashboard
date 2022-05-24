<script lang="ts">
	import { do_req } from '$lib/api';
	let auth: string;
</script>

<p>Login plz</p>
<input bind:value={auth} />
<p>After putting header foprm profuile login plz</p>
<button
	on:click={async () => {
		await fetch('/api/login', {
			method: 'post',
			body: JSON.stringify({
				auth: auth
			})
		});
	}}>Test</button
>
