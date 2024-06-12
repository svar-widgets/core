<script>
	import { Button } from "../../src/index";
	import { getContext } from "svelte";

	const { showNotice } = getContext("wx-helpers");

	function click() {
		showNotice({
			text: "Button clicked",
		});
	}
</script>

<div class="demo-box">
	<h3>Default button</h3>
	<Button {click} title="Click me and I will do nothing">Click Me</Button>
	<Button disabled={true} {click}>Click Me</Button>
</div>

<div class="demo-box">
	<h3>Primary button</h3>
	<Button type={"primary"} {click}>Click Me</Button>
	<Button type={"primary"} disabled={true} {click}>Click Me</Button>
</div>

<div class="demo-box">
	<h3>Secondary button</h3>
	<Button type={"secondary"} {click}>Click Me</Button>
	<Button type={"secondary"} disabled={true} {click}>Click Me</Button>
</div>

<div class="demo-box">
	<h3>Danger button</h3>
	<Button type={"danger"} {click}>Click Me</Button>
	<Button type={"danger"} disabled={true} {click}>Click Me</Button>
</div>

<div class="demo-box">
	<h3>Link button</h3>
	<p>
		<Button type={"link"} icon="wxi-alert" {click}>Click Me</Button>
	</p>
	<p>
		<Button type={"link"} {click}>Click Me</Button>
	</p>
	<p>
		<Button type={"link"} disabled={true} {click}>Click Me</Button>
	</p>
</div>

<div class="demo-box">
	<h3>Block buttons</h3>
	<p>
		<Button type={"primary block"}>Click Me</Button>
	</p>
	<p>
		<Button type={"secondary block"}>Click Me</Button>
	</p>
	<div style="display:flex;">
		<Button type={"secondary block"}>Click Me</Button>
		&nbsp;
		<Button type={"primary block"}>Click Me</Button>
	</div>
</div>

<div class="demo-box">
	<h3>Icon buttons</h3>
	<Button icon="wxi-alert">With Icon</Button>
	<Button type={"primary"} icon="wxi-alert">With Icon</Button>
	<Button type={"secondary"} icon="wxi-alert">With Icon</Button>
	<Button icon="wxi-alert" />
	<Button type={"primary"} icon="wxi-alert" />
	<Button type={"secondary"} icon="wxi-alert" />
	<Button type={"danger"} icon="wxi-alert" />
	<Button disabled icon="wxi-alert" />
</div>

<div class="demo-box">
	<h3>Multi-line button</h3>
	<p>
		<Button type={"primary"}>Click me<br />a few times</Button>
	</p>
</div>
