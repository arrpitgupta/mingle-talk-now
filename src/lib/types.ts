export interface ChatMessage {
  roomId: string;
  sender: string;
  content: string;
  timestamp?: Date;
} 