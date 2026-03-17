import React, { useState } from 'react'

function LoginPage() {

    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState(false)
    function handleChange(e){
        const {name, value} = e.target
        setData({...data, [name]: value})
    }
    async function handleSubmit(e){
        e.preventDefault()
         try {
            setLoad(true)

            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(data)
            })

            const result = await response.json()
            if (!response.ok) {
                throw new Error(`${result.msg}`)
            }            

        } catch (err) {
            setErr(err.message)
        }finally {
           setLoad(false)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>username</label>
        <input type="text" value={data.username} name='username' onChange={handleChange}/>
      </div>
      <div>
        <label>password</label>
        <input type="text" value={data.password} name='password' onChange={handleChange}/>
      </div>
      <button type='submit'>Log In</button>
      {load && <p>Loading...</p>}
      {err && <p>{err}</p>}
    </form>
  )
}

export default LoginPage
