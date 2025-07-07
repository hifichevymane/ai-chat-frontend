import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chat/chat-slice';
import userReducer from './user/user-slice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
