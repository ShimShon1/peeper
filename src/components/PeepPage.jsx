import { doc,updateDoc } from "firebase/firestore";
import { useContext, useState } from "react"
import { db } from "../config";
import PeepContent from "./PeepContent";
import SubmitBtn from "./SubmitBtn";
import trashIcon from "../../src/images/trash.svg"
import likeIcon from "../../src/images/like.svg"
import commentIcon from "../../src/images/comment.svg"
import likeIconGreen from "../../src/images/likeGreen.svg"
import defaultPfp from "../../src/images/defaultPfp.webp"
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import PeepComment from "./PeepComment";


export default function PeepPage({peep,updatePeepsList,likePeep,deletePeep}){
    const[newComment,setNewComment] = useState('')
    const {user} = useContext(AppContext)
    
    const peepRef = doc(db,"peeps",peep.docId)

    async function addComment(e){
        e.preventDefault()

        if(newComment.length < 1){
            return 
        }
        await updateDoc(peepRef,{
            comments:[
                ...peep.comments,
                {
                    content:newComment,
                    userPosted :{
                        uid : user.uid,
                        photoURL: user.photoURL,
                        displayName: user.displayName,
          
                    }
                }
            ]
        }
       )

    updatePeepsList()
    setNewComment('')

    }



    async function deleteComment(content){
        await updateDoc(peepRef,{
            comments: peep.comments.filter((comment)=>content === comment.content && comment.userPosted.uid === user.uid? false:true)
        }
       )

    updatePeepsList()
    }



    const commentElms = peep.comments.map((comment)=>{
        return(
            <PeepComment comment={comment}  deleteComment={() => deleteComment(comment.content)} trashIcon={trashIcon}/>
        ) 
    }
    )

    let liked = peep.likedBy.includes(user.uid)
    console.log(user.photoURL)

    return(
        
        <>
        
            <PeepContent peep={peep}/>

            <div className="ml-[72px] text-sm space-x-4 px-4 lg:px-8 pb-2">
                <span> <span className="font-semibold">{peep.comments.length}</span> {peep.comments.length > 1? 'Comments':"Comment"}</span> 
                <span> <span className="font-semibold">{peep.likedBy.length}</span> {peep.likedBy.length > 1? 'Likes':"Like"}</span> 

            </div>

            <hr />
            <div className="flex ml-[72px] p-4  justify-around w-3/4 ">
                     <img src={commentIcon} alt="" />
                     <img src={liked? likeIconGreen:likeIcon} onClick={()=>likePeep(peep)} alt="" />
                     {peep.userPosted.uid === user.uid ? 
                       <Link to={"/"}> <img src={trashIcon} onClick={()=>deletePeep(peep)} alt="" /></Link>
                     : <div className="w-[12px]  "></div>}
            </div>

            <form className="w-full flex p-4 lg:p-8 border-t pb-2 lg:pb-2" onSubmit={(e)=>addComment(e)}>
            <hr />
                <div className="">
                    <img className="rounded-[50%] h-14  " src={user.photoURL || defaultPfp } alt="profile-pic" />
                </div>
                    <div className="pt-3 flex-grow text-xl">
                        <textarea  onChange={(e)=>setNewComment(e.target.value)} value={newComment}
                        className='resize-none indent-2 relative  w-full  focus:outline-none'  placeholder= {user? "Peep your reply": "Log in to reply!"}
                        />
                <div className="flex items-center justify-end ">
                    <div>
                        {user && <SubmitBtn content={"Reply"}/>}

                    </div>
                </div>
                    </div>
                </form>
            <hr />
            {commentElms}
        </>
        
        
       
        
        
        )
}