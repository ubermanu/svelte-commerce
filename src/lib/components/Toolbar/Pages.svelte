<script lang="ts">
  import { getContext } from 'svelte'
  import { page } from '$app/stores'
  import { goto, invalidate } from '$app/navigation'

  const toolbar = getContext('toolbar') as any
  const { totalCount } = toolbar

  const currentPage = Number($page.url.searchParams.get('p') || 1)
  const pageSize = Number($page.url.searchParams.get('limit') || 16)

  $: totalPages = Math.ceil(totalCount / pageSize)

  console.log(totalCount, totalPages, pageSize)

  async function goToPage(p: number) {
    const searchParams = new URLSearchParams($page.url.searchParams)
    searchParams.set('p', p.toString())
    await invalidate('toolbar')
    await goto('?' + searchParams.toString(), { replaceState: true })
  }
</script>

<div class="pages">
  {#if currentPage > 1}
    <button class="page" on:click={() => goToPage(currentPage - 1)}>
      Previous
    </button>
  {/if}
  {#if currentPage < totalPages}
    <button class="page" on:click={() => goToPage(currentPage + 1)}>
      Next
    </button>
  {/if}
</div>
