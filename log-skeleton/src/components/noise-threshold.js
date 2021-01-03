import React, { useState } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton'
import styles from "../styles/SidePanel.module.css";
import RangeSlider from 'react-bootstrap-range-slider';

const Slider = () =>{
    const { fetchLogSkeleton } = useLogSkeleton()

    //TODO: set initial noise (from the model)
    const [ value, setValue ] = useState(0.0);

    return (
        <div className={styles.container}>
            <div className={styles.title}>Noise Threshold</div>
            <div className={styles.contentContainer}>
                <RangeSlider
                    className={styles.slider}
                    min = {0}
                    max = {1}
                    step = {0.05}
                    value={value}
                    tooltipLabel={currentValue => `${Math.floor((currentValue * 100))}%`}
                    tooltip='on'
                    onChange={e => setValue(e.target.value)}
                    onAfterChange={e => fetchLogSkeleton(value)}
                >
                </RangeSlider>
            </div>
        </div>)
}

export default Slider