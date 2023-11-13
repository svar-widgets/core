<script>
	import { Pager } from "../../src/index";

	let v1 = 2;

</script>

<div class="demo-box">
	<h4>100 rows (active = {v1})</h4>
	<Pager bind:value={v1} total={100} />
</div>
