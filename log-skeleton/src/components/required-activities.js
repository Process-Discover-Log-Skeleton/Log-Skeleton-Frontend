import ActivityFilter from "./activity-filter";


const RequiredActivities = () =>{
    return (
        <ActivityFilter component_name={'Required Activities'} selectionEvent={(btn, value)=>{if(btn){/*Insert value into requires activities*/}}}></ActivityFilter>
    );
}


export default RequiredActivities