import { useAuthStore } from '@/store'

interface ResponseMessage {
  msgType: 'auth' | 'msg' | 'count' | 'finish' | 'error'
  data: any
}
interface SocketOption {
  onMsg: (data: any) => void
  onFinish: (data: any) => void
  onError: (data: any) => void
  onClose: (data?: any) => void
}

export function initSocket({ onMsg, onFinish, onError, onClose }: SocketOption) {
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
    }
  }
  socket.onclose = () => {
    onClose()
  }

  socket.onopen = () => {
    socket.send(JSON.stringify({
      msgType: 'auth',
      token: authStore.token,
    }))
  }
}
