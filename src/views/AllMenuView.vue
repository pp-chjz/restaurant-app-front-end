<template>
  <div>
      <all-menu></all-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import AllMenu from '@/components/all-menu/AllMenu.vue'

export default {
  name: 'All',
  components: {
    'all-menu':AllMenu,
  }
}
</script>
