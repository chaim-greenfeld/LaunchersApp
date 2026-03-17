import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import Navbar from './pages/Navbar'
import OneLauncher from './pages/OneLauncher'
import AddLauncher from './pages/AddLauncher'
import ProtectedRoute from './components/ProtectedRoute'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AllUsers from './pages/AllUsers'
import OneUser from './pages/OneUser'
import UpdateUser from './pages/UpdateUser'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route path='/' element={<ProtectedRoute permissions={["airforce", "admin", "intelligence"]} />}>
          <Route path='/' element={<HomePage />} />

        </Route>

        <Route path='/' element={<ProtectedRoute permissions={["admin", "intelligence"]} />}>
          <Route path='launcher/:id' element={<OneLauncher />} />
          <Route path='add' element={<AddLauncher />} />
        </Route>

        <Route path='/' element={<ProtectedRoute permissions={["admin"]} />}>
          <Route path='all-users' element={<AllUsers />} />

        </Route>

        
        <Route path='/' element={<ProtectedRoute permissions={["admin"]} />}>
          <Route path='regi' element={<RegisterPage />} />
          <Route path='update-user' element={<UpdateUser />} />
          <Route path='user/:id' element={<OneUser />} />

        </Route>



      </Routes>

    </>
  )
}

export default App
