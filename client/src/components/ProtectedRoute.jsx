import { Navigate, Outlet, useNavigate } from 'react-router'
import { useAuthStore } from '../store/userStore'

function ProtectedRoute({ permissions}) {

    const navigate = useNavigate() 

    const user = useAuthStore(state => state.user)

    if(!user) navigate('/login')

    if(!permissions.includes(user.user_type)) {
        navigate('/')
        //  <Navigate to='/'/>
    }

    return <Outlet/>
}

export default ProtectedRoute
