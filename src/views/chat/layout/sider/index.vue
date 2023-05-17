<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NLayoutSider } from 'naive-ui'
import { v4 as uuidv4 } from 'uuid'
import Token from '../Token.vue'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const show = ref(false)
const showTokenSetting = ref(false)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: uuidv4(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
function jumpShop() {
  window.open('https://shop.aichat199.com')
}
function jumpQuery() {
  window.open('/#/query/')
}
// function jumpAbout() {
//   window.open('/#/about/')
// }
</script>

<template>
  <NLayoutSider
    :collapsed="collapsed" :collapsed-width="0" :width="260" :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform" position="absolute" bordered :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton dashed block @click="handleAdd">
            {{ $t('chat.newChatButton') }}
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>

        <NButton block secondary type="success" @click="jumpQuery">
          {{ $t('setting.key_query') }}
        </NButton>
        <NButton block secondary type="error" @click="jumpShop">
          {{ $t('setting.shop') }}
        </NButton>
        <NButton block secondary type="info" @click="show = true">
          {{ $t('store.siderButton') }}
        </NButton>
        <!-- <NButton block secondary type="info" @click="jumpAbout">
          {{ $t('setting.about') }}
        </NButton> -->
        <!-- <NButton block dashed @click="showTokenSetting = true">
          {{ $t('setting.setToken') }}
        </NButton> -->
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-model:visible="show" />
  <Token v-model:visible="showTokenSetting" />
</template>
