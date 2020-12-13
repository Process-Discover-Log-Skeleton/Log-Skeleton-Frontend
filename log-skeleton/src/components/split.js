import React from 'react';
import styles from '../styles/Split.module.css';

class SplitActivity extends React.Component {
    render() {
      return (
        //probably button will not be the correct type
        <div>
            <button className={styles.activityButton}>Split Activity {this.props.value}</button>
            <button className={styles.activityButton}>Over Activity {this.props.value + 1}</button>
        </div>
      );
    }
  }

class Splitter extends React.Component {
    render() {
        var splits =[];
        for (let i = 0; i < this.props.value; i++) {
            splits.push(<SplitActivity value={i*2}/>);
        }
        return(
            <div className={styles.splitterContainer}>
                Activity Splitters
                <div className={styles.scrollableContainer}>
                    <p/>
                    {splits}
                </div>
            </div>
        );
    }
}

export default Splitter;