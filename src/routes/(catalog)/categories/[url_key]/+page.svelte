<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

  export let data

  // TODO: Add parent categories to breadcrumbs
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: data.category.name },
  ]
</script>

<svelte:head>
  <title>{data.category.name}</title>
</svelte:head>

<Breadcrumbs items={breadcrumbs} />

<h1 class="category name">{data.category.name}</h1>
