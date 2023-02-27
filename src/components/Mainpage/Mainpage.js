import React from 'react';
import classes from './mainpage.module.css'
import {Link} from 'react-router-dom'
import {IoFlowerOutline} from 'react-icons/io5'
function Mainpage(props) {
    return (
        <div>
           <h1 className={classes.h1}>
            MOJA TO DO LISTA
           </h1>
           <h2 className={classes.h2}> <IoFlowerOutline/> Napravite svoj raspored vremena uz pomoc aplikacije <IoFlowerOutline/> </h2>
           <div className={classes.buuttondiv}>
            
                <Link className={classes.link} to="/allobligations">TVOJE OBAVEZE</Link>
           
                <Link className={classes.link} to="/makeobligations">
                SASTAVI NOVE ZADATKE</Link>
               
           </div>

        </div>
    );
}

export default Mainpage;