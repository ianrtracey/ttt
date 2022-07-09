import { Server } from 'Socket.IO'

const SocketHandler = (req: Request, res: Response) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket: any) => {
      console.log('connected to client')
      socket.on('input-change', msg => {
        console.log('msg', msg)
        socket.broadcast.emit('update-input', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
