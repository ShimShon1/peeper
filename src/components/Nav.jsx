import { NavLink } from "react-router-dom";

export default function Nav(props){
    return(
        <nav className="flex gap-2 mb-4">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>

        </nav>
    )
}