import { deleteComment } from "../api/commentAPI"
import { CommentData } from "../interfaces/CommentData"
import "../pages/styles/CommentCard.css"
import {Slash} from 'react-feather'; // Import icons


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommentCard = (props: { comment: CommentData, updateCommentsFunc: () => Promise<void>  }) => {

    return (
        <div className="date-info-comment-card-container">
            <div className="date-info-comment-card">
                {props.comment.content}
                <span className="creating-user">{props.comment.creatingUser?.username}</span>
            </div>
            <button className="date-info-comment-delete-btn" onClick={
                () => {
                    deleteComment(props.comment.id as number);
                    props.updateCommentsFunc();
                }
            }>Remove <Slash className="date-info-icon" /></button>
        </div>
    )
}

export default CommentCard