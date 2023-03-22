
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config";
import Peep from "./Peep";
import ProfileHeader from "./ProfileHeader"


export default function Profile({user,deletePeep,likePeep,updatePeepsList}){
    const [userPeeps,setUserPeeps] = useState([])




    async function getUserPeeps(){
        try{
            
            const q = query(collection(db, "peeps"), where("userPosted.uid", "==", user.uid));
            let peepsRef = await getDocs(q);
            setUserPeeps(peepsRef.docs.map((doc) => {
               
               return {
                 ...doc.data(),
                 docId:doc.id,
         
               }

             }))

        }catch(e){
            console.error(e)
        }
        console.log("run")
    
      }



      useEffect(()=>{
        getUserPeeps()
      },[])




      const peepElms = userPeeps.map((peep)=>{
        return(
       
          <Peep deletePeep={deletePeep}  likePeep={likePeep} updatePeepsList={updatePeepsList} peep={peep} user={user} />
    
        )
      })

    return (
        <div className="flex flex-col">
        
            <ProfileHeader user={user}/>
            

                {peepElms}

        
        </div>





)}