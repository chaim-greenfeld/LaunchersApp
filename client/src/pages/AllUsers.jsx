import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

function AllUsers() {

  const [load, setLoad] = useState(false)
  const [daya, setDaya] = useState([])
  const navigate = useNavigate()
  

  

  useEffect(() => {

    async function asasa() {

      try {
        const response = await fetch('http://localhost:8000/api/auth/getall', {
          credentials: "include"
        })
        const result = await response.json()
        const data = result.users
        console.log("data:" +" " + data)
        if (!response.ok) {
          throw new Error(`${result.msg}`)
        }

        setDaya(data)

      } catch (err) {
        throw new Error(err.message)
      }
    }
    asasa()
  }, [])



  return (
    <section>
      {daya.map((item) => {
        return (
          <article key={item._id}>
            <h3>Name:    {item.username}</h3>
            <h3>email:    {item.email}</h3>
            <h3>Latitude:    {item.latitude}</h3>
            <h3>user_type:   {item.user_type}</h3>
            <h3>last_login:   {item.last_login}</h3>
         <button onClick={() => navigate('/user/'+ item._id)}>Launcher Details Page</button>
          </article>
        )
      })}

      {load && <p>Loading...</p>}
    </section>
  )
}

export default AllUsers
