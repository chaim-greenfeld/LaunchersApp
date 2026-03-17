import { useState } from 'react'

function RegisterPage() {
    const [data, setData] = useState({
        username: "",
        password: "",
        email: "",
        user_type:""
    })
    console.log(data)
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState("")

    function handleChange(e) {
        const {name, value} = e.target
        setData({...data, [name]: value})
    }
    async function handleSubmit(e){
        e.prevenDefault()

        try {
            setLoad(true)

            const response = await fetch('http://localhost:8000/api/auth/register/create', {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            if (!response.ok) {
                throw new Error(`${result.msg}`)
            }            

        } catch (err) {
            throw new Error(err.message)
            setErr(err.message)
        }finally {
           setLoad(false)
        }

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
  
        {load && <p>Loading...</p>}
        {err && <p>{err}</p>}
        </form>
    )
}

export default RegisterPage
