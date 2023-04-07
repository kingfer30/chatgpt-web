import { io } from 'socket.io-client'

interface RequestMessage {
  msgType: 'auth' | 'msg' | 'count' | 'finish' | 'error'
  data: any
}
interface ResponseMessage {
  msgType: 'auth' | 'msg' | 'count' | 'finish' | 'error'
  data: any
}
interface SocketOption {
  onMsg: (data: any) => void
  onFinish: (data: any) => void
  onError: (data: any) => void
}

export function createInstance({ onMsg, onFinish, onError }: SocketOption) {
  const socket = io('//')
  socket.on('connect', () => {
    window.console.log('Connected to server')
  })
  socket.on('disconnect', () => {
    window.console.log('Disconnected from server')
  })
  socket.on('open', () => {
    socket.send({
      msgType: 'auth',
      ticket: _opt.ticket,
      system: _opt.system,
      session_id: _opt.session_id,
      msg_type: _opt.msg_type,
    })
  })
  socket.on('message', (event) => {
    const reslut: ResponseMessage = JSON.parse(event.data)
    switch (reslut.msgType) {
      case 'auth':
        return onMsg(reslut.data)
      case 'msg':
        return onMsg(reslut.data)
      case 'finish':
        return onFinish(reslut.data)
      case 'error':
        return onError(reslut.data)
    }
  })
}
export const noticeInstance = {
  data: () => ({
    socket: null,
  }),
  methods: {
    incrementCount() {
      count++
    },
  },
}
