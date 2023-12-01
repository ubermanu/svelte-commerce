<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte'
  import AddressData from '$lib/components/AddressData.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'

  export let data
</script>

<PageTitle>Address Book</PageTitle>

<div class="block-addresses-default mb-8 block">
  <div class="block-title">
    <h2>Default Addresses</h2>
  </div>
  <div class="block-content is-2columns">
    <div class="box box-address-billing">
      <div class="box-title">
        <h3>Default Billing Address</h3>
      </div>
      <div class="box-content">
        <AddressData address={data.billingAddress} />
      </div>
      <div class="box-actions">
        <a
          class="action edit"
          href="/customer/account/address/edit/{data.billingAddress.id}"
        >
          <span>Change Billing Address</span>
        </a>
      </div>
    </div>

    <div class="box box-address-shipping">
      <div class="box-title">
        <h3>Default Shipping Address</h3>
      </div>
      <div class="box-content">
        <AddressData address={data.shippingAddress} />
      </div>
      <div class="box-actions">
        <a
          class="action edit"
          href="/customer/account/address/edit/{data.shippingAddress.id}"
        >
          <span>Change Shipping Address</span>
        </a>
      </div>
    </div>
  </div>
</div>

<div class="block-addresses-list mb-8 block">
  <div class="block-title">
    <h2>Additional Address Entries</h2>
  </div>
  <div class="block-content">
    <p class="empty">You have no other address entries in your address book.</p>
  </div>
</div>

<ActionsToolbar>
  <a
    slot="primary"
    href="/customer/account/address/new"
    title="Add New Address"
    class="action primary add"
  >
    <span>Add New Address</span>
  </a>
</ActionsToolbar>
