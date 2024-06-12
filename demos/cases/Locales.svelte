<script>
	import { Calendar, Segmented, Locale } from "../../src/index";
	import { en, cn, de, es, fr, it, ja, pt, ru } from "@wx/core-locales";

	let lang = "en";
	const options = [
		{ id: "en", name: "EN" },
		{ id: "cn", name: "CN" },
		{ id: "de", name: "DE" },
		{ id: "es", name: "ES" },
		{ id: "fr", name: "FR" },
		{ id: "it", name: "IT" },
		{ id: "ja", name: "JA" },
		{ id: "pt", name: "PT" },
		{ id: "ru", name: "RU" },
	];

	const value = new Date(2022, 2, 18);
</script>

<div class="demo-box">
	<Segmented {options} bind:value={lang} />
</div>

<div class="demo-box" style="width: 300px">
	{#if lang === "en"}
		<Locale words={en}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "cn"}
		<Locale words={cn}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "de"}
		<Locale words={de}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "es"}
		<Locale words={es}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "fr"}
		<Locale words={fr}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "it"}
		<Locale words={it}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "ja"}
		<Locale words={ja}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "pt"}
		<Locale words={pt}>
			<Calendar {value} />
		</Locale>
	{:else if lang === "ru"}
		<Locale words={ru}>
			<Calendar {value} />
		</Locale>
	{/if}
</div>
