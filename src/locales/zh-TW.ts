export default {
  common: {
    add: '新增',
    addSuccess: '新增成功',
    edit: '編輯',
    editSuccess: '編輯成功',
    delete: '刪除',
    deleteSuccess: '刪除成功',
    save: '儲存',
    saveSuccess: '儲存成功',
    reset: '重設',
    action: '操作',
    export: '匯出',
    exportSuccess: '匯出成功',
    import: '匯入',
    importSuccess: '匯入成功',
    clear: '清除',
    clearSuccess: '清除成功',
    yes: '是',
    no: '否',
    confirm: '確認',
    download: '下載',
    noData: '目前無資料',
    wrong: '發生錯誤，請稍後再試。',
    success: '操作成功',
    failed: '操作失敗',
    verify: '驗證',
    alert: '警告',
    unauthorizedTips: '本站僅供學習、娛樂使用，嚴禁發佈或傳播一切違規違法內容，您使用本系統代表您承諾同意以下內容：',
    systemDesc: `
    <p class="p-1">1. 本站所售令牌只能在本站調用，其他平臺調用無效，國內可直連無需使用魔法工具</p>
    <p class="p-1">2. 其他平臺購買的Key無法在本站使用</p>
    <p class="p-1">3. 請規範使用本站，嚴禁發佈任何違法違規內容，執意發佈均屬個人行為與本站無關</p>
    <p class="p-1">4. 本站檢測出任何違法違規內容會及時予以警告提示，超過內定次數將封禁聊天室</p>
    <p class="p-1">5. 您任何聊天內容均在您的瀏覽器（本機）完整保留，本站後臺採用資料加密且僅保留5天，保留目的僅為做上下文對話處理。</p>`,
    tyTBDesc: `<div class="text-red-500 font-bold">
    一、打開淘寶，掃描以下二維碼，體驗令牌獲取管道：
  </div>
  <p>1、瀏覽店鋪內任意商品，發送暗號“滴滴”即可免費獲得30次對話銅令牌使用</p>
  <p>2、收藏店鋪內任意商品，發送暗號“滴滴”即可免費獲得20次對話銀令牌使用</p>
  <p>3、關注店鋪並收藏任意商品，發送暗號“滴滴”即可免費獲得10次對話金令牌使用</p>`,
    tyGZHDesc: `<div class="text-red-500 font-bold">
  二、打開微信，掃描以下二維碼，體驗令牌獲取管道：
</div>
<p>1、公眾號每日推送的文章裏會發放限量免費30次對話銅令牌</p>
<p>2、轉發公眾號任意文章到朋友圈、一個微信群並截圖發到公眾號上，即可免費獲得20次對話銀令牌使用</p>
<p>3、轉發公眾號任意文章到三個群並截圖發到公眾號上、任意文章打賞任意金額，即可免費獲得10次對話金令牌使用</p>`,
    copperDesc: '铜令牌，共享通道，需排隊，單線處理，速度慢, 平均回應時間7-10秒',
    silverDesc: '银令牌，共享通道，需排隊，並行處理，速度適中, 平均回應時間3-6秒',
    goldDesc: '金令牌，獨享通道，無需排隊，並行處理，速度快, 平均回應時間1-2秒',
    dalleDesc: 'DALLE令牌，繪圖通道',
  },
  chat: {
    newChatButton: '新建對話',
    placeholder: '來說點什麼...（Shift + Enter = 換行，"/" 觸發提示詞）',
    placeholderMobile: '來說點什麼...',
    copy: '複製',
    copied: '複製成功',
    copyCode: '複製代碼',
    clearChat: '清除對話',
    clearChatConfirm: '是否清空對話?',
    exportImage: '儲存對話為圖片',
    exportImageConfirm: '是否將對話儲存為圖片?',
    exportSuccess: '儲存成功',
    exportFailed: '儲存失敗',
    usingContext: '上下文模式',
    turnOnContext: '啟用上下文模式，在此模式下，發送訊息會包含之前的聊天記錄。',
    turnOffContext: '關閉上下文模式，在此模式下，發送訊息不會包含之前的聊天記錄。',
    deleteMessage: '刪除訊息',
    deleteMessageConfirm: '是否刪除此訊息?',
    deleteHistoryConfirm: '確定刪除此紀錄?',
    clearHistoryConfirm: '確定清除紀錄?',
    preview: '預覽',
    showRawText: '顯示原文',
    unsetApiKey: '請先設定請求的Token令牌',
  },
  setting: {
    setting: '設定',
    general: '總覽',
    concat: '聯繫我們',
    config: '設定',
    avatarLink: '頭貼連結',
    name: '名稱',
    description: '描述',
    role: '角色設定',
    resetUserInfo: '重設使用者資訊',
    chatHistory: '紀錄',
    theme: '主題',
    language: '語言',
    api: 'API',
    reverseProxy: '反向代理',
    timeout: '逾時',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
    setToken: 'Token令牌設定',
    setTokenTip: '請輸入Token令牌',
    setTokenFreeTip: '免費獲取Token令牌',
    shop: '購買Token',
    key_type: '計費類型',
    key_level: '令牌類型',
    key_total: '總量',
    key_used: '已用',
    key_balance: '剩餘',
    key_last_use: '上次使用',
    key_expire: '過期時間',
    key_query: 'APi Key 查詢',
  },
  store: {
    siderButton: '提示詞商店',
    local: '本機',
    online: '線上',
    title: '標題',
    description: '描述',
    clearStoreConfirm: '是否清除資料？',
    importPlaceholder: '請將 JSON 資料貼在此處',
    addRepeatTitleTips: '標題重複，請重新輸入',
    addRepeatContentTips: '內容重複：{msg}，請重新輸入',
    editRepeatTitleTips: '標題衝突，請重新修改',
    editRepeatContentTips: '內容衝突{msg} ，請重新修改',
    importError: '鍵值不符合',
    importRepeatTitle: '因標題重複跳過：{msg}',
    importRepeatContent: '因內容重複跳過：{msg}',
    onlineImportWarning: '注意：請檢查 JSON 檔案來源！',
    downloadError: '請檢查網路狀態與 JSON 檔案有效性',
  },
}
