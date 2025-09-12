<script>
	import {
		RadioButtonGroup,
		CheckboxGroup,
		Select,
		Text,
	} from "@svar-ui/svelte-core";

	import { getData } from "../data";

	const { SVR, core } = getData();
</script>

<div class="column">
	<div class="radio-group">
		<RadioButtonGroup options={SVR} value={2} />
	</div>
	<Text type={"number"} value={1} />
	<Select value={""} options={SVR} label={"name"} placeholder={"Options"} />
	<div class="checkbox-group">
		<CheckboxGroup options={core} value={[1, 2, 3, 6, 7, 8]} />
	</div>
</div>

<style>
	.column {
		border-radius: var(--wx-border-radius, 3px);
		height: 100%;
		display: flex;
		flex-direction: column;
		width: 121px;
		min-width: 100px;
		gap: 24px;
	}
	.column :global(.group) {
		margin-top: 0;
	}
	.column .radio-group :global(.wx-item) {
		margin-top: 10px;
	}
	.column .radio-group :global(.wx-item:first-child) {
		margin-top: 0;
	}
	.column .checkbox-group :global(.wx-item) {
		margin-top: 6px;
		margin-bottom: 6px;
	}
	.column .checkbox-group :global(.wx-item:last-child) {
		margin-bottom: 0;
	}
</style>
