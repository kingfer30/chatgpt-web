import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useChatStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  const authStore = useAuthStore()
  return post<T>({
    url: '/config',
    data: { token: authStore.token },
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
    data: { prompt: params.prompt, is_chat: chatStore.usingContext ? 1 : 0, token: authStore.token },
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

export function fetchKeyOffical<T = any>(key: string) {
  return post<T>({
    url: '/offical-key-query',
    data: { key },
  })
}
export function fetchKeyThird<T = any>(key: string) {
  return post<T>({
    url: '/third-key-query',
    data: { key },
  })
}
export function fetchAbout<T = any>() {
  return post<T>({
    url: '/about',
  })
}
