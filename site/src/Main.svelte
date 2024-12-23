<script>
	import SearchList from "./components/SearchList.svelte";
	import Form from "./components/Form.svelte";
	import CalendarUploader from "./components/CalendarUploader.svelte";
	import RadioCheckboxes from "./components/RadioCheckboxes.svelte";
	import Topbar from "./components/Topbar.svelte";

	let { skin = $bindable() } = $props();
</script>

<div class="demo" style="padding: 20px;">
	<div class="wrapper">
		<Topbar bind:skin />
		<div class="columns">
			<CalendarUploader />
			<SearchList />
			<Form />
			<RadioCheckboxes />
		</div>
	</div>
</div>

<style>
	.demo {
		--wx-checkbox-border-width: 1px;
		width: 100%;
		height: 100%;
	}
	.wrapper {
		height: 100%;
		max-width: 1180px;
		overflow: hidden;
		position: relative;
		border: var(--wx-fm-grid-border);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.columns {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		height: 474px;
	}
</style>
