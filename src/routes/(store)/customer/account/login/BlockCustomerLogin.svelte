<script>
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'

  let showPassword = false
</script>

<div class="block block-customer-login">
  <div class="block-title">
    <h2>Registered Customers</h2>
  </div>
  <div class="block-content">
    <form action="?/login" method="post" class="form form-login">
      <fieldset>
        <Input label="Email" type="email" name="email" required />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          required
        />
        <Checkbox
          label="Show Password"
          bind:value={showPassword}
          on:change={() => (showPassword = !showPassword)}
        />
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
