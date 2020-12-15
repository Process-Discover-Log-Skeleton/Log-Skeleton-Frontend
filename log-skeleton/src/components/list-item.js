import React, { Component } from 'react';
import style from '../styles/ActivityFilter.module.css';

class ListItem extends Component{
    constructor(props) {
        super(props);
        this.state={btn: false};
    }

    toggleStyle(){
        this.setState({btn: !this.state.btn});
    }

    render() {
        let btn_style;
        if(this.props.selection != 0){
            if(this.props.selection == 1){
                this.state.btn = true;
            }
            else{
                this.state.btn = false;
            }
        }

        if(this.state.btn==true){
            btn_style=style.btnSelected;
        }
        else{
            btn_style= style.btn;
        }

        this.props.selectionEvent(this.state.btn, this.props.value);

        return(
            <button className={btn_style} onClick={()=>{this.props.selectionReset(); this.toggleStyle();}}>{this.props.value}</button>
        );
    }
}


export default ListItem