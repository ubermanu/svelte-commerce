<script lang="ts">
  import zxcvbn from 'zxcvbn'

  export let password: string = ''

  let strength = 0

  // Calculate the password strength
  $: strength = password ? zxcvbn(password).score + 1 : 0

  const labels = {
    0: 'No Password',
    1: 'Very Weak',
    2: 'Weak',
    3: 'Medium',
    4: 'Strong',
    5: 'Very Strong',
  }

  const colors = {
    0: '',
    1: 'bg-red-400',
    2: 'bg-red-400',
    3: 'bg-yellow-400',
    4: 'bg-green-400',
    5: 'bg-green-400',
  }
</script>

<div
  class="password-strength-meter relative z-0 mt-2 flex items-center rounded-sm bg-neutral-200 p-1"
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
