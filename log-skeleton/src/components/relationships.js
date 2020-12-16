import React, { useEffect, useState } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton'
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

    const handleRelationshipToggle = (item, include) => {
        var res = model.activeRelationships

        if (include && !res.includes(item)) {
            model.setActiveRelationships(model.activeRelationships.concat([item]))
        }else if(!include && res.includes(item)) {
            model.setActiveRelationships(model.activeRelationships.filter(rel => rel != item))
        }
    }

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
    }

    useEffect(() => {
        callback(title, toggle)
    }, [toggle])

    return (
        <button
            className={[styles.buttonStyle, toggle ? styles.activityButton : styles.disabledButton].join(' ')}
            onClick={handleToggle}>
            {title.replaceAll('_', ' ')}
        </button>
    )
}


export default Relationships;