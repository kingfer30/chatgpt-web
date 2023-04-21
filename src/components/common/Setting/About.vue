<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { NAvatar, NEllipsis, NNumberAnimation, NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import copperImg from '@/assets/copper.png'
import silverImg from '@/assets/silver.png'
import goldImg from '@/assets/gold.png'

interface ConfigState {
  token?: number
  key_type?: number
  level?: string
  total?: number
  used?: number
  balance?: number
  last_use_date?: string
  expire_date?: string
}

const loading = ref(false)

const config = ref<ConfigState>()

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4">
      <h2 class="text-xl font-bold flex ">
        <template v-if="config?.level === 'copper'">
          <NAvatar color="#fff" :size="25" :src="copperImg" object-fit="contain" />
        </template>
        <template v-if="config?.level === 'silver'">
          <NAvatar color="#fff" :size="25" :src="silverImg" object-fit="contain" />
        </template>
        <template v-if="config?.level === 'gold'">
          <NAvatar color="#fff" :size="25" :src="goldImg" object-fit="contain" />
        </template>
        <NEllipsis expand-trigger="click" line-clamp="1" :tooltip="false">
          {{ config ? $t(`setting.key_level_${config?.level}`) : '-' }} - {{ config?.token }}
        </NEllipsis>
      </h2>
      <p>{{ $t("setting.key_type") }}：{{ config ? $t(`setting.key_type_${config?.key_type}`) : '-' }}</p>
      <p>{{ $t("setting.key_total") }}：<NNumberAnimation :from="0" :to="config?.total ?? 0 " /></p>
      <p>{{ $t("setting.key_used") }}：<NNumberAnimation :from="0" :to="config?.used ?? 0 " /></p>
      <p>{{ $t("setting.key_balance") }}：<NNumberAnimation :from="0" :to="config?.balance ?? 0 " /></p>
      <p>{{ $t("setting.key_last_use") }}：{{ config?.last_use_date ?? '-' }}</p>
      <p>{{ $t("setting.key_expire") }}：{{ config?.expire_date ?? '-' }}</p>
    </div>
  </NSpin>
</template>
