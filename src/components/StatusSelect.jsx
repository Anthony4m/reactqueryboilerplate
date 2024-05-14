import React from 'react';

const possibleStatus = [
    {id: "backlog",label:"Backlog"},
    {id: "todo",label:"Todo"},
    {id: "InProgress",label:"In Progress"},
    {id: "done",label:"Done"},
    {id: "cancelled",label:"Cancelled"},
]

const StatusSelect = ({value,onChange,noEmptyOption=false}) =>{

   return (
       <select className="status-select" value={value} onChange={onChange}>
           {noEmptyOption ? null : <option value="">Select A value to filter</option>}
           {possibleStatus.map(status=>(
               <option key={status.id} value={status.id}>{status.label}</option>
           ))}
       </select>
   )
};

export default StatusSelect;