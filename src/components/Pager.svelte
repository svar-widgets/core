<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let pageSize = 20;
	export let total = 0;
	export let value = 1;

	let pageCount = 0,
		from = 0,
		to = 0;
	$: pageCount = Math.ceil(total / pageSize);
	$: {
		from = (value - 1) * pageSize;
		to = Math.min(value * pageSize, total);
		setTimeout(() => {
			dispatch("change", { value, from, to });
		}, 1);
	}

	function setActivePage(id) {
		switch (id) {
			case "first":
				value = 1;
				break;

			case "prev":
				value = Math.max(1, value - 1);
				break;

			case "next":
				value = Math.min(+value + 1, pageCount);
				break;

			case "last":
				value = pageCount;
				break;

			default:
				break;
		}
	}
</script>

<div class="wx-pager">
	<div class="wx-left">
		<span>Rows per page: </span>
		<input type="text" bind:value={pageSize} />
	</div>

	<div class="wx-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="wx-icon wxi-angle-dbl-left"
			on:click={() => setActivePage("first")}
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="wx-icon wxi-angle-left"
			on:click={() => setActivePage("prev")}
		/>
		<input type="text" bind:value />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="wx-icon wxi-angle-right"
			on:click={() => setActivePage("next")}
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="wx-icon wxi-angle-dbl-right"
			on:click={() => setActivePage("last")}
		/>
	</div>

	<div class="wx-right">Total pages: {pageCount}</div>
</div>

<style>
	.wx-pager {
		display: flex;
		gap: var(--wx-padding);
		align-items: center;
		padding: var(--wx-padding);
	}

	input {
		display: block;
		width: 50px;
		height: var(--wx-input-height);
		padding: var(--wx-input-padding);
		outline: none;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
	}
	input:focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}

	.wx-icon {
		cursor: pointer;
		padding: var(--wx-input-padding);
		border-radius: var(--wx-input-border-radius);
		font-size: var(--wx-icon-size);
		line-height: 1;
		color: var(--wx-color-link);
	}
	.wx-icon:before {
		display: block;
	}
	.wx-icon:hover {
		background-color: var(--wx-background-hover);
	}

	.wx-left,
	.wx-center,
	.wx-right {
		display: flex;
		align-items: center;
		gap: var(--wx-padding);
	}
</style>
