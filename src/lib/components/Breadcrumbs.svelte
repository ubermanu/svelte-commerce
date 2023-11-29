<script lang="ts">
  interface BreadcrumbItem {
    text: string
    href?: string
  }

  export let items: BreadcrumbItem[] = []

  export let separator: string = '/'
</script>

{#if items.length > 0}
  <ul class="breadcrumbs flex flex-row items-center gap-2 text-sm">
    {#each items as item, i}
      {#if i > 0}
        <span class="separator">{separator}</span>
      {/if}
      {#if item.href && i < items.length - 1}
        <a class="underline-offset-4 hover:underline" href={item.href}>
          {item.text}
        </a>
      {:else}
        <span class="text-neutral-500">{item.text}</span>
      {/if}
    {/each}
  </ul>
{/if}
