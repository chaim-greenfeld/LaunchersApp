
import './App.css'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import Navbar from './pages/Navbar'
import OneLauncher from './pages/OneLauncher'
import AddLauncher from './pages/AddLauncher'
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/launcher/:id' element={<OneLauncher/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/add' element={<AddLauncher/>}/>
    </Routes>
    </>
  )
}

export default App
