import { useState } from 'react'

function RegisterPage() {
    const [data, setData] = useState({
        username: "",
        password: "",
        email: "",
        user_type:""
    })
    function handleChange(e) {
        const {name, value} = e.target
        setData({...data, [name]: value})
    }
    function handleSubmit(e){
        e.prevenDefault()

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>username</label>
                <input type="text" name='username' value={data.username} onChange={handleChange}/>
            </div>
            <div>
                <label>password</label>
                <input type="text" name='password' value={data.password} onChange={handleChange}/>
            </div>
            <div>
                <label>email</label>
                <input type="text" name='email' value={data.email} onChange={handleChange}/>
            </div>
            <div>
                <label>user_type</label>
                <input type="text" name='user_type' value={data.user_type} onChange={handleChange}/>
            </div>
            <button type='submit'>Create User</button>
  

        </form>
    )
}

export default RegisterPage
