import { ss } from '@/utils/storage'

const LOCAL_NAME = 'API_KEY'

export function getApiKey() {
  return ss.get(LOCAL_NAME)
}

export function setApiKey(key: string) {
  return ss.set(LOCAL_NAME, key)
}

export function removeApiKey() {
  return ss.remove(LOCAL_NAME)
}
