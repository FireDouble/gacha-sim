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

    <section class="py-8 flex gap-5">
        <Button text="Save Template" disabled={false} onclick={on_save_template} />
        <Button text="Load Template" disabled={false} onclick={on_load_template} />
        <Button text="Download Template" disabled={false} onclick={on_download_template}/>
        <Button text="Upload Template" disabled={false} onclick={fileInput.click()} />
        <input bind:this={fileInput} type="file" accept="application/json,.json" class="sr-only" onchange={on_upload_template} />
    </section>
</div>

<script>
    import { get_default_targets } from "../utils/defaults";
    import { extract_template, update_template } from "../utils/templates";
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";

    let { app_state = $bindable() } = $props()
    let fileInput = $state();

    async function on_banner_remove(index) {
        app_state.settings = app_state.settings.toSpliced(index, 1);
        app_state.targets = app_state.targets.toSpliced(index, 1);
    }

    async function on_banner_add() {
        app_state.settings.push(app_state.settings[app_state.settings.length-1]);
        app_state.targets = get_default_targets(app_state.settings.length);
    }

    async function on_save_template() {
        const template = {
            refund_cost: app_state.refund_cost,
            settings: app_state.settings,
        };

        localStorage.setItem('gacha_sim_template', JSON.stringify(template));
    }

    async function on_load_template() {
        let template = JSON.parse(localStorage.getItem('gacha_sim_template'));
        template = update_template(template);

        app_state.refund_cost = template.refund_cost;
        app_state.settings = template.settings;
        app_state.targets = get_default_targets(template.settings.length);
    }

    async function on_download_template() {
        let blob = new Blob([JSON.stringify(extract_template(app_state), null, 2)], { type: "application/json" });
        let url = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = "template.json";
        a.style.display = "none";
        document.body.appendChild(a);

        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    async function on_upload_template(event) {
        let file = event.target.files[0];
        let template = JSON.parse(await file.text());
        template = update_template(template);

        app_state.refund_cost = template.refund_cost;
        app_state.settings = template.settings;
        app_state.targets = get_default_targets(template.settings.length);
    }
</script>