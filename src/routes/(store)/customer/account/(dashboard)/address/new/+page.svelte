<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import AddressForm from '$lib/components/AddressForm.svelte'

  export let data
</script>

<PageTitle>Add New Address</PageTitle>

<AddressForm action="?/addNewAddress" {data} />
