import React, { useEffect, useState } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton'
import { filterRelationships } from '../lib/logic/relationships'
import styles from '../styles/SidePanel.module.css'

const relationships = [
    "always_after",
    "always_before",
    "equivalence",
    "never_together",
    "next_one_way",
    "next_both_ways"
]

const Relationships = () => {
    const model = useLogSkeleton()

    const [activeRelationships, setActiveRelationships] = useState(relationships)

    const handleRelationshipToggle = (item, include) => {
        if (include && !activeRelationships.includes(item)) {
            // If include is toggled and the item is not included
            // Add the item to the list
            setActiveRelationships(activeRelationships.concat([item]))
        } else if (!include && activeRelationships.includes(item)) {
            // If not include is toggled and the item is included
            setActiveRelationships(activeRelationships.filter(val => val != item))
        }
    }

    useEffect(() => {
        // Filter based on the activities
        const filtered = filterRelationships(model.logSkeleton.logSkeleton, activeRelationships)

        model.setFilteredLogSkeleton(filtered)
    }, [activeRelationships])


    return (
        <div className={styles.container}>
            <div className={styles.title}>Relationships</div>
            <div className={styles.contentContainer}>
                {
                    relationships.map(relationship => {
                        return (
                            <RelationshipsBox
                                initial={relationship == 'always_after' || relationship == 'always_before'}
                                title={relationship}
                                callback={handleRelationshipToggle} />
                        )
                    })
                }
            </div>
        </div>
    )
}


const RelationshipsBox = ({ initial, title, callback }) => {
    const [toggle, setToggle] = useState(initial)

    const handleToggle = (event) => {
        setToggle(!toggle)
        console.log('toggle')
    }

    useEffect(() => {
        callback(title, toggle)
    }, [toggle])

    return (
        <div>
            <button
                className={[styles.buttonStyle, toggle ? styles.activityButton : styles.disabledButton].join(' ')}
                onClick={handleToggle}>
                {title.replaceAll('_', ' ')}
            </button>
        </div>
    )
}


export default Relationships;