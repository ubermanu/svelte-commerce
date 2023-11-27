<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

  export let data

  // TODO: Add parent categories to breadcrumbs
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: data.category.name },
  ]
</script>

<svelte:head>
  <title>{data.category.name}</title>
</svelte:head>

<Breadcrumbs items={breadcrumbs} />

<h1 class="category name">{data.category.name}</h1>

<div class="products">
  {#await data.streamed.products}
    <p>Loading products</p>
  {:then products}
    <ul class="products-grid items">
      {#each products.items as product}
        <li class="product-item">
          <a href="/products/{product.sku}" tabindex="-1">
            <img class="product-item-photo" src={product.image.url} alt="" />
          </a>
          <a href="/products/{product.sku}" class="product-item-link">
            <h3 class="product-item-name">{product.name}</h3>
          </a>
        </li>
      {/each}
    </ul>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<style>
  .product-item {
    padding: 0.8rem;
    text-align: center;
  }

  .product-item-photo {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 0.8rem;
    list-style: none;
  }
</style>
