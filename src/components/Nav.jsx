import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../config";

import homeIcon from "../../src/images/home.svg";
import loginIcon from "../../src/images/log-in.svg";
import logoutIcon from "../../src/images/log-out.svg";
import profileIcon from "../../src/images/profile.svg";
import { useContext } from "react";
import { AppContext } from "../App";
import NavLinkComp from "./NavLinkComp";

export default function Nav({ login }) {
  let { user } = useContext(AppContext);

  async function logout() {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <nav
      className={`${!user && "hidden md:flex  md:h-[22%]  "}
         flex justify-around p-4 shadow-sm bg-white items-center md:flex-col md:h-1/3  md:px-6  md:shadow-none  md:fixed `}
    >
      <NavLinkComp icon={homeIcon} name={"Home"} path={"/"} />

      {user && (
        <NavLinkComp icon={profileIcon} name={"Profile"} path={"/profile"} />
      )}

      {user ? (
        <Link
          onClick={logout}
          className="flex items-center gap-6 font-semibold text-lg ml-3 hover:bg-red-300 p-2 rounded-full"
        >
          <img src={logoutIcon} alt="logout icon" />
          <span className="hidden md:inline-block">Log-out</span>
        </Link>
      ) : (
        <Link
          onClick={login}
          className="flex items-center gap-6 font-semibold text-lg hover:bg-emerald-200 p-2 rounded-full "
        >
          <img src={loginIcon} alt="login icon" />
          <span className="hidden md:inline-block">Log-in</span>
        </Link>
      )}
    </nav>
  );
}
