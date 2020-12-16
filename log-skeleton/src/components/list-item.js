import React, {useState} from 'react';
import style from '../styles/ActivityFilter.module.css';



const ListItem = (props) =>{
    const [btn, setBtn] = useState(false);

    return(
        <button className={btn? style.btnSelected: style.btn} onClick={()=>{props.selectionEvent(!btn, props.value);setBtn(!btn);}}>{props.value}</button>
    );

}


export default ListItem