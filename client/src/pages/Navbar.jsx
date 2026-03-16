import { NavLink } from "react-router"
import './Navbar.css'

function Navbar() {
  return (
    <nav>
        <NavLink to='/'><button>Home Page</button></NavLink>
        <NavLink to='/add'><button>Add Launcher Page </button></NavLink>      
    </nav>
  )
}

export default Navbar
