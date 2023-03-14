import React from 'react';
import axios from 'axios';
import classes from './allobligation.module.css'
import { useEffect,useState, useRef} from 'react';
import {BsSuitHeart} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import { cart } from '../store/redux';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import Deleteitem from '../deleteditem/Deleteitem';
import Loadingspiner from '../loadingspiner/Loadingspiner';
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai'
import Oneobligation from './Oneobligation';
import Checkdatas from './Checkdatas';
import {AiFillGift,AiFillCloseCircle,AiOutlineArrowUp} from 'react-icons/ai'
function Allobligation(props) {
  const ref=useRef()
  const ref2=useRef()
 const[openbox,setisopenbox]=useState(false)
 const newDate=new Date()

 const todayyear=newDate.getFullYear().toString()
const todaydate=newDate.getDate().toString()
const todaymonth=(newDate.getMonth()+1).toString()
const monthzero="0"+todaymonth

const dateofobl=[todayyear,monthzero,todaydate].join("-")

 
    const[up,setup]=useState(true)
    const[checkdatas,setcheckdatas]=useState([])
    const[loading,setisloading]=useState(true)
   const[showtodayobligation,setshowtodayobligation]=useState(false)
const[searchhh,setsearch]=useState([])
const[sortdate,setsortdate]=useState(false)
const[sortname,setsortname]=useState(false)
const[cheshkitems,setsheckitems]=useState([])

    const itemms=useSelector((state)=>state.cartitem.item);
    const deletee=useSelector((state)=>state.cartitem.delete);
   const tasks=useSelector((state)=>state.cartitem.tasks)
const itemcheck=useSelector((state)=>state.cartitem.chechkitem)
console.log(itemcheck)
    const dispatch=useDispatch()
   
useEffect(()=>{
const timer=setTimeout(()=>{
    const getcheckdatas=async()=>{
        await axios.get("https://checkapp.herokuapp.com/checkdatas")
        .then((res)=>{setcheckdatas(res.data)
        dispatch(cart.getallcheckitems(res.data))
        })
     }

    const getdatas=async()=>{
       /*   */
        await axios.get("https://jelenatodo.herokuapp.com/listofobligation")
         .then((res)=>
        
       {dispatch(cart.getitems(res.data))
       
       
      }).then(()=>setisloading(false)).then(()=>getcheckdatas())    
        
     }
    
     
     getdatas()
},3000)
return()=>clearTimeout(timer)
   
},[])
console.log(cheshkitems)
const getcheckiteems=async()=>{
    await axios.get("https://checkapp.herokuapp.com/checkdatas")
    .then((res)=>{setcheckdatas(res.data)})
    .then(()=>{setisopenbox(true);
        ref2.current.scrollIntoView({ behavior: "smooth" ,  top: ref2.current.offsetTop});
    })
}



const heart=async(item)=>{
  
    
    if(item.check===undefined||item.check===false){ 
       const datacheck={name:item.name,id:item.id,text:item.text, date:item.date.slice(0,10),check:1} 
  await axios.post("https://checkapp.herokuapp.com/checkdatas",datacheck )
  

}
   
   else if (item.check){
        await axios.delete(`https://checkapp.herokuapp.com/checkdatas/${item.id}`)
      .then(()=>axios.get("https://checkapp.herokuapp.com/checkdatas")
      .then((res)=>setcheckdatas(res.data)))
    } 

    dispatch(cart.checkitem(item))
    

    }
   
 
let all;
const updateitem=(item)=>{
    dispatch(cart.additem(item))
    }
    const deleteitem =(item)=>{
    dispatch(cart.setdelete(item))
    }


all=tasks.map((item,i)=>(
  
         <Oneobligation key={item.id}
    className={classes.onediv}
    id={item.id}
    check={item.check}
   heart={()=>heart(item,i)}
   name={item.name}
   text={item.text}
   date={item.date}
   deleteitemi={()=>deleteitem(item)}
   updateitemi={()=>updateitem(item)}
   />
    
   
  
)

)

let filterr;
 const filterdataday=tasks.filter((item)=>item.date.slice(0,10).includes(dateofobl))

if(filterdataday.length!==0){
    filterr=filterdataday.map((item)=>(

        <div className={classes.filtertoday}
        ><div className={classes.filtertodayone}>{item.name}
        </div>
        <p style={{cursor:"pointer"}} onClick={()=>setshowtodayobligation(false)}>X</p>
        </div>
        
    ))

}
else if(filterdataday.length===0){filterr=(<div className={classes.filtertoday}>NEMATE OBAVEZE DANAS<p style={{cursor:"pointer"}} onClick={()=>setshowtodayobligation(false)}>X</p></div>)}

const confirmdelete=async()=>{
   if(itemms.check===1){
    await axios.delete(`https://checkapp.herokuapp.com/checkdatas/${itemms.id}`)
    window.location.reload()

   }
   else if(!itemms.check){
   await axios.delete(`https://jelenatodo.herokuapp.com/listofobligation/${itemms.id}`)
   window.location.reload()}
}


const updownarrow=()=>{
    setup((prev)=>!prev)
}


    
    const sortbyname=tasks.slice().sort((a,b)=>a.name.localeCompare(b.name)).map((item)=>(
        <Oneobligation key={item.id}
        className={classes.onediv}
        id={item.id}
        check={item.check}
       heart={()=>heart(item)}
       name={item.name}
       text={item.text}
       date={item.date}
       deleteitemi={()=>deleteitem(item)}
       updateitemi={()=>updateitem(item)}
       />
      
    ))  


    
    const sortbydate=tasks.slice().sort((a,b)=>a.date.localeCompare(b.date)).map((item)=>(
        <Oneobligation key={item.id}
        className={classes.onediv}
        id={item.id}
        check={item.check}
       heart={()=>heart(item)}
       name={item.name}
       text={item.text}
       date={item.date}
       deleteitemi={()=>deleteitem(item)}
       updateitemi={()=>updateitem(item)}
       />
      
    )
    
    )  

const searchitems=(e)=>{
    const oneofall=tasks.slice().filter((item)=>item.name.trim().toLowerCase().includes(e.target.value.toLowerCase())).map((item)=>(
        <Oneobligation key={item.id}
        className={classes.onediv}
        id={item.id}
        check={item.check}
       heart={()=>heart(item)}
       name={item.name}
       text={item.text}
       date={item.date}
       deleteitemi={()=>deleteitem(item)}
       updateitemi={()=>updateitem(item)}
       />
  
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




const checkingdatas=checkdatas.length>0?checkdatas.map((item)=>(
   
    <Checkdatas name={item.name}
    key={item.id}
    id={item.id}
    date={item.date}
    
    />)):(<div className={classes.checknodiv}>NEMATE CEKIRANE PROIZVODE
    
    </div>)


    return (
      <div className={classes.div}> 
             {!loading&&
             <div className={classes.divtitleimage}>
            <h1 className="title">MOJA TO DO LISTA
             </h1>
            <div onClick={getcheckiteems} style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center"}}><AiFillGift className={classes.image} />
            <p className={classes.imagep}>Klikni <AiOutlineArrowUp/> za cekirane obaveze</p>
            </div> 
             </div>
            }
             
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
           <div ref={ref} style={{width:"100%",marginLeft:"10%"}}>  {all}</div>
          
        </div>}
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
             <Link className={classes.link} to="/">Vratite se na pocetnu stranicu</Link> 
        <button className={classes.link} onClick={()=>setshowtodayobligation(true)}>OBAVEZE ZA DANAS</button> 
            </div>
       {showtodayobligation&&!loading&&<div>
        <div className={classes.filterdiv}>
         {filterdataday.length!==0&&<h3>Vase obaveze za danas!</h3>}
            {filterr}</div>
      
        </div>}
       {openbox&&<div className={classes.allcheckdata}  ref={ref2}>
          {checkingdatas}
            <button className={classes.closecheckbutton} onClick={()=>setisopenbox(false)}>
                <AiFillCloseCircle/>
            </button>
        </div>}
        </div>
    );
}

export default Allobligation;