import { useContext } from 'react';
import { AppContext } from '../App';
import Peep from './Peep';
import PeepForm from './PeepForm';


export default function Home({updatePeepsList,peepsObjects,likePeep,deletePeep}){
   const {user} = useContext(AppContext)

    const peepElms = peepsObjects.map((peep)=>{
      return(
     
        <Peep deletePeep={deletePeep}  likePeep={likePeep} updatePeepsList={updatePeepsList} peep={peep}/>
  
      )
    })
  
    
    return(
        <>
            {user && <PeepForm  updatePeepsList={updatePeepsList}/>}
            {peepElms}
        
        </>

    )
}