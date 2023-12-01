<script lang="ts">
  import { page } from '$app/stores'
  import './dashboard.pcss'

  const links = [
    { text: 'My Account', href: '/customer/account' },
    { text: 'My Orders', href: '/customer/orders' },
    {
      text: 'My Downloadable Products',
      href: '/customer/downloadable',
    },
    { text: 'My Wish List', href: '/customer/wishlist' },
    { separator: true },
    { text: 'Address Book', href: '/customer/address' },
    { text: 'Account Information', href: '/customer/account/edit' },
    { text: 'Stored Payment Methods', href: '/customer/vault' },
    { separator: true },
    { text: 'My Product Reviews', href: '/customer/reviews' },
    { text: 'Newsletter Subscriptions', href: '/customer/newsletter' },
    { separator: true },
    { text: 'Sign Out', href: '/customer/account/logout' },
  ]
</script>

<div class="md:flex md:gap-10">
  <aside class="sidebar md:flex-shrink">
    <ul class="space-y-1">
      {#each links as item}
        {#if item.separator}
          <li
            class="separator border-b border-neutral-200 dark:border-neutral-700"
          />
        {:else}
          <li>
            <a
              href={item.href}
              class="block rounded px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              class:active={$page.url.pathname === item.href}
            >
              {item.text}
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  </aside>
  <div class="customer md:flex-grow">
    <slot />
  </div>
</div>

<style lang="postcss">
  .active {
    @apply text-blue-500 dark:text-blue-400;
  }
</style>
