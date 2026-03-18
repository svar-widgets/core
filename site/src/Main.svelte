<script>
	import SearchList from "./components/SearchList.svelte";
	import Form from "./components/Form.svelte";
	import CalendarUploader from "./components/CalendarUploader.svelte";
	import RadioCheckboxes from "./components/RadioCheckboxes.svelte";
	import Topbar from "./components/Topbar.svelte";
</script>

<div class="demo">
	<div class="wrapper">
		<Topbar />
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
		overflow: auto;
	}
	.wrapper {
		max-width: 1232px;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 26px;
		padding: 26px;
		margin: 0 auto;
	}
	.columns {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		min-height: 474px;
	}
</style>
