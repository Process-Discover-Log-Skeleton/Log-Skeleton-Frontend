import React, { useEffect, useState } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton'
import styles from "../styles/SidePanel.module.css";
import RangeSlider from 'react-bootstrap-range-slider';

const Slider = () =>{
    const { config, fetchLogSkeleton } = useLogSkeleton()

    //TODO: set initial noise (from the model)
    const [ value, setValue ] = useState(0.0);

    useEffect(() => {
        setValue(config.parameters.noiseThreshold)
    }, [config.parameters.noiseThreshold])

    return (
        <div className={styles.container}>
            <div className={styles.title}>Noise Threshold</div>
            <div className={styles.contentContainer}>
                <RangeSlider
                    className={styles.slider}
                    min = {0}
                    max = {0.5}
                    step = {0.01}
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