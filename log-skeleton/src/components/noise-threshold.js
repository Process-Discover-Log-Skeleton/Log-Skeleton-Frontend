import React from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton'
import styles from "../styles/SidePanel.module.css";
import RangeSlider from 'react-bootstrap-range-slider';

const Slider = () =>{
    const { config, setNoiseThreshold, fetchLogSkeleton } = useLogSkeleton()
    const noiseThreshold = config.parameters.noiseThreshold

    //TODO: set initial noise (from the model)
    const [ value, setValue ] = React.useState(0.0);

    const setIfValid = (value) =>{
        if(!isNaN(value) && value>=0 && value <= 1 && value!==""){
            //TODO: set noise threshold here (value)
            setNoiseThreshold(value)
        }
        setValue(value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Noise Threshold</div>
            <div className={styles.contentContainer}>
                <RangeSlider
                    min = {0}
                    max = {1}
                    step = {0.05}
                    value={noiseThreshold}
                    tooltipLabel={currentValue => `${(currentValue * 100)}%`}
                    tooltip='on'
                    onChange={e => setNoiseThreshold(e.target.value)}
                    onAfterChange={e => fetchLogSkeleton()}
                >
                </RangeSlider>
                {/* <input
                    type= "number" required
                    max = {1}
                    min={0}
                    step={0.05}
                    value={noiseThreshold}
                    onChange={e => setIfValid(e.target.value)} */}
                {/* /> */}
            </div>
        </div>)
}

export default Slider