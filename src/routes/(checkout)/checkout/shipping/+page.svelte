<script>
  export let data

  const isGuest = !data.customer
</script>

<h2>Shipping</h2>
<p>Set a shipping address for your order.</p>

<form action="/?setShippingAddress" method="post">
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
        <select name="country" required>
          <option value=""></option>
          {#each data.countries as country}
            <option value={country.id}>{country.full_name_locale}</option>
          {/each}
        </select>
      </div>
    </div>
  </fieldset>
</form>
