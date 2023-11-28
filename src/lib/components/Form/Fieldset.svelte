<script lang="ts">
  export let legend: string = ''
</script>

<fieldset class="fieldset" {...$$restProps}>
  {#if legend}
    <legend class="legend">{legend}</legend>
  {/if}
  <slot />
</fieldset>

<style lang="postcss">
  .fieldset {
    @apply mb-6;
  }

  .fieldset:last-child {
    @apply mb-0;
  }

  .legend {
    @apply mb-4 w-full text-lg;
  }
</style>
