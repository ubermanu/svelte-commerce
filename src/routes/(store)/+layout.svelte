<script>
  import PageHeader from '$lib/components/PageHeader.svelte'
  import PageFooter from '$lib/components/PageFooter.svelte'
  import FormMessages from '$lib/components/FormMessages.svelte'
</script>

<div class="page-wrapper">
  <PageHeader />
  <main class="page-main">
    <FormMessages />
    <slot />
  </main>
  <PageFooter />
</div>

<style lang="postcss">
  .page-wrapper {
    @apply flex min-h-screen flex-col;
  }

  .page-main {
    @apply container mx-auto flex-1 px-4;
  }
</style>
