<script>
	let { value, size = 32, limit } = $props();

	const DEFAULT_BG = "#dfe2e6";
	const DEFAULT_FONT = "#2c2f3c";

	/** Overlap factor: each avatar after the first adds 75% of size (25% overlap). */
	const OVERLAP_FACTOR = 0.75;

	let containerEl = $state(null);
	let containerWidth = $state(null);

	const users = $derived.by(() => {
		if (!value) return [];
		return Array.isArray(value) ? value : [value];
	});

	/** Max avatars that fit in container. Formula: width = size + (n-1) * size * 0.75. */
	const maxFitting = $derived.by(() => {
		if (containerWidth == null || containerWidth <= 0) {
			return null;
		}
		const n = 1 + (containerWidth / size - 1) / OVERLAP_FACTOR;
		return Math.max(1, Math.floor(n));
	});

	const displayCount = $derived.by(() => {
		const cap =
			limit != null ? Math.min(users.length, limit) : users.length;
		if (maxFitting != null) {
			return Math.min(cap, maxFitting);
		}
		return cap;
	});

	const displayUsers = $derived(users.slice(0, displayCount));
	const overflowCount = $derived(Math.max(0, users.length - displayCount));

	$effect(() => {
		const el = containerEl;
		if (!el) return;
		const ro = new ResizeObserver(entries => {
			const entry = entries[0];
			if (entry) containerWidth = entry.contentRect.width;
		});
		ro.observe(el);
		return () => ro.disconnect();
	});

	function getInitials(name) {
		name = name?.trim() || "";
		if (!name) return "";
		const words = name.split(/\s+/);
		return (words[0][0] + (words[1]?.[0] || "")).toUpperCase().slice(0, 2);
	}

	function getContrastColor(hex) {
		if (!hex) return DEFAULT_FONT;
		let h = hex.replace("#", "");
		if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
		if (h.length !== 6) return DEFAULT_FONT;
		const r = parseInt(h.slice(0, 2), 16) / 255;
		const g = parseInt(h.slice(2, 4), 16) / 255;
		const b = parseInt(h.slice(4, 6), 16) / 255;
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
		return luminance > 0.5 ? DEFAULT_FONT : "#ffffff";
	}

	const fontSize = $derived(Math.round(size * 0.4));
	const avatarBaseStyle = $derived(
		`width:${size}px;height:${size}px;min-width:${size}px;min-height:${size}px;font-size:${fontSize}px;`
	);

	function getAvatarItemStyle(user, index) {
		const margin = index === 0 ? "0" : `${size * -0.25}px`;
		const bg = user.avatar ? "transparent" : user.color || DEFAULT_BG;
		const color = user.avatar
			? "transparent"
			: getContrastColor(user.color || DEFAULT_BG);
		return `margin-left:${margin};background-color:${bg};color:${color};`;
	}
</script>

<div class="wx-avatar-root" bind:this={containerEl}>
	{#if displayUsers.length > 0}
		<div class="wx-avatar-stack">
			{#each displayUsers as user, index (user.id)}
				<div
					class="wx-avatar wx-avatar-item"
					class:wx-avatar-overflow={index ===
						displayUsers.length - 1 && overflowCount > 0}
					style={avatarBaseStyle + getAvatarItemStyle(user, index)}
				>
					{#if user.avatar}
						<img src={user.avatar} alt="" loading="lazy" />
					{:else if getInitials(user.name)}
						<span>{getInitials(user.name)}</span>
					{/if}
					{#if index === displayUsers.length - 1 && overflowCount > 0}
						<span class="wx-avatar-overflow-badge"
							>+{overflowCount}</span
						>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.wx-avatar {
		position: relative;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		font-weight: 600;
		line-height: 1;
		user-select: none;
	}

	.wx-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.wx-avatar span {
		text-transform: uppercase;
	}

	.wx-avatar-overflow .wx-avatar-overflow-badge {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		text-transform: none;
	}

	.wx-avatar-stack {
		display: inline-flex;
		align-items: center;
	}

	.wx-avatar-root {
		display: block;
		min-width: 0;
	}
</style>
