import Avatar from "./Avatar"

export default function AccountSection() {
  return (
    <div className="flex gap-3.5">
      <Avatar />
      <div className="flex flex-col justify-center gap-1 font-secondary text-sm">
        <span className="font-bold">John Doe</span>
        <span className="font-medium">email@email.com</span>
      </div>
    </div>
  )
}
