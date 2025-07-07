import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  isNewChatCreated: boolean;
}

const initialState: ChatState = {
  isNewChatCreated: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setIsNewChatCreated: (state, action: PayloadAction<boolean>) => {
      state.isNewChatCreated = action.payload;
    },
  }
});

export const { setIsNewChatCreated } = chatSlice.actions;

export default chatSlice.reducer;
