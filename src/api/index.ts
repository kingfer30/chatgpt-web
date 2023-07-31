import { post } from '@/utils/request'

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
