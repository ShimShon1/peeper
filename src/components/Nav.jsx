import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../config";

import homeIcon from "../../src/images/home.svg"
import loginIcon from "../../src/images/log-in.svg"
import logoutIcon from "../../src/images/log-out.svg"
import profileIcon from "../../src/images/profile.svg"



export default function Nav({login,user}){
    console.log(login)
  async function logout(){

    await signOut(auth)

    
   }


    return(
        <nav className={`${!user && "hidden md:flex "} flex 
        justify-around p-4 shadow-sm bg-white items-center
        
            md:flex-col  md:px-6 md:w-fit md:shadow-none
            md:h-1/3 md:fixed  
        `}>


            <NavLink to={'/'}   className="flex  items-center gap-6 font-semibold text-lg justify-end "   ><img src={homeIcon} alt="home Icon" /><span className="hidden md:inline-block">Home</span></NavLink>

            <NavLink className="p-1 md:p-0 flex items-center gap-6 font-semibold text-lg " to={'/profile'}><img src={profileIcon} alt="Profile icon" /><span className="hidden md:inline-block">Profile</span></NavLink>


            {user? <NavLink onClick={logout}  className="flex items-center gap-6 font-semibold text-lg pl-4"   ><img src={logoutIcon}  alt="logout icon"/><span className="hidden md:inline-block">Log-out</span></NavLink> :
             <NavLink onClick={login} className="flex items-center gap-6 font-semibold text-lg pl-4 "    ><img src={loginIcon}  alt="login icon"/><span className="hidden md:inline-block">Log-in</span></NavLink>}


        </nav>
    )
}