<script>
  const { class: additionalClasses = '', ...restProps } = $$restProps
</script>

<div class="page-title-wrapper my-8 {additionalClasses}" {...restProps}>
  <h1 class="page-title text-4xl font-bold">
    <span class="base"><slot /></span>
  </h1>
</div>
