<script lang="ts">
  import PriceBox from '$lib/components/PriceBox.svelte'
  import { ShoppingCart, X } from 'svelte-lucide'
  import { createPopover, melt } from '@melt-ui/svelte'

  export let cart: any

  const {
    elements: { trigger, content, close },
  } = createPopover({
    positioning: {
      placement: 'top-end',
    },
  })
</script>

<button
  use:melt={$trigger}
  class="mini-cart-button rounded p-2"
  title="My Cart"
>
  <ShoppingCart tabindex="-1" aria-hidden="true" />
</button>

<div
  use:melt={$content}
  class="mini-cart w-full max-w-lg bg-white p-4 pt-8 shadow-lg"
>
  <button
    use:melt={$close}
    class="close-button absolute right-1 top-2"
    title="Close"
  >
    <X tabindex="-1" aria-hidden="true" />
  </button>
  {#if cart.items.length > 0}
    <ul class="items max-h-96 space-y-2 overflow-y-scroll">
      {#each cart.items as item}
        {@const product = item.product}
        <li class="product-item">
          <img class="product-item-photo" src={product.image.url} alt="" />
          <div class="product-item-details">
            <p class="product-item-name">{product.name}</p>
            <div class="product-item-price">
              <PriceBox
                priceRange={product.price_range}
                quantity={+item.quantity}
              />
            </div>
            <div class="product-item-quantity">
              Qty: {item.quantity}
            </div>
          </div>
        </li>
      {/each}
    </ul>
    <a href="/checkout/cart" class="action primary checkout mt-4 w-full">
      View cart
    </a>
  {:else}
    <p>Cart is empty</p>
  {/if}
</div>

<style lang="postcss">
  .product-item {
    @apply flex items-center gap-4;
  }

  .product-item-photo {
    @apply h-24 w-24 object-contain;
  }
</style>
