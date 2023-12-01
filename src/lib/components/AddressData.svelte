<script lang="ts">
  interface AddressData {
    id: number
    firstname: string
    lastname: string
    company: string
    street: string[]
    city: string
    postcode: string
    country_code: string
    telephone: string
    default_shipping: boolean
    default_billing: boolean
  }

  export let address: Partial<AddressData>
</script>

<address>
  {address.firstname}
  {address.lastname}<br />
  {address.company}<br />
  {#if address.street}
    {#each address.street as line}
      {line}<br />
    {/each}
  {/if}
  {address.city}, {address.postcode}<br />
  {address.country_code}<br />
  T: <a href="tel:{address.telephone}">{address.telephone}</a>
</address>
