import mongoose from 'mongoose';

interface IMessage {
  roomId: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
  roomId: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Message = mongoose.model<IMessage>('Message', messageSchema); 