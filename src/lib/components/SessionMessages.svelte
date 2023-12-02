<script>
  import { page } from '$app/stores'
  import { onNavigate } from '$app/navigation'
  import Message from '$lib/components/Message.svelte'

  let messages = $page.data.messages

  // Clear messages when navigating away from the page
  onNavigate(() => {
    messages = []
  })
</script>

{#if messages.length > 0}
  <div class="messages space-y-4">
    {#each messages as message}
      <Message level={message.type}>{message.body}</Message>
    {/each}
  </div>
{/if}
