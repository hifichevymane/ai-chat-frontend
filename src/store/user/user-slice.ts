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
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },

    clearUser: (state) => {
      state.id = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.createdAt = '';
      state.updatedAt = '';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
