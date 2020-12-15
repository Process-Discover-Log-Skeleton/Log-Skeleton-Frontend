import React from 'react'
import styles from '../styles/Content.module.css'
import MainPanel from '../components/main-panel'
import Splitter from "./split";
import RequiredActivities from "./required-activities";
import ForbiddenActivities from "./forbidden-activities";

const Content = () => {

    return (
        <div className={styles.content}>
            <div className={styles.leftPanel}>
                <h4>Left</h4>
                <RequiredActivities></RequiredActivities>
                <ForbiddenActivities></ForbiddenActivities>
                <Splitter value={[[1,2],[3,4]]}/>
            </div>

            <div className={styles.midPanel}>
                <MainPanel></MainPanel>
            </div>

            <div className={styles.rightPanel}>
                <h4>Right</h4>
            </div>
        </div>
    );
}

export default Content