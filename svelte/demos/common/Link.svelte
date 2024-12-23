<script>
	import { link } from "svelte-spa-router";
	import active from "svelte-spa-router/active";

	let { data, skin } = $props();
</script>

<a use:link={data[0].replace(":skin", skin)} use:active href="/" class="demo">
	{data[1]}
</a>

<style>
	.demo {
		height: 36px;
		line-height: 36px;
		padding-left: 24px;
		border-left: 5px solid transparent;
		color: #5f5f5f;
		list-style: none;
		cursor: pointer;
		text-decoration: none;
		display: block;
	}

	:global(.demo.active),
	.demo:hover {
		border-left-color: #2095f3;
		background-color: #ebebeb9c;
		font-weight: 500;
		cursor: pointer;
	}
</style>
