<div class="w-full max-w-md bg-gray-700 rounded-xl shadow-lg p-6 my-12 space-y-4">
    {#if app_state.assets_dir != ""}
        <div class="select-none justify-center flex border px-3 py-2 rounded-md border-gray-600 bg-gray-700">
            <img src="{app_state.assets_dir}/logo.png" alt="Game Logo">
        </div>
    {/if}

    <Title text="Settings" icon={app_state.assets_dir != "" ? `${app_state.assets_dir}/settings.png` : null}/>
    <section class="flex gap-5">
        <Input label="Pulls" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.pulls} bind:value={app_state.pulls} />
        <Input label="Simulations" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.simulations} bind:value={app_state.simulations} />
    </section>
    <section class="flex gap-5">
        <Input label="Refund Material" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.refund} bind:value={app_state.refund_count} />
        <Input label="" text="Use Refund?" type="checkbox" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.use_refund} bind:value={app_state.refund} /> 
    </section>

    {#each app_state.targets as target, i}
        <Title text={app_state.settings[i].name} icon={app_state.assets_dir != "" ? `${app_state.assets_dir}/banner${i+1}.png` : null}/>
        <section class="flex gap-5">
            <Input label="Pity" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.pity.replace("{name}", app_state.settings[i].name)} bind:value={target.pity} />
            <Input label="Copies" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.copies.replace("{name}", app_state.settings[i].name)} bind:value={target.copies} />
            {#if app_state.settings[i].guaranteed_after != 0}
                {#if app_state.settings[i].guaranteed_after == 1}
                    <Input label="" type="checkbox" text="Guaranteed?" tooltip={app_state.tooltips.guarantee.replace("{count}", "")} bind:value={target.is_guaranteed} /> 
                {:else}
                    <Input label="Losses" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.losses} bind:value={target.losses} />
                {/if}
            {/if}
        </section>
        {#if app_state.refund}
            <section class="flex gap-5">
                <Input label="Pity" type="number" placeholder="0" autocomplete="off" tooltip={app_state.tooltips.lower_pity.replace("{name}", app_state.settings[i].name)} bind:value={target.lower_pity}/>

                {#if app_state.settings[i].refund_on_lower != app_state.settings[i].refund_on_lower_maxed}
                    <Input label="" tooltip = {app_state.tooltips.lower_pity_maxed} type="checkbox" text="Maxed?" bind:value={target.maxed_lower}/> 
                {/if}
            </section>
        {/if}

    {/each}


    <div class="space-y-6">
        <Button text="Simulate" {disabled} onclick={on_simulate} />
    </div>

    {#if app_state.results.odds !== null}
        <Results bind:title={app_state.results.odds} bind:body={app_state.results.body} array={app_state.results.array}/>
    {/if}
</div>

<script>
    import Button from "./Button.svelte";
    import Title from "./Title.svelte";
    import Input from "./Input.svelte";
    import Results from "./Results.svelte";

    let {
        app_state = $bindable({}),
        on_simulate, disabled
    } = $props();
</script>
