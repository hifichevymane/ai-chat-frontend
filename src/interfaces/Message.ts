export default interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
}
