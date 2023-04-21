<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NAvatar, NButton, NDivider, NImage, NInput, NModal, NSpace, useMessage } from 'naive-ui'
import { useAuthStore } from '@/store'
import Icon403 from '@/icons/403.vue'
import copperImg from '@/assets/copper.png'
import silverImg from '@/assets/silver.png'
import goldImg from '@/assets/gold.png'
import tbImg from '@/assets/store.jpg'
import gzhImg from '@/assets/gzh.jpg'

interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')
const showImg = ref(false)

const disabled = computed(() => !token.value.trim() || loading.value)

async function handleVerify() {
  const secretKey = token.value.trim()

  if (!secretKey)
    return

  try {
    loading.value = true
    authStore.setToken(secretKey)
    authStore.setAuth(true)
    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 880px" :closable="true">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            {{ $t('setting.setToken') }}
          </h2>
          <Icon403 class="w-[200px] m-auto" />
          <p class="text-sm font-bold text-center  text-red-500">
            {{ $t('common.unauthorizedTips') }}
          </p>
          <NDivider />
          <div class="text-sm text-red-500">
            <div v-html="$t('common.systemDesc')" />
          </div>
          <NDivider />
          <p class="text-xs flex">
            <NAvatar color="#fff" :size="15" :src="copperImg" object-fit="contain" />{{ $t('common.copperDesc') }}
          </p>
          <p class="text-xs flex ">
            <NAvatar color="#fff" :size="15" :src="silverImg" object-fit="contain" />{{ $t('common.silverDesc') }}
          </p>
          <p class="text-xs flex">
            <NAvatar color="#fff" :size="15" :src="goldImg" object-fit="contain" />{{ $t('common.goldDesc') }}
          </p>
        </header>
        <NInput v-model:value="token" type="password" placeholder="请输入Token令牌" @keypress="handlePress" />
        <NSpace justify="center">
          <NButton type="primary" :disabled="disabled" :loading="loading" @click="handleVerify">
            {{ $t('setting.setting') }}
          </NButton>
          <NButton color="#ff5758" :loading="loading" @click="showImg = true">
            {{ $t('setting.setTokenFreeTip') }}
          </NButton>
        </NSpace>
      </div>
    </div>
  </NModal>
  <NModal :show="showImg" style="width: 90%; max-width: 730px" @update:show="showImg = false">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div v-html="$t('common.tyTBDesc')" />
      <div class="flex justify-center">
        <NImage width="120" :src="tbImg" alt="淘宝二维码" />
      </div>
      <div v-html="$t('common.tyGZHDesc')" />
      <div class="flex justify-center">
        <NImage width="120" :src="gzhImg" alt="微信公众号二维码" />
      </div>
    </div>
  </NModal>
</template>
