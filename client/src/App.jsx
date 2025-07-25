import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Profile from './Pages/Profile'
import Login from './Pages/Login'


const App = () => {

  const {authUser} = useContext(AuthContext)

  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to="/login"/>} />
        <Route path='/login' element={ !authUser ? <Login/>: <Navigate to="/"/>} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
