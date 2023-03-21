import { collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc} from "firebase/firestore"
import { useEffect, useState, } from "react"
import { Route, Routes,useLocation } from "react-router-dom"
import Home from "./components/Home"
import Nav from "./components/Nav"
import LoginPrompt from "./components/LoginPrompt"

import PeepPage from "./components/PeepPage"
import { auth, db, googleProvider } from "./config"
import {signInWithPopup,  onAuthStateChanged } from "firebase/auth";
import Title from "./components/Title"

export default function App() {
  const [peepsObjects,setPeepsObjects] = useState([])
  const [user,setUser] = useState(false)

  let currentPath = useLocation().pathname

  console.log(currentPath)

  async function updatePeepsList(){
    
    const q = query(collection(db, "peeps"), orderBy("timestamp","desc"));

    console.log(q)
    let peepsRef = await getDocs(q);
    

    setPeepsObjects(peepsRef.docs.map((doc) => {
      
      return {
        ...doc.data(),
        docId:doc.id,

      }
    
    }))
  }

  useEffect(()=>{
    updatePeepsList()
  },[])


  const peepRoutes = peepsObjects.map(peep=><Route key={peep.docId}  path={peep.docId} element={<PeepPage deletePeep={deletePeep} likePeep={likePeep} user={user} peep={peep} updatePeepsList={updatePeepsList} />} />)



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


  async function deletePeep(peep){
    await deleteDoc(doc(db, "peeps", peep.docId));
    updatePeepsList()

}

  async function likePeep(peep){
    console.log(peep,"pepppp")
    const peepRef = doc(db,"peeps",peep.docId)

    await updateDoc(peepRef,{
        likedBy: !peep.likedBy.some((like)=>like === user.uid)?[...peep.likedBy, user.uid]: peep.likedBy.filter((like)=> user.uid !== like)
    }
   )

updatePeepsList()

}




 
  return (

    <div className="w-full h-full md:grid grid-cols-5 
    
      lg:grid-cols-9
    ">
      
    <Title path={currentPath} />

    <header className="fixed w-full z-10 bottom-0
    
    
      md:relative md:h-full md:flex md:justify-end 

      lg:col-span-2 lg:px-8
    ">

       <Nav login={login} user={user}/>


    </header>
    <LoginPrompt login={login} user={user}/>

    <main className="App   m-auto relative mb-[68px] z-1 col-start-2 col-span-3 w-full border-l border-r
    
      lg:col-span-4 
    
    
    ">
      <Routes>
          <Route path="/" element={<Home user={user} likePeep={likePeep} deletePeep={deletePeep} peepsObjects={peepsObjects} updatePeepsList={updatePeepsList}/>} />
          <Route path="/profile" element={ <h1>Profile</h1>} />
          {peepRoutes}
      </Routes>

    </main>
    </div>
  )
}

