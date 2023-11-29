<script lang="ts">
  import { Star } from 'svelte-lucide'

  export let value: number
</script>

<div class="rating flex items-center gap-0.5">
  {#each Array.from({ length: 5 }) as _, n}
    <Star
      class="h-4 w-4 {n * 20 <= value ? 'text-yellow-500' : 'text-gray-300'}"
      tabindex="-1"
    />
  {/each}
</div>
