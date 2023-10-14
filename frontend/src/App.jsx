import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Chat from './pages/Chat'
import NotFound from './pages/NotFound'
import Login from './pages/Login';
import Signup from './pages/Signup';
import React, {
  createContext, useState
} from 'react';

export const UserContext = createContext({ user: null, setUser: () => { } });

function App() {

  const [user, setUser] = useState(null)

  const pages = [
    {
      url: '/',
      component: <Home />
    },
    {
      url: '/chat',
      component: <Chat />
    },
    {
      url: '/login',
      component: <Login />
    },
    {
      url: '/signup',
      component: <Signup />
    },
    {
      url: '*',
      component: <NotFound />
    }
  ]

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {pages.map((pageData, index) => (
          <Route key={index} path={pageData.url} element={pageData.component} />
        ))}
      </Routes>
    </UserContext.Provider>
  )
}

export default App
