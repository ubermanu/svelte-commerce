<script>
  import PriceBox from '$lib/components/PriceBox.svelte'
  import { formatPrice } from '$lib/helpers/price'

  export let data
</script>

{#if data.cart && data.cart.items.length > 0}
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each data.cart.items as { id, quantity, product }}
        <tr>
          <td>
            <div class="product-item">
              <a href={`/products/${product.sku}`} tabindex="-1">
                <img
                  class="product-item-photo"
                  src={product.image.url}
                  alt=""
                />
              </a>
              <a href={`/products/${product.sku}`}>
                <strong class="product-item-name">
                  {product.name}
                </strong>
              </a>
            </div>
          </td>
          <td>
            <PriceBox priceRange={product.price_range} />
          </td>
          <td>
            <input type="number" min="1" value={quantity} />
          </td>
          <td>
            <PriceBox priceRange={product.price_range} {quantity} />
          </td>
          <td>
            <button class="action remove">&times;</button>
          </td>
        </tr>
      {/each}
    </tbody>
    {#if data.cart.prices}
      <tfoot>
        <tr>
          <td colspan="4">Subtotal</td>
          <td>
            {formatPrice(data.cart.prices.subtotal_including_tax.value)}
          </td>
        </tr>
        <tr>
          <td colspan="4">Total</td>
          <td>
            {formatPrice(data.cart.prices.grand_total.value)}
          </td>
        </tr>
      </tfoot>
    {/if}
  </table>

  <a href="/checkout">Proceed to Checkout</a>
{:else}
  <p>Your cart is empty.</p>
  <a href="/products">Browse products</a>
{/if}

<style>
  .product-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .product-item-photo {
    max-width: 100px;
  }
</style>
