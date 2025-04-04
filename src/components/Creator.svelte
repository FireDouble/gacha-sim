<div class="w-full">
    {#each app_state.settings as setting}
        <div class="py-2">
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
        </div>
    {/each}
</div>

<script>
    import Input from "./Input.svelte";

    let { app_state = $bindable() } = $props();
</script>