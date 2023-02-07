<template>
  <div>
      <create-menu></create-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateMenu from '@/components/create-menu/CreateMenu.vue'

export default {
  name: 'First',
  components: {
    CreateMenu,
  }
}
</script>
