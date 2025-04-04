<div class="py-2 border border-gray-600 rounded-md w-full flex items-center justify-center">
    <p class="mr-2 select-none">{text}</p>

    {#if icon !== null}
        <img src={icon} alt=" " class="h-5 w-5">
    {/if}
</div>

<script>
    let { text = '', icon = null } = $props();
</script>