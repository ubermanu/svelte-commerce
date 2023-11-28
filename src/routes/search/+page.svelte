<script>
  import ProductList from '$lib/components/ProductList.svelte'
  import Toolbar from '$lib/components/Toolbar.svelte'
  import Amount from '$lib/components/Toolbar/Amount.svelte'
  import Sorter from '$lib/components/Toolbar/Sorter.svelte'
  import Pages from '$lib/components/Toolbar/Pages.svelte'
  import Limiter from '$lib/components/Toolbar/Limiter.svelte'

  export let data
</script>

<div class="products">
  {#await data.streamed.products}
    <p>Loading products</p>
  {:then products}
    <Toolbar totalCount={+products.total_count}>
      <Amount />
      <Sorter />
    </Toolbar>
    <ProductList products={products.items} />
    <Toolbar totalCount={+products.total_count}>
      <Pages />
      <Limiter />
    </Toolbar>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
