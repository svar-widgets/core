<script>
	import { Avatar } from "../../src/index";
	import { users } from "../data/userlist";

	const singleUser = {
		id: 103,
		name: "Ned Stark",
		avatar: "https://cdn.svar.dev/demos/assets/avatar/491902305.jpg",
	};

	const singleInitials = {
		id: 1,
		name: "John Doe",
	};

	const singleColor = {
		id: 2,
		name: "Jane Smith",
		color: "#2ecc71",
	};

	const singleTwoWords = {
		id: 3,
		name: "Daenerys Stormborn Targaryen",
		color: "#e74c3c",
	};

	const singleNoName = {
		id: 4,
		color: "#9b59b6",
	};

	const stackUsers = users.slice(0, 5).map(u => ({
		id: u.id,
		name: u.label,
		avatar: u.avatar,
	}));

	const stackMixed = [
		{ id: 1, name: "Alice", color: "#3498db" },
		{
			id: 2,
			name: "Bob",
			avatar: "https://cdn.svar.dev/demos/assets/avatar/503723673.jpg",
		},
		{ id: 3, name: "Charlie", color: "#e74c3c" },
	];

	const stackOverflowMixed = [
		// with pictures
		{
			id: users[0].id,
			name: users[0].label,
			avatar: users[0].avatar,
		},
		{
			id: users[1].id,
			name: users[1].label,
			avatar: users[1].avatar,
		},
		// without picture, dark background
		{ id: 1001, name: "Dark background", color: "#34495e" },
		// again with pictures
		{
			id: users[2].id,
			name: users[2].label,
			avatar: users[2].avatar,
		},
		// without picture, light background
		{ id: 1002, name: "Light background", color: "#ecf4ff" },
		// and more with pictures
		{
			id: users[3].id,
			name: users[3].label,
			avatar: users[3].avatar,
		},
		{
			id: users[4].id,
			name: users[4].label,
			avatar: users[4].avatar,
		},
	];
</script>

<div class="demo-box">
	<h3>Single avatars</h3>
	<div class="single-avatars-row">
		<div class="single-avatar-item">
			<div class="single-avatar-slot">
				<Avatar value={singleUser} size={32} />
			</div>
			<span>Image</span>
		</div>
		<div class="single-avatar-item">
			<div class="single-avatar-slot">
				<Avatar value={singleInitials} size={32} />
			</div>
			<span>Initials (default)</span>
		</div>
		<div class="single-avatar-item">
			<div class="single-avatar-slot">
				<Avatar value={singleColor} size={32} />
			</div>
			<span>Initials + color</span>
		</div>
		<div class="single-avatar-item">
			<div class="single-avatar-slot">
				<Avatar value={singleTwoWords} size={32} />
			</div>
			<span>2 letters</span>
		</div>
		<div class="single-avatar-item">
			<div class="single-avatar-slot">
				<Avatar value={singleNoName} size={32} />
			</div>
			<span>Color, no name</span>
		</div>
	</div>
</div>

<div class="demo-box">
	<h3>Avatar sizes</h3>
	<div class="sizes">
		<Avatar value={singleUser} size={16} />
		<Avatar value={singleUser} size={20} />
		<Avatar value={singleUser} size={24} />
		<Avatar value={singleUser} size={28} />
		<Avatar value={singleUser} size={32} />
		<Avatar value={singleUser} size={40} />
		<Avatar value={singleUser} size={48} />
	</div>
</div>

<div class="demo-box">
	<h3>Avatar stack (multiple users)</h3>
	<Avatar value={stackUsers} />
</div>

<div class="demo-box">
	<h3>Avatar stack (mixed image and initials)</h3>
	<Avatar value={stackMixed} />
</div>

<div class="demo-box">
	<h3>Dynamic: +N when stack doesn't fit (resize to see)</h3>
	<p>Resize the container — +N appears when avatars overflow.</p>
	<div class="avatar-resizable">
		<Avatar value={stackOverflowMixed} />
	</div>
</div>

<div class="demo-box">
	<h3>With limit (optional cap)</h3>
	<p>limit={6} caps max visible; container can further reduce.</p>
	<div class="avatar-resizable">
		<Avatar value={stackOverflowMixed} limit={6} />
	</div>
</div>

<div class="demo-box">
	<h3>Avatar stack sizes</h3>
	<div class="sizes">
		<Avatar value={stackUsers.slice(0, 4)} size={24} />
		<Avatar value={stackUsers.slice(0, 4)} size={32} />
		<Avatar value={stackUsers.slice(0, 4)} size={40} />
	</div>
</div>

<style>
	.single-avatars-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 24px 32px;
		align-items: flex-end;
	}

	.single-avatar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
	}

	.single-avatar-slot {
		width: 32px;
		height: 32px;
		min-width: 32px;
		min-height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 50%;
	}

	.single-avatar-slot :global(.wx-avatar-root) {
		width: 32px;
		height: 32px;
		max-width: 32px;
		max-height: 32px;
	}

	.single-avatar-item span {
		font-size: 13px;
		text-align: center;
	}

	.sizes {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.avatar-resizable {
		width: 500px;
		resize: horizontal;
		overflow: auto;
		min-width: 80px;
		max-width: 100%;
		border: 1px dashed #ccc;
		padding: 8px;
	}
</style>
