<script lang="ts">
	import {
		Field,
		Dropdown,
		Calendar,
		RadioButtonGroup,
		Button,
	} from "@svar-ui/svelte-core";
	import type { DropdownOptions } from "@svar-ui/svelte-core";

	type TPosition = NonNullable<DropdownOptions["position"]>;
	type TAlign = NonNullable<DropdownOptions["align"]>;

	const positions = ["bottom", "top", "left", "right"].map(id => ({
		id,
		label: id,
	}));
	const alignOptions = ["start", "center", "end"].map(id => ({
		id,
		label: id,
	}));

	let popup = $state<boolean>();
	let position = $state<TPosition>("bottom");
	let align = $state<TAlign>("start");
</script>

<div class="demo-box">
	<div class="label">Select dropdown position</div>
	<RadioButtonGroup options={positions} bind:value={position} type="inline" />

	<div class="label">Select dropdown align</div>
	<RadioButtonGroup options={alignOptions} bind:value={align} type="inline" />

	<div class="dropdown-box">
		<Field>
			<Button css="my-button" onclick={() => (popup = true)}>
				Click to show a dropdown
			</Button>
			{#if popup}
				<Dropdown
					width="300px"
					{position}
					{align}
					oncancel={() => (popup = false)}
					css="my-dropdown"
				>
					<Calendar />
				</Dropdown>
			{/if}
		</Field>
	</div>
</div>

<style>
	.dropdown-box {
		width: 250px;
		height: 302px;
		position: relative;
		top: 200px;
		left: 300px;
	}
	.label {
		font-weight: 600;
		padding: 10px 0;
	}
	:global(.wx-button.my-button) {
		width: 250px;
	}
	:global(.my-dropdown) {
		background: var(--wx-background-alt) !important;
	}
</style>
