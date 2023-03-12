<template>
    <div>
        <check-bill></check-bill>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import CheckBill from '@/components/check-bill/CheckBill.vue'
  
  export default {
    name: 'First',
    components: {
        CheckBill,
    }
  }
  </script>
  