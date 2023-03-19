import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Nav from "./components/Nav"
import PeepForm from "./components/PeepForm"
import PeepPage from "./components/PeepPage"
import { auth, db, googleProvider } from "./config"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function App() {
  const [peepsObjects,setPeepsObjects] = useState([])
  const [user,setUser] = useState(false)



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



  async function login(){

   const response = await signInWithPopup(auth, googleProvider)

   console.log(response.user)
   setUser(response.user)


  }


  async function logout(){

    await signOut(auth)

    setUser(false)
    console.log(user)
    
   }
 
 

   console.log(user,"i am himn")

  return (
    <div className="App p-4  w-1/3 m-auto ">
      <Nav/>
      <button onClick={login}>LOGIN</button>
      <button onClick={logout}>LOGOUT</button>

      <Routes>
          <Route path="/" element={<Home peepsObjects={peepsObjects} updatePeepsList={updatePeepsList}/>} />
          <Route path="/profile" element={ <h1>Profile</h1>} />
          {peepRoutes}
      </Routes>

    </div>
  )
}

