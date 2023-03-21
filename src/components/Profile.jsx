
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import coverImg from "../../src/images/cover.avif"
import { db } from "../config";
import Peep from "./Peep";
import ProfileHeader from "./ProfileHeader"


export default function Profile({user,deletePeep,likePeep,updatePeepsList}){
    const [userPeeps,setUserPeeps] = useState([])

    console.log(user)



    async function getUserPeeps(){
        console.log("run")
        const q = query(collection(db, "peeps"), where("userPosted.uid", "==", user.uid));
    
        let peepsRef = await getDocs(q);
        
    
       setUserPeeps(peepsRef.docs.map((doc) => {
          
          return {
            ...doc.data(),
            docId:doc.id,
    
          }
        
        }))
      }



      useEffect(()=>{
        getUserPeeps()
      },[])

      console.log(userPeeps)



      const peepElms = userPeeps.map((peep)=>{
        console.log(peep)
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