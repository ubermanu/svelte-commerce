<script lang="ts">
  import Input from '$lib/components/Form/Input.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import PasswordStrengthMeter from '$lib/components/PasswordStrengthMeter.svelte'

  export let data
  export let form

  let password = ''
  let showPassword = false

  function handlePasswordInput(event: Event) {
    password = (event.target as HTMLInputElement).value
  }
</script>

<svelte:head>
  <title>Sign Up - {data.head.title}</title>
</svelte:head>

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

<PageTitle>Create New Customer Account</PageTitle>

<form
  class="form create account form-create-account"
  action="?/create"
  method="post"
>
  <fieldset class="fieldset create info">
    <legend>Personal Information</legend>
    <Input label="First Name" name="firstname" required />
    <Input label="Last Name" name="lastname" required />
    <Checkbox label="Sign Up for Newsletter" name="is_subscribed" />
    <Checkbox
      label="Allow remote shopping assistance"
      name="assistance_allowed"
    />
  </fieldset>
  <fieldset class="fieldset create account">
    <legend>Sign-in Information</legend>
    <Input label="Email" name="email" type="email" required />
    <Input
      label="Password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      on:input={handlePasswordInput}
      required
    >
      <PasswordStrengthMeter bind:password />
    </Input>
    <Input
      label="Confirm Password"
      name="password_confirmation"
      type={showPassword ? 'text' : 'password'}
      required
    />
    <Checkbox
      label="Show Password"
      bind:value={showPassword}
      on:change={() => (showPassword = !showPassword)}
    />
  </fieldset>
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action submit primary">
      Create an Account
    </button>
  </ActionsToolbar>
</form>

<style lang="postcss">
  .fieldset {
    @apply mb-6;
  }
</style>
