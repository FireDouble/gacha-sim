<div class="p-5 border border-gray-600 rounded-md w-full flex-col flex items-center justify-center">
    <span class="mb-3 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xl font-medium bg-green-600/30 text-green-500">
      {title}
    </span>

    <div class="mr-2">{@html body}</div>

    <br><br>
    
    <Graph points={array}/>
</div>

<script>
    import Graph from "./Graph.svelte";
    let { title = $bindable(''), body = $bindable(''), array = [] } = $props();
</script>