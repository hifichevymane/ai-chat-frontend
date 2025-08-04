import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  isNewChatCreated: boolean;
  selectedPromptCard: string;
}

const initialState: ChatState = {
  isNewChatCreated: false,
  selectedPromptCard: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setIsNewChatCreated: (state, action: PayloadAction<boolean>) => {
      state.isNewChatCreated = action.payload;
    },
    setSelectedPromptCard: (state, action: PayloadAction<string>) => {
      state.selectedPromptCard = action.payload;
    },
  }
});

export const { setIsNewChatCreated, setSelectedPromptCard } = chatSlice.actions;

export default chatSlice.reducer;
