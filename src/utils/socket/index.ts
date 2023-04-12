import { useAuthStore } from '@/store'

interface ResponseMessage {
  msgType: 'auth' | 'msg' | 'count' | 'finish' | 'error' | 'alert'
  data: any
}
interface SocketOption {
  onMsg: (data: any) => void
  onFinish: (data: any) => void
  onError: (data: any) => void
  onClose: (data?: any) => void
  onAlert: (data?: any) => void
}

export function initSocket(uuid: any, { onMsg, onFinish, onError, onClose, onAlert }: SocketOption) {
  const authStore = useAuthStore()

  const socket = new WebSocket(import.meta.env.VITE_SOCKET_URL)

  socket.onmessage = (event: any) => {
    const reslut: ResponseMessage = JSON.parse(event.data)
    switch (reslut.msgType) {
      case 'msg':
        return onMsg(reslut.data)
      case 'finish':
        return onFinish(reslut.data)
      case 'error':
        return onError(reslut.data)
      case 'alert':
        return onAlert(reslut.data)
    }
  }
  socket.onclose = () => {
    onClose()
  }

  socket.onopen = () => {
    socket.send(JSON.stringify({
      uuid,
      msgType: 'auth',
      token: authStore.token,
    }))
  }
}
