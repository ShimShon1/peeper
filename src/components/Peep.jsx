import { addDoc,collection,doc,updateDoc } from "firebase/firestore";
import { useState } from "react"
import { Link } from "react-router-dom";
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

    const commentElms = peep.comments.map((comment)=>{
        return <p> {comment.content} </p>
    }
    )

    return(
        <Link to={peep.docId}>
        
        
            <div className='p-2 border-b-2 border-black space-y-3'>
                <p>{peep.content}</p>
                <hr></hr>
                {peep.imgLink && <img className="max-h-40 border-2 p-2" src={peep.imgLink} alt="" />}
                <div className='text-sm mt-4 space-y-2'>
                <hr></hr>
            

            </div>
        </div>
        
        </Link>

    )
}