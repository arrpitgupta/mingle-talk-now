import { io, Socket } from 'socket.io-client';
import { ChatMessage } from './types';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        auth: {
          token: localStorage.getItem('token')
        }
      });
      
      this.socket.on('connect', () => {
        console.log('Connected to socket server');
        const userId = localStorage.getItem('userId');
        if (userId) {
          this.socket?.emit('user_connected', userId);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  }

  sendMessage(data: ChatMessage) {
    if (this.socket) {
      this.socket.emit('send_message', data);
    }
  }

  sendPrivateMessage(data: ChatMessage) {
    if (this.socket) {
      this.socket.emit('private_message', data);
    }
  }

  onMessage(callback: (data: ChatMessage) => void) {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  onPrivateMessage(callback: (data: ChatMessage) => void) {
    if (this.socket) {
      this.socket.on('receive_private_message', callback);
    }
  }

  onUserOnline(callback: (userId: string) => void) {
    if (this.socket) {
      this.socket.on('user_online', callback);
    }
  }

  onUserOffline(callback: (userId: string) => void) {
    if (this.socket) {
      this.socket.on('user_offline', callback);
    }
  }

  offMessage(callback: (data: ChatMessage) => void) {
    if (this.socket) {
      this.socket.off('receive_message', callback);
    }
  }

  offPrivateMessage(callback: (data: ChatMessage) => void) {
    if (this.socket) {
      this.socket.off('receive_private_message', callback);
    }
  }

  offUserOnline(callback: (userId: string) => void) {
    if (this.socket) {
      this.socket.off('user_online', callback);
    }
  }

  offUserOffline(callback: (userId: string) => void) {
    if (this.socket) {
      this.socket.off('user_offline', callback);
    }
  }
}

export const socketService = new SocketService(); 