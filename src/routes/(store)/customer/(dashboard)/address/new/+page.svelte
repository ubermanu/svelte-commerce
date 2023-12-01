<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import AddressForm from '$lib/components/AddressForm.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'

  export let data
</script>

<PageTitle>Add New Address</PageTitle>

<AddressForm action="?/addNewAddress" {data}>
  <Fieldset slot="additional">
    <Checkbox
      name="default_billing"
      label="Use as my default billing address"
    />
    <Checkbox
      name="default_shipping"
      label="Use as my default shipping address"
    />
  </Fieldset>
</AddressForm>
