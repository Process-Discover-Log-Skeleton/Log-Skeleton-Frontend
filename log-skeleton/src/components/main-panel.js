import { useLogSkeleton } from '../lib/api/log-skeleton'
import { ReactComponent as LogSkeletonIcon } from '../assets/logSkeleton.svg'
import styles from '../styles/MainPanel.module.css'
import { useRef } from 'react'
import GraphVisualizer from './graph-visualisation'
import { extractCSVColumns } from '../lib/common/csv-columns'
import { useToasts } from 'react-toast-notifications'

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
    const { config, 
            registerEventLog, 
            registerExampleEventLog, 
            setConfig } = useLogSkeleton()

    const filePicker = useRef(null)
    const { addToast } = useToasts()

    const loadEventLog = (event) => {
        event.preventDefault()
        filePicker.current.click()
    }

    const onLoad = (event) => {
        const file = event.target.files

        // CSV File
        if (file[0] !== null && file[0].name.endsWith('csv')) {
            
            extractCSVColumns(file[0], (csv, err) => {
                if (err !== null) {
                    // Something is wrong
                    // ->> Notify user
                    addToast('Cannot read CSV file.', {
                        appearance: 'error',
                        autoDismiss: true,
                    })

                    return
                }

                // Set the config
                // ->> This will trigger the CSV-Picker to show.
                setConfig({
                    ...config,
                    csvOptions: csv,
                    fileContent: file[0]
                })
            })
            return
        }

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

