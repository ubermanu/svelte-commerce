<script lang="ts">
  export let label: string
  export let required: boolean = false

  // Generate a random ID using crypto to avoid collisions
  const id = `field-${crypto.getRandomValues(new Uint32Array(1))[0]}`
</script>

<div class="field choice" class:required>
  <input
    class="checkbox"
    type="checkbox"
    {id}
    {required}
    {...$$restProps}
    on:change
  />
  <label class="label" for={id}>{label}</label>
</div>

<style lang="postcss">
  .field {
    @apply mb-4;
  }

  .field:last-child {
    @apply mb-0;
  }

  .checkbox {
    @apply mr-2  rounded-sm;
  }

  .label {
    @apply inline align-middle;
  }

  .field.required .label::after {
    content: '*';
    @apply text-red-500 ml-1;
  }
</style>
