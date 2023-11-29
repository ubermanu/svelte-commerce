<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import BlockCustomerLogin from './BlockCustomerLogin.svelte'
  import BlockNewCustomer from './BlockNewCustomer.svelte'

  export let data
</script>

<svelte:head>
  <title>Login - {data.head.title}</title>
</svelte:head>

<PageTitle>Customer Login</PageTitle>

<div class="max-md:space-y-6 md:grid md:grid-cols-2 md:gap-6">
  <BlockCustomerLogin />
  <BlockNewCustomer />
</div>
