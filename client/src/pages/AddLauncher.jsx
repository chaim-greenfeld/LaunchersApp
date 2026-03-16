import { useState } from "react"
import './AddLauncher.css'
function AddLauncher() {
    const [city, setCity] = useState("")
    const [rocketType, setrocketType] = useState("")
    const [latitude, setlatitude] = useState()
    const [longitude, setlongitude] = useState()
    const [name, setname] = useState("")

    const [load, setLoad] = useState(false)
    const [err, setErr] = useState("")
    const [suc, setSuc] = useState("")

    async function handleSubmit(e) {

        e.preventDefault()
        try {
            setErr("")
            setSuc("")
            setLoad(true)

            const response = await fetch(`http://localhost:8000/api/launchers/`, {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ city, rocketType, latitude, longitude, name })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.msg)
            }
            setSuc("created succssfuly")
        } catch (err) {
            setErr(err.message)
        } finally {
            setLoad(false)
        }
    }


    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label>city</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div>
                <label>rocketType</label>
                <select value={rocketType} onChange={e => setrocketType(e.target.value)}>
                    <option value="">Choice Type</option>
                    <option value="Shahab3">Shahab3</option>
                    <option value="Fetah110">Fetah110</option>
                    <option value="Radwan">Radwan</option>
                    <option value="Kheibar">Kheibar</option>
                </select>
            </div>

            <div>
                <label>latitude</label>
                <input type="number" value={latitude} onChange={e => setlatitude(e.target.value)} />
            </div>
            <div>
                <label>longitude</label>
                <input type="number" value={longitude} onChange={e => setlongitude(e.target.value)} />
            </div>
            <div>
                <label>name</label>
                <input type="text" value={name} onChange={e => setname(e.target.value)} />
            </div>

            <button type="submit">{load ? "Loading.." : "Create"}</button>
            {load && <p>Loading...</p>}
            {err && <p>{err}</p>}
            {suc && <p>{suc}</p>}

        </form>
    )
}

export default AddLauncher
