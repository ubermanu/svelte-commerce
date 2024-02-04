<script lang="ts">
  import { formatPrice } from '$lib/helpers/price'
  import type { PriceRange } from '$lib/generated/graphql'

  export let priceRange: PriceRange

  export let quantity: number = 1

  // TODO: Add support for tier prices

  const { class: additionalClasses = '', ...restProps } = $$restProps
</script>

{#if priceRange && priceRange.minimum_price.regular_price.value}
  <div class="price-box font-semibold {additionalClasses}" {...restProps}>
    <span
      class="price"
      data-currency={priceRange.minimum_price.regular_price.currency}
    >
      {formatPrice(priceRange.minimum_price.regular_price.value * quantity)}
    </span>
  </div>
{/if}
