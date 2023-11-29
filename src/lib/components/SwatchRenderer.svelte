<script lang="ts">
  import { createRadioGroup, melt } from '@melt-ui/svelte'

  interface Option {
    attribute_id: string
    attribute_code: string
    label: string
    values: {
      uid: string
      label: string
    }[]
  }

  export let option: Option

  const {
    elements: { root, item },
    helpers: { isChecked },
    states: { value },
  } = createRadioGroup({
    required: true,
    orientation: 'horizontal',
  })

  // TODO: Find a way to get the type from graphql
  const type: 'text' | 'color' =
    option.attribute_code === 'color' ? 'color' : 'text'
</script>

<div class="configurable-option">
  <div class="mb-1 font-semibold">{option.label}</div>
  <ul class="flex flex-wrap gap-4" use:melt={$root}>
    {#each option.values as value}
      <li>
        {#if type === 'color'}
          <button
            use:melt={$item(value.uid)}
            class="item h-8 w-8 rounded-full"
            style="background: {value.label}"
            class:active={$isChecked(value.uid)}
            title={value.label}
          >
          </button>
        {:else}
          <button
            use:melt={$item(value.uid)}
            class="item rounded px-2 py-1"
            class:active={$isChecked(value.uid)}
          >
            <span class="text-sm">{value.label}</span>
          </button>
        {/if}
      </li>
    {/each}
  </ul>
  <input
    class="absolute m-0 h-0 p-0 opacity-0"
    type="text"
    name="super_attribute[{option.attribute_id}]"
    bind:value={$value}
    required
  />
</div>

<style lang="postcss">
  .item {
    @apply flex cursor-pointer items-center gap-2 border-2 border-transparent bg-neutral-200;
  }

  .item.active {
    @apply border-neutral-900 shadow-lg;
  }
</style>
