import { useState } from "react"
import { useLogSkeleton } from "../lib/api/log-skeleton"
import styles from '../styles/CSVPicker.module.css'
import { ReactComponent as DismissIcon } from '../assets/dismiss.svg'

export const CSVColumnPicker = ({columns}) => {
    const { config, registerEventLog, clear, setConfig } = useLogSkeleton()

    const [idSelection, setIDSelection] = useState(columns[0])
    const [prefixSelection, setPrefixSelection] = useState(null)

    if (columns.length === 0) {
        return <></>
    }

    const onChangeID = (event) => {
        setIDSelection(event.target.value)
        setConfig({
            ...config,
            caseID: event.target.value
        })
    }

    const onChangeCase = (event) => {
        var val = event.target.value
        if (event.target.value === '') {
            val = null
        }

        setPrefixSelection(val)
        setConfig({
            ...config,
            casePrefix: val
        })
    }

    const onSubmit = () => {
        registerEventLog(config.fileContent, idSelection, prefixSelection)
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <button
                    onClick={e => clear()}
                    className={styles.dismiss}>
                    <DismissIcon width="15px"/>
                </button>
                <div className={styles.content}>
                    <div className={styles.title}>Pick the trace identifier</div>
                    <select 
                        className={styles.selection}
                        onChange={onChangeID}
                        >
                        {
                            columns.map(item => {
                                return (
                                    <option
                                        key={item}
                                        value={item}>
                                            {item}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <div className={styles.title}>Define a custom case prefix</div>
                    <input
                        className={styles.caseInput}
                        onChange={onChangeCase}
                        value={prefixSelection}
                        placeholder="case:"
                        />
                    <div className={styles.subTitle}>*The case prefix value defaults to `case:`</div>

                    <button
                        className={styles.submit}
                        onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

