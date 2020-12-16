import ActivityFilter from "./activivty-filter";


const ForbiddenActivities = () =>{
    return (
        <ActivityFilter component_name={'Required Activities'} selectionEvent={(btn)=>{if(btn){/*Insert value into requires activities*/}}}></ActivityFilter>
    );
}


export default ForbiddenActivities