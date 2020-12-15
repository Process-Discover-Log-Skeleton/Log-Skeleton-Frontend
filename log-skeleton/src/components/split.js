import React from 'react';
import styles from '../styles/SidePanel.module.css';

const SplitActivity = (props) => {

    return (
        <div>
            <button className={styles.activityButton}>Split Activity {props.value[0]}</button>
            <button className={styles.activityButton}>Over Activity {props.value[1]}</button>
        </div>
    );
}

const Splitter = (props) => {
    //const splits = props.value.map(item => {
    //    return (<SplitActivity value = {item} />)
    //})
    return (        
        <div className={styles.container}>
            <div className={styles.title}>Activity Splitters</div>
            <div className={styles.contentContainer}>
                {
                props.value.map(item => {
                    return (<SplitActivity value = {item} />)
                })
                }
            </div>
        </div>
    );
}

export default Splitter;