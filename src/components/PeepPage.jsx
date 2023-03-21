import { addDoc,collection,doc,updateDoc } from "firebase/firestore";
import { useState } from "react"
import { db } from "../config";

export default function PeepPage({peep,updatePeepsList,user}){
    const[newComment,setNewComment] = useState('')



    const peepRef = doc(db,"peeps",peep.docId)

    async function addComment(){
        await updateDoc(peepRef,{
            comments:[
                ...peep.comments,
                {
                    content:newComment,
                    uid:user.uid,
                }
            ]
        }
       )


    updatePeepsList()
    }



    async function deleteComment(content){
        console.log(content,"content")
        await updateDoc(peepRef,{
            comments: peep.comments.filter((comment)=>content === comment.content && comment.uid === user.uid? false:true)
        }
       )


    updatePeepsList()
    }
    const commentElms = peep.comments.map((comment)=>{
        return(
            <div>
                <p> {comment.content} </p>
                <button onClick={() => deleteComment(comment.content)}
                className='border'>Delete</button>


            </div>
        ) 
    }
    )


    return(
        
        
            <div className='p-2 border-b-2 border-black space-y-3'>
            <p>{peep.content}</p>
            <hr></hr>
            
            {peep.imgLink && <img className="max-h-40 border-2 p-2" src={peep.imgLink} alt="" />}
            <span className="text-sm">{commentElms}</span>
            <div className='text-sm mt-4 space-y-2'>
            <hr></hr>
            <label className='inline-block ' >Comment: <input onChange={(e)=>setNewComment(e.target.value)} value={newComment}
            className='border' type="text" /></label>
            <button onClick={addComment}
            className='border'>Send</button>


           
            
            </div>
        </div>
        

    )
}