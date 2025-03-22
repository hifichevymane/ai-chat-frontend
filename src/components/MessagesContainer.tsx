import Message from "../interfaces/Message"
import ChatMessage from "./ChatMessage"

interface Props {
  messages: Message[];
}

export default function MessagesContainer({ messages }: Props) {
  return (
    <div className="w-full h-full py-16 flex flex-col items-end gap-7 px-[10%]">
      {messages.map(({ content, role }, idx) => {
        return (
          <div key={idx} className={`w-full flex ${role === 'user' ? 'justify-end' : 'justify-normal'}`}>
            <ChatMessage role={role} content={content} />
          </div>
        )
      })}
    </div>
  )
};
