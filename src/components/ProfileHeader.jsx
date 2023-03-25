import { useContext } from "react";
import coverImg from "../../src/images/cover.avif";
import { AppContext } from "../App";
import defaultPfp from "../../src/images/defaultPfp.webp";

export default function ProfileHeader() {
  const { user } = useContext(AppContext);

  return (
    <div className=" ">
      <div className=" relative   ">
        <img className="w-full h-28 lg:h-44" src={coverImg} alt="" />
        <div className="p-4 lg:p-8  shadow-sm flex flex-col justify-around border-b">
          <img
            className="rounded-[50%] absolute top-10 lg:top-1/3 max-h-24"
            src={user.photoURL || defaultPfp}
            alt="User Profile"
          />
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl mt-4">{user.displayName}</h1>

            <button className="border text-sm px-3 bg-slate-50 hover:bg-slate-100  font-medium rounded-full ">
              Edit profile
            </button>
          </div>

          <p>Yes, that's my bio</p>
        </div>
      </div>
    </div>
  );
}
