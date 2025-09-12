<script>
	import {
		RichSelect,
		Button,
		Text,
		Segmented,
		Field,
		DatePicker,
	} from "@svar-ui/svelte-core";
	import LockIcon from "./Icons/LockIcon.svelte";

	import { getData } from "../data";

	const { segmentedOptions, location, positions } = getData();

	let value = $state(1);
</script>

<div class="column">
	<div class="segmented">
		<Segmented options={segmentedOptions} bind:value>
			{#snippet children({ option })}
				{#if option.icon}
					<i class="icon {option.icon}"></i>
				{:else}
					<span class="icon">
						<LockIcon />
					</span>
				{/if}
				<span class="bottom">{option.name}</span>
			{/snippet}
		</Segmented>
	</div>
	<div class="form">
		{#if value === 1}
			<Field label="First name" position="top">
				{#snippet children({ id })}
					<Text value={"Bethany"} {id} />
				{/snippet}
			</Field>
			<Field label="Last name" position="top">
				{#snippet children({ id })}
					<Text value={"Williams"} {id} />
				{/snippet}
			</Field>
			<Field label="Birthday">
				{#snippet children({ id })}
					<DatePicker
						value={new Date(2005, 9, 10)}
						width="100%"
						{id}
					/>
				{/snippet}
			</Field>
			<Field label="Location" position="top">
				<RichSelect options={location} value={1}>
					{#snippet children(option)}
						{option.name}
					{/snippet}
				</RichSelect>
			</Field>
			<Field label="Position" position="top">
				<RichSelect options={positions} value={1}>
					{#snippet children(option)}
						{option.name}
					{/snippet}
				</RichSelect>
			</Field>
		{:else}
			<Field label="Username" position="top">
				{#snippet children({ id })}
					<Text value={"williams.b"} {id} />
				{/snippet}
			</Field>
			<Field label="Phone number" position="top">
				{#snippet children({ id })}
					<Text value={"978548753974"} {id} />
				{/snippet}
			</Field>
			<Field label="Email">
				{#snippet children({ id })}
					<Text value={"williams.bethany@mail.com"} {id} />
				{/snippet}
			</Field>
			<Field label="Current password" position="top">
				{#snippet children({ id })}
					<Text
						value={"123456789"}
						{id}
						type={"password"}
						icon={"wxi-eye"}
						css="wx-icon-right"
					/>
				{/snippet}
			</Field>
			<Field label="New password" position="top">
				{#snippet children({ id })}
					<Text
						value={"987654321"}
						{id}
						type={"password"}
						icon={"wxi-eye"}
						css="wx-icon-right"
					/>
				{/snippet}
			</Field>
		{/if}
		<Button type={"primary"} text={"Save"} />
	</div>
</div>

<style>
	.column {
		border-radius: var(--wx-border-radius, 3px);
		height: 100%;
		display: flex;
		flex-direction: column;
		width: 354px;
		min-width: 240px;
		border-radius: var(--wx-border-radius, 3px);
		gap: 12px;
	}
	.segmented {
		height: 40px;
		padding: 4px 2px;
		width: 100%;
		background-color: var(--wx-segmented-background);
		border-radius: var(--wx-segmented-border-radius);
	}
	.segmented :global(div button .icon) {
		margin-right: 4px;
		opacity: 1;
	}
	.segmented .icon {
		height: 16px;
		font-size: 16px;
		line-height: 16px;
		margin-right: 4px;
	}
	.segmented :global(div) {
		width: 100%;
	}
	.segmented :global(div button) {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.segmented :global(div button .bottom) {
		white-space: nowrap;
	}
	.form {
		padding: 20px;
		border: var(--wx-input-border);
		border-radius: var(--wx-border-radius, 3px);
	}
	.form :global(.wx-field) {
		margin-bottom: 12px;
	}
	.form :global(button) {
		width: 100%;
		margin-top: 8px;
	}
</style>
