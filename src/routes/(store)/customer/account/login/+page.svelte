<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import BlockCustomerLogin from './BlockCustomerLogin.svelte'
  import BlockNewCustomer from './BlockNewCustomer.svelte'

  export let data
  export let form
</script>

<svelte:head>
  <title>Login - {data.head.title}</title>
</svelte:head>

{#if form?.errors}
  <ul>
    {#each form.errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}

{#if form?.success}
  <p>Login successful</p>
{/if}

<PageTitle>Customer Login</PageTitle>

<div class="md:grid md:grid-cols-2 md:gap-6 max-md:space-y-6">
  <BlockCustomerLogin />
  <BlockNewCustomer />
</div>
