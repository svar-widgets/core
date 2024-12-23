<script>
	let { data } = $props();
</script>

<div class="item">
	<div class="avatar">
		<div class="user-avatar">
			{#if data.avatar}
				<img class="user-photo" alt="" src={data.avatar} />
			{/if}
		</div>
	</div>
	<div>
		<div class="name">{data.label}</div>
		<div class="mail">{data.email || ""}</div>
	</div>
</div>

<style>
	.item {
		width: 100%;
		display: flex;
		align-items: center;
		min-height: 56px;
		padding: 0 12px;
		overflow: hidden;
	}

	.avatar {
		margin-right: 12px;
	}

	.name {
		flex: 1;
	}

	.mail {
		flex: 1;
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #dfe2e6;
		text-align: center;
	}

	.user-photo {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #dfe2e6;
		object-fit: cover;
	}
</style>
