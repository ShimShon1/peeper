import Peep from './Peep';
import PeepForm from './PeepForm';


export default function Home({updatePeepsList,peepsObjects,likePeep,user,}){
 



    const peepElms = peepsObjects.map((peep)=>{
      console.log(peep)
      return(
     
        <Peep likePeep={likePeep} updatePeepsList={updatePeepsList} peep={peep} user={user} />
  
      )
    })
  
    return(
        <>
            {user && <PeepForm user={user} updatePeepsList={updatePeepsList}/>}
            {peepElms}
        
        </>

    )
}