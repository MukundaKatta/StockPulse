import { io, Socket } from 'socket.io-client';
import { WS_URL } from './constants';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sp-token') : null;
    socket = io(WS_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      auth: token ? { token } : undefined,
    });
  }
  return socket;
}

export function reconnectSocket(): void {
  disconnectSocket();
  getSocket();
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
