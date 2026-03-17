import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {useAuthStore} from '../store/userStore'

function OneUser() {
    const {id} = useParams()
    const user = useAuthStore(state => state.user)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {

            const response = await fetch(`http://localhost:8000/api/auth/register/delete/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            const data = response.json()

            if (!response.ok) {
                throw new Error(data.msg)
            }
        } catch (err) {

            console.log(err)
        } 

        navigate('/all-users')

    }
    function upda(){
        navigate('/update-user')
    }

  return (
    <>
            <div className="onCard">
                <div>
                    <h3>ID: </h3><p>{user._id}</p>
                </div>
                <div>
                    <h3>Name: </h3><p>{user.username}</p>
                </div>
                <div>
                    <h3>email: </h3><p>{user.email}</p>
                </div>
                <div>
                    <h3>user_type: </h3><p>{user.user_type}</p>
                </div>
                <div>
                    <h3>last_login: </h3><p>{user.last_login}</p>
                </div>
                <button onClick={handleSubmit}>Delete</button>
                <button onClick={upda}>Update</button>
            </div>
        </>
  )
}

export default OneUser
