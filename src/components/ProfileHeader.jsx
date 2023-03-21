
import coverImg from "../../src/images/cover.avif"


export default function ProfileHeader({user}){


    return(
        <div className="min-h-screen">
        <div className="h-screen grid grid-rows-[20%,20%] relative ">

         <img className="w-full h-full" src={coverImg} alt="" />
         <div className="p-4 lg:p-8  shadow-sm flex flex-col justify-around border-b">

            <img className="rounded-[50%] absolute top-[12%] lg:top-[13%] "
            src={user.photoURL} alt="User Profile"/>

            <div className="flex justify-between">

            <h1 className="font-semibold text-2xl mt-4">{user.displayName}</h1>

            <button className="border text-sm px-3 bg-slate-50 hover:bg-slate-100  font-medium rounded-full ">Edit profile</button>

            </div>
           

            <p>
                A very simple man!
            </p>
         </div>
        </div>

    </div>
    )


}