<script>
	import { Field, List, Button, Dropdown, Popup } from "../../src/index";

	import { getContext } from "svelte";
	const { showNotice } = getContext("wx-helpers");

	let d1 = false;
	function startD1() {
		d1 = true;
	}
	function endD1(id) {
		d1 = false;
		if (typeof id != "object") showNotice({ text: `click on ${id}` });
	}

	let d2 = false;
	function startD2(ev) {
		d2 = ev.target.getBoundingClientRect();
	}
	function endD2(id) {
		d2 = false;
		if (typeof id != "object") showNotice({ text: `click on ${id}` });
	}
</script>

<div class="demo-box">
	<h3>List</h3>
	<Field>
		<List
			click={endD2}
			data={[
				{ id: 1, label: "First" },
				{ id: 2, label: "Second" },
				{ id: 3, label: "Third" },
			]}
		/>
	</Field>
</div>

<div class="demo-box">
	<h3>List with template</h3>
	<Field>
		<List
			click={endD2}
			data={[
				{ id: 1, label: "First" },
				{ id: 2, label: "Second" },
				{ id: 3, label: "Third" },
			]}
			let:obj
		>
			<div style="padding: 5px;">- {obj.label}</div>
		</List>
	</Field>
</div>

<div class="demo-box">
	<h3>List DropDown</h3>
	<Field>
		<Button click={startD1}>Show menu</Button>
		{#if d1}
			<Dropdown cancel={endD1}>
				<List
					click={endD1}
					data={[
						{ id: 1, label: "First" },
						{ id: 2, label: "Second" },
						{ id: 3, label: "Third" },
					]}
				/>
			</Dropdown>
		{/if}
	</Field>
</div>

<div class="demo-box">
	<h3>List Popup</h3>
	<Field>
		<Button click={startD2}>Show menu</Button>
		{#if d2}
			<Popup area={d2} cancel={endD2}>
				<List
					click={endD2}
					data={[
						{ id: 1, label: "First" },
						{ id: 2, label: "Second" },
						{ id: 3, label: "Third" },
					]}
				/>
			</Popup>
		{/if}
	</Field>
</div>
