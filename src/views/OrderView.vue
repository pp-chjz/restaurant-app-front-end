<template>
    <div>
        <all-order></all-order>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import AllOrder from '@/components/order/Order.vue'
  
  export default {
    name: 'First',
    components: {
      AllOrder,
    }
  }
  </script>
  