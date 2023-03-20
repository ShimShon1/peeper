import { doc,deleteDoc, } from "firebase/firestore";
import { useState } from "react"
import { Link } from "react-router-dom";
import {  db } from "../config";

export default function Peep({peep,user,updatePeepsList}){

    const peepRef = doc(db,"peeps",peep.docId)



    async function deletePeep(){
        await deleteDoc(doc(db, "peeps", peep.docId));
        updatePeepsList()

    }



    return(
        <>
        <Link to={peep.docId}>

            <h1>{peep.userPosted.displayName}</h1>
        
            <div className='p-2 border-b-2 border-black space-y-3'>
                <p>{peep.content}</p>
                <hr></hr>
                {peep.imgLink && <img className="max-h-40 border-2 p-2" src={peep.imgLink} alt="" />}
                <div className='text-sm mt-4 space-y-2'>
                <hr></hr>
               
            

            </div>
        </div>
        
        </Link>
         <button onClick={deletePeep}>Delete</button>

    </>

    )

}