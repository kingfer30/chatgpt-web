<script  lang='ts'>
import { fetchAbout } from '@/api'

export default {
  data() {
    return {
      htmlContent: '', // 后台返回的HTML字符串
    }
  },
  mounted() {
    // 从后台加载HTML字符串
    this.loadHtmlContent()
  },
  methods: {
    loadHtmlContent() {
      getAbout().then((resp) => {
        const { data } = resp
        this.htmlContent = data.about
      })
    },
  },
}
async function getAbout() {
  return await fetchAbout<any>()
}
</script>

<template>
  <div class="container mx-auto" v-html="htmlContent" />
</template>
