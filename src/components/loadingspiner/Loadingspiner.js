import React from 'react';
import {BsFillSuitHeartFill} from 'react-icons/bs'
import classes from './loadingspiner.module.css'
function Loadingspiner(props) {
    return (
        <div className={classes.alldiv}>
            <h1>UCITAVAMO VASE OBAVEZE ...</h1>
       <div className={classes.div}>
        <BsFillSuitHeartFill className={classes.first}/>
        <BsFillSuitHeartFill className={classes.second}/>
        <BsFillSuitHeartFill className={classes.third}/>

       </div>
        </div>
    );
}

export default Loadingspiner;