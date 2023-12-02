<script>
  import { enhance } from '$app/forms'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'

  let showPassword = false
</script>

<div class="block-customer-login block">
  <div class="block-title">
    <h2>Registered Customers</h2>
  </div>
  <div class="block-content">
    <form
      action="?/login"
      method="post"
      class="form form-login max-w-xl space-y-6"
      use:enhance
    >
      <Fieldset>
        <Input
          label="Email"
          type="email"
          name="email"
          autocomplete="email"
          required
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autocomplete="current-password"
          required
        />
        <Checkbox
          label="Show Password"
          bind:value={showPassword}
          on:change={() => (showPassword = !showPassword)}
        />
      </Fieldset>
      <ActionsToolbar>
        <button slot="primary" type="submit" class="action login primary">
          Sign In
        </button>
        <a
          slot="secondary"
          href="/customer/account/forgot-password"
          class="action remind"
        >
          Forgot Your Password?
        </a>
      </ActionsToolbar>
    </form>
  </div>
</div>

<style lang="postcss">
  .block-title {
    @apply mb-4 border-b border-neutral-500 py-4;
  }

  .block-title h2 {
    @apply text-xl font-bold;
  }

  .action.remind {
    @apply underline-offset-4 hover:underline;
  }
</style>
