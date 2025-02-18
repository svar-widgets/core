<script>
	import { DatePicker, Field } from "../../src/index";

	import { getContext } from "svelte";
	const date = new Date(2025, 4, 1);
	const wh = getContext("wx-helpers");
	function showChanges(ev) {
		wh.showNotice({ text: `Date changed to ${ev.value}` });
	}

	function parseDate(string) {
		const p = string.match(/(..)(..)(.+)/);
		return p ? new Date(p.slice(1, 4).join("/")) : null;
	}
</script>

<div class="demo-box">
	<h3>Datepicker</h3>
	<Field label="Wide">
		{#snippet children({ id })}
			<DatePicker width="100%" {id} onchange={showChanges} />
		{/snippet}
	</Field>
	<Field label="Align auto">
		{#snippet children({ id })}
			<DatePicker {id} />
		{/snippet}
	</Field>
	<Field label="Disabled">
		{#snippet children({ id })}
			<DatePicker disabled {id} />
		{/snippet}
	</Field>
	<Field label="Editable (new Date())">
		{#snippet children({ id })}
			<DatePicker editable {id} />
		{/snippet}
	</Field>
	<Field label="Editable custom format (MMDDYYYY)">
		{#snippet children({ id })}
			<DatePicker editable={parseDate} {id} format={"%m%d%Y"} />
		{/snippet}
	</Field>
	<Field label="Align center" error>
		{#snippet children({ id })}
			<DatePicker error {id} align="center" title="Invalid date" />
		{/snippet}
	</Field>
	<Field label="Without buttons">
		{#snippet children({ id })}
			<DatePicker
				{id}
				buttons={false}
				value={new Date(2022, 4, 10, 16, 0)}
			/>
		{/snippet}
	</Field>
	<Field label="Default format">
		{#snippet children({ id })}
			<DatePicker {id} value={date} />
		{/snippet}
	</Field>
	<Field label="Custom format">
		{#snippet children({ id })}
			<DatePicker {id} value={date} format="%d %F, %Y" />
		{/snippet}
	</Field>
	<Field label="Custom icon position">
		{#snippet children({ id })}
			<DatePicker {id} value={date} css="wx-icon-left" />
		{/snippet}
	</Field>
	<Field label="With clear icon">
		{#snippet children({ id })}
			<DatePicker {id} value={date} clear />
		{/snippet}
	</Field>
	<Field label="Custom clear icon position">
		{#snippet children({ id })}
			<DatePicker {id} value={date} css="wx-icon-left" clear />
		{/snippet}
	</Field>
</div>
