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

        <form onSubmit={(e)=>addPeep(e)}>

        <textarea value={content} onChange={(e)=>setContent(e.target.value)}
        className='border-2' placeholder='content here...'
        />

        <input type="file" onChange={(e)=>setNewImg(e.target.files[0])} file={newImg} />

        <button 
        className="p-1 px-2  bg-emerald-500 text-white rounded-lg"
        >Peep!</button>
  
  
        </form>


    )
}