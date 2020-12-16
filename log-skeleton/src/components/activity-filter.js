import React, { useEffect, useState, useCallback } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton';
import styles from "../styles/SidePanel.module.css";


export const ForbiddenActivities = () => {
    const model = useLogSkeleton()

    const activities = model.logSkeleton.activities

    const handleForbiddenActivity = (item, include) => {
        var res = model.forbiddenActivities
        
        if (include && !res.includes(item)) {
            model.setForbiddenActivities(model.forbiddenActivities.concat([item]))
        }else if(!include && res.includes(item)) {
            model.setForbiddenActivities(model.forbiddenActivities.filter(rel => rel != item))
        }
    }

    return (
        <ActivityFilter 
            title={'Forbidden Activities'}
            callback={handleForbiddenActivity}
            source={activities}
            colorClass={styles.redButton}>    
        </ActivityFilter>
    );
}

export const RequiredActivities = () => {
    const model = useLogSkeleton()

    const activities = model.logSkeleton.activities

    const handleRequiredActivity = (item, include) => {
        var res = model.requiredActivities
        
        if (include && !res.includes(item)) {
            model.setRequiredActivities(model.requiredActivities.concat([item]))
        }else if(!include && res.includes(item)) {
            model.setRequiredActivities(model.requiredActivities.filter(rel => rel != item))
        }
    }

    return (
        <ActivityFilter 
            title={'Required Activities'} 
            callback={handleRequiredActivity}
            source={activities}
            colorClass={styles.greenButton}>    
        </ActivityFilter>
    );
}


const ActivityFilter = (props) =>{
    return(
        <div className={styles.container}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.contentContainer}>
                {props.source.map(item=>{
                    return(
                        <ListItem 
                            title={item}
                            callback={props.callback}
                            colorClass={props.colorClass}>
                        </ListItem>
                    )
                })}

            </div>
        </div>
    );
}

const ListItem = ({title, callback, colorClass}) =>{
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        callback(title, toggle)
    }, [toggle])

    return(
        <button 
            className={[styles.buttonStyle, toggle ? colorClass : styles.disabledButton].join(' ')}
            onClick={ ()=>{
                setToggle(!toggle)
            }}>
                {title}
        </button>
    );

}
