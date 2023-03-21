import { doc,deleteDoc, updateDoc, } from "firebase/firestore";
import { Link } from "react-router-dom";
import {  db } from "../config";

import likeIcon from "../../src/images/like.svg"
import likeIconGreen from "../../src/images/likeGreen.svg"

import commentIcon from "../../src/images/comment.svg"
import trashIcon from "../../src/images/trash.svg"
import PeepContent from "./PeepContent";





export default function Peep({peep,user,updatePeepsList,likePeep,deleteComment,deletePeep}){

    console.log(likePeep)


 

    let liked = peep.likedBy.includes(user.uid)
    console.log(liked)

    return(
        <div className="border-b  pb-2 lg:pb-2 ">
        <Link to={peep.docId}>
            <PeepContent peep={peep}/>
        </Link>
        <div className="flex ml-[72px] p-4 lg:px-8 pt-2 pb-4 w-2/3 lg:w-1/3  justify-between items-center">

                    
        <Link to={peep.docId}> 
            <div className="flex items-center gap-2 text-xs cursor-pointer "><img className="" src={commentIcon} alt="" /> {peep.comments.length}</div></Link>

            <div className="flex items-center gap-2 text-xs cursor-pointer"><img className="" onClick={()=>likePeep(peep)} src={liked? likeIconGreen:likeIcon} alt="" /> {peep.likedBy.length}</div>

            <div> {peep.userPosted.uid === user.uid ? <img className=" cursor-pointer h-5"  onClick={()=>deletePeep(peep)} src={trashIcon} alt="" /> : <div></div>}</div>

        </div>

       

    </div>

    )

}