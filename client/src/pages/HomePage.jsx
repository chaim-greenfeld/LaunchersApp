import { useEffect, useState } from "react"
import { useLaunchers } from "../store/launcerStore"
import { Link } from "react-router"

import './HomePage.css'
import { useAuthStore } from "../store/userStore"

function HomePage() {
  const user = useAuthStore(state => state.user)
  console.log("USER" + user)

  const launchers = useLaunchers(state => state.launchers)
  const getLaunchers = useLaunchers(state => state.getLaunchers)
  const isLoading = useLaunchers(state => state.isLoading)
  const error2 = useLaunchers(state => state.error)

  const searchType = useLaunchers(state => state.searchType)
  const searchCity = useLaunchers(state => state.searchCity)
  const setsearchCity = useLaunchers(state => state.setsearchCity)
  const setsearchType = useLaunchers(state => state.setsearchType)

  const filterData = launchers.filter((launcher) => (
    launcher.city.toLowerCase().includes(searchCity.toLowerCase()) &&
    launcher.rocketType.toLowerCase().includes(searchType.toLowerCase())
  ))

   async function  destroyded() {
      
        try {
          const res = await fetch('http://localhost:8000/api/launchers/destroyd', {
            credentials: 'include'
          })
          setDestroyd(false)

        }catch(err){}
      }


  useEffect(() => {
    getLaunchers()
  }, [])



  return (
    <>
      <div className="search">
        <label >city: </label>
        <input type="text" value={searchCity} onChange={(e) => setsearchCity(e.target.value)} placeholder="city" />

        <label>type: </label>
        <input type="text" value={searchType} onChange={(e) => setsearchType(e.target.value)} placeholder="type" />
      </div>
      {<p>COUNT LAUNCHERS: {filterData.length}</p>}

      {isLoading && <p>Loading...</p>}
      {error2 && <p>{error2}</p>}
     

      <section>
        {filterData.map((item) => {
          return (
            <article key={item._id}>

              <h3>Name:    {item.name}</h3>
              <h3>RocketType:    {item.rocketType}</h3>
              <h3>Latitude:    {item.latitude}</h3>
              <h3>Longitude:   {item.longitude}</h3>
              <h3>City:   {item.city}</h3>
              {user.user_type !== 'airforce' &&
              <Link to={`/launcher/${item._id}`}><button>Launcher Details Page  </button></Link>}
            </article>
          )
        })}

      </section>
    </>
  )
}

export default HomePage
