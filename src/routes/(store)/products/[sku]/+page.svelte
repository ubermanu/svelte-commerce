<script lang="ts">
  import { page } from '$app/stores'
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
  import PriceBox from '$lib/components/PriceBox.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import ConfigurableOptions from './ConfigurableOptions.svelte'

  export let data

  // TODO: Add category to breadcrumbs
  const breadcrumbs = [{ text: 'Home', href: '/' }, { text: data.product.name }]

  let quantity: number = 1

  function handleQuantityChange(event: Event) {
    quantity = +(event.target as HTMLInputElement).value
  }
</script>

<svelte:head>
  <title>{data.product.name}</title>
</svelte:head>

<Breadcrumbs items={breadcrumbs} />

<PageTitle>{data.product.name}</PageTitle>

<div class="product max-md:space-y-4 md:grid md:grid-cols-2 md:gap-4">
  <div class="product photo mx-auto max-w-md">
    <img class="image w-full" src={data.product.image.url} alt="" />
  </div>

  <div class="product details space-y-4">
    <p class="product description prose prose-neutral">
      {@html data.product.description.html}
    </p>

    <PriceBox
      class="text-3xl"
      priceRange={data.product.price_range}
      {quantity}
    />

    <form
      id="product_addtocart_form"
      action="/api/cart?/addProduct"
      method="POST"
    >
      <input type="hidden" name="return_url" value={$page.url.pathname} />
      <input type="hidden" name="sku" value={data.product.sku} />

      {#if data.product.type_id === 'configurable'}
        <ConfigurableOptions product={data.product} />
      {/if}

      <div class="box-tocart flex items-center gap-1">
        <Input
          label="Quantity"
          noLabel={true}
          name="qty"
          type="number"
          min="1"
          max="10"
          step="1"
          value="1"
          on:input={handleQuantityChange}
        />
        <button type="submit" class="action primary to-cart">
          Add to Cart
        </button>
      </div>
    </form>
  </div>
</div>
