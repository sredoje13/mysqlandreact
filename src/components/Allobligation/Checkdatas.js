import React from 'react';
import classes from './allobligation.module.css'
function Checkdatas(props) {
    return (
        <div className={classes.checkdata}>
            <div className={classes.checkname}>{props.name}</div>
            <div className={classes.checkdate}>{props.date.slice(0,10)}</div>
        </div>
    );
}

export default Checkdatas;