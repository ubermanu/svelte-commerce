<script>
  import PageTitle from '$lib/components/PageTitle.svelte'
  import Fieldset from '$lib/components/Form/Fieldset.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import Textarea from '$lib/components/Form/Textarea.svelte'
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
</script>

<PageTitle>Contact Us</PageTitle>

<form
  class="form contact max-w-xl space-y-6"
  action="?/contactUs"
  method="post"
>
  <Fieldset legend="Write Us">
    <p>Jot us a note and we’ll get back to you as quickly as possible.</p>
    <Input label="Name" name="name" type="text" autocomplete="name" required />
    <Input
      label="Email"
      name="email"
      type="email"
      autocomplete="email"
      required
    />
    <Input
      label="Phone Number"
      name="telephone"
      type="tel"
      autocomplete="tel"
    />
    <Textarea label="What’s on your mind?" name="comment" />
    <ActionsToolbar>
      <button slot="primary" type="submit" class="action submit primary">
        Submit
      </button>
    </ActionsToolbar>
  </Fieldset>
</form>
