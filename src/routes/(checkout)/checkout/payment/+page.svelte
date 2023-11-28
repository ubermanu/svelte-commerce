<script>
  export let form
  export let data
</script>

{#if form?.errors}
  <ul>
    {#each form.errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}

<h2>Payment</h2>
<p>Select a billing address and a payment method.</p>

{#if data.billingAddress}
  {@const address = data.billingAddress}
  <address>
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
  </address>
{/if}

<form action="?/setBillingAddress" method="post">
  <fieldset>
    <legend>Billing Address</legend>
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
  <button type="submit">Set billing address</button>
</form>

<h3>Payment method</h3>

{#if data.paymentMethods}
  <form action="?/setPaymentMethod" method="post">
    <fieldset>
      <legend>Payment Method</legend>
      {#each data.paymentMethods as method}
        <div class="field">
          <div class="control">
            <label>
              <input
                type="radio"
                name="payment_method"
                value={method.code}
                required
              />
              {method.title}
            </label>
          </div>
        </div>
      {/each}
    </fieldset>
    <button type="submit">Set payment method</button>
  </form>
{/if}

<br />
<form action="?/placeOrder" method="post">
  <button type="submit">Place order</button>
</form>
