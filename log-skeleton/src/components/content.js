import React from 'react'
import styles from '../styles/Content.module.css'

const Content = () => {

    return (
        <div className={styles.content}>
            <div className={styles.leftPanel}>
                <h4>Left</h4>
            </div>

            <div className={styles.midPanel}>
                <h4>Mid</h4>
            </div>

            <div className={styles.rightPanel}>
                <h4>Right</h4>
            </div>
        </div>
    );
}

export default Content