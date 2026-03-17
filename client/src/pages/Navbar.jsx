import { NavLink, useNavigate } from "react-router"
import {useAuthStore} from '../store/userStore.js'

import './Navbar.css'
function Navbar() {
  const navigate = useNavigate()
  const logOut = useAuthStore(state => state.logout)
  const user = useAuthStore(s => s.user)
  function logOut2(){
    logOut
    navigate("/login")
  }
  if(user.user_type === "airforce") return
  return (
    <nav>
        <NavLink to='/'><button>Home Page</button></NavLink>
        <NavLink to='/add'><button>Add Launcher Page </button></NavLink>     
        <NavLink to='/all-users'><button>all-users </button></NavLink>     
        <NavLink to='/regi'><button>create user </button></NavLink>     
         
        <button onClick={logOut2}>LogOut</button> 
    </nav>
  )
}

export default Navbar
