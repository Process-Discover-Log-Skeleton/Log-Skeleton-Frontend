import React from 'react';
import styles from '../styles/Split.module.css';

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
        <div className={styles.splitterContainer}>
            Activity Splitters
            <div className={styles.scrollableContainer}>
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