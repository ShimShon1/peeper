import Peep from './Peep';
import PeepForm from './PeepForm';


export default function Home(props){
    const updatePeepsList = props.updatePeepsList
    const peepsObjects = props.peepsObjects
   




    const peepElms = peepsObjects.map((peep)=>{
      return(
     
        <Peep updatePeepsList={updatePeepsList} peep={peep} user={props.user} />
  
      )
    })
  
    return(
        <>
            {props.user && <PeepForm user={props.user} updatePeepsList={updatePeepsList}/>}
            {peepElms}
        
        </>

    )
}