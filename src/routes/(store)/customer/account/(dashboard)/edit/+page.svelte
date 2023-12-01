<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import PasswordStrengthMeter from '$lib/components/PasswordStrengthMeter.svelte'

  export let data

  let changeEmail = false
  let changePassword = false
  let showPassword = false

  let additionalLegend = ''

  $: if (changeEmail && changePassword) {
    additionalLegend = 'Change Email and Password'
  } else if (changeEmail) {
    additionalLegend = 'Change Email'
  } else if (changePassword) {
    additionalLegend = 'Change Password'
  }

  let password = ''

  function handlePasswordInput(event: Event) {
    password = (event.target as HTMLInputElement).value
  }
</script>

<PageTitle>Edit Account Information</PageTitle>

<form
  action="?/editAccount"
  method="post"
  class="form form-edit-account space-y-8"
>
  <Fieldset legend="Account Information">
    <Input
      label="First Name"
      name="firstname"
      autocomplete="given-name"
      value={data.customer.firstname}
      required
    />
    <Input
      label="Last Name"
      name="lastname"
      autocomplete="family-name"
      value={data.customer.lastname}
      required
    />
    <Checkbox
      label="Change Email"
      checked={changeEmail}
      on:change={() => (changeEmail = !changeEmail)}
    />
    <Checkbox
      label="Change Password"
      checked={changePassword}
      on:change={() => (changePassword = !changePassword)}
    />
    <Checkbox
      label="Allow remote shopping assistance"
      name="assistance_allowed"
      checked={data.customer.allow_remote_shopping_assistance}
      value="1"
    />
  </Fieldset>
  {#if changeEmail || changePassword}
    <Fieldset legend={additionalLegend}>
      {#if changeEmail}
        <Input
          label="Email"
          name="email"
          type="email"
          autocomplete="email"
          value={data.customer.email}
          required
        />
      {/if}
      <Input
        label="Current Password"
        name="current_password"
        type={showPassword ? 'text' : 'password'}
        autocomplete="current-password"
        required
      />
      {#if changePassword}
        <Input
          label="New Password"
          name="password"
          value={password}
          on:input={handlePasswordInput}
          type={showPassword ? 'text' : 'password'}
          autocomplete="new-password"
          required
        >
          <PasswordStrengthMeter {password} />
        </Input>
        <Input
          label="Confirm New Password"
          name="password_confirmation"
          type={showPassword ? 'text' : 'password'}
          autocomplete="new-password"
          required
        />
      {/if}
      <Checkbox
        label="Show Password"
        value={showPassword}
        on:change={() => (showPassword = !showPassword)}
      />
    </Fieldset>
  {/if}
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action save primary">
      Save
    </button>
  </ActionsToolbar>
</form>
