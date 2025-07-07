import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
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
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
