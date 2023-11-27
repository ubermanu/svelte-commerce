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
  <p>Login successful</p>
{/if}

<form action="?/login" method="post">
  <fieldset>
    <legend>Login</legend>
    <input type="email" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <input type="submit" value="Login" />
  </fieldset>
</form>
