import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { GlobalContext } from './context'
import './index.css'

import HomePage from './pages/Home'
import ChatPage from './pages/Chat'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContext.Provider value={{ inputValue: '', newChatCreated: false }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path=':id' element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  </StrictMode>,
)
