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
</script>

{#if priceRange}
  <div class="price-box">
    <span
      class="price"
      data-currency={priceRange.minimum_price?.regular_price.currency}
    >
      {formatPrice(priceRange.minimum_price?.regular_price.value ?? '')}
    </span>
  </div>
{/if}
