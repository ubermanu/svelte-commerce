<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import Message from '$lib/components/Message.svelte'

  onMount(() => {
    setTimeout(() => goto('/'), 2000)
  })
</script>

<Message level="success">You successfully logged out!</Message>

<p>Redirecting to home page...</p>
