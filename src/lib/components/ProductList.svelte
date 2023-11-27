<script lang="ts">
  export let products: any[]

  export let mode: 'grid' | 'list' = 'grid'
</script>

<ul
  class="items"
  class:products-grid={mode === 'grid'}
  class:products-list={mode === 'list'}
>
  {#each products as product}
    <li class="product-item">
      <a href="/products/{product.sku}" tabindex="-1">
        <img class="product-item-photo" src={product.image.url} alt="" />
      </a>
      <a href="/products/{product.sku}" class="product-item-link">
        <h3 class="product-item-name">{product.name}</h3>
      </a>
    </li>
  {/each}
</ul>

<style>
  .product-item {
    padding: 0.8rem;
    text-align: center;
  }

  .product-item-photo {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.8rem;
    list-style: none;
  }
</style>
