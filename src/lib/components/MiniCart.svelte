<script lang="ts">
  import PriceBox from '$lib/components/PriceBox.svelte'
  import { ShoppingCart } from 'svelte-lucide'
  import { createPopover, melt } from '@melt-ui/svelte'

  export let cart: any

  const {
    elements: { trigger, content },
  } = createPopover()
</script>

<button use:melt={$trigger} class="mini-cart-button p-2" title="My Cart">
  <ShoppingCart tabindex="-1" aria-hidden="true" />
</button>

<div use:melt={$content} class="mini-cart">
  {#if cart.items.length > 0}
    <ul>
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
    <a href="/checkout/cart">View cart</a>
  {:else}
    <p>Cart is empty</p>
  {/if}
</div>

<style>
  .mini-cart {
    border: 1px solid black;
    background: white;
    padding: 1rem;
    width: 300px;
  }

  .mini-cart ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .product-item {
    display: flex;
  }

  .product-item-photo {
    width: 100px;
    height: 100px;
  }
</style>
