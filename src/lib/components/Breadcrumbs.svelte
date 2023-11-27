<script lang="ts">
  interface BreadcrumbItem {
    text: string
    href?: string
  }

  export let items: BreadcrumbItem[] = []
</script>

{#if items.length > 0}
  <ul class="breadcrumbs">
    {#each items as item, i}
      {#if i > 0}
        <span class="separator">/</span>
      {/if}
      {#if item.href && i < items.length - 1}
        <a href={item.href}>{item.text}</a>
      {:else}
        <span>{item.text}</span>
      {/if}
    {/each}
  </ul>
{/if}

<style>
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    list-style: none;
  }
</style>
