import { useState } from "react"

function UpdateUser() {


    const [info, setData] = useState({
        username: "",
        password: "",
        email: "",
        user_type: ""
    })
    function handleChange(e) {
        const { name, value } = e.target
        setData({ ...info, [name]: value })
    }
    async function hanSub(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8000/api/auth/register/update', {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info)
            })
            const data = await res.json()
            console.log(data)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    return (
        <form onSubmit={hanSub}>
            <label htmlFor="">username</label>
            <input type="text" value={info.username} name="username" onChange={handleChange} />
            <label htmlFor="" >password</label>
            <input type="text" value={info.password} name="password" onChange={handleChange} />
            <label htmlFor="">email</label>
            <input type="text" value={info.email} name="email" onChange={handleChange} />
            <label htmlFor="">user_type</label>
            <input type="text" value={info.user_type} name="user_type" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UpdateUser
