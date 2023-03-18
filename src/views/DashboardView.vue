<template>
    <div>
        <dashboard></dashboard>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Dashboard from '@/components/dashboard/Dashboard.vue'
  
  export default {
    name: 'First',
    components: {
        Dashboard,
    }
  }
  </script>
  