//import { useLogSkeleton } from '../lib/api/log-skeleton'
import React, {useEffect, useState} from 'react';
import styles from '../styles/Activities.module.css'

/*useEffect( () => {
    let activityLists = [
        { name: "Activity1", value: "act1"},
        { name: "Activity2", value: "act2"},
    ]
    
    setActivityList {
        activityLists.map(d => {
            return {
                select: false,
                name: d.name,
                value: d.value
            };
        })

    setInitialValues {
        activityLists = [];
    }
})*/

const Activities = () => {
    //this part need to be reimplemented in the next sprint with arrays, demo only!!
    //also need scrollable container for large logs
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);

    return (     
            <div className={styles.act}>
            <h4>Choose the desired activities : </h4>
            <label>Activity1 </label>
            <input type="checkbox"
                   checked={isChecked1}
                   onChange={(e) => {setIsChecked1(e.target.checked)}}/>
            <br/>
            <label>Activity2 </label>
            <input type="checkbox"
                   checked={isChecked2}
                   onChange={(e) => {setIsChecked2(e.target.checked)}}/>
            <br/>
            <label>Activity3 </label>
            <input type="checkbox"
                   checked={isChecked3}
                   onChange={(e) => {setIsChecked3(e.target.checked)}}/>
            <br/>
            <label>Activity4 </label>
            <input type="checkbox"
                   checked={isChecked4}
                   onChange={(e) => {setIsChecked4(e.target.checked)}}/>
            <br/>
            <label>Activity5 </label>
            <input type="checkbox"
                   checked={isChecked5}
                   onChange={(e) => {setIsChecked5(e.target.checked)}}/>
        </div>
    )
}

export default Activities;