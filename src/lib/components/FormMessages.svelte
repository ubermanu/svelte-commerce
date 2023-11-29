<script>
  import { page } from '$app/stores'
  import Message from '$lib/components/Message.svelte'
</script>

{#if $page.form?.errors}
  {#each $page.form.errors as message}
    <Message level="error">{message}</Message>
  {/each}
{/if}

{#if $page.form?.success}
  <Message level="success">{$page.form.message}</Message>
{/if}
