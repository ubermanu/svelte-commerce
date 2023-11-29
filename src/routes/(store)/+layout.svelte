<script>
  import PageHeader from '$lib/components/PageHeader.svelte'
</script>

<PageHeader />

<main class="page-main">
  <slot />
</main>

<style lang="postcss">
  .page-main {
    @apply container mx-auto px-4;
  }
</style>
