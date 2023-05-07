<script setup lang='ts'>
import { h, ref } from 'vue'
import { NButton, NDataTable, NInput, NSpin, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { fetchKeyDetail } from '@/api'

const tableColumns = ref<DataTableColumns>([
  {
    title: 'Key',
    key: 'token',
    width: '350px',
    render(row: any) {
      const tags = []
      tags.push(h(
        NTag,
        {
          style: {
            margin: '0 6px',
          },
          type: row.status === 'error' ? 'error' : 'success',
          bordered: false,
        },
        {
          default: () => row.status === 'error' ? '异常' : '正常',
        },
      ))
      tags.push(h(
        NTag,
        {
          style: {
            margin: '0 6px',
          },
          type: row.gpt4 === true ? 'warning' : 'info',
          bordered: false,
        },
        {
          default: () => row.gpt4 === true ? 'gpt4' : 'gpt3.5',
        },
      ))
      tags.push(h(
        NTag,
        {
          style: {
            margin: '0 6px',
          },
          type: row.bindka === true ? 'primary' : 'default',
          bordered: false,
        },
        {
          default: () => row.bindka === true ? '已绑卡' : '未绑卡',
        },
      ))
      return h('div', null, [
        row.token,
        row.total === -1
          ? ''
          : tags,
      ])
    },
  },
  {
    title: '总额度',
    key: 'total',
    render(row: any) {
      return row.total === -1
        ? h(
          NSpin,
          {
            size: 'small',
          },
          {
            default: () => '',
          },
        )
        : row.total
    },
  },
  {
    title: '已用额度',
    key: 'used',
    render(row: any) {
      return row.used === -1
        ? h(
          NSpin,
          {
            size: 'small',
          },
          {
            default: () => '',
          },
        )
        : row.used
    },
  },
  {
    title: '剩余额度',
    key: 'balance',
    render(row: any) {
      return row.balance === -1
        ? h(
          NSpin,
          {
            size: 'small',
          },
          {
            default: () => '',
          },
        )
        : row.balance
    },
  },
  {
    title: '上月已用',
    key: 'last_month',
    render(row: any) {
      return row.last_month === -1
        ? h(
          NSpin,
          {
            size: 'small',
          },
          {
            default: () => '',
          },
        )
        : row.last_month
    },
  },
  {
    title: '有效期',
    key: 'expire',
    render(row: any) {
      return row.expire === -1
        ? h(
          NSpin,
          {
            size: 'small',
          },
          {
            default: () => '',
          },
        )
        : row.expire
    },
  },
])

const tableData = ref<any>([])

const keyword = ref<string>('')
interface KeyState {
  key?: string
  token?: string
  status?: string
  total?: string
  used?: string
  balance?: string
  last_month?: string
  gpt4?: string
  expire?: string
}
function search() {
  const list = keyword.value.trim().split('\n')
  const error_key: number[] = []
  tableData.value.splice(0)
  tableColumns.value[1].colSpan = undefined
  tableColumns.value[1].cellProps = undefined

  list.forEach((token) => {
    token = token.trim()
    if (token !== '') {
      const first = token.substring(0, 6)
      const last = token.substring((token.length - 6))
      tableData.value.push({
        key: token, token: (`${first}****${last}`), total: -1, used: -1, balance: -1, expire: -1, last_month: -1,
      })
    }
  })
  tableData.value.forEach((row: any, index: number) => {
    getKeyDetail(row.key).then((resp) => {
      const { data } = resp
      data.key = row.key
      data.token = row.token
      tableData.value[index] = data
    }).catch((error) => {
      tableData.value[index] = {
        key: row.key, token: row.token, status: 'error', total: error.message, balance: 0,
      }
      error_key.push(index)
    }).then(() => {
      tableColumns.value[1].colSpan = (rowData: any, rowIndex: any) => (error_key.includes(rowIndex) ? 5 : 1)
      tableColumns.value[1].cellProps = (rowData: any, rowIndex: any) => (error_key.includes(rowIndex) ? { style: 'color:red' } : {})
    })
  })
}

async function getKeyDetail(key: string) {
  return await fetchKeyDetail<KeyState>(key)
}
</script>

<template>
  <div class="container mx-auto flex justify-between mt-8">
    <NInput
      v-model:value="keyword" type="textarea" placeholder="请输入key，支持换行多个查询" class="mr-2 min-w-full"
      :autosize="{ minRows: 1 }"
    />
    <NButton type="primary" @click="search">
      查询
    </NButton>
  </div>
  <div class="container mx-auto flex justify-between my-8">
    <NDataTable :columns="tableColumns" :data="tableData" :single-line="false" striped />
  </div>
</template>

<style>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
