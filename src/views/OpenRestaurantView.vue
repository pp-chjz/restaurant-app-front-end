<template>
  <div>
      <open-restaurant></open-restaurant>
  </div>
</template>

<script>
// @ is an alias to /src
import OpenRestaurant from '@/components/open-restaurant/OpenRestaurant.vue'

export default {
  name: 'All',
  components: {
    'open-restaurant':OpenRestaurant,
  }
}
</script>
