import {useLabelsData} from "../helpers/useLabelsData";

const Labels = ({label}) => {
    const labelQuery = useLabelsData();
    if (labelQuery.isLoading) return null;
    const labelData = labelQuery.data.find((l) => l.id === label);
    if (!labelData) return null;
    {
        return (
            <span className={`label ${labelData.color}`}>
                        {labelData.name}
            </span>
        )
    }
}
export default Labels;