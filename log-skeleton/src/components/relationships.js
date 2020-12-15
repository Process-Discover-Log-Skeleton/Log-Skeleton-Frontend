import React, {useState} from 'react';
import styles from '../styles/Relationships.module.css'
//import { useLogSkeleton } from '../lib/api/log-skeleton'

const Relationships = () => {
       const [isChecked1, setIsChecked1] = useState(false);
       const [isChecked2, setIsChecked2] = useState(false);
       const [isChecked3, setIsChecked3] = useState(false);
       const [isChecked4, setIsChecked4] = useState(false);
       const [isChecked5, setIsChecked5] = useState(false);
       const [isChecked6, setIsChecked6] = useState(false);
   
       return (     
              <div className={styles.rela}>
              <h4>Choose the desired relationships : </h4>
              <label>Equivalence</label>
              <input type="checkbox"
                     checked={isChecked1}
                     onChange={(e) => {setIsChecked1(e.target.checked)}}/>
              <br/>
              <label>Always Before</label>
              <input type="checkbox"
                     checked={isChecked2}
                     onChange={(e) => {setIsChecked2(e.target.checked)}}/>
              <br/>
              <label>Always After</label>
              <input type="checkbox"
                     checked={isChecked3}
                     onChange={(e) => {setIsChecked3(e.target.checked)}}/>
              <br/>
              <label>Never Together</label>
              <input type="checkbox"
                     checked={isChecked4}
                     onChange={(e) => {setIsChecked4(e.target.checked)}}/>
              <br/>
              <label>Next One Way </label>
              <input type="checkbox"
                     checked={isChecked5}
                     onChange={(e) => {setIsChecked5(e.target.checked)}}/>
              <br/>
              <label>Next Both Way </label>
              <input type="checkbox"
                     checked={isChecked6}
                     onChange={(e) => {setIsChecked6(e.target.checked)}}/>
           </div>
       )
}

export default Relationships;