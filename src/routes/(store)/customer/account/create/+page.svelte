<script lang="ts">
  import Input from '$lib/components/Form/Input.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import PasswordStrengthMeter from '$lib/components/PasswordStrengthMeter.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'

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
  class="form create account form-create-account max-w-xl space-y-6"
  action="?/create"
  method="post"
>
  <Fieldset legend="Personal Information" class="create info">
    <Input
      label="First Name"
      name="firstname"
      autocomplete="given-name"
      required
    />
    <Input
      label="Last Name"
      name="lastname"
      autocomplete="family-name"
      required
    />
    <Checkbox label="Sign Up for Newsletter" name="is_subscribed" />
    <Checkbox
      label="Allow remote shopping assistance"
      name="assistance_allowed"
    />
  </Fieldset>
  <Fieldset legend="Sign-in Information" class="create account">
    <Input
      label="Email"
      name="email"
      type="email"
      autocomplete="email"
      required
    />
    <Input
      label="Password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      autocomplete="new-password"
      on:input={handlePasswordInput}
      required
    >
      <PasswordStrengthMeter bind:password />
    </Input>
    <Input
      label="Confirm Password"
      name="password_confirmation"
      type={showPassword ? 'text' : 'password'}
      autocomplete="off"
      required
    />
    <Checkbox
      label="Show Password"
      bind:value={showPassword}
      on:change={() => (showPassword = !showPassword)}
    />
  </Fieldset>
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action submit primary">
      Create an Account
    </button>
  </ActionsToolbar>
</form>
