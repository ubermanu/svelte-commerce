<div
  class="actions-toolbar max-md:space-y-4 md:flex md:items-center md:justify-between"
>
  {#if $$slots.primary}
    <div class="primary">
      <slot name="primary" />
    </div>
  {/if}
  {#if $$slots.secondary}
    <div class="secondary">
      <slot name="secondary" />
    </div>
  {/if}
</div>
