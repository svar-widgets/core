<script>
	import { Calendar, Segmented, Locale, Text } from "../../src/index";
	import { en, cn, de, es, fr, it, ja, pt, ru } from "wx-core-locales";

	let lang = $state("en");
	let numValue = $state(1256790.567);

	const options = [
		{ id: "en", name: "EN", locale: en },
		{ id: "cn", name: "CN", locale: cn },
		{ id: "de", name: "DE", locale: de },
		{ id: "es", name: "ES", locale: es },
		{ id: "fr", name: "FR", locale: fr },
		{ id: "it", name: "IT", locale: it },
		{ id: "ja", name: "JA", locale: ja },
		{ id: "pt", name: "PT", locale: pt },
		{ id: "ru", name: "RU", locale: ru },
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
