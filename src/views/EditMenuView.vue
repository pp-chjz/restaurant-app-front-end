<template>
  <div>
      <edit-menu></edit-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import EditMenu from '@/components/edit-menu/EditMenu.vue'

export default {
  name: 'First',
  components: {
    EditMenu,
  }
}
</script>
