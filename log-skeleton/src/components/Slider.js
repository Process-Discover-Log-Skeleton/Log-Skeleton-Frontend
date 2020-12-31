import React from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton'
import styles from "../styles/SidePanel.module.css";
import RangeSlider from 'react-bootstrap-range-slider';

const Slider = () =>{
    const model = useLogSkeleton()
    //TODO: set initial noise (from the model)
    const [ value, setValue ] = React.useState(0.2);

    const setIfValid = (value) =>{
        if(!isNaN(value) && value>=0 && value <= 1 && value!==""){
            //TODO: set noise threshold here (value)
        }
        setValue(value)
    }

    return (<div className={styles.container}>
        <RangeSlider
            min = {0}
            max = {1}
            step = {0.01}
            value={value}
            tooltip='off'
            onChange={e => setValue(e.target.value)}
            onAfterChange={e => {/*TODO: set noise threshold here (e.target.value)*/}}>
        </RangeSlider>
        <input
            type= "number" required
            max = {1}
            min={0}
            step={"any"}
            value={value}
            onChange={e => setIfValid(e.target.value)}
        />
    </div>);
}

export default Slider