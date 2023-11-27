<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
  import PriceBox from '$lib/components/PriceBox.svelte'

  export let data

  // TODO: Add category to breadcrumbs
  const breadcrumbs = [{ text: 'Home', href: '/' }, { text: data.product.name }]
</script>

<svelte:head>
  <title>{data.product.name}</title>
</svelte:head>

<Breadcrumbs items={breadcrumbs} />

<h1>{data.product.name}</h1>
<p>{@html data.product.description.html}</p>
<PriceBox priceRange={data.product.price_range} />
