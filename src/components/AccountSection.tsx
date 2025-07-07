import Avatar from "./Avatar";

interface Props {
  onAvatarClick: () => void;
}

export default function AccountSection({ onAvatarClick }: Props) {
  return (
    <div className="flex gap-3.5">
      <Avatar onClick={onAvatarClick} />
      <div className="flex flex-col justify-center gap-1 font-secondary text-sm">
        <span className="font-bold">John Doe</span>
        <span className="font-medium">email@email.com</span>
      </div>
    </div>
  );
}
