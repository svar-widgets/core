<script>
	import { getContext } from "svelte";
	import { defaultLocale } from "./helpers/locale";

	let {
		total = 0,
		pageSize = $bindable(20),
		value = $bindable(1),
		onchange,
	} = $props();

	const _ = (getContext("wx-i18n") || defaultLocale()).getGroup("core");

	const pageCount = $derived(Math.ceil(total / pageSize));
	const from = $derived((value - 1) * pageSize);
	const to = $derived(Math.min(value * pageSize, total));

	const setValue = v => {
		value = v;
		setTimeout(() => {
			onchange && onchange({ value, from, to });
		});
	};

	function setActivePage(id) {
		switch (id) {
			case "first":
				setValue(1);
				break;
			case "prev":
				setValue(value - 1);
				break;
			case "next":
				setValue(value + 1);
				break;
			case "last":
				setValue(pageCount);
				break;
		}
	}

	const oninput = e => {
		const newValue = +e.target.value;

		if (Number.isNaN(newValue) || newValue < 1 || newValue > pageCount) {
			return;
		}

		setValue(newValue);
	};

	const onPageSizeInput = e => {
		onchange && onchange({ value: +e.target.value, from, to });
	};
</script>

<div class="wx-pager">
	<div class="wx-left">
		<span>{_("Rows per page")}: </span>
		<input
			type="number"
			bind:value={pageSize}
			min="1"
			oninput={onPageSizeInput}
		/>
	</div>

	<div class="wx-center">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i
			class="wx-icon wxi-angle-dbl-left"
			class:wx-disabled={value === 1}
			onclick={() => value > 1 && setActivePage("first")}
		></i>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i
			class="wx-icon wxi-angle-left"
			class:wx-disabled={value === 1}
			onclick={() => setActivePage("prev")}
		></i>
		<input type="text" {value} {oninput} />
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i
			class="wx-icon wxi-angle-right"
			class:wx-disabled={value === pageCount}
			onclick={() => setActivePage("next")}
		></i>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i
			class="wx-icon wxi-angle-dbl-right"
			class:wx-disabled={value === pageCount}
			onclick={() => setActivePage("last")}
		></i>
	</div>

	<div class="wx-right">{_("Total pages")}: {pageCount}</div>
</div>

<style>
	.wx-pager {
		display: flex;
		gap: var(--wx-padding);
		align-items: center;
		padding: var(--wx-padding);
	}

	input {
		display: block;
		width: 50px;
		height: var(--wx-input-height);
		padding: var(--wx-input-padding);
		outline: none;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
	}
	input:focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}

	.wx-icon {
		cursor: pointer;
		padding: var(--wx-input-padding);
		border-radius: var(--wx-input-border-radius);
		font-size: var(--wx-icon-size);
		line-height: 1;
		color: var(--wx-color-link);
	}
	.wx-icon:before {
		display: block;
	}
	.wx-icon:hover {
		background-color: var(--wx-background-hover);
	}
	.wx-icon.wx-disabled {
		cursor: default;
		pointer-events: none;
		color: var(--wx-color-font-disabled);
	}

	.wx-left,
	.wx-center,
	.wx-right {
		display: flex;
		align-items: center;
		gap: var(--wx-padding);
	}
</style>
