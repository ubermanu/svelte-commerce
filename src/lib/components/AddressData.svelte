<script lang="ts">
  import type {
    CartAddressInterface,
    CustomerAddress,
  } from '$lib/generated/graphql.types'

  export let address: CartAddressInterface | CustomerAddress
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
  {#if 'country' in address}
    {address.country.code}<br />
  {:else if 'country_code' in address}
    {address.country_code}<br />
  {/if}
  {#if address.telephone}
    T: <a href="tel:{address.telephone}">{address.telephone}</a>
  {/if}
</address>
