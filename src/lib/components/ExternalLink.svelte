<script lang="ts">
	export let href: string;
	export let text: string;
</script>

<li class="hover-bordered">
	<a class="hover:!border-secondary" {href}>{text}</a>
</li>
