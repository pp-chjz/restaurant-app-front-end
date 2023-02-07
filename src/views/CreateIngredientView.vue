<template>
  <div>
      <create-ingredient></create-ingredient>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateIngredient from '@/components/create-ingredient/CreateIngredient.vue'

export default {
  name: 'ingredient',
  components: {
    'create-ingredient':CreateIngredient,
  }
}
</script>
