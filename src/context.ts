import { createContext } from "react";

export const GlobalContext = createContext({
  inputValue: '',
  newChatCreated: false
});
