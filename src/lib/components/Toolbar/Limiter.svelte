<script lang="ts">
  import { goto, invalidate } from '$app/navigation'
  import { page } from '$app/stores'
  import { getContext } from 'svelte'

  const toolbar = getContext('toolbar') as ToolbarContext
  const pageSize = $toolbar.pageSize

  const limits = [8, 16, 24, 32, 48]

  async function setLimit(limit: string) {
    const searchParams = new URLSearchParams($page.url.searchParams)
    searchParams.set('p', '1')
    searchParams.set('limit', limit)
    await invalidate('toolbar')
    await goto('?' + searchParams.toString(), { replaceState: true })
  }
</script>

<div class="toolbar-limiter">
  <select name="limit" on:change={(e) => setLimit(e.currentTarget.value)}>
    {#each limits as limit}
      <option value={limit} selected={limit === pageSize}>{limit}</option>
    {/each}
  </select>
</div>
