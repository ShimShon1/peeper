import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../config";

export default function Nav({login,user}){

  async function logout(){

    await signOut(auth)

    
   }


    return(
        <nav className="fixed bottom-0  flex w-full justify-around bg-white">


            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            {user? <NavLink><img src="aaa" onClick={logout} alt="logout"/></NavLink> :
             <NavLink><img src="aaa" onClick={login} alt="login"/></NavLink>}


        </nav>
    )
}