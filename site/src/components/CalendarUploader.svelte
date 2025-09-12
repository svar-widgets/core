<script>
	import { Calendar } from "@svar-ui/svelte-core";
</script>

<div class="column">
	<Calendar value={new Date()} buttons={false} />
	<Calendar
		value={new Date()}
		current={new Date(new Date() * 1 + 3600 * 1000 * 24 * 32)}
	/>
</div>

<style>
	.column {
		border-radius: var(--wx-border-radius, 3px);
		height: 100%;
		display: flex;
		flex-direction: column;
		width: 264px;
		gap: 32px;
	}
	.column :global(.wx-calendar) {
		padding: 0px;
	}
	.column {
	}
	.column :global(.wx-label) {
		width: 100%;
		flex-grow: 1;
	}
</style>
