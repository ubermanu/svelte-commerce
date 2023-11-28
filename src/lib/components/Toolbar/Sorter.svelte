<script lang="ts">
  import { page } from '$app/stores'
  import { goto, invalidate } from '$app/navigation'

  $: sortOrder = $page.url.searchParams.get('sort') || 'relevance'
  $: sortDirection = $page.url.searchParams.get('d') || 'asc'

  const orders = ['relevance', 'name', 'price']
  const directions = ['asc', 'desc']

  async function setSortOrder(order: string) {
    const searchParams = new URLSearchParams($page.url.searchParams)
    searchParams.set('sort', order)
    searchParams.delete('d')
    await invalidate('toolbar')
    await goto('?' + searchParams.toString(), { replaceState: true })
  }

  async function toggleSortDirection() {
    const searchParams = new URLSearchParams($page.url.searchParams)
    searchParams.set('d', sortDirection === 'asc' ? 'desc' : 'asc')
    await invalidate('toolbar')
    await goto('?' + searchParams.toString(), { replaceState: true })
  }
</script>

<div class="toolbar-sorter">
  <select name="order" on:change={(e) => setSortOrder(e.currentTarget.value)}>
    {#each orders as order}
      <option value={order} selected={order === sortOrder}>{order}</option>
    {/each}
  </select>
  <button
    on:click={() => toggleSortDirection()}
    class:sort-asc={sortDirection === 'asc'}
    class:sort-desc={sortDirection === 'desc'}
  >
    {sortDirection === 'asc' ? '▲' : '▼'}
  </button>
</div>
