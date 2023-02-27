import React from 'react';
import classes from './Navpage.module.css'
import Image from '../../Myproject.jpg'
function Navpage(props) {
    return (
        <div className={classes.divpage}>
  <div className={classes.navpage} style={{
            
            backgroundImage:`url(${Image})`,
        }}>
            
        </div>
      
        </div>
      
    );
}

export default Navpage;