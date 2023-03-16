<template>
  <div>
      <all-ingredient></all-ingredient>
  </div>
</template>

<script>
// @ is an alias to /src
import AllIngredient from '@/components/all-ingredient/AllIngredient.vue'

export default {
  name: 'All',
  components: {
    'all-ingredient':AllIngredient,
  }
}
</script>
