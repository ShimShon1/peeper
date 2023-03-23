import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../config";

import homeIcon from "../../src/images/home.svg"
import loginIcon from "../../src/images/log-in.svg"
import logoutIcon from "../../src/images/log-out.svg"
import profileIcon from "../../src/images/profile.svg"
import { useContext } from "react";
import {AppContext} from "../App"


export default function Nav({login}){
let {user} = useContext(AppContext)



async function logout(){
    try{
        await signOut(auth)
    }catch(e){
        console.error(e)
    }

    
   }

    return(
        <nav className={`${!user && "hidden md:flex "} flex 
        justify-around p-4 shadow-sm bg-white items-center
        
            md:flex-col  md:px-6  md:shadow-none
            md:h-1/3 md:fixed  
        `}>


            <NavLink to={'/'}   className="flex  items-center gap-6 font-semibold text-lg justify-end  "   ><img src={homeIcon} alt="home Icon" /><span className="hidden md:inline-block">Home</span></NavLink>

            <NavLink className="p-1 md:p-0 flex items-center gap-6 font-semibold text-lg " to={'/profile'}><img src={profileIcon} alt="Profile icon" /><span className="hidden md:inline-block">Profile</span></NavLink>


            {user? <Link onClick={logout}  className="flex items-center gap-6 font-semibold text-lg pl-3"   ><img src={logoutIcon}  alt="logout icon"/><span className="hidden md:inline-block">Log-out</span></Link> :
             <Link onClick={login} className="flex items-center gap-6 font-semibold text-lg  "    ><img src={loginIcon}  alt="login icon"/><span className="hidden md:inline-block">Log-in</span></Link>}


        </nav>
    )
}