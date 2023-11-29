<script lang="ts">
  export let product: any

  // console.log(product.configurable_options)
</script>

<div class="configurable-options">
  {#each product.configurable_options as option}
    <div class="configurable-option">
      <label for="swatch-option-{option.attribute_code}">
        {option.label}
      </label>
      <select
        id="swatch-option-{option.attribute_code}"
        name="super_attribute[{option.attribute_id}]"
        class="form-select"
        required
      >
        <option value="">Select an option</option>
        {#each option.values as value}
          <option value={value.uid}>{value.label}</option>
        {/each}
      </select>
    </div>
  {/each}
</div>
