<script>
	import { Fullscreen } from "../../src/index";
	import { Button } from "../../src/index";
	import { ColorPicker } from "../../src/index";
	import { DatePicker } from "../../src/index";
</script>

<div class="fullscreen-demo">
	<Fullscreen hotkey="ctrl+shift+f">
		<div class="demo-box">
			<h3>Fullscreen</h3>
			<p>Click button or press Ctrl + Shift + F to toggle fullscreen</p>
			<div class="demo-content">
				<ColorPicker placeholder="Select a color..." value="#65D3B3" />
				<ColorPicker placeholder="Select a color..." value="#65D3B3" />
				<ColorPicker placeholder="Select a color..." value="#65D3B3" />
			</div>
		</div>
	</Fullscreen>
	<Fullscreen hotkey="ctrl+shift+f">
		<div class="demo-box">
			<h3>Fullscreen</h3>
			<p>
				When encountering multiple instances with same hotkeys selects
				focused area first
			</p>
			<p>Click button or press Ctrl + Shift + F to toggle fullscreen</p>
			<div class="demo-content">
				<ColorPicker placeholder="Select a color..." value="#ffc975" />
				<ColorPicker placeholder="Select a color..." value="#ffc975" />
				<ColorPicker placeholder="Select a color..." value="#ffc975" />
			</div>
		</div>
	</Fullscreen>
	<Fullscreen hotkey="ctrl+shift+space">
		<div class="demo-box">
			<h3>Fullscreen with custom button</h3>
			<p>
				Click button or press Ctrl + Shift + Space to toggle fullscreen
			</p>
			<div class="demo-content">
				<DatePicker />
				<DatePicker />
				<DatePicker />
			</div>
		</div>
		{#snippet toggleButton(onclick, inFullscreen)}
			<div class="demo-button">
				<Button {onclick}>
					{`Click me to ${inFullscreen ? "exit" : "enter"} fullscreen`}
				</Button>
			</div>
		{/snippet}
	</Fullscreen>
</div>

<style>
	.fullscreen-demo {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.demo-button {
		margin: 20px;
	}
	.demo-box {
		border: var(--wx-border);
		padding: 0 12px 12px;
		border-radius: var(--wx-border-radius, 3px);
	}
	.demo-content {
		display: flex;
		flex-direction: row;
		max-width: 900px;
		gap: 8px;
	}
</style>
