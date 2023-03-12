import React from 'react';
import axios from 'axios';
import classes from './allobligation.module.css'
import { useEffect,useState} from 'react';
import {BsSuitHeart} from 'react-icons/bs'
import {BsFillSuitHeartFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import { cart } from '../store/redux';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import Deleteitem from '../deleteditem/Deleteitem';
import Loadingspiner from '../loadingspiner/Loadingspiner';
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai'
import { toast } from 'react-hot-toast';

function Allobligation(props) {
  
 const newDate=new Date()
 console.log(newDate)
 const todayyear=newDate.getFullYear().toString()
const todaydate=newDate.getDate().toString()
const todaymonth=(newDate.getMonth()+1).toString()
const monthzero="0"+todaymonth

const dateofobl=[todayyear,monthzero,todaydate].join("-")
console.log(dateofobl)
    const[up,setup]=useState(true)
    const[loading,setisloading]=useState(true)
   const[showtodayobligation,setshowtodayobligation]=useState(false)
const[searchhh,setsearch]=useState([])
const[sortdate,setsortdate]=useState(false)
const[sortname,setsortname]=useState(false)
    const itemms=useSelector((state)=>state.cartitem.item);
    const deletee=useSelector((state)=>state.cartitem.delete);
   const tasks=useSelector((state)=>state.cartitem.tasks)
    const dispatch=useDispatch()
   
useEffect(()=>{
const timer=setTimeout(()=>{

    const getdatas=async()=>{
       /*   */
        await axios.get("https://jelenatodo.herokuapp.com/listofobligation")
         .then((res)=>
        
       {  dispatch(cart.getitems(res.data))
       
       
      }).then(()=>
       { 
         setisloading(false)})
         
        
     }
     getdatas()
},3000)
return()=>clearTimeout(timer)
   
},[])
let all;
all=tasks.map((item)=>(
    <div className={classes.onediv}key={item.id}>
       {!item.check&&<BsSuitHeart onClick={()=>dispatch(cart.checkitem(item))}/>}
       {item.check&& <BsFillSuitHeartFill onClick={()=>dispatch(cart.checkitem(item))}/>}
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

let filterr;
 const filterdataday=tasks.filter((item)=>item.date.slice(0,10).includes(dateofobl))

if(filterdataday.length!==0){
    filterr=filterdataday.map((item)=>(
        <div className={classes.filtertoday}><div className={classes.filtertodayone}>{item.name}
        </div>
        <p style={{cursor:"pointer"}} onClick={()=>setshowtodayobligation(false)}>X</p>
        </div>
        
    ))

}
else if(filterdataday.length===0){filterr=(<div className={classes.filtertoday}>NEMATE OBAVEZE DANAS<p style={{cursor:"pointer"}} onClick={()=>setshowtodayobligation(false)}>X</p></div>)}
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




 




const updownarrow=()=>{
    setup((prev)=>!prev)
}



    
    const sortbyname=tasks.slice().sort((a,b)=>a.name.localeCompare(b.name)).map((item)=>(
        <div className={classes.onediv}key={item.id}>
           {!item.check&&<BsSuitHeart onClick={()=>dispatch(cart.checkitem(item))}/>}
               {item.check&& <BsFillSuitHeartFill onClick={()=>dispatch(cart.checkitem(item))}/>}
           
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
      
    ))  


    
    const sortbydate=tasks.slice().sort((a,b)=>a.date.localeCompare(b.date)).map((item)=>(
        <div className={classes.onediv}key={item.id}>
          {!item.check&&<BsSuitHeart onClick={()=>dispatch(cart.checkitem(item))}/>}
               {item.check&& <BsFillSuitHeartFill onClick={()=>dispatch(cart.checkitem(item))}/>}
           
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




const searchitems=(e)=>{
    const oneofall=tasks.slice().filter((item)=>item.name.trim().toLowerCase().includes(e.target.value.toLowerCase())).map((item)=>(
    <div className={classes.onediv}key={item.id}>
        {!item.check&&<BsSuitHeart onClick={()=>dispatch(cart.checkitem(item))}/>}
               {item.check&& <BsFillSuitHeartFill onClick={()=>dispatch(cart.checkitem(item))}/>}
       
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
setsearch(oneofall)

   }
   if(searchhh.length!==0){
    all=searchhh
   }
   else if(sortdate){
     all=sortbydate
   }
   else if(sortname){
    all=sortbyname
   }


   

    return (
      <div className={classes.div}> 
             {!loading&&<h1 className="title">MOJA TO DO LISTA</h1>}
             
            {!loading&&<div  className={classes.sort} style={{cursor:"pointer"}}>
                <input onChange={searchitems} className={classes.inputsearch} placeholder="Search by name"/><b>SORTIRAJ <span onClick={updownarrow} className='downspan'>
               { up&&<AiOutlineDown style={{cursor:"pointer"}}/>}
             {!up&&<AiOutlineUp style={{cursor:"pointer"}}/>
             
             }
            { !up&&<div><p className={classes.sortone} onClick={()=>{setsortname(true);setsortdate(false)}}>IME</p>
            <p className={classes.sortone} onClick={()=>{setsortdate(true);setsortname(false)}}>DATUM</p></div>}
             </span></b></div>}
        {deletee&&<Deleteitem onclick={confirmdelete} name={itemms.name}/>}
     {loading&&<Loadingspiner/>}
        {!loading&&<div className={deletee?`${classes.divall} ${classes.animation}`:`${classes.divall} ${classes.animation2}`} >
            
            <div  className={classes.onediv}>
            <BsSuitHeart   style={{visibility:"hidden"}}/> <div className={classes.text}>
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
           
            {all}
        </div>}
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
             <Link className={classes.link} to="/">Vratite se na pocetnu stranicu</Link> 
        
        <button className={classes.link} onClick={()=>setshowtodayobligation(true)}>OBAVEZE ZA DANAS</button> 
            </div>
       {showtodayobligation&&!loading&&<div>
        {filterr}
        </div>}
        
        </div>
    );
}

export default Allobligation;