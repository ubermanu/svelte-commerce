<script lang="ts">
  import Message from '$lib/components/Message.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import type { CustomerOrders } from '$lib/generated/graphql'

  export let data: { orders: CustomerOrders }
</script>

<PageTitle>My Orders</PageTitle>

{#if data.orders?.items.length > 0}
  {#each data.orders.items as order}
    <div>{order.number}</div>
  {/each}
{:else}
  <Message level="info">
    <p>You have placed no orders.</p>
  </Message>
{/if}
