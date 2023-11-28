<script>
  import { writable } from 'svelte/store'

  export let password = ''

  let strength = writable(0)

  $: if (password.length > 10) {
    $strength = 100
  } else if (password.length > 5) {
    $strength = 50
  } else {
    $strength = 0
  }

  // TODO: Add more rules to calculate password strength (+ different colors)
</script>

<div class="password-strength-meter" aria-live="polite">
  <span class="label">Password strength:</span>
  <span class="strength" style="width: {$strength}%"></span>
</div>

<style lang="postcss">
  .password-strength-meter {
    @apply relative z-0 mt-2 flex w-[225px] items-center rounded-sm bg-neutral-200 p-1;
  }

  .password-strength-meter .label {
    @apply px-2 text-sm;
  }

  .password-strength-meter .strength {
    @apply absolute left-0 top-0 -z-10 h-full rounded-sm bg-green-400;
  }
</style>
