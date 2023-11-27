<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
  import PriceBox from '$lib/components/PriceBox.svelte'
  import { page } from '$app/stores'

  export let data

  // TODO: Add category to breadcrumbs
  const breadcrumbs = [{ text: 'Home', href: '/' }, { text: data.product.name }]
</script>

<svelte:head>
  <title>{data.product.name}</title>
</svelte:head>

<Breadcrumbs items={breadcrumbs} />

<img class="product image" src={data.product.image.url} alt="" />

<h1 class="product name">{data.product.name}</h1>
<p class="product description">{@html data.product.description.html}</p>

<PriceBox priceRange={data.product.price_range} />

<form action="/api/cart?/addProduct" method="POST">
  <input type="hidden" name="return_url" value={$page.url.pathname} />
  <input type="hidden" name="sku" value={data.product.sku} />
  <input type="number" name="qty" value="1" />
  <button type="submit">Add to cart</button>
</form>

<style>
  .product.image {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
</style>
