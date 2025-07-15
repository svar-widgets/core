<script>
	import { DateRangePicker, Field } from "../../src/index";

	const date = {
		start: new Date(2020, 1, 1),
		end: new Date(2021, 3, 3),
	};

	import { getContext } from "svelte";
	const wh = getContext("wx-helpers");
	function showChanges(ev) {
		wh.showNotice({
			text: `Date changed to ${JSON.stringify(ev.value)}`,
		});
	}

	function parseDate(string) {
		const p = string.match(/(..)(..)(.+)/);
		return p ? new Date(p.slice(1, 4).join("/")) : null;
	}
</script>

<div class="demo-box">
	<h3>DateRangePicker</h3>
	<Field label="Date range">
		{#snippet children({ id })}
			<DateRangePicker value={date} {id} onchange={showChanges} />
		{/snippet}
	</Field>
	<Field label="DateRangePicker with the Done button">
		{#snippet children({ id })}
			<DateRangePicker
				value={date}
				{id}
				buttons={["done", "clear", "today"]}
			/>
		{/snippet}
	</Field>
	<Field label="Disabled">
		{#snippet children({ id })}
			<DateRangePicker disabled value={date} {id} />
		{/snippet}
	</Field>
	<Field label="Editable (new Date())">
		{#snippet children({ id })}
			<DateRangePicker editable value={date} {id} />
		{/snippet}
	</Field>
	<Field label="Editable, custom format (MMDDYYYY - MMDDYYYY)">
		{#snippet children({ id })}
			<DateRangePicker
				editable={parseDate}
				value={date}
				format={"%m%d%Y"}
				{id}
			/>
		{/snippet}
	</Field>
	<Field label="Error" error>
		{#snippet children({ id })}
			<DateRangePicker error value={date} {id} title="Invalid date" />
		{/snippet}
	</Field>

	<Field label="Custom format">
		{#snippet children({ id })}
			<DateRangePicker format="%d %F, %Y" value={date} {id} />
		{/snippet}
	</Field>
	<Field label="Custom icon position">
		{#snippet children({ id })}
			<DateRangePicker {id} value={date} css="wx-icon-left" />
		{/snippet}
	</Field>
	<Field label="Single month">
		{#snippet children({ id })}
			<DateRangePicker {id} months={1} />
		{/snippet}
	</Field>
	<Field label="Clear button">
		{#snippet children({ id })}
			<DateRangePicker value={date} {id} clear />
		{/snippet}
	</Field>
</div>
