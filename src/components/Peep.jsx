import { doc,deleteDoc, updateDoc, } from "firebase/firestore";
import { Link } from "react-router-dom";
import {  db } from "../config";



import likeIcon from "../../src/images/like.svg"
import commentIcon from "../../src/images/comment.svg"
import trashIcon from "../../src/images/trash.svg"





export default function Peep({peep,user,updatePeepsList,likePeep}){




    async function deletePeep(){
        await deleteDoc(doc(db, "peeps", peep.docId));
        updatePeepsList()

    }

  

    return(
        <>
        <Link to={peep.docId}>
            <div className="flex  gap-3 pt-4 border-t">
                <img className="rounded-[50%] h-14 " src={peep.userPosted.photoURL} alt="user profile picure" />
                <h3 className="font-semibold">{peep.userPosted.displayName}</h3>


            </div>

            <div className="ml-[68px]   space-y-3 relative bottom-6">
                <p>{peep.content}</p>

                <div>


                    {peep.imgLink && <img className=" max-h-80 md:max-h-96 rounded-xl shadow-sm p-2" src={peep.imgLink} alt="" />}

                </div>

            </div>

           
        </Link>
        <div className="flex ml-[68px] pt-2 pb-4 w-2/3 justify-between">

                    
        <Link to={peep.docId}> <div className="flex items-center gap-2 text-xs cursor-pointer "><img className="h-4" src={commentIcon} alt="" /> {peep.comments.length}</div></Link>
            <div className="flex items-center gap-2 text-xs cursor-pointer"><img className="h-4" onClick={()=>likePeep(peep)} src={likeIcon} alt="" /> {peep.likedBy.length}</div>
            <div> {peep.userPosted.uid === user.uid ? <img className="h-4 cursor-pointer"  onClick={deletePeep} src={trashIcon} alt="" /> : <div></div>}</div>


        </div>


    </>

    )

}