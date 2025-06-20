<nav class="justify-center pt-4 pl-1 flex gap-6 bg-slate-800 shadow-md">
    <div class="inline-flex w-[80px]"></div>
    <div class="ml-auto mr-auto">
        {#each templates as template, i}
            {#if i == selected}
                <button onclick={() => {update(i)}}
                    class="inline-flex shrink-0 items-center gap-2 border-b-2 px-2 pb-4 text-sm font-medium text-sky-600 border-sky-500 cursor-pointer"
                >
                    <img src="{template.asset_dir}/pull.png" alt=' ' class="size-7">
                    {template.name}
                </button>
            {:else}
                <button onclick={() => {update(i)}}
                    class="
                        inline-flex shrink-0 items-center gap-2 border-b-2 px-2 pb-4 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-400
                        cursor-pointer
                    "
                >
                    <img src="{template.asset_dir}/pull.png" alt=' ' class="size-7">
                    {template.name}
                </button>
            {/if}
        {/each}
    </div>

    <div class="inline-flex w-[80px]">
        {#if selected == -1}
            <button onclick={() => {custom_template()}}
                class="inline-flex shrink-0 items-center gap-2 border-b-2 px-2 pb-4 text-sm font-medium text-sky-600 border-sky-500 cursor-pointer"
            >
            CUSTOM
            </button>
        {:else}
            <button onclick={() => {custom_template()}}
                class="
                    inline-flex shrink-0 items-center gap-2 border-b-2 px-2 pb-4 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-400
                    cursor-pointer
                "
            >
            CUSTOM
            </button>
        {/if}
    </div>
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
        const template = templates[i];
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

            custom: false,
            assets_dir: template.asset_dir,
            names: template.names,
            tooltips: {
                pulls: `Number of Pulls to spend`,
                simulations: `Increasing the number of simulations will yield more accurate results but will extend the time required for warp calculations`,
                refund: `Number of ${template.names.refund} currently owned`,
                use_refund: `Whether to convert ${template.names.refund} to Pulls`,

                pity: `Number of Pulls since your last ${template.names.upper_rarity} {name}`,
                copies: `Desired quantity of ${template.names.upper_rarity} Limited {name}`,
                lower_pity: `Number of Pulls since your last ${template.names.lower_rarity} {name}`,
                lower_pity_maxed: `Whether all of the ${template.names.lower_rarity} have all of their bonus abilities from duplicate copies unlocked`,
                guarantee: `Whether your last ${template.names.upper_rarity} was a Standard`,
                losses: `How many of your last ${template.names.upper_rarity} were Standard`,
            },

            refund_cost: template.refund_cost,
            settings: template.settings,
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

    async function custom_template() {
        app_state.custom = true;
        app_state.assets_dir = "";
        selected = -1;
    }
</script>
