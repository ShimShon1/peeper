import { collection, getDocs} from "firebase/firestore"
import { useEffect, useState, } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Nav from "./components/Nav"
import PeepPage from "./components/PeepPage"
import { auth, db, googleProvider } from "./config"
import {signInWithPopup,  onAuthStateChanged } from "firebase/auth";

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


  const peepRoutes = peepsObjects.map(peep=><Route key={peep.docId}  path={peep.docId} element={<PeepPage user={user} peep={peep} updatePeepsList={updatePeepsList} />} />)



  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        console.log("hey")

        // ...
      } else {
        // User is signed out
        // ...
        setUser(false)
        console.log("bye")
      }
    });
  

  },[])

  async function login(){
   const response = await signInWithPopup(auth, googleProvider)
   console.log(response.user)


  }


 
  return (
    <div className="App p-4   m-auto relative ">
      <Nav login={login} user={user}/>
      <button onClick={login}>LOGIN</button>

      <Routes>
          <Route path="/" element={<Home user={user} peepsObjects={peepsObjects} updatePeepsList={updatePeepsList}/>} />
          <Route path="/profile" element={ <h1>Profile</h1>} />
          {peepRoutes}
      </Routes>

    </div>
  )
}

