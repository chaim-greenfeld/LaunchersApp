import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import './OneLauncher.css'

function OneLauncher() {
    const { id } = useParams()

    const [data, setData] = useState("")
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState("")
    const [suc, setSuc] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        async function asas() {
            try {
                setLoad(true)
                const response = await fetch(`http://localhost:8000/api/launchers/${id}`, {
                    credentials: "include"
                })
                const result = await response.json()
                setData(result.launcher)
                if (!response.ok) {
                    throw new Error(result.msg)
                }
            } catch (err) {
                console.log(err.message)
                setErr(err.message)
            } finally {
                setLoad(false)
            }
        }
        asas()
    }, [])

    const launcher = data

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoad(true)

            const response = await fetch(`http://localhost:8000/api/launchers/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = response.json()

            if (!response.ok) {
                throw new Error(data.msg)
            }
            setSuc("deleted successfuly")
        } catch (err) {
            setErr(err.message)
            console.log(err)
        } finally {
            setLoad(false)
        }

        navigate('/')

    }
    return (
        <>

            <div className="onCard">
                <div>
                    <h3>ID: </h3><p>{launcher._id}</p>
                </div>
                <div>
                    <h3>Name: </h3><p>{launcher.name}</p>
                </div>
                <div>
                    <h3>RocketType: </h3><p>{launcher.rocketType}</p>
                </div>
                <div>
                    <h3>Latitude: </h3><p>{launcher.latitude}</p>
                </div>
                <div>
                    <h3>Longitude: </h3><p>{launcher.longitude}</p>
                </div>
                <div>
                <h3>City: </h3><p>{launcher.city}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <button type="submit">DELETE</button>
                </form>
                {suc && <p>{suc}</p>}
                {err && <p>{err}</p>}
                {load && <p>Loading...</p>}
            </div>
        </>
    )
}

export default OneLauncher
