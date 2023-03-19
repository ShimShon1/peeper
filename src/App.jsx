import { addDoc,collection,getDocs  } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import Peep from './components/Peep';
import PeepForm from './components/PeepForm';
import { db } from './config';


function App() {
  const [peepsObjects,setPeepsObjects] = useState([])


  useEffect(()=>updatePeepsList,[])

  async function updatePeepsList(){
    let peepsRef = await getDocs(collection(db, "peeps"));
    setPeepsObjects( peepsRef.docs.map((doc) => {
      
      return {
        ...doc.data(),
        docId:doc.id,

      }
    
    }))
  }

  
  const peepElms = peepsObjects.map((peep)=>{
    return(
   
      <Peep updatePeepsList={updatePeepsList} peep={peep} />

    )
  })



  return (
    <div className="App p-4 ">
      <h1>Peeper</h1>

 
    

    <PeepForm updatePeepsList={updatePeepsList}/>

      {peepElms}
    </div>
  )
}

export default App
