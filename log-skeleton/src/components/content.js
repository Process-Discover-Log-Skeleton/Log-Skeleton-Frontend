import React, { useEffect } from 'react'
import styles from '../styles/Content.module.css'
import MainPanel from '../components/main-panel'
import Relationships from './relationships'
import Activities from './activities'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import { RequiredActivities, ForbiddenActivities } from "./activity-filter";
import Slider from './noise-threshold'
import { CSVColumnPicker } from './csv-coloumn'

const Content = () => {
    const { modelIsLoaded, config } = useLogSkeleton()

    var showCSVPicker = config.csvOptions != null

    useEffect(() => {
        showCSVPicker = config.csvOptions != null
    }, [config])

    if (!modelIsLoaded()) {
        return (
            <div className={styles.emptyContent}>
                <div className={styles.midPanel}>
                {
                    showCSVPicker ? 
                    <CSVColumnPicker 
                        columns={config.csvOptions}/> : <></>
                }
                    <MainPanel></MainPanel>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.content}>
            {
                showCSVPicker ? 
                <CSVColumnPicker 
                    columns={config.csvOptions}/> : <></>
            }
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