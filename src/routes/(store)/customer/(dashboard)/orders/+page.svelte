<script lang="ts">
  import Message from '$lib/components/Message.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  interface OrderData {
    id: number
    number: string
    status: string
    grand_total: number
    created_at: string
  }

  export let data: { orders: { items: OrderData[] } }
</script>

<PageTitle>My Orders</PageTitle>

{#if data?.orders?.items.length > 0}
  {#each data.orders.items as order}
    <div>{order.number}</div>
  {/each}
{:else}
  <Message level="info">
    <p>You have placed no orders.</p>
  </Message>
{/if}
