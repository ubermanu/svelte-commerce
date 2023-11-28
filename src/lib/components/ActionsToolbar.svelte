<div class="actions-toolbar">
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
