import { useLogSkeleton } from "../lib/api/log-skeleton"
import styles from '../styles/CSVPicker.module.css'

export const CSVColumnPicker = ({columns}) => {
    const { config, setConfig } = useLogSkeleton()

    

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>Pick the identifier column</div>
                <select className={styles.selection}>
                    {
                        columns.map(item => {
                            return (
                                <option
                                    value={item}>
                                        {item}
                                </option>
                            )
                        })
                    }
                </select>

                <button
                    className={styles.submit}>
                    Submit
                </button>
            </div>
        </div>
    )
}

