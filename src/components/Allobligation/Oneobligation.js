import React from 'react';
import classes from './allobligation.module.css'
import { Link } from 'react-router-dom';
import {BsSuitHeart} from 'react-icons/bs'
import {BsFillSuitHeartFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'


function Oneobligation(props) {
  
    
    
    
    return (
        <div 
        className={props.className} >
       {!props.check&&<BsSuitHeart onClick={props.heart}/>}
       {props.check&& <BsFillSuitHeartFill onClick={props.heart}/>}
 <div className={classes.text}>{props.name.toUpperCase()}</div>
 <div className={classes.text}>{props.text}</div>
<div className={classes.text}>{props.date.slice(0,10)}</div>
<MdDelete className={classes.trash} onClick={props.deleteitemi} cursor={"pointer"}/>
<button onClick={props.updateitemi} className={classes.buttonupdate}>
    <Link style={{textDecoration:"none",
color:"rgb(202, 52, 77)"
}} to={`/updateitem:${props.id}`}>
    ISPRAVI
    </Link>
    </button>
</div>
    );
}

export default Oneobligation;