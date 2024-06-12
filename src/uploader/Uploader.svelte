<script>
	import { uid } from "@wx/lib-dom";
	import { onMount } from "svelte";

	export let data;
	export let accept = "";
	export let disabled = false;
	export let multiple = true;
	export let folder = false;
	export let uploadURL = "";

	export let ready = new Promise(() => ({}));

	let input;
	let drag;
	let count = 0;

	onMount(() => {
		input.webkitdirectory = folder;
	});

	function add(ev) {
		const files = Array.from(ev.target.files);
		files.forEach(f => addFile(f));

		upload();
	}

	function drop(ev) {
		const items = Array.from(ev.dataTransfer.items);

		items.forEach(item => {
			const entry = item.webkitGetAsEntry();
			if (entry) flatten(entry);
		});

		drag = false;
		count = 0;

		upload();
	}

	function flatten(item, path) {
		path = path || "";
		if (item.isFile) item.file(f => addFile(f));
		else if (item.isDirectory) {
			const dir = item.createReader();
			dir.readEntries(items =>
				items.forEach(item => {
					flatten(item, path + item.name + "/");
				})
			);
		}
	}

	function addFile(file) {
		const obj = {
			id: uid(),
			status: "client",
			name: file.name,
			file,
		};

		if (multiple) {
			data = [...data, obj];
		} else {
			data = [obj];
		}
	}

	function defaultUploader(files) {
		return files.map(rec => {
			const formData = new FormData();
			formData.append("upload", rec.file);

			const config = {
				method: "POST",
				body: formData,
			};

			return fetch(uploadURL, config)
				.then(res => res.json())
				.then(
					data => data,
					() => ({ id: rec.id, status: "error" })
				)
				.catch(error => console.log(error));
		});
	}

	function upload() {
		const files = data.filter(i => i.status === "client");
		if (!files.length) return;

		const requests =
			typeof uploadURL === "function"
				? uploadURL(files)
				: defaultUploader(files);

		ready = Promise.all(requests)
			.then(data => {
				data.forEach(r => {
					r.status = r.status || "server";
					updateData(r.id, r);
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	function updateData(id, result) {
		const ind = data.findIndex(i => i.id === id);
		data[ind] = { ...data[ind], ...result };
	}

	function dragenter() {
		if (count === 0) drag = true;
		count++;
	}

	function dragleave() {
		count--;
		if (count === 0) drag = false;
	}

	function open() {
		input.click();
	}
</script>

<div
	class="label"
	class:active={drag}
	on:dragenter={dragenter}
	on:dragleave={dragleave}
	on:dragover|preventDefault
	on:drop|preventDefault={drop}
>
	<input
		type="file"
		bind:this={input}
		on:change={add}
		{accept}
		{disabled}
		{multiple}
	/>
	<slot {open}>
		<div class="dropzone">
			<span>
				Drop files here or
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span class="action" on:click={open}>select files</span>
			</span>
		</div>
	</slot>
</div>

<style>
	.label {
		display: flex;
		align-items: center;
	}

	.label.active {
		background-color: var(--wx-background-alt);
	}
	input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
	}

	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--wx-padding);
		border: var(--wx-input-border);
		border-style: dashed;
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-uploader-background);
	}
	.action {
		cursor: pointer;
		color: var(--wx-color-link);
		text-decoration: underline;
	}
</style>
