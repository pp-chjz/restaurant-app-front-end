<template>
  <div>
      <first-page></first-page>
  </div>
</template>

<script>
// @ is an alias to /src
import FirstPage from '@/components/home-page/FirstPage.vue'

export default {
  name: 'First',
  components: {
    FirstPage,
  }
}
</script>
