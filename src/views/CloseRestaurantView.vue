<template>
  <div>
      <close-restaurant></close-restaurant>
  </div>
</template>

<script>
// @ is an alias to /src
import CloseRestaurant from '@/components/close-restaurant/CloseRestaurant.vue'

export default {
  name: 'All',
  components: {
    'close-restaurant':CloseRestaurant,
  }
}
</script>
