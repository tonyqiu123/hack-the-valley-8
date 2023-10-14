import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Chat from './pages/Chat'
import NotFound from './pages/NotFound'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

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
    <Routes>
      {pages.map((pageData, index) => (
        <Route key={index} path={pageData.url} element={pageData.component} />
      ))}
    </Routes>
  )
}

export default App
