import React from 'react';
import classes from './delete.module.css'
import { cart } from '../store/redux';
import { useDispatch } from 'react-redux';
function Deleteitem(props) {

    const dispatch=useDispatch()
    const close=()=>{
        dispatch(cart.close())
    }
    return (
        <div className={classes.deletecontainer}>
        <p><b>Da li ste sigurni</b> da zelite da izbrisete zadatak pod imenom {props.name}?
            </p>
            <div className={classes.buttoncontainer}>
            <button onClick={props.onclick} className={classes.buttondelete}>OK</button>
            <button onClick={close} className={classes.buttondelete}>Cancel</button>
            </div>
           
        </div>
    );
}

export default Deleteitem;