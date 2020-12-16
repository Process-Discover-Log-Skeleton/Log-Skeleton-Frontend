import React, {useState} from 'react';
import style from '../styles/ActivityFilter.module.css';



const ListItem = (props) =>{
    const [btn, setBtn] = useState(false);

    props.selectionEvent(btn, props.value);

    return(
        <button className={btn? style.btnSelected: style.btn} onClick={()=>setBtn(!btn)}>{props.value}</button>
    );

}


export default ListItem