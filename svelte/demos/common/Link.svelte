<script>
	import { link, location } from "svelte-spa-router";

	let { data, skin, onclick: click } = $props();

	const fullPath = $derived(data[0].replace(":skin", skin));
	const isActive = $derived($location.startsWith(fullPath));
</script>

<a
	use:link={fullPath}
	href="/"
	class="demo"
	class:active={isActive}
	onclick={() => isActive && click?.()}
>
	{data[1]}
</a>

<style>
	.demo {
		display: flex;
		align-items: center;
		height: 37px;
		font-weight: 400;
		padding-left: 16px;
		border-left: 4px solid transparent;
		color: #595b66;
		list-style: none;
		cursor: pointer;
		text-decoration: none;
	}

	.demo.active {
		border-left-color: var(--demo-framework-color);
	}

	.demo.active,
	.demo:hover {
		font-weight: 500;
		color: #42454d;
		background-color: #f1f1f1;
	}
</style>
