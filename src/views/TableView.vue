<template>
    <div>
        <all-table></all-table>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import AllTable from '@/components/all-table/AllTable.vue'
  
  export default {
    name: 'First',
    components: {
      AllTable,
    }
  }
  </script>
  