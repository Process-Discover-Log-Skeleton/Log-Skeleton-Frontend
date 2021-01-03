import React from 'react'
import styles from '../styles/Content.module.css'
import MainPanel from '../components/main-panel'
import Relationships from './relationships'
import Activities from './activities'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import { RequiredActivities, ForbiddenActivities } from "./activity-filter";
import Slider from './noise-threshold'

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
                <RequiredActivities></RequiredActivities>
                <ForbiddenActivities></ForbiddenActivities>
            </div>

            <div className={styles.midPanel}>
                <MainPanel></MainPanel>
            </div>
            <div className={styles.sidePanel}>
                <Activities></Activities>
                <Relationships></Relationships>
                <Slider></Slider>
            </div>
        </div>
    );
}

export default Content