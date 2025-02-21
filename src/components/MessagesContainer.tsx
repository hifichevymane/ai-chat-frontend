import Message from "../interfaces/Message"
import ChatMessage from "./ChatMessage"

interface Props {
  messages: Message[];
}

export default function MessagesContainer({ messages }: Props) {
  return (
    <div className="w-full h-full py-16 flex flex-col items-end gap-7 px-[10%]">
      {messages.map(({ text, isUser }, idx) => {
        return (
          <div key={idx} className={`w-full flex ${isUser ? 'justify-end' : 'justify-normal'}`}>
            <ChatMessage isUser={isUser}>{text}</ChatMessage>
          </div>
        )
      })}
    </div>
  )
};
