<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
  import ProductList from '$lib/components/ProductList.svelte'

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
    <ProductList products={products.items} />
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
