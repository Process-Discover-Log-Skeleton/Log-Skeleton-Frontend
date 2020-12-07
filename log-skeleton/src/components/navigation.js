import React from 'react'
import styles from '../styles/Navigation.module.css'

const NavigationBar = () => {

    return (
        <div className={styles.navContainer}>
            {/* <div className={styles.navContent}> */}
                <div className={ [styles.navItem, styles.navLink].join(' ') }>
                    <h4>Log Skeleton</h4>
                </div>

                <div className={ [styles.navLoadEvent].join(' ') }>
                    <button className={styles.navButton}>
                        Load event log
                    </button>
                </div>
            {/* </div> */}
        </div>
    )

}

export default NavigationBar
