<script>
  export let data
</script>

<svelte:head>
  <title>{data.head.title}</title>
  {#if data.head.description}
    <meta name="description" content={data.head.description} />
  {/if}
  {#if data.head.keywords}
    <meta name="keywords" content={data.head.keywords} />
  {/if}
</svelte:head>

<slot />
