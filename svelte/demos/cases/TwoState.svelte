<script>
	import { TwoState } from "../../src/index";
	import { getContext } from "svelte";

	const { showNotice } = getContext("wx-helpers");

	function onclick() {
		showNotice({
			text: "TwoState clicked",
		});
	}
</script>

<div class="demo-box">
	<h3>Default TwoState Button</h3>
	{#snippet active()}
		<span slot="active">Working...</span>
	{/snippet}
	<TwoState {onclick} {active}>Click Me</TwoState>
	<TwoState disabled={true} {onclick}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h3>Primary TwoState Button</h3>
	<TwoState type="primary" {onclick}>Click Me</TwoState>
	<TwoState type="primary" disabled={true} {onclick}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h3>Secondary TwoState Button</h3>
	<TwoState type="secondary" {onclick}>Click Me</TwoState>
	<TwoState type="secondary" disabled={true} {onclick}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h3>Danger TwoState Button</h3>
	<TwoState type="danger" {onclick}>Click Me</TwoState>
	<TwoState type="danger" disabled={true} {onclick}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h3>Icon TwoState Buttons</h3>
	<TwoState icon="wxi-alert">With Icon</TwoState>
	<TwoState type="primary" icon="wxi-alert" iconActive="wxi-check">
		With Icon
	</TwoState>
	<TwoState type="secondary" icon="wxi-alert">With Icon</TwoState>
	<TwoState icon="wxi-alert" />
	<TwoState type="primary" icon="wxi-alert" />
	<TwoState type="secondary" icon="wxi-alert" />
	<TwoState type="danger" icon="wxi-alert" />
	<TwoState disabled icon="wxi-alert" />
</div>

<div class="demo-box">
	<h3>Disabled</h3>
	<p>
		<TwoState type="primary" value={true} disabled>Primary On</TwoState>
		<TwoState type="primary" disabled>Primary Off</TwoState>
	</p>
	<p>
		<TwoState
			title="disabled button"
			type="secondary"
			value={true}
			disabled
		>
			Secondary On
		</TwoState>
		<TwoState type="secondary" disabled>Secondary Off</TwoState>
	</p>
</div>
