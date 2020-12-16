import ActivityFilter from "./activity-filter";


const ForbiddenActivities = () =>{
    return (
        <ActivityFilter component_name={'Forbidden Activities'} selectionEvent={(btn, value)=>{if(btn){/*Insert value into requires activities*/}}}></ActivityFilter>
    );
}


export default ForbiddenActivities