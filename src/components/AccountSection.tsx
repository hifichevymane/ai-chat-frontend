import Avatar from "./Avatar";
import AccountSettings from "./AccountSettings";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";
import { setUser, clearUser } from "../store/user/user-slice";
import User from "../interfaces/User";

export default function AccountSection() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data: currentUser } = await api.get<User>('/auth/me');
      dispatch(setUser(currentUser));
      return currentUser;
    },
    staleTime: Infinity,
  });
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  const logout = async () => {
    await api.post('/auth/logout');

    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(clearUser());
    queryClient.removeQueries({ queryKey: ['auth', 'me'] });

    navigate({ to: '/login' });
  };

  const updateUser = async (data: Pick<User, 'firstName' | 'lastName'>) => {
    const { data: updatedUser } = await api.patch<User>(`/users/${user?.id}`, data);
    queryClient.setQueryData(['auth', 'me'], updatedUser);
  };

  if (isLoading || isError) {
    return (
      <div className="flex gap-3.5">
        <span>Loading...</span>
      </div>
    );
  }

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
        <span className="font-bold">{user?.firstName} {user?.lastName}</span>
        <span className="font-medium">{user?.email}</span>
      </div>
    </div>
  );
}
