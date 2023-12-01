<script lang="ts">
  import { browser } from '$app/environment'
  import { Sun, Moon } from 'svelte-lucide'

  let darkMode = false

  function toggleDarkMode() {
    darkMode = !darkMode
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }

  if (browser) {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      darkMode = true
    } else {
      document.documentElement.classList.remove('dark')
      darkMode = false
    }
  }
</script>

<svelte:head>
  <script>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  </script>
</svelte:head>

<button type="button" class="theme-switcher p2" on:click={toggleDarkMode}>
  <Sun class="sun" tabindex="-1" />
  <Moon class="moon" tabindex="-1" />
</button>

<style lang="postcss">
  :global(html.dark .moon) {
    display: none;
  }

  :global(html:not(.dark) .sun) {
    display: none;
  }
</style>
