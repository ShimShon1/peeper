/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { db } from "../config";
import Peep from "./Peep";
import ProfileHeader from "./ProfileHeader";

export default function Profile({ deletePeep, likePeep, updatePeepsList }) {
  const [userPeeps, setUserPeeps] = useState([]);

  const { user } = useContext(AppContext);

  console.log(user.uid);

  useEffect(() => {
    if (!user.uid) return;

    getUserPeeps();
  }, [user.uid]);

  async function getUserPeeps() {
    try {
      const q = query(
        collection(db, "peeps"),
        where("userPosted.uid", "==", user.uid)
      );
      let peepsRef = await getDocs(q);
      setUserPeeps(
        peepsRef.docs.map((doc) => {
          return {
            ...doc.data(),
            docId: doc.id,
          };
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  const peepElms = userPeeps.map((peep) => {
    return (
      <Peep
        key={peep.docId}
        deletePeep={() => {
          deletePeep(peep);
          getUserPeeps();
        }}
        likePeep={() => {
          likePeep(peep);
          getUserPeeps();
        }}
        updatePeepsList={updatePeepsList}
        peep={peep}
        user={user}
      />
    );
  });

  return (
    <div className="flex flex-col">
      <ProfileHeader />

      {peepElms}
    </div>
  );
}
