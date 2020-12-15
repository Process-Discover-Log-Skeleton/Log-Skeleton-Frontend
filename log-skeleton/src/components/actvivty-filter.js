import React, { Component } from 'react';
import styles from "../styles/ActivityFilter.module.css";
import ListItem from "./list-item";


class ActivityFilter extends Component{
    items;
    component_name;
    style;
    logSkeleton;

    constructor(props) {
        super(props);
        this.style = [styles.scrollComp,styles.scrollCont,styles.scrollBar,styles.listItem];
        //TODO: set items to the states returned by log skeleton
        this.component_name = null;
        //null = no true = select all false = deselect all
        this.state ={selection: 0};
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
    resetSelection(){
        if(this.state.selection!=0)
            this.setState({selection: 0});
    }
    selectAll(){
        this.setState({selection: 1});
    }
    deselectAll(){
        this.setState({selection: 2});
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
                                    <ListItem value={item} selection={this.state.selection} selectionReset={()=>this.resetSelection()} selectionEvent={this.selectionEvent}></ListItem>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        );

    }
}

export default ActivityFilter