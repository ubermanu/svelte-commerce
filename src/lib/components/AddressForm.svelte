<script lang="ts">
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'
  import Country from '$lib/components/Form/Country.svelte'
  import Input from '$lib/components/Form/Input.svelte'

  export let action: string
  export let data: { countries: any[] }
</script>

<form {action} method="post" class="form-address-edit space-y-6">
  <Fieldset legend="Contact Information">
    <Input
      label="First Name"
      name="firstname"
      autocomplete="given-name"
      required
    />
    <Input
      label="Last Name"
      name="lastname"
      autocomplete="family-name"
      required
    />
    <Input label="Company" name="company" autocomplete="organization" />
    <Input
      label="Phone Number"
      name="telephone"
      autocomplete="tel"
      type="tel"
      required
    />
  </Fieldset>
  <Fieldset legend="Address">
    <Input
      label="Street Address"
      name="street[0]"
      autocomplete="address-line1"
      required
    >
      <div class="nested mt-2">
        <Input
          noLabel={true}
          label="Street Address 2"
          name="street[1]"
          autocomplete="address-line2"
        />
      </div>
    </Input>
    <Country countries={data?.countries} />
    <Input label="City" name="city" autocomplete="address-level2" required />
    <Input
      label="Zip/Postal Code"
      name="postcode"
      autocomplete="postal-code"
      required
    />
  </Fieldset>
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action save primary">
      Save Address
    </button>
  </ActionsToolbar>
</form>
