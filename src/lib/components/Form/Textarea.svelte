<script lang="ts">
  import Field from '$lib/components/Form/Field.svelte'

  export let label: string
  export let noLabel: boolean = false
  export let required: boolean = false
</script>

<Field {label} {noLabel} {required} let:id>
  <textarea {id} {...$$restProps} on:input />
  <slot />
</Field>

<style lang="postcss">
  textarea {
    @apply w-full rounded;
  }
</style>
