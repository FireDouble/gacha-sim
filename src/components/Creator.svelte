<div class="w-full">
    <section class="flex gap-5">
        <Input type="text" label="Refund Name" bind:value={app_state.names.refund} />
        <Input type="text" label="Upper Rarity Name" bind:value={app_state.names.upper_rarity} />
        <Input type="text" label="Lower Rarity Name" bind:value={app_state.names.lower_rarity} />
    </section>

    {#each app_state.settings as setting, i}
        <div class="py-6">
            <Input type="text" label="Banner Name" bind:value={setting.name} />
            <section class="flex gap-5">
                <Input type="number" label="Base Rate" bind:value={setting.base_rate} />
                <Input type="number" label="Limited Rate" bind:value={setting.limited_rate} />
                <Input type="number" label="Limited Options" bind:value={setting.limited_options} />
            </section>
            <section class="flex gap-5">
                <Input type="number" label="Hard Pity" bind:value={setting.hard_pity} />
                <Input type="number" label="Soft Pity" bind:value={setting.soft_pity} />
            </section>
            <section class="flex gap-5">
                <Input type="number" label="Guaranteed After" bind:value={setting.guaranteed_after} />
            </section>

            <section class="py-4 flex gap-5">
                <Input type="number" label="Lower Base Rate" bind:value={setting.lower_base_rate} />
                <Input type="number" label="Lower Hard Pity" bind:value={setting.lower_hard_pity} />
                <Input type="number" label="Refund" bind:value={setting.refund_on_lower} />
                <Input type="number" label="Refund On Maxed" bind:value={setting.refund_on_lower_maxed} />
            </section>

            <Button text="Remove Banner" disabled={false} onclick={() => on_banner_remove(i)} />
        </div>
    {/each}

    <Button text="Add Banner" disabled={false} onclick={on_banner_add} />
</div>

<script>
    import { get_default_targets } from "../utils/defaults";
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";

    let { app_state = $bindable() } = $props()

    async function on_banner_remove(index) {
        app_state.settings = app_state.settings.toSpliced(index, 1);
        app_state.targets = app_state.targets.toSpliced(index, 1);
    }

    async function on_banner_add() {
        app_state.settings.push(app_state.settings[app_state.settings.length-1]);
        app_state.targets = get_default_targets(app_state.settings.length);
    }
</script>