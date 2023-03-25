import { useContext } from "react";
import { AppContext } from "../App";
import PeepContent from "./PeepContent";

export default function PeepComment({ trashIcon, comment, deleteComment }) {
  console.log(comment);
  let { user } = useContext(AppContext);

  return (
    <div className="border-b">
      <PeepContent
        peep={comment}
        deleteComment={() => deleteComment(comment.content)}
      />
      {comment.userPosted.uid === user.uid && (
        <img
          src={trashIcon}
          onClick={() => deleteComment(comment.content)}
          className="absolute bottom-0 right-0 p-4 cursor-pointer"
          alt="trash Icon"
        />
      )}
    </div>
  );
}
