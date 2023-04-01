import { defineStore } from 'pinia'
import { getApiKey, removeApiKey, setApiKey } from './helper'
import { store } from '@/store'
import { fetchSession } from '@/api'

interface SessionResponse {
  token: string | undefined
}

export interface AuthState {
  key: string | undefined
  session: SessionResponse | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    key: getApiKey(),
    session: null,
  }),
  actions: {
    async getSession() {
      try {
        const { data } = await fetchSession<SessionResponse>()
        this.session = { ...data }
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    setApiKey(token: string) {
      setApiKey(token)
    },

    removeApiKey() {
      removeApiKey()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
