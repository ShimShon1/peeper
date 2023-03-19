import { addDoc,collection } from "firebase/firestore";
import { useState } from "react"
import { db,storage } from "../config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


export default function PeepForm(props){
     const [content,setContent] = useState("")
     const [newImg,setNewImg] = useState(false)

     console.log(newImg.name)

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

        <form className="w-full" onSubmit={(e)=>addPeep(e)}>

        <div className="h-24  mt-10 relative">
            <textarea cl value={content} onChange={(e)=>setContent(e.target.value)}
            className='indent-2 relative border-2 h-full w-full rounded-md' placeholder="What's happening?"
            />


        <input className="absolute w-1/2 text-xs block  bottom-2 left-2 text-gray-700 file:rounded-sm file:bg-emerald-600 file:text-white file:border-none file:shadow-none"
        type="file" onChange={(e)=>setNewImg(e.target.files[0])} file={newImg} content="gay"  />
        


        <button 
        className="p-1 px-2 absolute bottom-2 right-2 bg-emerald-600 text-white rounded-lg "
        >Peep</button>
  
  
        </div>
     
      

       
        </form>


    )
}