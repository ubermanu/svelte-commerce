<script>
  import PriceBox from '$lib/components/PriceBox.svelte'

  export let data
</script>

<svelte:head>
  <title>{data.product.name}</title>
</svelte:head>

<h1>{data.product.name}</h1>
<p>{@html data.product.description.html}</p>
<PriceBox priceRange={data.product.price_range} />
