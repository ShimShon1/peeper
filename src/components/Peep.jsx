import { doc,deleteDoc, } from "firebase/firestore";
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
            <div className="flex items-center gap-2 pt-4 border-t">
                <img className="rounded-[50%] h-14" src={peep.userPosted.photoURL} alt="user profile picure" />
                <h3 className="font-semibold">{peep.userPosted.displayName}</h3>


            </div>

            <div className="ml-16  pb-4 space-y-3">
                <p>{peep.content}</p>

                <div>


                    {peep.imgLink && <img className=" max-h-80 md:max-h-96 rounded-xl shadow-sm p-2" src={peep.imgLink} alt="" />}

                </div>




            </div>
        
        
        </Link>
         {/* <button onClick={deletePeep}>Delete</button> */}

    </>

    )

}