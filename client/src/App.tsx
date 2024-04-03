
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import Login from './pages/Login'
import { PostPage } from './pages/PostPage'
import { Profile } from './pages/Profile'
import { ProtecRoute } from './components/ProtecRoute/protecRoute'

function App() {
  

  return (

      <Routes>
      <Route path='/'element={<Login/>}/>
        <Route path='/home'element={
          <ProtecRoute >
          <Home/>  
        </ProtecRoute>
        }/>
        <Route path='/post/:id'element={
          <ProtecRoute >
          <PostPage/>
        </ProtecRoute>
        }/>
        <Route path='/user/:username'element={
        <ProtecRoute >
          <Profile/>
        </ProtecRoute>
        }/>
      <Route path='*'element={<NotFound/>}/>
      </Routes>

  )
}

export default App
