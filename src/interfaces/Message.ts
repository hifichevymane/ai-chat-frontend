interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export default Message;
