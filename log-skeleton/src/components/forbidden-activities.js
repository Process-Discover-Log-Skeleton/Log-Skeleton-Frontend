import ActivityFilter from "./actvivty-filter";


class ForbiddenActivities extends ActivityFilter{
    constructor(props) {
        super(props);
        this.component_name = 'Forbidden Activities';
        this.items = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a13','a14','a151','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','this is indeed a very long name and i will see what happens when the name of an activity is just too long',1];
        //Binding overridden function
        this.selectionEvent = this.selectionEvent.bind(this);
    }

    selectionEvent(btn_state, activity) {
        //alert('working (forb act), btn state:'+ btn_state + 'act:' + activity);
    }
}


export default ForbiddenActivities