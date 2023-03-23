import PeepContent from "./PeepContent";

export default function PeepComment({trashIcon,comment,deleteComment}){
    return(
        <div className="border-b">
            <PeepContent  peep={comment}  deleteComment={() => deleteComment(comment.content)} />
            <img src={trashIcon} onClick={() => deleteComment(comment.content)}
            className='absolute bottom-0 right-0 p-4 cursor-pointer' alt="trash Icon" />
        </div>
    )
}