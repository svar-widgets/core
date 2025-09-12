<script>
	import { Calendar, Segmented, Locale, Text } from "../../src/index";
	import { en, cn, de, es, fr, it, ja, pt, ru } from "@svar-ui/core-locales";

	let lang = $state("en");
	let numValue = $state(1256790.567);

	const options = [
		{ id: "en", label: "EN", locale: en },
		{ id: "cn", label: "CN", locale: cn },
		{ id: "de", label: "DE", locale: de },
		{ id: "es", label: "ES", locale: es },
		{ id: "fr", label: "FR", locale: fr },
		{ id: "it", label: "IT", locale: it },
		{ id: "ja", label: "JA", locale: ja },
		{ id: "pt", label: "PT", locale: pt },
		{ id: "ru", label: "RU", locale: ru },
	];

	function getWords(lang) {
		const op = options.find(op => op.id == lang);
		return op?.locale || en;
	}

	function getFormattedNumber(l, n) {
		const locale = getWords(l);
		const localeName = locale.lang || "en-US";
		return new Intl.NumberFormat(localeName, {
			minimumFractionDigits: 2,
			style: "currency",
			currency: "EUR",
		}).format(n);
	}

	const value = new Date(2024, 2, 18);
</script>

<div class="demo-box">
	<Segmented {options} bind:value={lang} />
</div>

<div class="demo-box" style="width: 300px">
	{#key lang}
		<Locale words={getWords(lang)}>
			<div class="calendar">
				<Calendar {value} />
			</div>

			<div class="bar">
				<div class="text">
					<Text bind:value={numValue} />
				</div>
				{getFormattedNumber(lang, numValue)}
			</div>
		</Locale>
	{/key}
</div>

<style>
	.demo-box {
	}
	.calendar {
		border: var(--wx-border);
		border-radius: 3px;
	}
	.bar {
		display: flex;
		margin-top: 20px;
		gap: 20px;
		align-items: center;
	}
	.text {
		width: 150px;
	}
</style>
