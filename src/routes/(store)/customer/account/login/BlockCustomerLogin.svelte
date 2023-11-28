<script>
  import Field from '$lib/components/Field.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
</script>

<div class="block block-customer-login">
  <div class="block-title">
    <h2>Registered Customers</h2>
  </div>
  <div class="block-content">
    <form action="?/login" method="post" class="form form-login">
      <fieldset>
        <Field label="Email" required={true} let:id>
          <input {id} type="email" name="email" required />
        </Field>
        <Field label="Password" required={true} let:id>
          <input {id} type="password" name="password" required />
        </Field>
        <ActionsToolbar>
          <button slot="primary" type="submit" class="action login primary">
            Sign In
          </button>
          <a slot="secondary" href="?/forgot-password" class="action remind">
            Forgot Your Password?
          </a>
        </ActionsToolbar>
      </fieldset>
    </form>
  </div>
</div>

<style lang="postcss">
  .block-title {
    @apply py-4 mb-4 border-b border-neutral-500;
  }

  .block-title h2 {
    @apply text-xl font-bold;
  }
</style>
