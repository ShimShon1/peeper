import Peep from './Peep';
import PeepForm from './PeepForm';


export default function Home({updatePeepsList,peepsObjects,likePeep,user,deletePeep}){
 



    const peepElms = peepsObjects.map((peep)=>{
      console.log(peep)
      return(
     
        <Peep deletePeep={deletePeep}  likePeep={likePeep} updatePeepsList={updatePeepsList} peep={peep} user={user} />
  
      )
    })
  
    return(
        <>
            {user && <PeepForm user={user} updatePeepsList={updatePeepsList}/>}
            {peepElms}
        
        </>

    )
}