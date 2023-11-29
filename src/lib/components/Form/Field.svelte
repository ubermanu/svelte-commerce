<script lang="ts">
  export let label: string
  export let noLabel: boolean = false
  export let required: boolean = false

  // Generate a random ID using crypto to avoid collisions
  const id = `field-${crypto.getRandomValues(new Uint32Array(1))[0]}`

  const { class: additionalClasses = '', ...restProps } = $$restProps
</script>

<div class="field {additionalClasses}" class:required {...restProps}>
  <label class="label" for={id} class:no-label={noLabel}>{label}</label>
  <div class="control">
    <slot {id} />
  </div>
</div>

<style lang="postcss">
  .no-label {
    @apply sr-only;
  }

  .label {
    @apply mb-1 block text-sm font-medium;
  }

  .field.required .label::after {
    content: '*';
    @apply ml-1 text-red-500;
  }
</style>
