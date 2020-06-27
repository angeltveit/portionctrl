import SocketIO from 'socket.io-client'

let io
if(!window.io) {
  io = SocketIO('/', {
    forceNew: true,
  })
  window.io = io
  io.on('connect', () => {
    console.log('connected')
    io.emit('enter')
  })
}

export { io }