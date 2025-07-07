import Avatar from "./Avatar";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface Props {
  user: User;
  onAvatarClick: () => void;
}

export default function AccountSection({ onAvatarClick, user }: Props) {
  return (
    <div className="flex gap-3.5">
      <Avatar onClick={onAvatarClick} />
      <div className="flex flex-col justify-center gap-1 font-secondary text-sm">
        <span className="font-bold">{user.firstName} {user.lastName}</span>
        <span className="font-medium">{user.email}</span>
      </div>
    </div>
  );
}
