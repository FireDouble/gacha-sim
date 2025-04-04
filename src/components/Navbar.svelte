<nav class="justify-center pt-4 pl-1 flex gap-6 bg-slate-800 shadow-md">
    {#each templates as template, i}
        {#if i == selected}
            <button onclick={() => {update(i)}}
                class="inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium text-sky-600 border-sky-500 cursor-pointer"
            >
                <img src="{template.asset_dir}/pull.png" alt=' ' class="size-7">
                {template.name}
            </button>
        {:else}
            <button onclick={() => {update(i)}}
                class="
                    inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-400
                    cursor-pointer
                "
            >
                <img src="{template.asset_dir}/pull.png" alt=' ' class="size-7">
                {template.name}
            </button>
        {/if}
    {/each}
</nav>

<script>
    import { get_templates } from "../utils/templates.js";
    import { onMount } from "svelte";

    let templates = $state([]);
    onMount(async () => {
        templates = await get_templates();
    })

    let { app_state = $bindable({}), selected = 0 } = $props();

    async function update(i) {
        app_state = {
            pulls: null,
            simulations: 10000,
            refund_count: null,
            refund: true,
            results: {
                odds: null,
                body: null,
                array: null,
            },

            assets_dir: templates[i].asset_dir,
            tooltips: {
                pulls: `Number of Pulls to spend`,
                simulations: `Increasing the number of simulations will yield more accurate results but will extend the time required for warp calculations`,
                refund: `Number of ${templates[i].names.refund} currently owned`,

                pity: `Number of Pulls since your last ${templates[i].names.upper_rarity} {name}`,
                copies: `Desired quantity of ${templates[i].names.upper_rarity} Limited {name}`,

                lower_pity: `Number of Pulls since your last ${templates[i].names.lower_rarity} {name}`,
            },

            refund_name: templates[i].refund_name,

            refund_cost: templates[i].refund_cost,
            settings: templates[i].settings,
        };

        let t = [];
        for (let i = 0; i < app_state.settings.length; i++) {
            t.push(
                {
                    copies: null,
                    pity: null,
                    is_guaranteed: false,
                    losses: null
                },
            );
        }
        app_state.targets = t;

        selected = i;
    }
</script>
