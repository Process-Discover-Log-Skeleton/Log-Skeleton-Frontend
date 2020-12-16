import React, { useState } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton';
import styles from "../styles/ActivityFilter.module.css";
import ListItem from "./list-item";


const ActivityFilter = (props) =>{
    const [items, setItems] = useState(['a1','a2','a3','a1','a2','a3','a1','a2','a3','a1','a2','a3','a1','a2','a3'])//TODO: set items to activities

    return(
        <div className={styles.scrollComp}>
            <h1 className={styles.scrollCont}>{props.component_name}</h1>
            <nav id={'act_nav'}>
                <ul className={styles.scrollBar}>
                    {items.map(item=>{
                        return(
                            <li className={styles.listItem}>
                                <ListItem value={item} selectionEvent={props.selectionEvent}></ListItem>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
}


export default ActivityFilter
