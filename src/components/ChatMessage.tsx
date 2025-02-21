import type { PropsWithChildren } from "react"

interface Props {
  isUser: boolean
}

export default function ChatMessage({ isUser, children }: PropsWithChildren<Props>) {
  return (
    <div className={`flex w-fit max-w-4/5 p-4 bg-primary-100 rounded-t-xl ${isUser ? 'rounded-bl-xl' : 'rounded-br-xl'}`}>
      {children}
    </div>
  )
}
