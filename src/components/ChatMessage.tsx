import type { PropsWithChildren } from "react"


export default function ChatMessage({ children }: PropsWithChildren) {
  return (
    <div className="flex w-fit p-4 bg-primary-100 rounded-[18px]">
      {children}
    </div>
  )
}
