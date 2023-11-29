<script>
  import ProductList from '$lib/components/ProductList.svelte'
  import Toolbar from '$lib/components/Toolbar.svelte'
  import Amount from '$lib/components/Toolbar/Amount.svelte'
  import Sorter from '$lib/components/Toolbar/Sorter.svelte'
  import Pages from '$lib/components/Toolbar/Pages.svelte'
  import Limiter from '$lib/components/Toolbar/Limiter.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  export let data
</script>

<svelte:head>
  <title>Search - {data.head.title}</title>
</svelte:head>

<PageTitle>Search</PageTitle>

<div class="products">
  {#await data.streamed.products}
    <p>Loading products</p>
  {:then products}
    {#if products.total_count > 0}
      <Toolbar totalCount={+products.total_count}>
        <Amount />
        <Sorter />
      </Toolbar>
      <ProductList products={products.items} />
      <Toolbar totalCount={+products.total_count}>
        <Pages />
        <Limiter />
      </Toolbar>
    {:else}
      <p>No products found</p>
    {/if}
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
