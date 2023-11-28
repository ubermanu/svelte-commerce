<script lang="ts">
  import { getContext } from 'svelte'

  const toolbar = getContext('toolbar') as ToolbarContext

  $: totalCount = $toolbar.totalCount
  const currentPage = $toolbar.currentPage
  const pageSize = $toolbar.pageSize
</script>

{#if totalCount > 0}
  <div class="toolbar-amount">
    {(currentPage - 1) * pageSize + 1} - {Math.min(
      currentPage * pageSize,
      totalCount
    )} of {totalCount}
  </div>
{/if}
