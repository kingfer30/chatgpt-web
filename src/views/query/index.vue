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
              return '异常'

            else if (row.status === 'expired')
              return '过期'

            else if (row.status === 'exhausted')
              return '耗尽'
            else
              return '正常'
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
        : (tabValue === 'OpenAI' ? '需要登录' : row.used)
      // : row.used
    },
  },
  {
    title: '剩余额度',
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
        : (tabValue === 'OpenAI' ? '需要登录' : row.balance)
      // : row.balance
    },
  },

  {
    title: '使用进度',
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
  window.console.log(tabValue)
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
  // 清空输入
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
  window.console.log(tabValue)
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
  // 清空输入
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
    <NCard title="API Keys额度查询" style="margin-bottom: 16px">
      <NAlert title="提示" type="info">
        <p>· 如果您使用OpenAI官方账号生成的API Key，可以选择"OpenAI Keys"进行查询</p>
        <p>· 如果您使用果果API生成的API Key，可以选择"果果API Keys"进行查询</p>
        <p style="color: red;">
          · [OpenAI Keys] 官方更新规则，现在只能通过登录平台才能获取API使用情况。
        </p>
      </NAlert>
      <NTabs type="line" animated @update:value="updateTableName">
        <NTabPane name="OpenAI" tab="OpenAI Keys">
          <div class="flex justify-between mt-1" style="width: 90%;">
            <NInput
              v-model:value="keywordOffical" type="textarea" placeholder="请输入key，支持换行多个查询" class="mr-2 min-w-full"
              :autosize="{ minRows: 1 }"
            />
            <NButton type="primary" @click="searchOffical">
              查询
            </NButton>
          </div>
          <div class="container mx-auto flex justify-between my-8">
            <NDataTable :columns="tableColumns" :data="tableDataOffical" :single-line="false" striped />
          </div>
        </NTabPane>
        <NTabPane name="GuoGuo" tab="果果API Keys">
          <div class="flex justify-between mt-1" style="width: 90%;">
            <NInput
              v-model:value="keywordThird" type="textarea" placeholder="请输入账号密码, 格式为: 账号----密码，支持换行多个查询" class="mr-2 min-w-full"
              :autosize="{ minRows: 1 }"
            />
            <NButton type="primary" @click="searchThird">
              查询
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
