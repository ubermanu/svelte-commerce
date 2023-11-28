<script>
  import { page } from '$app/stores'

  export let data

  const steps = [
    {
      title: 'Shipping',
      url: 'shipping',
    },
    {
      title: 'Payment',
      url: 'payment',
    },
  ]
</script>

<p>
  <a href="/">&larr; Back to shop</a>
</p>

<ol class="steps">
  {#each steps as step}
    <li>
      <a
        href="/checkout/{step.url}"
        class="step"
        class:active={$page.url.pathname === `/checkout/${step.url}`}
      >
        {step.title}
      </a>
    </li>
  {/each}
</ol>

<slot />

<style>
  .step {
    color: inherit;
    text-decoration: none;
  }

  .step.active {
    color: orangered;
  }
</style>
