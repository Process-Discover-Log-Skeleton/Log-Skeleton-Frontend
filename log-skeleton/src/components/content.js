import React from 'react'
import styles from '../styles/Content.module.css'
import MainPanel from '../components/main-panel'
import Splitter from './split'
import Relationships from './relationships'
import Activities from './activities'
import { useLogSkeleton } from '../lib/api/log-skeleton'

const Content = () => {
    const { modelIsLoaded } = useLogSkeleton()
    
    if (!modelIsLoaded()) {
        return (
            <div className={styles.emptyContent}>
                <div className={styles.midPanel}>
                    <MainPanel></MainPanel>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.content}>
            <div className={styles.sidePanel}>
                <Splitter value={[[1,2],[3,4]]}/>
            </div>

            <div className={styles.midPanel}>
                <MainPanel></MainPanel>
            </div>
            <div className={styles.sidePanel}>
                <Activities></Activities>
                <Relationships></Relationships>
            </div>
        </div>
    );
}

export default Content