import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../interfaces/User";

type UserState = User;

const initialState: UserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  createdAt: '',
  updatedAt: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload,
    clearUser: () => initialState,
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
