import { useLogSkeleton } from '../lib/api/log-skeleton'
import { ReactComponent as LogSkeletonIcon } from '../assets/logSkeleton.svg'
import styles from '../styles/MainPanel.module.css'
import { useRef } from 'react'
import GraphVisualizer from './graph-visualisation'

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
            <GraphVisualizer></GraphVisualizer>
            {/* <LogSkeletonPanel></LogSkeletonPanel> */}
        </div>
    );
}

const EmptyLogSkeleton = () => {
    const { registerEventLog, registerExampleEventLog } = useLogSkeleton()
    const filePicker = useRef(null)

    const loadEventLog = (event) => {
        event.preventDefault()
        filePicker.current.click()
    }

    const onLoad = (event) => {
        const file = event.target.files

        registerEventLog(file[0])
    }

    const onExample = (event) => {
        registerExampleEventLog()
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
                    Load event log file</button>

                <button
                    className={styles.exampleButton}
                    onClick={onExample}>
                    Use example event log
                </button>
            </div>
        </div>
    );
}

// Log Skeleton Panel

// eslint-disable-next-line
const LogSkeletonPanel = () => {
    const model = useLogSkeleton()

    return (
        <div className={styles.logSkeletonPanel}>
            <pre>{JSON.stringify(model.filteredLogSkeleton, null, 2)}</pre>
        </div>
    );
}


export default MainPanel

