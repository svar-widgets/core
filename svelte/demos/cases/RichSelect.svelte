<script>
	import { Field, RichSelect } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";
</script>

<div class="demo-box">
	<h3>RichSelect with a simple list</h3>
	<Field>
		<RichSelect options={users} value={104}>
			{#snippet children(option)}
				{option.name}
			{/snippet}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect with a side label</h3>
	<Field label="Owner" position="left">
		{#snippet children({ id })}
			<RichSelect options={users} {id} value={104}>
				{#snippet children(option)}
					{option.name}
				{/snippet}
			</RichSelect>
		{/snippet}
	</Field>
	<Field label="Disabled" position="left">
		{#snippet children({ id })}
			<RichSelect options={users} {id} disabled value={104}>
				{#snippet children(option)}
					{option.name}
				{/snippet}
			</RichSelect>
		{/snippet}
	</Field>
	<Field label="Error" position="left" error>
		{#snippet children({ id })}
			<RichSelect
				options={users}
				{id}
				error
				value={104}
				title="Invalid option"
			>
				{#snippet children(option)}
					{option.name}
				{/snippet}
			</RichSelect>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect overflow</h3>
	<Field width="150px">
		<RichSelect options={users} value={105} />
		<br />
		<RichSelect options={users} value={105}>
			{#snippet children(option)}
				{option.name}
			{/snippet}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect with a template</h3>
	<Field>
		<RichSelect options={users} value={104}>
			{#snippet children(option)}
				<UserOption data={option} />
			{/snippet}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect without a value</h3>
	<RichSelect options={users} />
</div>

<div class="demo-box">
	<h3>RichSelect without options</h3>
	<RichSelect />
</div>
