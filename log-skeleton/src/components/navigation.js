import React from 'react'
import { useErrors } from '../lib/util/error'
import styles from '../styles/Navigation.module.css'

const NavigationBar = () => {
    const errors = useErrors()

    const load = () => {
        console.log('Load')
        errors.pushError('Something happend')
    }

    return (
        <div className={styles.navContainer}>
            {/* <div className={styles.navContent}> */}
                <div className={ [styles.navItem, styles.navLink].join(' ') }>
                    <h4>Log Skeleton</h4>
                </div>

                <div className={ [styles.navLoadEvent].join(' ') }>
                    <button className={styles.navButton} onClick={() => load()}>
                        Load event log
                    </button>
                </div>
            {/* </div> */}
        </div>
    )

}

export default NavigationBar
