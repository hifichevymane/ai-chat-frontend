import Message from "../interfaces/Message"
import ChatMessage from "./ChatMessage"

type Props = {
  messages: Message[];
}

export default function MessagesContainer({ messages }: Props) {
  return (
    <div className="w-full h-full py-16 flex flex-col items-end gap-7 px-1/2">
      {messages.map(({ text }, idx) => (<ChatMessage key={idx}>{text}</ChatMessage>))}
    </div>
  )
};
