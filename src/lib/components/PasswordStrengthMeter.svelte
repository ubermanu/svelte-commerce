<script lang="ts">
  import zxcvbn from 'zxcvbn'

  export let password: string = ''

  let strength = 0

  // Calculate the password strength
  $: strength = password ? zxcvbn(password).score + 1 : 0

  const labels: Record<number, string> = {
    0: 'No Password',
    1: 'Very Weak',
    2: 'Weak',
    3: 'Medium',
    4: 'Strong',
    5: 'Very Strong',
  }

  const colors: Record<number, string> = {
    0: '',
    1: 'bg-red-400 dark:bg-red-800',
    2: 'bg-red-400 dark:bg-red-800',
    3: 'bg-yellow-400 dark:bg-yellow-700',
    4: 'bg-green-400 dark:bg-green-800',
    5: 'bg-green-400 dark:bg-green-800',
  }
</script>

<div
  class="password-strength-meter relative z-0 mt-2 flex items-center rounded-sm bg-neutral-200 p-1 dark:bg-neutral-700"
  aria-live="polite"
>
  <span class="px-2 text-sm">
    Password strength: <strong>{labels[strength]}</strong>
  </span>
  <span
    class="absolute left-0 top-0 -z-10 h-full rounded-sm {colors[strength]}"
    style="width: {strength * 20}%"
  ></span>
</div>
