import {GoComment, GoIssueClosed, GoIssueOpened} from "react-icons/go";
import {Link} from "react-router-dom";
import {relativeDate} from "../helpers/relativeDate";
import {useUserData} from "../helpers/useUserData";
import Labels from "./Labels";

function IssueItem({
                       title,
                       number,
                       assignee,
                       commentCount,
                       createdBy,
                       createdDate,
                       labels,
                       status,
                   }){
    const assigneeUser = useUserData(assignee);
    const createdByUser = useUserData(createdBy);
    return (
        <li>
            <div>
                {status === 'done' || status === 'cancelled' ? (
                    <GoIssueClosed style={{color: 'red'}}/>
                ) : (<GoIssueOpened style={{color: 'green'}}/>)}
            </div>
            <div className="issue-content">
                <span>
                <Link to={`/issue/${number}`}>{title}</Link>
                    {labels.map((label)=>(
                        <Labels key={label.indexOf(label)} label={label}/>
                    ))}
                </span>
                <small>
                    #{number} opened {relativeDate(createdDate)} createdBy {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : "loading..."}
                </small>
            </div>
            {assignee ? <img className="assigned-to" alt={`assigned to ${assigneeUser.isSuccess ? assigneeUser.data.name : 'avatar'}`} src={assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl: ""}/>  : ''}
            <span className='comment-count'>{commentCount > 0 ? (
                <>
                    <GoComment/> {commentCount}
                </>
            ) : " "}</span>
        </li>
    )
}
export default IssueItem