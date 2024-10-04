<script>
	import { uid } from "wx-lib-dom";
	import Dropdown from "./Dropdown.svelte";

	export let colors = [
		"#00a037",
		"#df282f",
		"#fd772c",
		"#6d4bce",
		"#b26bd3",
		"#c87095",
		"#90564d",
		"#eb2f89",
		"#ea77c0",
		"#777676",
		"#a9a8a8",
		"#9bb402",
		"#e7a90b",
		"#0bbed7",
		"#038cd9",
	];
	export let value = "";
	export let id = uid();
	export let clear = true;
	export let placeholder = "";
	export let title;
	export let disabled = false;
	export let error = false;

	let popup;

	function selectColor(color) {
		value = color;
		popup = null;
	}
	function handleClear() {
		value = null;
	}
	function handlePopup() {
		if (disabled) return false;
		popup = true;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="wx-colorselect" on:click={handlePopup}>
	<input
		{title}
		{value}
		readonly
		{id}
		{placeholder}
		{disabled}
		class:wx-error={error}
		class:wx-focus={popup}
	/>

	{#if clear && value && !disabled}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i class="wx-clear wxi-close" on:click|stopPropagation={handleClear} />
	{/if}

	{#if value}
		<div
			class="wx-color wx-selected"
			style="background-color: {value || '#00a037'}"
		/>
	{:else}
		<div class="wx-empty wx-selected" />
	{/if}

	{#if popup}
		<Dropdown cancel={() => (popup = null)}>
			<div class="wx-colors">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="wx-empty"
					on:click|stopPropagation={() => selectColor("")}
				/>
				{#each colors as color}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="wx-color"
						style="background-color: {color}"
						on:click|stopPropagation={() => selectColor(color)}
					/>
				{/each}
			</div>
		</Dropdown>
	{/if}
</div>

<style>
	.wx-colorselect {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-selected {
		position: absolute;
		left: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
	}

	.wx-colors {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 8px;
	}

	.wx-color {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		cursor: pointer;
	}

	input {
		display: block;
		width: 100%;
		height: var(--wx-input-height);
		outline: none;
		background: var(--wx-input-background);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		padding-left: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	input.wx-focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}
	input[disabled] {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
	}
	input[disabled]::placeholder {
		color: var(--wx-color-font-disabled);
	}
	input[disabled] ~ .wx-color,
	input[disabled] ~ .wx-empty {
		cursor: not-allowed;
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}

	.wx-empty {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: linear-gradient(
			to top left,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0) calc(50% - 1px),
			rgb(255, 0, 0) 50%,
			rgba(0, 0, 0, 0) calc(50% + 1px),
			rgba(0, 0, 0, 0) 100%
		);
		cursor: pointer;
		user-select: none;
	}

	.wx-clear {
		position: absolute;
		right: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
		font-size: var(--wx-input-icon-size);
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		color: var(--wx-input-icon-color);
		cursor: pointer;
	}
	.wx-clear:hover {
		background: var(--wx-background-hover);
	}
</style>
