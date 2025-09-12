<script>
	import { Text } from "@svar-ui/svelte-core";

	import { getData } from "../data";

	const { employees, positions } = getData();

	let searchValue = $state("");
	let employeesFiltered = $derived(
		searchValue
			? employees.filter(e =>
					e.firstName
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			: employees
	);
</script>

<div class="column">
	<Text
		icon="wxi-search"
		css="wx-icon-left"
		placeholder={"Search..."}
		bind:value={searchValue}
	/>
	<div class="list">
		{#each employeesFiltered as employee (employee.id)}
			<div class="card">
				<div class="avatar">
					{#if employee.avatar}
						<img src={employee.avatar} alt="avatar" />
					{:else}
						<div class="avatar-box">
							<span>{employee.firstName[0]}</span>
						</div>
					{/if}
				</div>
				<div class="info">
					<span class="name"
						>{employee.firstName} {employee.lastName}</span
					>
					<span class="position"
						>{positions.find(p => p.id === employee.position)
							.name}</span
					>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.column {
		border-radius: var(--wx-border-radius, 3px);
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 6px;
		width: 380px;
		min-width: 240px;
		border: var(--wx-input-border);
		padding: 16px 16px 8px;
	}
	.card > .avatar img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding-top: 6px;
	}

	.list .card:not(:global(:first-child)) {
		border-top: var(--wx-input-border);
		padding-top: 6px;
		height: 46px;
	}
	.card {
		height: 40px;
		width: 100%;
		display: flex;
		gap: 12px;
	}
	.card > .avatar {
		height: 40px;
		width: 40px;
	}
	.card > .avatar .avatar-box {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		background-color: #00d19a;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		line-height: 24px;
		color: var(--wx-background);
	}
	.card > .info {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}

	.card .info .position {
		color: var(--wx-color-font-alt);
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
