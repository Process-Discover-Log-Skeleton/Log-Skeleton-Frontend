import { useLogSkeleton } from '../lib/api/log-skeleton'
import { ReactComponent as LogSkeletonIcon } from '../assets/logSkeleton.svg'
import styles from '../styles/MainPanel.module.css'
import { useEffect, useRef } from 'react'
import { filterActivities } from '../lib/logic/activities'

const MainPanel = () => {
    const logSkeleton = useLogSkeleton()

    if (!logSkeleton.hasEventLog()) {
        return (
            <div className={styles.mainPanel}>
                <EmptyLogSkeleton></EmptyLogSkeleton>
            </div>
        )
    }

    return (
        <div className={styles.mainPanel}>
            <LogSkeletonPanel></LogSkeletonPanel>
        </div>
    );
}

const EmptyLogSkeleton = () => {
    const { registerEventLog } = useLogSkeleton()
    const filePicker = useRef(null)

    const loadEventLog = (event) => {
        event.preventDefault()
        filePicker.current.click()
    }

    const onLoad = (event) => {
        const file = event.target.files

        registerEventLog(file[0])
    }

    return (
        <div className={styles.emptyContainer}>
            <div className={styles.eventLogContent}>
                <LogSkeletonIcon width="70" height="70" stroke="black"></LogSkeletonIcon>
                <span className={styles.noEventLogTitle}>Load your event log to get started!</span>
                <input type="file" ref={filePicker} style={{ display: "none" }} onChange={onLoad} />
                <button
                    className={styles.noEventLogButton}
                    onClick={loadEventLog}>
                    Load event log</button>
            </div>
        </div>
    );
}

// Log Skeleton Panel

const LogSkeletonPanel = () => {
    const model = useLogSkeleton()

    useEffect(() => {
        console.log(model.logSkeleton.filteredLogSkeleton)
    }, [model])

    const handleFilter = () => {
        const activities = [
            "examine thoroughly",
            "check ticket",
            "reinitiate request",
            "pay compensation",
            "reject request",
            "examine casually",
            "register request"
          ]

        const filtered = filterActivities(model.logSkeleton.logSkeleton, activities)
        model.setFilteredLogSkeleton(filtered)
    }

    return (
        <div className={styles.logSkeletonPanel}>
            <button onClick={handleFilter}>
                Filter activities
            </button>
            <pre>{JSON.stringify(model.logSkeleton.filteredLogSkeleton, null, 2)}</pre>
        </div>
    );
}


export default MainPanel

