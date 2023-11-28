<script lang="ts">
  import { formatPrice } from '$lib/helpers/price'

  interface PriceRange {
    minimum_price: {
      regular_price: {
        currency: string
        value: number
      }
    }
  }

  export let priceRange: Partial<PriceRange>

  export let quantity: number = 1
</script>

{#if priceRange && priceRange.minimum_price}
  <div class="price-box">
    <span
      class="price"
      data-currency={priceRange.minimum_price.regular_price.currency}
    >
      {formatPrice(priceRange.minimum_price.regular_price.value * quantity)}
    </span>
  </div>
{/if}
