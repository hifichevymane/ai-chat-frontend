import Avatar from "./Avatar";
import AccountSettings from "./AccountSettings";

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/user/user-slice";

import { useAuth } from "../hooks";
import { api } from "../fetch";
import User from "../interfaces/User";

export default function AccountSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const { isPending, accessToken, setAccessToken } = useAuth();
  const { data: user } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data: user } = await api.get<User>('/auth/me');
      dispatch(setUser(user));
      return user;
    },
    enabled: !!accessToken,
    staleTime: Infinity,
  });

  const logout = async () => {
    await api.post('/auth/logout');
    setAccessToken(null);
    dispatch(clearUser());
    queryClient.removeQueries({ queryKey: ['auth', 'me'] });
    navigate({ to: '/login' });
  };

  const updateUser = async (data: Pick<User, 'firstName' | 'lastName'>) => {
    const { data: updatedUser } = await api.patch<User>(`/users/${user?.id}`, data);
    queryClient.setQueryData(['auth', 'me'], updatedUser);
  };

  if (isPending) {
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
