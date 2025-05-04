<div class="w-full">
	<div class="flex items-center gap-3 px-3 py-2 border rounded-md border-gray-600 transition-colors bg-gray-700 focus-within:border-blue-300">
		{#if isCheckbox}
			<input
				type="checkbox"
				{...props}
				bind:checked={value}
				class="form-checkbox text-blue-500 h-5 w-5"
			/>
            <div class="inline-flex">
                <p class="ml-2">{text}</p>
            </div>
		{:else}
			<input
				{type}
				{...props}
				bind:value
				class="w-full bg-transparent focus:outline-none"
			/>
		{/if}
	</div>

	{#if label}
		<div class="flex items-center gap-1 mt-1 text-sm text-gray-500">
			{label}
			{#if tooltip}
				<Tooltip message={tooltip} />
			{/if}
		</div>
	{/if}
</div>

<script>
    import Tooltip from "./Tooltip.svelte";

    let { type = "", label, text = "Default Text", tooltip = '', value = $bindable(), ...props} = $props();
	const isCheckbox = type === "checkbox";
</script>

