<script lang="ts">
  import Input from '$lib/components/Form/Input.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'

  export let data
</script>

<svelte:head>
  <title>Forgot Your Password? - {data.head.title}</title>
</svelte:head>

<PageTitle>Forgot Your Password?</PageTitle>

<form
  class="form password forget max-w-xl space-y-6"
  action="?/resetPassword"
  method="post"
>
  <Fieldset>
    <p>
      Please enter your email address below to receive a password reset link.
    </p>
    <Input
      label="Email"
      name="email"
      type="email"
      autocomplete="email"
      required
    />
  </Fieldset>
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action submit primary">
      Reset My Password
    </button>
  </ActionsToolbar>
</form>
