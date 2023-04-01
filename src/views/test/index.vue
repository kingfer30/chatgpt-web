<script>
import { ref } from 'vue'
import { NTable } from 'naive-ui'

export default {
  components: {
    NTable,
  },
  setup() {
    const tableData = ref([
      { name: 'Alice', age: 20, gender: 'Female' },
      { name: 'Bob', age: 25, gender: 'Male' },
      { name: 'Charlie', age: 30, gender: 'Male' },
      { name: 'David', age: 35, gender: 'Male' },
      { name: 'Eve', age: 40, gender: 'Female' },
    ])

    const tableColumns = ref([
      {
        title: 'Name',
        key: 'name',
      },
      {
        title: 'Age',
        key: 'age',
      },
      {
        title: 'Gender',
        key: 'gender',
      },
    ])

    return {
      tableData,
      tableColumns,
    }
  },
}
</script>

<template>
  <div>这是新页面啊!!!</div>
  <NTable :data="tableData" :columns="tableColumns" />
</template>
