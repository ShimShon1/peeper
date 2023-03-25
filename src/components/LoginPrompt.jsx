import { useContext } from "react";
import { AppContext } from "../App";

export default function Nav({ login }) {
  const { user } = useContext(AppContext);

  return (
    <>
      {!user && (
        <nav
          className="flex fixed bottom-0 justify-around z-10 w-full bg-emerald-500 text-white text-xl items-center p-4 
             md:justify-center md:gap-6 lg:text-2xl lg:gap-8"
        >
          <p>Log in to post and comment!</p>
          <button
            onClick={login}
            className="p-1 px-2  bg-emerald-400 text-white rounded-lg shadow-md hover:bg-emerald-500"
          >
            Log in
          </button>
        </nav>
      )}
    </>
  );
}
