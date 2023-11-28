<script lang="ts">
  import { getContext } from 'svelte'
  import { page } from '$app/stores'

  const toolbar = getContext('toolbar') as any
  const { totalCount } = toolbar

  const currentPage = Number($page.url.searchParams.get('p')) || 1
  const pageSize = Number($page.url.searchParams.get('limit')) || 16

  $: console.log('amount', $page.data.toolbar)
  $: console.log('amount-total', toolbar)
</script>

{#if totalCount > 0}
  <div class="toolbar-amount">
    {(currentPage - 1) * pageSize + 1} - {Math.min(
      currentPage * pageSize,
      totalCount
    )} of {totalCount}
  </div>
{/if}
