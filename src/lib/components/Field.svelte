<script lang="ts">
  export let label: string
  export let noLabel: boolean = false
  export let required: boolean = false

  // Generate a random ID using crypto to avoid collisions
  const id = `field-${crypto.getRandomValues(new Uint32Array(1))[0]}`
</script>

<div class="field" class:required>
  <label class="label" for={id} class:no-label={noLabel}>{label}</label>
  <div class="control">
    <slot {id} />
  </div>
</div>

<style lang="postcss">
  .field {
    @apply mb-4;
  }

  .field:last-child {
    @apply mb-0;
  }

  .no-label {
    @apply sr-only;
  }

  .field.required .label::after {
    content: '*';
    @apply text-red-500 ml-1;
  }
</style>
