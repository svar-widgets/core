<script>
	import { TwoState } from "../../src/index";
	import { getContext } from "svelte";

	const { showNotice } = getContext("wx-helpers");

	function click() {
		showNotice({
			text: "TwoState clicked",
		});
	}

</script>

<div class="demo-box">
	<h4>Default TwoState Button</h4>
	<TwoState {click}>Click Me<span slot="active">Working...</span></TwoState>
	<TwoState disabled={true} {click}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h4>Primary TwoState Button</h4>
	<TwoState type={'primary'} {click}>Click Me</TwoState>
	<TwoState type={'primary'} disabled={true} {click}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h4>Secondary TwoState Button</h4>
	<TwoState type={'secondary'} {click}>Click Me</TwoState>
	<TwoState type={'secondary'} disabled={true} {click}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h4>Danger TwoState Button</h4>
	<TwoState type={'danger'} {click}>Click Me</TwoState>
	<TwoState type={'danger'} disabled={true} {click}>Click Me</TwoState>
</div>

<div class="demo-box">
	<h4>Icon TwoState Buttons</h4>
	<TwoState icon="wxi-alert">With Icon</TwoState>
	<TwoState type={'primary'} icon="wxi-alert" iconActive="wxi-check">
		With Icon
	</TwoState>
	<TwoState type={'secondary'} icon="wxi-alert">With Icon</TwoState>
	<TwoState icon="wxi-alert" />
	<TwoState type={'primary'} icon="wxi-alert" />
	<TwoState type={'secondary'} icon="wxi-alert" />
	<TwoState type={'danger'} icon="wxi-alert" />
	<TwoState disabled icon="wxi-alert" />
</div>

<div class="demo-box">
	<h4>Inactive</h4>
	<p>
		<TwoState
			type={'primary'}
			value={true}
			click={ev => ev.preventDefault()}>
			Inactive
		</TwoState>
		<TwoState
			type={'primary'}
			value={true}
			disabled
			click={ev => ev.preventDefault()}>
			Inactive
		</TwoState>
	</p>
	<p>
		<TwoState
			title="disabled button"
			type={'secondary'}
			value={true}
			click={ev => ev.preventDefault()}>
			Inactive
		</TwoState>
		<TwoState
			type={'secondary'}
			value={true}
			disabled
			click={ev => ev.preventDefault()}>
			Inactive
		</TwoState>
	</p>
</div>
