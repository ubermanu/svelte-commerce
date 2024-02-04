<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte'
  import AddressData from '$lib/components/AddressData.svelte'

  export let data

  const customer = data.customer!
</script>

<PageTitle>My Account</PageTitle>

<div class="block-dashboard-info mb-8 block">
  <div class="block-title">
    <h2>Account Information</h2>
  </div>
  <div class="block-content is-2columns">
    <div class="box box-information">
      <div class="box-title">
        <h3>Contact Information</h3>
      </div>
      <div class="box-content">
        <p>{customer.firstname} {customer.lastname}</p>
      </div>
      <div class="box-actions">
        <a class="action edit" href="/customer/account/edit">Edit</a>
        <a
          href="/customer/account/edit?changePass=1"
          class="action change-password"
        >
          Change Password
        </a>
      </div>
    </div>
    <div class="box box-newsletter">
      <div class="box-title">
        <h3>Newsletters</h3>
      </div>
      <div class="box-content">
        <p>You aren't subscribed to our newsletter.</p>
      </div>
      <div class="box-actions">
        <a class="action edit" href="/customer/newsletter">Edit</a>
      </div>
    </div>
  </div>
</div>

<div class="block-dashboard-addresses block">
  <div class="block-title">
    <h2>Address Book</h2>
    <a class="action edit" href="/customer/address"> Manage Addresses </a>
  </div>
  <div class="block-content is-2columns">
    <div class="box box-billing-address">
      <div class="box-title">
        <h3>Default Billing Address</h3>
      </div>
      <div class="box-content">
        {#if data.billingAddress}
          <AddressData address={data.billingAddress} />
        {:else}
          <address>You have not set a default billing address.</address>
        {/if}
      </div>
      <div class="box-actions">
        {#if data.billingAddress}
          <a
            class="action edit"
            href="/customer/address/edit/{data.billingAddress.id}"
          >
            Edit Address
          </a>
        {:else}
          <a class="action edit" href="/customer/address/new">New Address</a>
        {/if}
      </div>
    </div>
    <div class="box box-shipping-address">
      <div class="box-title">
        <h3>Default Shipping Address</h3>
      </div>
      <div class="box-content">
        {#if data.shippingAddress}
          <AddressData address={data.shippingAddress} />
        {:else}
          <address>You have not set a default shipping address.</address>
        {/if}
      </div>
      <div class="box-actions">
        {#if data.shippingAddress}
          <a
            class="action edit"
            href="/customer/address/edit/{data.shippingAddress.id}"
          >
            Edit Address
          </a>
        {:else}
          <a class="action edit" href="/customer/address/new">New Address</a>
        {/if}
      </div>
    </div>
  </div>
</div>
