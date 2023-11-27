<script>
  const links = [
    { name: 'Home', url: '/' },
    { name: 'Login', url: '/customer/account/login' },
    { name: 'Sign Up', url: '/customer/account/create' },
    { name: 'Logout', url: '/customer/account/logout' },
  ]

  export let data
</script>

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
</header>

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
</style>
