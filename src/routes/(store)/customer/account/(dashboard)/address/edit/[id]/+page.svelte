<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import AddressForm from '$lib/components/AddressForm.svelte'
  import Message from '$lib/components/Message.svelte'

  export let data
</script>

<PageTitle>Edit Address</PageTitle>

<div class="messages mb-6 space-y-2 empty:hidden">
  {#if data.address.default_billing}
    <Message level="info">
      <p>It's a default billing address.</p>
    </Message>
  {/if}

  {#if data.address.default_shipping}
    <Message level="info">
      <p>It's a default shipping address.</p>
    </Message>
  {/if}
</div>

<AddressForm action="?/editAddress" {data} />
