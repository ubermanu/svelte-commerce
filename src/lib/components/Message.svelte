<script lang="ts">
  import {
    AlertTriangle,
    CheckCircle,
    HelpCircle,
    XOctagon,
  } from 'svelte-lucide'

  export let level: 'info' | 'success' | 'warning' | 'error' = 'info'

  const icons = {
    info: HelpCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XOctagon,
  }
</script>

<div aria-live="polite" class="alert alert-{level}">
  <svelte:component this={icons[level]} class="mr-3 h-5 w-5 flex-shrink-0" />
  <div>
    <slot />
  </div>
</div>

<style lang="postcss">
  .alert {
    @apply flex items-center rounded bg-neutral-300 px-4 py-3;
  }

  .alert-info {
    @apply bg-blue-100 text-blue-900;
  }

  .alert-success {
    @apply bg-green-100 text-green-900;
  }

  .alert-warning {
    @apply bg-yellow-100 text-yellow-900;
  }

  .alert-error {
    @apply bg-red-100 text-red-900;
  }
</style>
