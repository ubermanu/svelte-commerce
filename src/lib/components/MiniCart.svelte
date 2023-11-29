<script lang="ts">
  import PriceBox from '$lib/components/PriceBox.svelte'
  import clickOutside from '$lib/actions/clickOutside'
  import { writable } from 'svelte/store'
  import { ShoppingCart } from 'svelte-lucide'

  export let cart: any
  // console.log(cart)

  // Create a store to keep track of the visibility of the mini cart
  const visible = writable(false)

  function toggle() {
    $visible = !$visible
  }
</script>

<a
  class="mini-cart-button"
  href="/checkout/cart"
  on:click|preventDefault={toggle}
  title="My Cart"
>
  <ShoppingCart />
</a>

<!-- Add collapsible to render the products in the cart -->
<div
  class="mini-cart"
  style:display={$visible ? null : 'none'}
  use:clickOutside={() => ($visible = false)}
>
  {#if cart.items.length > 0}
    <ul>
      {#each cart.items as item}
        {@const product = item.product}
        <li class="product-item">
          <img class="product-item-photo" src={product.image.url} alt="" />
          <div class="product-item-details">
            <p class="product-item-name">{product.name}</p>
            <div class="product-item-price">
              <PriceBox priceRange={product.price_range} />
            </div>
            <div class="product-item-quantity">
              Quantity: {item.quantity}
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
    position: absolute;
    top: 10rem;
    right: 0;
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
