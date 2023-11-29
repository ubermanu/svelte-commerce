<script lang="ts">
  import Field from '$lib/components/Form/Field.svelte'

  export let label: string
  export let noLabel: boolean = false
  export let required: boolean = false
</script>

<Field {label} {noLabel} {required} let:id>
  <input {id} {...$$restProps} on:input class="form-input dark:bg-gray-800" />
  <slot />
</Field>

<style lang="postcss">
  input {
    @apply w-full rounded;
  }
</style>
