<script lang="ts">
  export let legend: string = ''

  const { class: additionalClasses = '', ...restProps } = $$restProps
</script>

<fieldset class="fieldset space-y-4 {additionalClasses}" {...restProps}>
  {#if legend}
    <legend class="legend">{legend}</legend>
  {/if}
  <slot />
</fieldset>

<style lang="postcss">
  .legend {
    @apply mb-1 w-full text-lg;
  }
</style>
