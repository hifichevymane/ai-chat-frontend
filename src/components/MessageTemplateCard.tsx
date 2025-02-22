import type { PropsWithChildren } from "react"

interface Props {
  theme: string;
}

export default function ThemeCard({ theme, children }: PropsWithChildren<Props>) {
  return (
    <div className="
      flex flex-col 
      justify-center items-center 
      bg-primary-100 
      w-[192px] h-[148px] 
      gap-[15px] font-secondary
      rounded-[27px] hover:cursor-pointer
      hover:bg-primary-200
      transition-colors duration-150 ease-out
    ">
      <h4 className="font-semibold text-primary-500">{theme}</h4>
      <p className="text-center w-[152px] text-secondary">{children}</p>
    </div>
  )
}
