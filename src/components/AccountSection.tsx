import Avatar from "./Avatar"
import { AUTH_TOKEN_KEY } from "../const"
import { useNavigate } from "@tanstack/react-router"

export default function AccountSection() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate({ to: "/login" });
  };

  return (
    <div className="flex gap-3.5">
      <Avatar onClick={handleLogout} />
      <div className="flex flex-col justify-center gap-1 font-secondary text-sm">
        <span className="font-bold">John Doe</span>
        <span className="font-medium">email@email.com</span>
      </div>
    </div>
  )
}
