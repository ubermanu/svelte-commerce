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
        <a class="item" href={item.href}>{item.text}</a>
      {:else}
        <span class="item">{item.text}</span>
      {/if}
    {/each}
  </ul>
{/if}

<style lang="postcss">
  .breadcrumbs {
    @apply flex flex-row items-center gap-2 text-sm;
  }

  a.item {
    @apply underline-offset-4 hover:underline;
  }

  span.item {
    @apply text-neutral-500;
  }
</style>
