<script lang="ts">
  import { page } from '$app/stores'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  const currentPage = $page.data.toolbar.currentPage
  const pageSize = $page.data.toolbar.pageSize
  const sortOrder = $page.data.toolbar.sortOrder
  const sortDirection = $page.data.toolbar.sortDirection

  export let totalCount: number

  const toolbar = writable({
    currentPage,
    pageSize,
    sortOrder,
    sortDirection,
    totalCount,
  })

  // TODO: fix that monstrosity
  $: $toolbar.currentPage = $page.data.toolbar.currentPage
  $: $toolbar.pageSize = $page.data.toolbar.pageSize
  $: $toolbar.sortOrder = $page.data.toolbar.sortOrder
  $: $toolbar.sortDirection = $page.data.toolbar.sortDirection
  $: $toolbar.totalCount = totalCount

  setContext('toolbar', toolbar)
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
