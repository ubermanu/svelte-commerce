<script lang="ts">
  import Field from '$lib/components/Form/Field.svelte'

  export let label: string
  export let noLabel: boolean = false
  export let required: boolean = false
</script>

<Field {required} {noLabel} {label} let:id>
  <select {id} {required} class="w-full rounded">
    <slot />
  </select>
</Field>
