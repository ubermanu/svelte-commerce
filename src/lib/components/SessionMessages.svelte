<script>
  import { page } from '$app/stores'
  import Message from '$lib/components/Message.svelte'
</script>

{#if $page.data?.messages.length > 0}
  <div class="messages space-y-4">
    {#each $page.data.messages as message}
      <Message level={message.type}>{message.body}</Message>
    {/each}
  </div>
{/if}
