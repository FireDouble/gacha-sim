<Navbar bind:app_state/>

{#if app_state.custom}
    <main class="flex m-2">
        <div class="w-full bg-gray-700 rounded-xl shadow-lg p-6 space-y-4">
            <Creator bind:app_state/>
        </div>
        <div class="w-full justify-center flex">
            <Simulator
                bind:app_state
                {disabled}
                {on_simulate}
            />
        </div>
        
    </main>
{:else }
    <main class="flex flex-col justify-center items-center m-2">
        <Simulator
            bind:app_state
            {disabled}
            {on_simulate}
        />
    </main>
{/if}


<script>
    import Simulator from "./components/Simulator.svelte";
    import Navbar from "./components/Navbar.svelte";
    import Creator from "./components/Creator.svelte";
    import { get_templates } from "./utils/templates.js";
    import { simulations } from "./utils/simulation";
    import { strip_map } from "./utils/strip_map";
    import { get_default_targets, get_empty_app_state } from "./utils/defaults.js"
    import { onMount } from "svelte";

    let app_state = $state(get_empty_app_state());
    onMount(async () => {
        const templates = await get_templates();
        const template = templates[0];

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
            targets: get_default_targets(template.settings.length),
            settings: template.settings,
        };
    })

    let disabled = $derived(!(
        app_state.pulls > 0 &&
        app_state.simulations > 0 &&
        !app_state.targets.some(target => target.pity < 0) &&
        app_state.targets.some(target => target.copies !== 0 && target.copies !== null)
    ))

    async function on_simulate() {
        const data = simulations($state.snapshot(app_state));
        let output = "<span>Is the probability of you obtaining";

        for (let i = 0; i < app_state.targets.length; i++) {
            if (app_state.targets[i].copies <= 0) { continue; }
            output += `
                ${i == 0 ? "" : "and"}
                <span class="select-none py-1 px-2 mx-1 rounded-md text-xs font-medium shadow-sm bg-gray-600 text-white">${app_state.targets[i].copies}</span>
                ${app_state.targets[i].copies > 1 ? "copies" : "copy"}
                of the limited
                ${app_state.settings[i].name.toLowerCase()}
                from the featured banner
            `
        }

        output += `
            if you were to do
            <span class="select-none py-1 px-2 mx-1 rounded-md text-xs font-medium shadow-sm bg-gray-600 text-white">${app_state.pulls}</span>
            Pulls</span>.
        `
        app_state.results.body = output;

        app_state.results.odds = ((data.successfull_simulations / app_state.simulations) * 100).toFixed(String(app_state.simulations/1000).length) + "%";

        app_state.results.array = strip_map(data.pulls_map);
    }
</script>