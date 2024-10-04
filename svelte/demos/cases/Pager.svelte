<script>
	import { Pager } from "../../src/index";

	let v1 = 2;
</script>

<div class="demo-box">
	<h3>100 rows (active = {v1})</h3>
	<Pager bind:value={v1} total={100} />
</div>
