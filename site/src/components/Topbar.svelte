<script>
	import { Slider, Combo, Button, Timepicker, Pager } from "wx-svelte-core";

	import CustomThemeSelect from "./CustomThemeSelect.svelte";

	import { getData } from "../data";

	export let skin;

	const { employees, countries } = getData();

	function selectSkin(ev) {
		skin = ev.detail.selected.id;
	}
</script>

<div class="topbar">
	<Slider value={78} />
	<div class="block">
		<div class="combo" style="width: 160px">
			<Combo
				options={countries}
				textField="name"
				let:option
				placeholder="Click to select"
			>
				{option.name}
			</Combo>
		</div>
		<div class="avatars" style="width: 128px">
			{#each employees.slice(0, 6) as employee (employee.id)}
				{#if employee.avatar}
					<div class="avatar">
						<img src={employee.avatar} alt="avatar" />
					</div>
				{/if}
			{/each}
			<div class="avatar"><span>+3</span></div>
		</div>
		<div class="button" style="width: 131px">
			<Button type={"primary"} icon={"wxi-cat"}>Button</Button>
		</div>
		<div class="timepicker" style="width: 148px">
			<Timepicker value={new Date(0, 0, 0, 14, 0, 0)} />
		</div>
		<div class="pager" style="width: 308px">
			<Pager value={2} total={100} />
		</div>
		<div class="switch" style="width: 48px">
			<CustomThemeSelect bind:value={skin} on:select={selectSkin} />
		</div>
	</div>
</div>

<style>
	.topbar {
		width: 100%;
		border: var(--wx-fm-grid-border);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.block {
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.avatars {
		height: 100%;
		width: 100px;
		display: flex;
		align-items: center;
	}
	.block .avatars > .avatar {
		height: 28px;
		width: 28px;
		border-radius: 50%;
		color: var(--wx-background);
	}
	.block .avatars > .avatar:last-child {
		background-color: #00d19a;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.block .avatars > .avatar + .avatar {
		margin-left: -8px;
	}
	.block .avatars > .avatar img,
	.card > .avatar img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
	.button :global(button) {
		width: 100%;
	}
	.button :global(button i) {
		margin-right: 4px;
		opacity: 1;
	}
	.pager :global(.wx-pager) {
		padding: 0;
	}
	.pager :global(.wx-pager .wx-left) {
		display: none;
	}
	.pager :global(.wx-pager input) {
		height: 32px;
	}
	.pager :global(.wx-pager .wx-icon) {
		font-size: 16px;
		padding: 8px;
	}
	.pager :global(.wx-pager .wx-right) {
		height: 32px;
		line-height: 20px;
		text-wrap: nowrap;
	}
</style>
