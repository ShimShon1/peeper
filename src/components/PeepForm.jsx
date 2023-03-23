import { addDoc,collection, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react"
import { db,storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SubmitBtn from "./SubmitBtn";
import { AppContext } from "../App";


export default function PeepForm(props){
     const [content,setContent] = useState("")
     const [newImg,setNewImg] = useState(false)

    const {user} = useContext(AppContext)


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
          likedBy:[],
          timestamp:serverTimestamp(),
          imgLink: imgLink,
          userPosted :{
              uid : user.uid,
              photoURL: user.photoURL,
              displayName: user.displayName,

          }
        });
    
        setContent("")
        props.updatePeepsList()
      }




    return(

        <form className="w-full flex gap-3  p-4 lg:p-8 lg:pb-2 space-y-4 border-b" onSubmit={(e)=>addPeep(e)}>

        <div className="">
            <img className="rounded-[50%] h-14  " src={user.photoURL} alt="profile-pic" />
        </div>
        

            <div className="pt-3 flex-grow text-xl">
                <textarea  value={content} onChange={(e)=>setContent(e.target.value)}
                className='resize-none indent-2 relative focus:outline-none  w-full '  placeholder="What's happening?"
                />


        <div className="flex items-center justify-between p-2">
            <input className="cursor-pointer w-1/2 text-xs block   text-gray-700 file:rounded-sm file:bg-emerald-600 file:text-white file:border-none file:shadow-none"
            type="file" onChange={(e)=>setNewImg(e.target.files[0])} file={newImg} content="gay"  />


            
            <SubmitBtn content={"Peep"}/>

        </div>
      
    
            </div>
     
      

       
        </form>


    )
}