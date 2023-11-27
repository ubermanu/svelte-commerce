<script>
  export let form
</script>

{#if form?.errors}
  <ul>
    {#each form.errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}

{#if form?.success}
  <p>Account created successfully</p>
{/if}

<form action="?/create" method="post">
  <fieldset>
    <legend>Sign Up</legend>
    <input type="text" name="firstname" placeholder="First Name" />
    <input type="text" name="lastname" placeholder="Last Name" />
    <input type="email" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <input type="submit" value="Login" />
  </fieldset>
</form>
