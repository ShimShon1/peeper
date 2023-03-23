import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc} from "firebase/firestore"
import { createContext, useEffect, useState, } from "react"
import { Route, Routes,useLocation } from "react-router-dom"
import Home from "./components/Home"
import Nav from "./components/Nav"
import LoginPrompt from "./components/LoginPrompt"

import PeepPage from "./components/PeepPage"
import { auth, db, googleProvider } from "./config"
import {signInWithPopup,  onAuthStateChanged } from "firebase/auth";
import Title from "./components/Title"
import Profile from "./components/Profile"




export const AppContext = createContext(null)


export default function App() {
  const [peepsObjects,setPeepsObjects] = useState([])
  
  const [user,setUser] = useState(false)

  let currentPath = useLocation().pathname


  async function updatePeepsList(){
    
    const q = query(collection(db, "peeps"), orderBy("timestamp","desc"));
    
      try{
        let peepsRef = await getDocs(q);

      setPeepsObjects(peepsRef.docs.map((doc) => {
        
        return {
          ...doc.data(),
          docId:doc.id,

        }
      
      }))

    }catch(e){
      console.error(e)
    }
    

  }

  useEffect(()=>{
    updatePeepsList()
  },[])


  const peepRoutes = peepsObjects.map(peep=><Route key={peep.docId}  path={peep.docId} element={<PeepPage deletePeep={deletePeep} likePeep={likePeep} user={user} peep={peep} updatePeepsList={updatePeepsList} />} />)



  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user)

      } else {
        // User is signed out
        setUser(false)
      }
    });
  

  },[])

  async function login(){
    try{
      const response = await signInWithPopup(auth, googleProvider)
    }catch(e){
      console.error(e)
    }
  }


  async function deletePeep(peep){
    try{
      await deleteDoc(doc(db, "peeps", peep.docId));
    }catch(e){
      console.error(e)
    }
    updatePeepsList()

}

  async function likePeep(peep){
    try{
      const peepRef = doc(db,"peeps",peep.docId)
      await updateDoc(peepRef,{
          likedBy: !peep.likedBy.some((like)=>like === user.uid)?[...peep.likedBy, user.uid]: peep.likedBy.filter((like)=> user.uid !== like)
        })

    }catch(e){
      console.error(e)
    }

updatePeepsList()

}

return (
  <AppContext.Provider value={{user}}>

      <div className="w-full h-full md:grid grid-cols-5 
      
        lg:grid-cols-9
      ">
        
      <Title path={currentPath} />

      <header className="fixed w-full z-10 bottom-0
      
      
        md:relative md:h-full md:flex md:justify-end 

        lg:col-span-2 lg:px-8
      ">



      <Nav login={login} />



      </header>
      <LoginPrompt login={login} />

      <main className="App   m-auto relative mb-[68px] z-1 col-start-2 col-span-3 w-full border-l border-r
      
        lg:col-span-4 
      
      
      ">
        <Routes>
            <Route path="/" element={<Home likePeep={likePeep} deletePeep={deletePeep} peepsObjects={peepsObjects} updatePeepsList={updatePeepsList}/>} />
            <Route path="/profile" element={ <Profile   deletePeep={deletePeep}  likePeep={likePeep} updatePeepsList={updatePeepsList}/>} />
            {peepRoutes}
        </Routes>

      </main>
      </div>
  </AppContext.Provider>

  )
}

