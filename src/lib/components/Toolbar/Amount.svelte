<script lang="ts">
  export let pageSize: number
  export let currentPage: number
  export let totalCount: number
</script>

{#if totalCount > 0}
  <div class="toolbar-amount">
    {(currentPage - 1) * pageSize + 1} - {Math.min(
      currentPage * pageSize,
      totalCount
    )} of {totalCount}
  </div>
{/if}
