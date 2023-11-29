<script>
  import Input from '$lib/components/Form/Input.svelte'

  const links = [
    {
      text: 'Privacy and Cookie Policy',
      href: '/privacy-policy-cookie-restriction-mode',
    },
    { text: 'Search Terms', href: '#' },
    { text: 'Advanced Search', href: '#' },
    { text: 'Contact Us', href: '/contact' },
  ]
</script>

<footer class="page-footer mt-6 border-t border-neutral-300">
  <div
    class="footer content max-md:space-y-6 md:flex md:justify-between md:gap-2"
  >
    <div class="block-newsletter block max-md:mx-auto md:order-1 md:max-w-xs">
      <div class="block-title sr-only"><strong>Newsletter</strong></div>
      <div class="block-content">
        <form
          class="form subscribe"
          action="/api/newsletter?/subscribe"
          method="post"
        >
          <Input
            label="Sign Up for Our Newsletter:"
            noLabel={true}
            name="email"
            type="email"
            id="newsletter"
            placeholder="Enter your email address"
            required={true}
          />
          <div class="actions">
            <button
              class="action subscribe primary"
              title="Subscribe"
              type="submit"
            >
              <span>Subscribe</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    {#if links.length > 0}
      <ul class="footer links space-y-2">
        {#each links as { href, text }}
          <li class="nav item">
            <a {href}>{text}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <p class="copyright mt-6 text-xs text-neutral-700 md:text-center">
    Copyright © 2013-present Magento, Inc. All rights reserved.
  </p>
</footer>

<style lang="postcss">
  .page-footer {
    @apply container mx-auto px-4 py-6;
  }

  .form.subscribe {
    @apply flex items-center gap-1;
  }

  .form.subscribe :global(.field) {
    @apply mb-0 flex-1;
  }

  .footer.links a {
    @apply underline-offset-4 hover:underline;
  }
</style>
