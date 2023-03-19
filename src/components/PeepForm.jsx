import { addDoc,collection } from "firebase/firestore";
import { useState } from "react"
import { db,storage } from "../config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


export default function PeepForm(props){
     const [content,setContent] = useState("")
     const [newImg,setNewImg] = useState(false)


     async function addPeep(e){
        e.preventDefault()

        const storageRef = ref(storage, `images/${newImg.name + Math.floor( Math.random() * 100000)}`);


        await uploadBytes(storageRef, newImg)


        const imgLink = await getDownloadURL(storageRef)

        await addDoc(collection(db, "peeps"), {
          content:content,
          comments:[],
          imgLink: imgLink
        });
    
        setContent("")
        props.updatePeepsList()
      }




    return(

        <form className="w-full border  mb-20 space-y-4" onSubmit={(e)=>addPeep(e)}>

            <div className="">
                <textarea  value={content} onChange={(e)=>setContent(e.target.value)}
                className='indent-2 relative h-24  w-full rounded-md'  placeholder="What's happening?"
                />


        <hr></hr>
        <div className="flex items-center justify-between p-2">
            <input className=" w-1/2 text-xs block  text-gray-700 file:rounded-sm file:bg-emerald-600 file:text-white file:border-none file:shadow-none"
            type="file" onChange={(e)=>setNewImg(e.target.files[0])} file={newImg} content="gay"  />


            <button 
            className="p-1 px-2  bg-emerald-600 text-white rounded-lg "
            >Peep</button>

        </div>
      
    
    
            </div>
     
      

       
        </form>


    )
}