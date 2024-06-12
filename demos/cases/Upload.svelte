<script>
	import { Button, Uploader, UploaderList } from "../../src/index";

	let store = [];
	let store2 = [];
	let store3 = [];

	const uploadURL = "http://localhost:3000/data";

	function getBase64(file) {
		return new Promise(r => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => r(reader.result);
		});
	}

	function base64Uploader(files) {
		return files.map(f => {
			return getBase64(f.file).then(v => {
				return {
					status: "server",
					url: v,
					file: f.file,
					id: f.id,
					size: f.file.size,
				};
			});
		});
	}
</script>

<div class="demo-box">
	<h3>Uploader with default drop zone</h3>
	<div class="demo">
		<UploaderList bind:data={store} />
		<Uploader bind:data={store} {uploadURL} />
	</div>

	<h3>Uploader with custom handler (no server side)</h3>
	<div class="demo">
		<UploaderList bind:data={store3} />
		{#each store3 as obj (obj.id)}
			{#if obj.status === "server"}
				<img
					src={obj.url}
					alt=""
					style="width:50px;height:50px;object-fit:cover;"
				/>
			{/if}
		{/each}
		<Uploader bind:data={store3} uploadURL={base64Uploader} />
	</div>

	<h3>Uploader with custom controls</h3>
	<div class="demo">
		<Uploader let:open bind:data={store2} {uploadURL}>
			<Button type="primary" click={open}>Upload files</Button>
		</Uploader>
		<UploaderList bind:data={store2} />
	</div>
</div>

<style>
	.demo-box {
		width: 320px;
	}
	.demo-box :global(.dropzone) {
		height: 100px;
		width: 100%;
	}
	.demo {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
