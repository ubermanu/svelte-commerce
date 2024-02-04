<script>
  import Input from '$lib/components/Form/Input.svelte'
  import { enhance } from '$app/forms'
  import { page } from '$app/stores'

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

<footer
  class="page-footer mt-6 border-t border-neutral-300 py-6 dark:border-neutral-700"
>
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
          use:enhance
        >
          <Input
            label="Sign Up for Our Newsletter:"
            noLabel={true}
            name="email"
            type="email"
            placeholder="Enter your email address"
            autocomplete="email"
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

  <p
    class="copyright mt-6 text-xs text-neutral-700 dark:text-neutral-300 md:text-center"
  >
    {$page.data.footer?.copyright}
  </p>
</footer>

<style lang="postcss">
  .footer.content,
  .copyright {
    @apply container mx-auto px-4;
  }

  .form.subscribe {
    @apply flex items-center gap-1;
  }

  .footer.links a {
    @apply underline-offset-4 hover:underline;
  }
</style>
