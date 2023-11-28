<script lang="ts">
  import { page } from '$app/stores'
  import { setContext } from 'svelte'

  $: searchParams = new URLSearchParams($page.url.searchParams)

  const currentPage = $page.data.toolbar.currentPage
  const pageSize = $page.data.toolbar.pageSize
  const sortOrder = $page.data.toolbar.sortOrder
  const sortDirection = $page.data.toolbar.sortDirection

  export let totalCount: number

  setContext('toolbar', {
    currentPage,
    pageSize,
    sortOrder,
    sortDirection,
    totalCount,
    searchParams,
  })
</script>

<div class="toolbar">
  <slot />
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 1.6rem;
  }
</style>
