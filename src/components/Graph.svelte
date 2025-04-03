<div class="w-full" bind:clientWidth={width} bind:clientHeight={height}>
	<svg class="relative w-full">
		<!-- y axis -->
		<g transform="translate(0,{padding.top})">
			{#each yTicks as tick}
				<g transform="translate(0, {yScale(tick).toFixed(0) - padding.bottom})">
					<line class="stroke-gray-200" x2="100%"></line>
					<text class="fill-gray-400" y="-4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g>
			{#each points as point}
				<g class="text-xs" transform="translate({xScale(point[0])},{height})">
					{#if point[0] < 1000}
						<text class="fill-gray-400 tick-text-middle" x="{barWidth/2}" y="-4">{point[0]}</text>
					{/if}
				</g>
			{/each}
		</g>
 
		<g>
			{#each points as point}
				<rect
					class="fill-blue-400 hover:fill-blue-500 focus:fill-blue-500 transition-colors"
					x="{xScale(point[0])}"
					y="{yScale(point[1]).toFixed(0)}"
					width="{barWidth - 4}"
					height="{height - padding.bottom - yScale(point[1]).toFixed(0)}"
					role="button"
					tabindex="0"
					onmouseover={(e) => showTooltip(point, e)}
					onfocus={(e) => showTooltip(point, e)}
					onmouseout={() => tooltip = null}
					onblur={() => tooltip = null}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') showTooltip(point, e); }}
				></rect>
			{/each}
		</g>

		<!-- Tooltip -->
		{#if tooltip}
		<text
			x="{tooltip.x}"
			y="{tooltip.y}"
			class="fill-white text-xs bg-gray-700 px-1 py-0.5 rounded absolute"
			text-anchor="middle"
		>
			{tooltip.value}
		</text>
		{/if}
	</svg>
</div>

<style>
	.tick-text-middle {
		text-anchor: middle;
	}
</style>

<script>
	import { scaleLinear, scaleBand } from 'd3-scale';

	let width = $state(500);
	let height = $state(300);
	let tooltip = $state({
		x: 0, y: 0, value: "",
	})
	 
	let { points = [] } = $props();


	const xTicks = $derived(points.map(d => d[0]))
	const yTicks = $derived(calculateYTicks(points));
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let xScale = $derived(scaleBand()
		.domain(xTicks)
		.range([padding.left, width - padding.right])
	);
	let yScale = $derived(scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top])
	);

	let innerWidth = $derived(width - (padding.left + padding.right));
	let barWidth = $derived(innerWidth / xTicks.length);



	function calculateYTicks(data) {
		let maxValue = Math.max(...data.map(([_, freq]) => freq));

		let roundingFactor;
		if (maxValue < 100) {
			roundingFactor = 10;
		} else {
			roundingFactor = 100;
		}

		let roundedMax = maxValue < 10 ? 10 : Math.ceil(maxValue / roundingFactor) * roundingFactor;

		let tick1 = Math.ceil((roundedMax / 3) / roundingFactor) * roundingFactor;
		let tick2 = Math.ceil((2 * roundedMax / 3) / roundingFactor) * roundingFactor;

		if (maxValue < 10) {
			tick1 = Math.ceil(roundedMax / 3);
			tick2 = Math.ceil(2 * roundedMax / 3);
		}

		return [0, tick1, tick2, roundedMax];
	}

	function showTooltip(point, _event) {
		tooltip = { 
			x: xScale(point[0]) + barWidth / 2, 
			y: yScale(point[1]) - 10, 
			value: `${point[0]}: ${point[1]}`
		};
	}
</script>