import Avatar from "./Avatar";
import AccountSettings from "./AccountSettings";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";
import { setUser, UserState } from "../store/user/user-slice";
import { RootState } from "../store";

export default function AccountSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  const logout = async () => {
    await api('/auth/logout', {
      method: 'POST'
    });

    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(setUser({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    }));

    navigate({ to: '/login' });
  };

  const updateUser = async (data: Pick<UserState, 'firstName' | 'lastName'>) => {
    dispatch(setUser({ ...user, ...data }));

    await api(`/users/${user.id}`, {
      method: 'PATCH',
      body: data,
    });
  };

  return (
    <div className="flex gap-3.5">
      <Avatar onClick={() => setIsAccountSettingsOpen(true)} />
      <AccountSettings
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
        onEdit={updateUser}
        onLogout={logout}
      />
      <div className="flex flex-col justify-center gap-1 font-secondary text-sm">
        <span className="font-bold">{user.firstName} {user.lastName}</span>
        <span className="font-medium">{user.email}</span>
      </div>
    </div>
  );
}
