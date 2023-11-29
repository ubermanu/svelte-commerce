<script>
  import { page } from '$app/stores'
  import MiniCart from '$lib/components/MiniCart.svelte'
  import Input from '$lib/components/Form/Input.svelte'
  import { Search, UserCircle } from 'svelte-lucide'
</script>

<header class="page-header mb-6 border-b border-neutral-300 px-4">
  <section class="header content">
    <a href="/" class="logo">
      <img
        src={$page.data.logo.url}
        width={$page.data.logo.width}
        height={$page.data.logo.height}
        alt=""
      />
    </a>

    <div class="block-search block">
      <form action="/search" method="get" class="form minisearch">
        <Input
          label="Search"
          noLabel={true}
          name="q"
          placeholder="Search..."
          value={$page.url.searchParams.get('q')}
        />
        <button type="submit" class="action search" title="Search">
          <Search tabindex="-1" />
        </button>
      </form>
    </div>

    {#if $page.data.customer}
      <a class="customer p-2" href="/customer/account" title="My Account">
        <UserCircle tabindex="-1" aria-hidden="true" />
      </a>
    {:else}
      <a class="customer p-2" href="/customer/account/login" title="Login">
        <UserCircle tabindex="-1" aria-hidden="true" />
      </a>
    {/if}

    <MiniCart cart={$page.data.cart} />
  </section>
</header>

<style lang="postcss">
  .header.content {
    @apply container mx-auto;
  }

  .logo {
    @apply flex w-[200px] justify-center;
  }

  .header.content {
    @apply flex items-center gap-4 py-4;
  }

  .block-search {
    @apply mx-auto;
  }

  .minisearch {
    @apply flex items-center;
  }

  .minisearch .action.search {
    @apply ml-1 p-2;
  }
</style>
