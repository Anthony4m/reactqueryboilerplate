import {useQuery} from "react-query";
import {defaultLabels} from "./defaultData";

export function useLabelsData(){
    const labelsQuery = useQuery(["labels"],
        ()=>fetch('/api/labels').then(res=>res.json()),
        {
            placeholderData:defaultLabels,
            staleTime:1000*60*60
        }
        )
    return labelsQuery
}