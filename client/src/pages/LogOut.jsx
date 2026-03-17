import useAuthStore from '../store/userStore'

function LogOut() {
    const logOut = useAuthStore(state => state.logout)

  return (
    <div>
      <button onClick={logOut}></button>
    </div>
  )
}

export default LogOut
