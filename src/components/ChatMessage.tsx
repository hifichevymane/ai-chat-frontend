import Markdown from "react-markdown"

interface Props {
  isUser: boolean
  text: string
}

export default function ChatMessage({ isUser, text }: Props) {
  return (
    <article className={`[&_h1]:font-bold [&_h1]:text-2xl flex flex-col gap-4 w-fit max-w-4/5 p-4 bg-primary-100 rounded-t-xl ${isUser ? 'rounded-bl-xl' : 'rounded-br-xl'}`}>
      <Markdown>{text}</Markdown>
    </article>
  )
}
