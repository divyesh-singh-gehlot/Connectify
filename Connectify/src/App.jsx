import React from 'react'
import PrivateRoute from './Components/PrivateRoute.jsx'
import Room from './pages/Room.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import { AuthProvider } from './utilities/AuthContext.jsx'
import Register from './pages/Register.jsx'


const App = () => {
  return (
    <main>
      <Router>
      <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoute />}>
        <Route path='/' element={<Room />} />
        </Route>
      </Routes>
      </AuthProvider>
      </Router>
    </main>
  )
}

export default App
