import { addDoc,collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react"
import { db,storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function PeepForm(props){
     const [content,setContent] = useState("")
     const [newImg,setNewImg] = useState(false)


     async function addPeep(e){
        e.preventDefault()

        let imgLink = false


        if(newImg){
            const storageRef = ref(storage, `images/${newImg.name + Math.floor( Math.random() * 100000)}`);
            await uploadBytes(storageRef, newImg)
            imgLink = await getDownloadURL(storageRef)

        }
        

        await addDoc(collection(db, "peeps"), {
          content:content,
          comments:[],
          imgLink: imgLink,
          likedBy:[],
          timestamp:serverTimestamp(),
          userPosted :{
              uid : props.user.uid,
              photoURL: props.user.photoURL,
              displayName: props.user.displayName,

          }
        });
    
        setContent("")
        props.updatePeepsList()
      }


      const user = props.user


    return(

        <form className="w-full flex gap-3  space-y-4" onSubmit={(e)=>addPeep(e)}>

        <div className="">
            <img className="rounded-[50%] h-14  " src={user.photoURL} alt="profile-pic" />
        </div>
        

            <div className="pt-3 flex-grow text-xl">
                <textarea  value={content} onChange={(e)=>setContent(e.target.value)}
                className='resize-none indent-2 relative  w-full '  placeholder="What's happening?"
                />


        <div className="flex items-center justify-between p-2">
            <input className="cursor-pointer w-1/2 text-xs block   text-gray-700 file:rounded-sm file:bg-emerald-600 file:text-white file:border-none file:shadow-none"
            type="file" onChange={(e)=>setNewImg(e.target.files[0])} file={newImg} content="gay"  />


            <button 
            className="p-1 px-3  bg-emerald-600 text-white rounded-[15px] hover:bg-emerald-800"
            >Peep</button>

        </div>
      
    
            </div>
     
      

       
        </form>


    )
}