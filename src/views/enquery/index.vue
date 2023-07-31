<script setup lang='ts'>
import { h, ref } from 'vue'
import { NAlert, NButton, NCard, NDataTable, NInput, NProgress, NSpin, NTabPane, NTabs, NTag } from 'naive-ui'
import { fetchKeyOffical, fetchKeyThird } from '@/api'

let tabValue = 'OpenAI'
const tableColumns: any = [
  {
    title: 'Key',
    key: 'token',
    width: '350px',
    render(row: any) {
      const tags = []
      window.console.log(row)
      tags.push(h(
        NTag,
        {
          style: {
            margin: '0 6px',
          },
          type: row.status === 'normal' ? 'success' : 'error',
          bordered: false,
        },
        {
          default: () => {
            if (row.status === 'error')
              return 'Error'

            else if (row.status === 'expired')
              return 'Expired'

            else if (row.status === 'exhausted')
              return 'Exhausted'
            else
              return 'Normal'
          },
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
          default: () => row.gpt4 === true ? (`gpt4${row.gpt4k ? `-${row.gpt4k}` : ''}`) : 'gpt3.5',
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
    title: 'Total',
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
    title: 'Used',
    key: 'used',
    render(row: any) {
      if (row.status === 'error')
        return ''
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
        : (tabValue === 'OpenAI' ? 'Need Login' : row.used)
      // : row.used
    },
  },
  {
    title: 'Balance',
    key: 'balance',
    render(row: any) {
      if (row.status === 'error')
        return ''
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
        : (tabValue === 'OpenAI' ? 'Need Login' : row.balance)
      // : row.balance
    },
  },

  {
    title: 'Progress',
    key: 'progress',
    render(row: any) {
      if (row.total === -1) {
        return h(
          NSpin,
          {
            size: 'small',
          },
          {
            default: () => '',
          },
        )
      }
      if (row.status === 'error')
        return ''

      const b = row.balance || 0
      const all = row.total || 0
      const ratio = row.used === 0 ? 100 : parseInt((b / all * 100).toFixed(2))
      let color = '#18a058'
      if (ratio < 60)
        color = '#f08a00'
      else if (ratio < 30)
        color = '#ff5758'
      return h(
        NProgress,
        {
          'style': {
            margin: '0 6px',
          },
          'type': 'line',
          'color': color,
          'percentage': ratio,
          'indicator-placement': 'inside',
        },
        {
          default: () => '',
        },
      )
    },
  },
  {
    title: 'Expire At',
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
]

const tableDataOffical = ref<any>([])
const tableDataThird = ref<any>([])

const keywordOffical = ref<string>('')
const keywordThird = ref<string>('')
interface KeyState {
  key?: string
  token?: string
  status?: string
  total?: string
  used?: string
  balance?: string
  last_month?: string
  gpt4?: string
  gpt4k?: string
  expire?: string
}
function searchOffical() {
  const list = keywordOffical.value.trim().split('\n')
  const error_key: number[] = []
  tableDataOffical.value.splice(0)
  tableColumns[1].colSpan = undefined
  tableColumns[1].cellProps = undefined

  list.forEach((token) => {
    token = token.trim()
    if (token !== '') {
      const first = token.substring(0, 6)
      const last = token.substring((token.length - 6))
      tableDataOffical.value.push({
        key: token, token: (`${first}****${last}`), total: -1, used: -1, balance: -1, expire: -1, last_month: -1,
      })
    }
  })
  keywordOffical.value = ''
  tableDataOffical.value.forEach((row: any, index: number) => {
    getKeyOffical(row.key).then((resp) => {
      const { data } = resp
      data.key = row.key
      data.token = row.token
      tableDataOffical.value[index] = data
    }).catch((error) => {
      tableDataOffical.value[index] = {
        key: row.key, token: row.token, status: 'error', total: error.message, balance: 0,
      }
      error_key.push(index)
    }).then(() => {
      tableColumns[1].colSpan = (rowData: any, rowIndex: any) => (error_key.includes(rowIndex) ? 5 : 1)
      tableColumns[1].cellProps = (rowData: any, rowIndex: any) => (error_key.includes(rowIndex) ? { style: 'color:red' } : {})
    })
  })
}

function searchThird() {
  const list = keywordThird.value.trim().split('\n')
  const error_key: number[] = []
  tableDataThird.value.splice(0)
  tableColumns[1].colSpan = undefined
  tableColumns[1].cellProps = undefined

  list.forEach((token) => {
    token = token.trim()
    if (token !== '') {
      const first = token.substring(0, 6)
      const last = token.substring((token.length - 6))
      tableDataThird.value.push({
        key: token, token: (`${first}****${last}`), total: -1, used: -1, balance: -1, expire: -1, last_month: -1,
      })
    }
  })
  keywordThird.value = ''
  tableDataThird.value.forEach((row: any, index: number) => {
    getKeyThird(row.key).then((resp) => {
      const { data } = resp
      data.key = row.key
      data.token = row.token
      tableDataThird.value[index] = data
    }).catch((error) => {
      tableDataThird.value[index] = {
        key: row.key, token: row.token, status: 'error', total: error.message, balance: 0,
      }
      error_key.push(index)
    }).then(() => {
      tableColumns[1].colSpan = (rowData: any, rowIndex: any) => (error_key.includes(rowIndex) ? 5 : 1)
      tableColumns[1].cellProps = (rowData: any, rowIndex: any) => (error_key.includes(rowIndex) ? { style: 'color:red' } : {})
    })
  })
}

async function getKeyOffical(key: string) {
  return await fetchKeyOffical<KeyState>(key)
}
async function getKeyThird(key: string) {
  return await fetchKeyThird<KeyState>(key)
}
function updateTableName(val: string) {
  tabValue = val
}
</script>

<template>
  <div class="container mx-auto mt-8">
    <NCard title="API Keys Usage Query" style="margin-bottom: 16px">
      <NAlert title="Tips" type="info">
        <p>· If you are using an API Key generated by an OpenAI account, you can choose "OpenAI Keys" to search.</p>
        <p>· If you are using an API Key generated by an AI GUO GUO , you can choose "GUO GUO API Keys" to search.</p>
        <p style="color: red;">
          · [OpenAI Keys] The offical update the rules and you only can get your API usage by login at the platform now.
        </p>
      </NAlert>
      <NTabs type="line" animated @update:value="updateTableName">
        <NTabPane name="OpenAI" tab="OpenAI Keys">
          <div class="flex justify-between mt-1" style="width: 90%;">
            <NInput
              v-model:value="keywordOffical" type="textarea" placeholder="Please enter the key to support multiple queries for line breaks" class="mr-2 min-w-full"
              :autosize="{ minRows: 1 }"
            />
            <NButton type="primary" @click="searchOffical">
              Search
            </NButton>
          </div>
          <div class="container mx-auto flex justify-between my-8">
            <NDataTable :columns="tableColumns" :data="tableDataOffical" :single-line="false" striped />
          </div>
        </NTabPane>
        <NTabPane name="GuoGuo" tab="GUO GUO API Keys">
          <div class="flex justify-between mt-1" style="width: 90%;">
            <NInput
              v-model:value="keywordThird" type="textarea" placeholder="Please enter the key to support multiple queries for line breaks" class="mr-2 min-w-full"
              :autosize="{ minRows: 1 }"
            />
            <NButton type="primary" @click="searchThird">
              Search
            </NButton>
          </div>
          <div class="container mx-auto flex justify-between my-8">
            <NDataTable :columns="tableColumns" :data="tableDataThird" :single-line="false" striped />
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
