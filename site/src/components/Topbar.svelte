<script>
	import {
		Slider,
		Combo,
		Button,
		TimePicker,
		Pager,
		Avatar,
	} from "@svar-ui/svelte-core";
	import { getData } from "../data";

	const { employees, countries } = getData();
</script>

<div class="topbar">
	<Slider value={78} />
	<div class="block">
		<div class="combo" style="width: 160px">
			<Combo
				options={countries}
				textField="name"
				placeholder="Click to select"
			>
				{#snippet children({ option })}
					{option.name}
				{/snippet}
			</Combo>
		</div>
		<div class="avatars" style="width: 134px">
			<Avatar value={employees} limit={7} size={28} />
		</div>
		<div class="button" style="width: 131px">
			<Button type={"primary"} icon={"wxi-cat"}>Button</Button>
		</div>
		<div class="timepicker" style="width: 148px">
			<TimePicker value={new Date(0, 0, 0, 14, 0, 0)} />
		</div>
		<div class="pager" style="width: 308px">
			<Pager value={2} total={100} />
		</div>
	</div>
</div>

<style>
	.topbar {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.block {
		min-height: 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		flex-wrap: wrap;
		/* width: 100%; */
	}
	.avatars {
		display: flex;
		align-items: center;
	}
	.avatars :global(.wx-avatar-item) {
		color: #fff !important;
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
