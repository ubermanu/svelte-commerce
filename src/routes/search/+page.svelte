<script>
  import ProductList from '$lib/components/ProductList.svelte'

  export let data
</script>

<div class="products">
  {#await data.streamed.products}
    <p>Loading products</p>
  {:then products}
    <ProductList products={products.items} />
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
