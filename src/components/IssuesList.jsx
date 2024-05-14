import {useQuery, useQueryClient} from "react-query";
import IssueItem from "./IssuesItem";
import {useState} from "react";
import fetchWithErrors from "../helpers/fetchWithErrors";
import Loader from "./Loader";


export default function IssuesList({labels,status}) {
    const queryClient = useQueryClient();
    const issueQuery = useQuery(['issues',{labels},{status}],
        async ({signal}) => {
            const statusString = status ? `&status=${status}` : "";
            const labelString = labels.map(label=>`labels[]=${label}`).join('&')
            const results = await fetchWithErrors(`/api/issues?${labelString}${statusString}`,{signal})

            results.forEach((issue)=>{
                queryClient.setQueryData(["issues",issue.number.toString()],issue);
            })
            return results;
        });
    const [searchValue,setSearchValue] = useState("")

    const searchQuery = useQuery(['issues',"search",{searchValue}],
        ({signal})=> fetch(`/api/search/issues?q=${searchValue}`,{signal}).then(res=>res.json()),
        {
            enabled: searchValue.length > 0,
            staleTime: 1000 * 60 * 2
            })
    console.log(searchQuery)
    return (
        <div>
            <form onSubmit={(event)=>{
                event.preventDefault();
                setSearchValue(event.target.search.value)
            }}>
                <label htmlFor="search">Search Issues</label>
                <input type="search" placeholder="search" name="search" id="search" onChange={(event)=>{
                    if (event.target.value.length === 0){
                        setSearchValue("")
                    }}
                }/>
            </form>
            <h2>Issues List {issueQuery.isFetching ? <Loader/> : null}</h2>
            { issueQuery.isLoading ? (<p>Loading....</p>)
                : issueQuery.isError ? <p>{issueQuery.error.message}</p> :searchQuery.fetchStatus === "idle" && searchQuery.isLoading === true ?
                    (<ul className="issues-list">
                        {issueQuery.data.map((issue)=>(
                            <IssueItem key={issue.id}
                                       title = {issue.title}
                                       number={issue.number}
                                       assignee={issue.assignee}
                                       commentCount={issue.comments.length}
                                       createdBy={issue.createdBy}
                                       createdDate={issue.createdDate}
                                       labels={issue.labels}
                                       status={issue.status}
                            />
                        ))}
                    </ul>
                    ) : <>
                        <h2>Search Results</h2>
                        {searchQuery.isLoading ? <p>Loading...</p> :
                            <>
                                <p>{searchQuery.data.count} Results</p>
                                <ul className="issues-list">
                                    {searchQuery.data.items.map((issue)=>(
                                        <IssueItem key={issue.id}
                                                   title = {issue.title}
                                                   number={issue.number}
                                                   assignee={issue.assignee}
                                                   commentCount={issue.comments.length}
                                                   createdBy={issue.createdBy}
                                                   createdDate={issue.createdDate}
                                                   labels={issue.labels}
                                                   status={issue.status}
                                        />))}
                                </ul>
                            </>
                        }
                    </>
            }
        </div>
    );
}
