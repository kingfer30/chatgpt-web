import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useChatStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  },
) {
  const authStore = useAuthStore()
  const chatStore = useChatStore()

  return post<T>({
    url: '/completions',
    data: { prompt: params.prompt, options: params.options, is_chat: chatStore.usingContext ? 1 : 0, token: authStore.token },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}
