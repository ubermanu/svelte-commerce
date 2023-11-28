<script>
  import MiniCart from '$lib/components/MiniCart.svelte'
  import { page } from '$app/stores'

  const links = [
    { name: 'Home', url: '/' },
    { name: 'Login', url: '/customer/account/login' },
    { name: 'Sign Up', url: '/customer/account/create' },
    { name: 'Logout', url: '/customer/account/logout' },
  ]

  export let data
</script>

<svelte:head>
  <title>{data.head.title}</title>
  {#if data.head.description}
    <meta name="description" content={data.meta.description} />
  {/if}
  {#if data.head.keywords}
    <meta name="keywords" content={data.meta.keywords} />
  {/if}
</svelte:head>

<header class="header">
  <ul class="links">
    {#each links as link}
      <li>
        <a href={link.url}>{link.name}</a>
      </li>
    {/each}
  </ul>

  {#if data?.customer}
    <div class="customer">
      <span>Welcome {data.customer.email}</span>
      <a href="/customer/account/logout">Logout</a>
    </div>
  {/if}

  <MiniCart cart={data.cart} />
</header>

<section class="search">
  <form action="/search" method="get">
    <input
      type="text"
      name="q"
      placeholder="Search..."
      value={$page.url.searchParams.get('q')}
    />
    <button type="submit">Search</button>
  </form>
</section>

<slot />

<style>
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.6rem;
    padding: 0.8rem;
  }

  .links {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .search {
    margin-bottom: 1.6rem;
  }
</style>
