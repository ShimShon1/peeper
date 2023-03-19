import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Nav from "./components/Nav"
import PeepForm from "./components/PeepForm"
import PeepPage from "./components/PeepPage"
import { db } from "./config"

export default function App() {
  const [peepsObjects,setPeepsObjects] = useState([])


  async function updatePeepsList(){
    let peepsRef = await getDocs(collection(db, "peeps"));
    setPeepsObjects( peepsRef.docs.map((doc) => {
      
      return {
        ...doc.data(),
        docId:doc.id,

      }
    
    }))
  }

  useEffect(()=>updatePeepsList,[])


  const peepRoutes = peepsObjects.map(peep=><Route key={peep.docId}  path={peep.docId} element={<PeepPage peep={peep} updatePeepsList={updatePeepsList} />} />)

  console.log(peepRoutes)

  return (
    <div className="App p-4  w-1/3 m-auto ">
      <Nav/>
      <Routes>
          <Route path="/" element={<Home peepsObjects={peepsObjects} updatePeepsList={updatePeepsList}/>} />
          <Route path="/profile" element={ <h1>Profile</h1>} />
          {peepRoutes}
      </Routes>

    </div>
  )
}

