<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  onMount(() => {
    setTimeout(() => goto('/'), 2000)
  })
</script>

<p>You successfully logged out!</p>
<p>Redirecting to home page...</p>
