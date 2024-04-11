import {possibleStatus} from "../helpers/defaultData";
import {useUserData} from "../helpers/useUserData";
import {GoIssueClosed, GoIssueOpened} from "react-icons/go";
import {relativeDate} from "../helpers/relativeDate";

export const IssueHeader = ({
                                title,
                                number,
                                status = "todo",
                                createdBy,
                                createdDate,
                                comments
                            }) => {
    const statusObj = possibleStatus.find((pstatus) => pstatus.id)
    const createdUser = useUserData(createdBy);
    return <header>
        <h2>{title} <span>Issue #{number}</span></h2>
        <div>
      <span className={status === "done" || status === "cancelled" ? "closed" : "open"}>
       {status === 'done' || status === 'cancelled' ? (
           <GoIssueClosed/>
       ) : (<GoIssueOpened/>)}
          {statusObj.label}
      </span>
            <span className="created-by">
        {createdUser.isLoading ? "Loading..." : createdUser.data?.name}
      </span> {" "}
            opened this issue {relativeDate(createdDate)} {" . "} {comments.length}
        </div>
    </header>
}