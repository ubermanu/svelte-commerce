<script lang="ts">
  import { page } from '$app/stores'
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
  import PriceBox from '$lib/components/PriceBox.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import SwatchRenderer from '$lib/components/SwatchRenderer.svelte'
  import Rating from '$lib/components/Rating.svelte'
  import { formatDate } from '$lib/helpers/date'
  import Message from '$lib/components/Message.svelte'

  export let data

  // TODO: Add category to breadcrumbs
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: data.product.name! },
  ]

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

<section class="section max-md:space-y-4 md:grid md:grid-cols-2 md:gap-8">
  <div class="product photo mx-auto max-w-md">
    <img class="image w-full" src={data.product.image?.url} alt="" />
  </div>

  <div class="product details space-y-4">
    {#if data.product.only_x_left_in_stock}
      <div class="product-remaining">
        <Message level="warning">
          <p>
            Only <strong>{data.product.only_x_left_in_stock}</strong> left in stock!
          </p>
        </Message>
      </div>
    {/if}

    <div class="product status flex gap-4 text-lg">
      <div class="product-availability">
        {#if data.product.stock_status === 'IN_STOCK'}
          <span class="text-green-500">In Stock</span>
        {:else if data.product.stock_status === 'OUT_OF_STOCK'}
          <span class="text-red-500">Out of Stock</span>
        {/if}
      </div>
      <div class="product-sku">
        <span class="text-neutral-500">SKU:</span>
        <span>{data.product.sku}</span>
      </div>
    </div>

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
        <div class="configurable-options my-8 space-y-4">
          {#each data.product.configurable_options as option}
            <SwatchRenderer {option} />
          {/each}
        </div>
      {/if}

      <div class="box-tocart mt-8 flex items-center gap-2">
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
</section>

{#if data.product.description}
  <section class="section">
    <h3 class="section-title">Details</h3>
    <p class="product description prose prose-neutral dark:prose-invert">
      {@html data.product.description.html}
    </p>
  </section>
{/if}

{#if data.product.review_count > 0}
  <section class="section">
    <h3 class="section-title">
      Reviews
      {#if data.product.review_count > 0}
        <span class="count">({data.product.review_count})</span>
      {/if}
    </h3>
    {#if data.product.review_count > 0}
      <ul
        class="reviews-list max-md:space-y-4 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4"
      >
        {#each data.product.reviews.items as review}
          {#if review}
            <li class="review">
              <div
                class="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
              >
                <Rating value={review.average_rating} />
                <time datetime={review.created_at}>
                  {formatDate(review.created_at)}
                </time>
                <strong>{review.nickname}</strong>
              </div>
              <p class="mb-2 font-semibold">{review.summary}</p>
              <div class="prose prose-sm prose-neutral dark:prose-invert">
                <p>{review.text}</p>
              </div>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </section>
{/if}

<style lang="postcss">
  .section {
    @apply mb-12;
  }

  .section-title {
    @apply mb-4 text-2xl;
  }

  .section-title .count {
    @apply align-middle text-sm text-neutral-500;
  }
</style>
