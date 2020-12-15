import React from 'react'
import styles from '../styles/Content.module.css'
import MainPanel from '../components/main-panel'
import Activities from '../components/activities'
import Relationships from '../components/relationships'

const Content = () => {

    return (
        <div className={styles.content}>
            <div className={styles.leftPanel}>
                <h4>Left</h4>
            </div>

            <div className={styles.midPanel}>
                <MainPanel></MainPanel>
            </div>

            <div className={styles.rightPanel}>
                <h4>Right</h4>
                <Activities></Activities>
                <Relationships></Relationships>
            </div>
        </div>
    );
}

export default Content