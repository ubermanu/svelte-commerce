<script>
  import ActionsToolbar from '$lib/components/ActionsToolbar.svelte'
</script>

<div class="block block-new-customer">
  <div class="block-title">
    <h2>New Customers</h2>
  </div>
  <div class="block-content">
    <p>
      Creating an account has many benefits: check out faster, keep more than
      one address, track orders and more.
    </p>
    <ActionsToolbar>
      <a
        slot="primary"
        class="action create primary"
        href="/customer/account/create"
      >
        Create an account
      </a>
    </ActionsToolbar>
  </div>
</div>

<style lang="postcss">
  .block-title {
    @apply py-4 mb-4 border-b border-neutral-500;
  }

  .block-title h2 {
    @apply text-xl font-bold;
  }

  p {
    @apply mb-4;
  }

  p:last-child {
    @apply mb-0;
  }
</style>
