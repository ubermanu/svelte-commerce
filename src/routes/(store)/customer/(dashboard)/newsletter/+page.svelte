<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'
  import Checkbox from '$lib/components/Form/Checkbox.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'

  export let data
</script>

<PageTitle>Newsletter Subscription</PageTitle>

<form
  action="?/updateSubscription"
  method="post"
  class="form form-newsletter-manage space-y-6"
>
  <Fieldset legend="Subscription option">
    <Checkbox
      label="General Subscription"
      name="is_subscribed"
      checked={data.isSubscribed}
      value="1"
    />
  </Fieldset>
  <ActionsToolbar>
    <button slot="primary" type="submit" class="action save primary">
      Save
    </button>
  </ActionsToolbar>
</form>
