import React from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton';
import { trimString } from '../lib/common/trim-strings';
import styles from "../styles/SidePanel.module.css";


export const ForbiddenActivities = () => {
    const model = useLogSkeleton()

    const activities = model.logSkeleton.activities

    const handleForbiddenActivity = (item, include) => {
        var res = model.forbiddenActivities
        
        if (include && !res.includes(item)) {
            model.setForbiddenActivities(model.forbiddenActivities.concat([item]))
        }else if(!include && res.includes(item)) {
            model.setForbiddenActivities(model.forbiddenActivities.filter(rel => rel !== item))
        }
    }

    return (
        <ActivityFilter 
            title={'Forbidden Activities'}
            callback={handleForbiddenActivity}
            source={activities}
            colorClass={styles.redButton}
            includes={item => model.forbiddenActivities.includes(item)}>    
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
            model.setRequiredActivities(model.requiredActivities.filter(rel => rel !== item))
        }
    }

    return (
        <ActivityFilter 
            title={'Required Activities'} 
            callback={handleRequiredActivity}
            source={activities}
            colorClass={styles.greenButton}
            includes={item => model.requiredActivities.includes(item)}>    
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
                            colorClass={props.colorClass}
                            toggle={props.includes(item)}>
                        </ListItem>
                    )
                })}

            </div>
        </div>
    );
}

const ListItem = ({title, callback, toggle, colorClass}) =>{

    const handleToggle = (event) => {
        callback(title, !toggle)
    }

    return(
        <button 
            className={[styles.buttonStyle, toggle ? colorClass : styles.disabledButton].join(' ')}
            onClick={handleToggle}>
                {trimString(title)}
        </button>
    );

}
