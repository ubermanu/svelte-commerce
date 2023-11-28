<script>
  export let data
</script>

<svelte:head>
  <title>{data.cmsPage?.title}</title>
</svelte:head>

{@html data.cmsPage?.content}
