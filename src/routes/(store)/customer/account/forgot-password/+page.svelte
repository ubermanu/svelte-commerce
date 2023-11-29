<script lang="ts">
  import Input from '$lib/components/Form/Input.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'

  export let data
  export let form
</script>

<svelte:head>
  <title>Forgot Your Password? - {data.head.title}</title>
</svelte:head>

{#if form?.errors}
  <ul>
    {#each form.errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}

{#if form?.success}
  <p>{form.success}</p>
{/if}

<PageTitle>Forgot Your Password?</PageTitle>

<form
  class="form password forget max-w-xl space-y-6"
  action="?/resetPassword"
  method="post"
>
  <Fieldset>
    <Input label="Email" name="email" type="email" required />
  </Fieldset>
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action submit primary">
      Reset My Password
    </button>
  </ActionsToolbar>
</form>
