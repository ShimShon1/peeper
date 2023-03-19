import { addDoc,collection,doc,updateDoc } from "firebase/firestore";
import { useState } from "react"
import { db } from "../config";

export default function Peep(props){
    const[newComment,setNewComment] = useState('')


    let peep = props.peep

    const peepRef = doc(db,"peeps",peep.docId)

    async function addComment(){
        await updateDoc(peepRef,{
            comments:[
                ...peep.comments,
                {
                    content:newComment,
                }
            ]
        }
       )


    props.updatePeepsList()
    }

    console.log(peep.comments)
    const commentElms = peep.comments.map((comment)=>{
        return <p> {comment.content} </p>
    }
    )

    return(
        <div className='p-2 border-b-2 border-black space-y-3'>
        <p>{peep.content}</p>
        <hr></hr>
        <img src={peep.imgLink} alt="" />
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