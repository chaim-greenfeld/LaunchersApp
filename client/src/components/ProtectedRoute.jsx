import { useNavigate } from 'react-router'

function ProtectedRoute({user, permissions, children}) {

    const navigate = useNavigate() 

    if(!user) navigate('/login')

    if(!permissions.includes(user.user_type)) {
        navigate('/')
    }
    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoute
