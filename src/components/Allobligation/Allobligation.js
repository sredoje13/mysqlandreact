import React from 'react';
import axios from 'axios';
import classes from './allobligation.module.css'
import { useEffect,useState} from 'react';
import {BsSuitHeart} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import { cart } from '../store/redux';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import Deleteitem from '../deleteditem/Deleteitem';
import Loadingspiner from '../loadingspiner/Loadingspiner';
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai'
function Allobligation(props) {
    const[up,setup]=useState(true)
    const[loading,setisloading]=useState(true)
    const itemms=useSelector((state)=>state.cartitem.item);
    const deletee=useSelector((state)=>state.cartitem.delete);
   
    const dispatch=useDispatch()
    const [tasks,settasks]=useState([])
useEffect(()=>{
const timer=setTimeout(()=>{

    const getdatas=async()=>{

        await axios.get("https://jelenatodo.herokuapp.com/listofobligation")
         .then((res)=>
        
         settasks(res.data)
         ).then(()=>
         setisloading(false))
         
        
     }
     getdatas()
},3000)
return()=>clearTimeout(timer)
   
},[])
const updateitem=(item)=>{
dispatch(cart.additem(item))
}
const deleteitem =(item)=>{
dispatch(cart.setdelete(item))
}
const confirmdelete=async()=>{
   await axios.delete(`https://jelenatodo.herokuapp.com/listofobligation/${itemms.id}`)
   window.location.reload()
}

const alltasks=tasks.map((item)=>(
    <div className={classes.onediv}key={item.id}>
       <BsSuitHeart/>
       
 <div className={classes.text}>{item.name.toUpperCase()}</div>
 <div className={classes.text}>{item.text}</div>
<div className={classes.text}>{item.date.slice(0,10)}</div>
<MdDelete className={classes.trash} onClick={()=>deleteitem(item)} cursor={"pointer"}/>
<button onClick={()=>updateitem(item)} className={classes.buttonupdate}>
    <Link style={{textDecoration:"none",
color:"rgb(202, 52, 77)"
}} to={`/updateitem:${item.id}`}>
    ISPRAVI
    </Link>
    </button>
</div>

   
   
)

)
const updownarrow=()=>{
    setup((prev)=>!prev)
}
    return (
      <div className={classes.div}> 
             {!loading&&<h1 className="title">MOJA TO DO LISTA</h1>}
             <div className='sort'><b><b>SORTIRAJ <span onClick={updownarrow} className='downspan'>
               { up&&<AiOutlineDown/>}
             {!up&&<AiOutlineUp/>
             
             }
            { !up&&<div><p>Name</p><p>Date</p></div>}
             </span></b></b></div>
        {deletee&&<Deleteitem onclick={confirmdelete}name={itemms.name}/>}
     {loading&&<Loadingspiner/>}
        {!loading&&<div className={deletee?`${classes.divall} ${classes.animation}`:`${classes.divall} ${classes.animation2}`} >
            
            <div  className={classes.onediv}>
            <BsSuitHeart  style={{visibility:"hidden"}}/> <div className={classes.text}>
                <b>NAZIV</b>
                </div>
                <div className={classes.text}>
               <b>OPIS</b>
                </div>
                <div className={classes.text}>
               <b>DATUM</b>
                </div>
               
                <MdDelete style={{visibility:"hidden"}}/>
             <button style={{visibility:"hidden", marginLeft:"20px"}}>ISPRAVI</button>
            </div>
            {alltasks}
        </div>}
        <Link className={classes.link} to="/">Vratite se na pocetnu stranicu</Link> 
        
        </div>
    );
}

export default Allobligation;