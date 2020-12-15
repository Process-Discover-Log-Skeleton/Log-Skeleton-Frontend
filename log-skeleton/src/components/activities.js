import React, {useEffect, useState} from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton';
import styles from '../styles/SidePanel.module.css'
import { filterActivities } from '../lib/logic/activities'

const Activities = () => {
    const model = useLogSkeleton()

    const activities = model.logSkeleton.logSkeleton.activities
    
    const [activeActivities, setActiveActivities] = useState(activities)

    const handleActivityToggle = (item, include) => {
        if (include && !activeActivities.includes(item)) {
        // If include is toggled and the item is not included
            // Add the item to the list
            setActiveActivities(activeActivities.concat([item]))
        }else if (!include && activeActivities.includes(item)) {
        // If not include is toggled and the item is included
            setActiveActivities(activeActivities.filter(val => val != item))
        }
    }

    useEffect(() => {
        // Filter based on the activities
        const filtered = filterActivities(model.logSkeleton.logSkeleton, activeActivities)

        model.setFilteredLogSkeleton(filtered)
    }, [activeActivities])
    

    return (     
        <div className={styles.container}>
            <div className={styles.title}>Activities</div>
            <div className={styles.contentContainer}>
                {
                    activities.map( activity => {
                        return (
                            <ActivityBox 
                                title={activity}
                                callback={handleActivityToggle}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const ActivityBox = ({title, callback}) => {
    const [toggle, setToggle] = useState(true)

    const handleToggle = (event) => {
        setToggle(!toggle)
        console.log('toggle');
    }

    useEffect(() => {
        callback(title, toggle)
    }, [toggle])

    return (
        <div>
            <button 
            className={[styles.buttonStyle, toggle ? styles.activityButton : styles.disabledButton].join(' ')}
            onClick={handleToggle}>
                {title}
            </button>
        </div>
    )
}

export default Activities;