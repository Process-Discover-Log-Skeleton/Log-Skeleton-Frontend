import React, { useState } from 'react';
import { useLogSkeleton } from '../lib/api/log-skeleton';
import styles from "../styles/ActivityFilter.module.css";
import ListItem from "./list-item";


const ActivityFilter = (props) =>{
    const [items, setItems] = useState(['a1'])//TODO: set items to activities

    return(
        <div className={styles.scrollComp}>
            <h1 className={styles.scrollCont}>{props.component_name}</h1>
            <nav id={'act_nav'}>
                <ul className={styles.scrollBar}>
                    {items.map(item=>{
                        return(
                            <li className={styles.listItem}>
                                <ListItem value={item} selectionEvent={props.selectionEvent}></ListItem>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
}
/*class ActivityFilter extends Component{
    items;
    component_name;
    style;
    logSkeleton;
    selected_all;
    deselected_all;

    constructor(props) {
        super(props);
        this.style = [styles.scrollComp,styles.scrollCont,styles.scrollBar,styles.listItem];
        //TODO: set items to the states returned by log skeleton
        this.component_name = null;
        this.selected_all = false;
        this.deselected_all = false;
        //this.items = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a13','a14','a151','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','this is indeed a very long name and i will see what happens when the name of an activity is just too long',1];
    }

    update(){
        //update activities
        //this.items = new items;

        //rerender
    }
    selectionEvent(btn_state, activity){
        throw new Error('SelectionEvent was not implemented!');
    }
   resetSelection = () =>{
        this.deselected_all = false;
        this.selected_all = false;
       this.forceUpdate();
   }
    selectAll = () =>{
        this.selected_all = true
        this.deselected_all = false;
        this.forceUpdate();
    }
    deselectAll = () =>{
        this.selected_all = false;
        this.deselected_all = true;
        this.forceUpdate();
    }
    render(){
        return(
            <div className={this.style[0]}>
                <h1 className={this.style[1]}>{this.component_name}</h1>
                <div>
                    <button className={styles.selectBtn} onClick={()=>this.selectAll()}>
                        select all
                    </button>
                    <button className={styles.selectBtn} onClick={()=>this.deselectAll()}>
                        deselect all
                    </button>
                </div>
                <nav id={'act_nav'}>
                    <ul className={this.style[2]}>
                        {this.items.map(item=>{
                            return(
                                <li className={this.style[3]}>
                                    <ListItem value={item} select_all={this.selected_all} deselect_all={this.deselected_all} selectionReset={this.resetSelection} selectionEvent={this.selectionEvent}></ListItem>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        );

    }
}*/

export default ActivityFilter