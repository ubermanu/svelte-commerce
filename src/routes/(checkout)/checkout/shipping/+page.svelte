<script>
  export let data

  const isGuest = !data.customer
  console.log(data)
</script>

<h2>Shipping</h2>
<p>Set a shipping address for your order.</p>

{#if data.shippingAddresses}
  <h3>Shipping Addresses</h3>
  <ul>
    {#each data.shippingAddresses as address}
      <li>
        {address.firstname}
        {address.lastname}
        <br />
        {address.street}
        <br />
        {address.postcode}
        {address.city}
        <br />
        {address.country.label}
        <br />
        {address.telephone}
      </li>
    {/each}
  </ul>
{/if}

<form action="?/setShippingAddress" method="post">
  <fieldset>
    <legend>Shipping Address</legend>
    {#if isGuest}
      <div class="field">
        <div class="control">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <p>You can create an account after checkout.</p>
        </div>
      </div>
    {/if}
    <div class="field">
      <div class="control">
        <input type="text" name="firstname" placeholder="First Name" required />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input type="text" name="lastname" placeholder="Last Name" required />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          required
        />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input
          type="text"
          name="postcode"
          placeholder="Zip/Postal Code"
          required
        />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input type="text" name="city" placeholder="City" required />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input type="tel" name="telephone" placeholder="Telephone" required />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <select name="country" required>
          <option value=""></option>
          {#each data.countries as country}
            <option value={country.id}>{country.full_name_locale}</option>
          {/each}
        </select>
      </div>
    </div>
  </fieldset>
  <button type="submit">Set shipping address</button>
</form>

<h3>Shipping Methods</h3>
{#if data.shippingMethods}
  <form action="?/setShippingMethod" method="post">
    <table>
      <tbody>
        {#each data.shippingMethods as method}
          <tr>
            <td>
              <input
                type="radio"
                name="code"
                value={method.carrier_code + '_' + method.method_code}
                required
              />
            </td>
            <td>{method.carrier_title}</td>
            <td>{method.method_title}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button type="submit">Set shipping method</button>
  </form>
{/if}
